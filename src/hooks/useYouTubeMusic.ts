import { useCallback, useEffect, useRef, useState } from "react";

// Tipos mínimos da API de iframe do YouTube
interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  setVolume(v: number): void;
  getPlayerState(): number;
  destroy(): void;
}
interface YTNamespace {
  Player: new (el: HTMLElement, opts: Record<string, unknown>) => YTPlayer;
  PlayerState: { PLAYING: number; PAUSED: number; ENDED: number };
}
declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

// aceita link completo (watch, youtu.be, shorts, music) ou só o id
export function youtubeId(url: string): string | null {
  if (!url) return null;
  if (/^[\w-]{11}$/.test(url)) return url;
  const m = url.match(/(?:v=|youtu\.be\/|shorts\/|embed\/)([\w-]{11})/);
  return m ? m[1] : null;
}

let apiPromise: Promise<YTNamespace> | null = null;
function loadApi(): Promise<YTNamespace> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  apiPromise ??= new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => { prev?.(); resolve(window.YT!); };
    const s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(s);
  });
  return apiPromise;
}

// Música de fundo tocada por um player do YouTube escondido
export function useYouTubeMusic(url: string, startAt = 0, volume = 60) {
  const id = youtubeId(url);
  const holder = useRef<HTMLDivElement | null>(null);
  const player = useRef<YTPlayer | null>(null);
  const wantPlay = useRef(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    const el = document.createElement("div");
    const box = document.createElement("div");
    box.className = "yt-bg";
    box.setAttribute("aria-hidden", "true");
    box.appendChild(el);
    document.body.appendChild(box);
    holder.current = box;

    loadApi().then((YT) => {
      if (cancelled) return;
      player.current = new YT.Player(el, {
        videoId: id,
        width: 200,
        height: 200,
        playerVars: { autoplay: 0, controls: 0, loop: 1, playlist: id, playsinline: 1, start: startAt, rel: 0, modestbranding: 1 },
        events: {
          onReady: () => {
            player.current?.setVolume(volume);
            setReady(true);
            if (wantPlay.current) player.current?.playVideo();
          },
          onStateChange: (e: { data: number }) => setPlaying(e.data === YT.PlayerState.PLAYING),
        },
      });
    });

    return () => {
      cancelled = true;
      player.current?.destroy();
      player.current = null;
      box.remove();
    };
  }, [id, startAt, volume]);

  const play = useCallback(() => {
    wantPlay.current = true;
    player.current?.playVideo();
  }, []);
  const pause = useCallback(() => {
    wantPlay.current = false;
    player.current?.pauseVideo();
  }, []);

  return { enabled: !!id, ready, playing, play, pause };
}
