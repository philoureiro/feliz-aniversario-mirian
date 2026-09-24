import { useState, type MouseEvent } from "react";
import type { EffectsProps } from "../lib/types";

interface Dot { l: number; t: number; r: number; c: string }
import { content } from "../config/content";
import { t, Rich, HEX, vibrate } from "../lib/text";

const DOT_COLORS = ["#E2475F", "#FFE27A", "#BFE8D6", "#fff"];

function Dots({ items }: { items: Dot[] }) {
  return (
    <div className="dots">
      {items.map((d, i) => <i key={i} style={{ left: d.l + "%", top: d.t + "%", transform: `rotate(${d.r}deg)`, background: d.c }} />)}
    </div>
  );
}

export function Cake({ burst, rain, onSing }: EffectsProps & { onSing: () => void }) {
  const c = content.bolo;
  const total = c.velas;
  const [out, setOut] = useState<number[]>([]);
  const [dots] = useState<Dot[]>(() => Array.from({ length: 16 }, (_, i) => ({ l: Math.random() * 92, t: Math.random() * 80, r: Math.random() * 180, c: DOT_COLORS[i % 4] })));
  const done = out.length === total;
  const left = total - out.length;

  const blow = (i: number, e: MouseEvent<HTMLButtonElement>) => {
    if (out.includes(i)) return;
    const next = [...out, i];
    setOut(next);
    vibrate(30);
    const r = e.currentTarget.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top, 14);
    if (next.length === total) setTimeout(() => { burst(r.left, r.top, 120); rain(); }, 400);
  };

  const msg = done ? <span className="wish">{t(c.pronto)}</span> : out.length === 0 ? t(c.pedido) : left === 1 ? t(c.faltaUma) : t(c.faltamVarias, { n: left });

  return (
    <section className="reveal">
      <h2><Rich text={c.titulo} /></h2>
      <p className="cake-msg">{msg}</p>
      {!done && <p className="tap-hint">{t(c.dica)}</p>}
      <div className="cake-area">
        <div className="candles">
          {Array.from({ length: total }, (_, i) => (
            <button key={i} className={"candle" + (out.includes(i) ? " out" : "")} style={{ "--c": HEX[[0, 2, 1, 4, 3][i % 5]] }}
              onClick={(e) => blow(i, e)} aria-label={t(c.dica)}>
              <span className="flame" />
              {out.includes(i) && <span className="smoke" />}
            </button>
          ))}
        </div>
        <div className="tier top">
          <svg className="drip" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 0 H100 V10 Q95 22 90 10 Q84 4 78 12 Q72 26 66 12 Q58 2 50 12 Q44 20 38 10 Q30 2 24 14 Q18 24 12 10 Q6 4 0 12 Z" fill="#fff" stroke="var(--ink)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
          </svg>
          <Dots items={dots.slice(0, 6)} />
        </div>
        <div className="tier bottom">
          <svg className="drip" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 0 H100 V10 Q94 24 88 10 Q80 2 72 12 Q66 22 60 10 Q52 2 44 14 Q38 24 32 10 Q24 2 16 12 Q10 22 4 10 L0 10 Z" fill="var(--pink)" stroke="var(--ink)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
          </svg>
          <Dots items={dots.slice(6)} />
        </div>
        <div className="plate" />
      </div>
      {done && <p className="note-small wish">{t(c.depois)}</p>}
      <button className="btn alt" onClick={onSing}>{t(c.botaoCantar)}</button>
    </section>
  );
}
