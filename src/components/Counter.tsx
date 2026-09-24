import { useEffect, useState } from "react";
import { content } from "../config/content";
import { t, Rich, CUTE } from "../lib/text";
import { Doodle, SWIRL } from "./Doodle";

function calc(since: string) {
  const d = Math.max(0, Date.now() - new Date(since).getTime());
  return {
    dias: Math.floor(d / 864e5),
    horas: Math.floor(d / 36e5) % 24,
    minutos: Math.floor(d / 6e4) % 60,
    segundos: Math.floor(d / 1e3) % 60,
  };
}

export function Counter() {
  const c = content.contador;
  const since = content.pessoas.desde;
  const [time, setTime] = useState(() => calc(since));
  useEffect(() => {
    const i = setInterval(() => setTime(calc(since)), 1000);
    return () => clearInterval(i);
  }, [since]);

  if (!since) return null;
  return (
    <section className="reveal">
      <h2>
        <Rich text={c.titulo} />
        <Doodle d={SWIRL} w={150} h={36} vb="0 0 155 60" style={{ left: "50%", bottom: -30, marginLeft: -75 }} />
      </h2>
      <div className="counter">
        {Object.entries(time).map(([k, v], i) => (
          <div className="unit" key={k} style={{ "--r": [-3, 2, 2, -2][i] + "deg", "--c": CUTE[i] }}>
            <b>{k === "dias" ? v : String(v).padStart(2, "0")}</b>
            <span>{c.unidades[k as keyof typeof c.unidades]}</span>
          </div>
        ))}
      </div>
      <p className="note-small">{t(c.rodape)}</p>
    </section>
  );
}
