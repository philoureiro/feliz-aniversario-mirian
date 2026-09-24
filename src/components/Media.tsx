import { useEffect, useRef, useState, type ReactNode } from "react";
import type { OpenMedia } from "../lib/types";
import { content } from "../config/content";
import { asset, isVideo } from "../lib/text";

// Vídeo mudo em loop que só toca (e só baixa) quando está na tela
function InViewVideo({ src, onError }: { src: string; onError: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.35 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return <video ref={ref} className="ph" src={src} muted loop playsInline preload="metadata" onError={onError} />;
}

// Foto ou vídeo dentro da moldura; se o arquivo não existir, mostra um espaço reservado
export function Media({ src, alt }: { src?: string | null; alt?: string }) {
  const [err, setErr] = useState(false);
  if (!src || err)
    return (
      <div className="ph-empty">
        <b>♥</b>{isVideo(src) ? content.videoVazio : content.fotoVazia}<small>{src}</small>
      </div>
    );
  if (isVideo(src)) return <InViewVideo src={asset(src)} onError={() => setErr(true)} />;
  return <img className="ph" src={asset(src)} alt={alt || ""} loading="lazy" onError={() => setErr(true)} />;
}

interface PolaroidProps {
  src?: string | null;
  caption: string;
  rotate?: number;
  tape?: string;
  tapeRotate?: number;
  className?: string;
  onOpen?: OpenMedia;
  children?: ReactNode;
}

export function Polaroid({ src, caption, rotate = -3, tape = "var(--pink)", tapeRotate = -5, className = "", onOpen, children }: PolaroidProps) {
  return (
    <button className={"polaroid " + className} style={{ "--r": rotate + "deg" }} onClick={() => src && onOpen?.({ src, caption })} aria-label={caption}>
      <span className="tape" style={{ "--tc": tape, "--t": tapeRotate + "deg" }} />
      <div className="img"><Media src={src} alt={caption} /></div>
      {children}
      <span className="cap">{caption}</span>
    </button>
  );
}
