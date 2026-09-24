import { useState } from "react";
import { content } from "../config/content";
import { t, CUTE, center } from "../lib/text";
import { Band } from "./Band";
import type { Burst } from "../lib/types";

function Clouds() {
  return (
    <div className="clouds" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => <span key={i} className={"cloud c" + i} />)}
    </div>
  );
}

// Bilhetinhos que viram ao tocar, num céu com nuvens passando
export function Notes({ burst }: { burst: Burst }) {
  const c = content.motivos;
  const [open, setOpen] = useState<Record<number, boolean>>({});
  if (!c.itens.length) return null;
  return (
    <Band tone="sunset" title={c.titulo} stamp={c.selo} stampStyle="bubble" decor={<Clouds />}>
      <p className="note-small">{t(c.dica)}</p>
      <div className="notes">
        {c.itens.map((r, i) => (
          <button key={i} className={"n" + (open[i] ? " open" : "")} aria-pressed={!!open[i]}
            style={{ "--r": [-3, 3, 2, -2, -3, 2][i % 6] + "deg", "--c": CUTE[i % 5], animationDelay: i * -0.6 + "s" }}
            onClick={(e) => { setOpen((o) => ({ ...o, [i]: !o[i] })); if (!open[i]) burst(...center(e.currentTarget), 22); }}>
            <div className="in">
              <div className="f"><div>{t(c.frente, { n: i + 1 })}<small>{t(c.abrir)}</small></div></div>
              <div className="b">{t(r)}</div>
            </div>
          </button>
        ))}
      </div>
    </Band>
  );
}
