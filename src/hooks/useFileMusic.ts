import { useCallback, useEffect, useRef, useState } from "react";

// Música de fundo a partir de um arquivo (mp3) do próprio site, em loop
export function useFileMusic(src: string | null, startAt = 0, volume = 60) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!src) return;
    const a = new Audio(src);
    a.loop = true;
    a.preload = "auto";
    a.volume = Math.min(1, Math.max(0, volume / 100));
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("loadedmetadata", () => { if (startAt && a.currentTime === 0) a.currentTime = startAt; }, { once: true });
    audio.current = a;
    return () => {
      a.pause();
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      audio.current = null;
    };
  }, [src, startAt, volume]);

  const play = useCallback(() => { audio.current?.play().catch(() => setPlaying(false)); }, []);
  const pause = useCallback(() => { audio.current?.pause(); }, []);

  return { enabled: !!src, ready: true, playing, play, pause };
}
