import { useState, type ReactNode } from "react";
import type { OpenMedia } from "../lib/types";
import { content } from "../config/content";
import { asset, isVideo } from "../lib/text";

// Foto ou vídeo dentro da moldura; se o arquivo não existir, mostra um espaço reservado
export function Media({ src, alt }: { src?: string | null; alt?: string }) {
  const [err, setErr] = useState(false);
  if (!src || err)
    return (
      <div className="ph-empty">
        <b>♥</b>{isVideo(src) ? content.videoVazio : content.fotoVazia}<small>{src}</small>
      </div>
    );
  if (isVideo(src))
    return <video className="ph" src={asset(src)} muted loop playsInline autoPlay preload="metadata" onError={() => setErr(true)} />;
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
