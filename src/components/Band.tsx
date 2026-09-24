import type { ReactNode } from "react";
import { t, Rich } from "../lib/text";

export type Tone = "red" | "rose" | "plum" | "berry" | "blush" | "night" | "pink" | "sunset";
export type StampStyle = "pill" | "burst" | "ticket" | "rec" | "label" | "bubble";

// Fita de "cuidado" com texto correndo (exclusiva da pergunta importante)
export function Caution({ text, className }: { text: string; className: string }) {
  const items = Array.from({ length: 8 }, (_, i) => <span key={i}>{text}</span>);
  return (
    <div className={"caution " + className} aria-hidden="true">
      <div className="track">{items}{items}</div>
    </div>
  );
}

interface BandProps {
  tone: Tone;
  title: string;
  stamp?: string;
  stampStyle?: StampStyle;
  decor?: ReactNode;      // elementos decorativos soltos no fundo da seção
  className?: string;
  children: ReactNode;
}

// Seção de ponta a ponta: cor forte, textura no fundo, título grande e um selo
export function Band({ tone, title, stamp, stampStyle = "pill", decor, className = "", children }: BandProps) {
  return (
    <section className={`band band--${tone} ${className}`}>
      {decor}
      <h2>
        <Rich text={title} />
        {stamp && <span className={`band-stamp stamp--${stampStyle}`}>{t(stamp)}</span>}
      </h2>
      {children}
    </section>
  );
}
