import { useRef, useState, type MouseEvent, type PointerEvent } from "react";
import type { EffectsProps } from "../lib/types";
import { content } from "../config/content";
import { t, Rich, vibrate } from "../lib/text";

// Pergunta final: o "não" foge, o "sim" cresce
export function Ask({ burst, rain }: EffectsProps) {
  const c = content.pergunta;
  const box = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);
  const [tries, setTries] = useState(0);
  const [yes, setYes] = useState(false);

  const run = (e: MouseEvent | PointerEvent) => {
    e.preventDefault();
    if (!box.current) return;
    const b = box.current.getBoundingClientRect();
    setPos({ left: 10 + Math.random() * Math.max(0, b.width - 190), top: 10 + Math.random() * Math.max(0, b.height - 70) });
    setTries((n) => n + 1);
  };
  const sayYes = (e: MouseEvent<HTMLButtonElement>) => {
    setYes(true);
    const r = e.currentTarget.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top, 150);
    rain();
    vibrate([40, 60, 40]);
  };

  return (
    <section>
      <h2><Rich text={c.titulo} /></h2>
      <div className="ask reveal" ref={box}>
        {yes ? (
          <>
            <p className="answer">{t(c.resposta)}</p>
            <p className="note-small" style={{ marginTop: 16 }}>{t(c.respostaSub)}</p>
          </>
        ) : (
          <>
            <p className="q">{t(c.texto)}</p>
            <div className="yes-row">
              <button className="btn" onClick={sayYes} style={{ transform: `scale(${Math.min(1 + tries * 0.12, 1.7)})` }}>{t(c.sim)}</button>
              <button className="btn no" onPointerDown={run} onPointerEnter={(e) => e.pointerType === "mouse" && run(e)} onClick={run}
                style={pos ? { position: "absolute", left: pos.left, top: pos.top } : undefined}>
                {t(c.nao[Math.min(tries, c.nao.length - 1)])}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
