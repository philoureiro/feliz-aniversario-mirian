// Trilha de suspense do ritual do bolo, gerada com Web Audio:
// pad grave, batida de coração e sininhos esparsos.

export interface Suspense {
  intensify: () => void; // coração acelera e o pad cresce (contagem)
  duck: () => void;      // quase silêncio (enquanto o microfone escuta o sopro)
  stop: () => void;      // some devagar
}

const BELLS = [880, 1108.73, 1318.51, 1479.98, 1760]; // lá maior pentatônica

export function startSuspense(): Suspense {
  const Ctor = window.AudioContext ?? window.webkitAudioContext!;
  const ac = new Ctor();
  void ac.resume();
  const now = () => ac.currentTime;

  const master = ac.createGain();
  master.gain.value = 0;
  master.gain.linearRampToValueAtTime(0.9, now() + 2.5);
  master.connect(ac.destination);

  // pad grave: duas notas levemente desafinadas passando por um filtro escuro
  const filter = ac.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 520;
  const pad = ac.createGain();
  pad.gain.value = 0.1;
  filter.connect(pad).connect(master);
  const oscs = [110, 110.6, 164.8, 220.4].map((f) => {
    const o = ac.createOscillator();
    o.type = "triangle";
    o.frequency.value = f;
    o.connect(filter);
    o.start();
    return o;
  });
  // respiração lenta no pad
  const lfo = ac.createOscillator();
  const lfoGain = ac.createGain();
  lfo.frequency.value = 0.18;
  lfoGain.gain.value = 0.035;
  lfo.connect(lfoGain).connect(pad.gain);
  lfo.start();

  const thump = (t: number, vol: number) => {
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(70, t);
    o.frequency.exponentialRampToValueAtTime(42, t + 0.18);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0008, t + 0.26);
    o.connect(g).connect(master);
    o.start(t);
    o.stop(t + 0.3);
  };

  const bell = (t: number) => {
    const f = BELLS[Math.floor(Math.random() * BELLS.length)];
    for (const [mult, vol] of [[1, 0.05], [2.01, 0.015]] as const) {
      const o = ac.createOscillator();
      const g = ac.createGain();
      o.type = "sine";
      o.frequency.value = f * mult;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(vol, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0005, t + 2.2);
      o.connect(g).connect(master);
      o.start(t);
      o.stop(t + 2.3);
    }
  };

  let beat = 1.05;      // segundos entre batidas
  let beatVol = 0.55;
  let bells = true;
  let nextBeat = now() + 0.6;
  let nextBell = now() + 1.2;

  // agenda os sons um pouquinho à frente, pra não engasgar
  const timer = window.setInterval(() => {
    const horizon = now() + 0.3;
    while (nextBeat < horizon) {
      if (beatVol > 0) { thump(nextBeat, beatVol); thump(nextBeat + 0.24, beatVol * 0.7); }
      nextBeat += beat;
    }
    while (nextBell < horizon) {
      if (bells) bell(nextBell);
      nextBell += 0.9 + Math.random() * 1.4;
    }
  }, 100);

  let stopped = false;
  return {
    intensify() {
      beat = 0.62;
      beatVol = 0.75;
      pad.gain.setTargetAtTime(0.16, now(), 0.8);
      filter.frequency.setTargetAtTime(900, now(), 1);
    },
    duck() {
      beatVol = 0;
      bells = false;
      master.gain.setTargetAtTime(0.25, now(), 0.3);
    },
    stop() {
      if (stopped) return;
      stopped = true;
      clearInterval(timer);
      master.gain.cancelScheduledValues(now());
      master.gain.setTargetAtTime(0, now(), 0.35);
      window.setTimeout(() => {
        oscs.forEach((o) => o.stop());
        lfo.stop();
        void ac.close();
      }, 1800);
    },
  };
}
