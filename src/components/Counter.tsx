import { useEffect, useState } from "react";
import { content } from "../config/content";
import { t } from "../lib/text";
import { Band } from "./Band";

function calc(since: string) {
  const d = Math.max(0, Date.now() - new Date(since).getTime());
  return {
    dias: Math.floor(d / 864e5),
    horas: Math.floor(d / 36e5) % 24,
    minutos: Math.floor(d / 6e4) % 60,
    segundos: Math.floor(d / 1e3) % 60,
  };
}

const BEAT = "M0 50 H110 L125 50 L135 18 L150 86 L162 32 L172 50 H300 L315 50 L325 18 L340 86 L352 32 L362 50 H490 L505 50 L515 18 L530 86 L542 32 L552 50 H600";

// Linha de batimento cardíaco atravessando a seção
function Heartbeat() {
  return (
    <svg className="heartbeat" viewBox="0 0 600 100" preserveAspectRatio="none" aria-hidden="true">
      <path className="base" d={BEAT} pathLength="1" vectorEffect="non-scaling-stroke" />
      <path className="pulse" d={BEAT} pathLength="1" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

// Plaquinhas estilo painel de aeroporto: cada troca de número vira a placa
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
    <Band tone="plum" title={c.titulo} stamp={c.selo} stampStyle="ticket" decor={<Heartbeat />}>
      <div className="flipboard">
        {Object.entries(time).map(([k, v]) => {
          const val = k === "dias" ? String(v) : String(v).padStart(2, "0");
          return (
            <div className="flip-unit" key={k}>
              <div className="flip-card"><b key={val}>{val}</b></div>
              <span>{c.unidades[k as keyof typeof c.unidades]}</span>
            </div>
          );
        })}
      </div>
      <p className="note-small">{t(c.rodape)}</p>
    </Band>
  );
}
