import { useState } from "react";
import { content } from "../config/content";
import { t } from "../lib/text";

export function Twinkles({ count }: { count: number }) {
  const [stars] = useState(() => Array.from({ length: count }, () => ({ l: Math.random() * 100, t: Math.random() * 100, d: Math.random() * 3 })));
  return <>{stars.map((s, i) => <span key={i} className="twinkle" style={{ left: s.l + "%", top: s.t + "%", animationDelay: s.d + "s" }} />)}</>;
}

// Céu noturno com envelope; ao tocar, abre e chama onOpen
export function Intro({ phase, onOpen }: { phase: string; onOpen: () => void }) {
  const c = content.abertura;
  const [first, ...rest] = c.linhas;
  return (
    <div className={"intro" + (phase === "open" ? " gone" : "")}>
      <Twinkles count={70} />
      <div className="inner">
        <p className="hi">
          <em>{t(first)}</em>
          {rest.map((l, i) => <span key={i}><br />{t(l)}</span>)}
        </p>
        <button className={"env" + (phase !== "closed" ? " open" : "")} onClick={onOpen} aria-label={c.toque}>
          <span className="back" />
          <span className="letter-in">{t(c.envelope)}</span>
          <span className="front" />
          <span className="flap" />
          <span className="seal">♥</span>
        </button>
        <small>{t(c.toque)}<span>{t(c.dicaSom)}</span></small>
      </div>
    </div>
  );
}
