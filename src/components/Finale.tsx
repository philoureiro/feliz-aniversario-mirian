import { useState, type MouseEvent } from "react";
import type { EffectsProps } from "../lib/types";
import { content } from "../config/content";
import { t, Rich, vibrate } from "../lib/text";
import { Twinkles } from "./Intro";

const STEP = 1.9; // segundos entre uma linha e outra

// Caixa de presente num céu estrelado; ao abrir, a mensagem aparece linha por linha
export function Finale({ burst, rain }: EffectsProps) {
  const c = content.final;
  const [opened, setOpened] = useState(false);

  const open = (e: MouseEvent<HTMLButtonElement>) => {
    if (opened) return;
    setOpened(true);
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    vibrate([30, 50, 30]);
    setTimeout(() => burst(r.left + r.width / 2, r.top + 40, 140), 300);
    setTimeout(() => el.closest(".finale")?.scrollIntoView({ behavior: "smooth", block: "start" }), 900);
    setTimeout(rain, (c.linhas.length * STEP + 0.8) * 1000);
  };

  return (
    <section>
      <div className="finale">
        <Twinkles count={45} />
        <h2><Rich text={c.titulo} /></h2>
        <button className={"gift" + (opened ? " open" : "")} onClick={open} aria-label={t(c.dica)}>
          <span className="glow" />
          <span className="box"><span className="rib-v" /></span>
          <span className="lid"><span className="rib-v" /><span className="bow" /></span>
        </button>
        {!opened && <p className="hint">{t(c.dica)}</p>}
        {opened && (
          <div className="lines">
            {c.linhas.map((l, i) => (
              <p key={i} className={"line" + (/presente/i.test(l) ? " big" : "")} style={{ animationDelay: 1 + i * STEP + "s" }}>{t(l)}</p>
            ))}
            <p className="sig" style={{ animationDelay: 1 + c.linhas.length * STEP + "s" }}>{t(c.assinatura)}</p>
          </div>
        )}
      </div>
    </section>
  );
}
