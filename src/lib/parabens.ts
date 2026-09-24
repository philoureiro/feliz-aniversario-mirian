// "Parabéns pra você" tocado em timbre de caixinha de música com Web Audio
const NOTE = { G4: 392, A4: 440, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99 } as const;
type Note = keyof typeof NOTE;

const SONG: [Note, number][] = [
  ["G4", 0.75], ["G4", 0.25], ["A4", 1], ["G4", 1], ["C5", 1], ["B4", 2],
  ["G4", 0.75], ["G4", 0.25], ["A4", 1], ["G4", 1], ["D5", 1], ["C5", 2],
  ["G4", 0.75], ["G4", 0.25], ["G5", 1], ["E5", 1], ["C5", 1], ["B4", 1], ["A4", 2],
  ["F5", 0.75], ["F5", 0.25], ["E5", 1], ["C5", 1], ["D5", 1], ["C5", 3],
];

const HARMONICS: [number, number][] = [[1, 0.32], [2, 0.09], [3, 0.03]];

type Stop = () => void;

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

let ctx: AudioContext | null = null;

export function playParabens(onEnd?: () => void): Stop {
  const Ctor = window.AudioContext ?? window.webkitAudioContext!;
  const ac = (ctx ??= new Ctor());
  void ac.resume();
  const master = ac.createGain();
  master.gain.value = 0.5;
  master.connect(ac.destination);

  const beat = 0.46;
  let t = ac.currentTime + 0.08;
  for (const [n, d] of SONG) {
    for (const [mult, vol] of HARMONICS) {
      const o = ac.createOscillator();
      const g = ac.createGain();
      o.type = "sine";
      o.frequency.value = NOTE[n] * mult;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(vol, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0005, t + Math.max(0.7, d * beat * 1.6));
      o.connect(g).connect(master);
      o.start(t);
      o.stop(t + Math.max(0.8, d * beat * 1.7));
    }
    t += d * beat;
  }

  let ended = false;
  const finish = () => {
    if (!ended) { ended = true; onEnd?.(); }
  };
  const timer = setTimeout(finish, (t - ac.currentTime) * 1000 + 600);
  return () => {
    clearTimeout(timer);
    master.gain.setTargetAtTime(0, ac.currentTime, 0.05);
    setTimeout(() => master.disconnect(), 300);
    finish();
  };
}

// toca um mp3 próprio no lugar da caixinha de música
export function playFile(src: string, onEnd?: () => void): Stop {
  const a = new Audio(src);
  a.onended = () => onEnd?.();
  a.play().catch(() => onEnd?.());
  return () => { a.pause(); onEnd?.(); };
}
