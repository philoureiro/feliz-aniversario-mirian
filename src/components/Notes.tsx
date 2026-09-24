import { useState } from "react";
import { content } from "../config/content";
import { t, Rich, CUTE, center } from "../lib/text";
import type { Burst } from "../lib/types";

// Bilhetinhos que viram ao tocar
export function Notes({ burst }: { burst: Burst }) {
  const c = content.motivos;
  const [open, setOpen] = useState<Record<number, boolean>>({});
  if (!c.itens.length) return null;
  return (
    <section>
      <h2><Rich text={c.titulo} /></h2>
      <p className="note-small">{t(c.dica)}</p>
      <div className="notes">
        {c.itens.map((r, i) => (
          <button key={i} className={"n" + (open[i] ? " open" : "")} aria-pressed={!!open[i]}
            style={{ "--r": [-3, 3, 2, -2, -3, 2][i % 6] + "deg", "--c": CUTE[i % 5] }}
            onClick={(e) => { setOpen((o) => ({ ...o, [i]: !o[i] })); if (!open[i]) burst(...center(e.currentTarget), 22); }}>
            <div className="in">
              <div className="f"><div>{t(c.frente, { n: i + 1 })}<small>{t(c.abrir)}</small></div></div>
              <div className="b">{t(r)}</div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
