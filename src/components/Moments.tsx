import { content } from "../config/content";
import { media } from "../config/media";
import { t, CUTE } from "../lib/text";
import { Polaroid } from "./Media";
import { Band } from "./Band";
import type { OpenMedia } from "../lib/types";

interface Props { onOpen: OpenMedia }

// Linha do tempo com uma trilha de coraçõezinhos andando entre os momentos
export function Moments({ onOpen }: Props) {
  const c = content.momentos;
  if (!c.itens.length) return null;
  return (
    <Band tone="berry" title={c.titulo} stamp={c.selo} stampStyle="label">
      <div className="timeline trail">
        {c.itens.map((m, i) => (
          <div className="moment reveal" key={i}>
            <span className="pin" aria-hidden="true">♥</span>
            <Polaroid src={media.momentos[i]} caption={t(m.legenda)} rotate={i % 2 ? 3 : -3}
              tape={CUTE[(i + 1) % 5]} tapeRotate={i % 2 ? 6 : -6} onOpen={onOpen} />
            <div className="txt">
              <span className="date ribbon">{t(m.data)}</span>
              <h3>{t(m.titulo)}</h3>
              <p>{t(m.texto)}</p>
            </div>
          </div>
        ))}
      </div>
      {c.rodape && <p className="note-small">{t(c.rodape)}</p>}
    </Band>
  );
}

// Luzinhas penduradas ao longo do fio (mesma curva do varal)
const BULBS = 9;
function Bulbs() {
  return (
    <div className="bulbs" aria-hidden="true">
      {Array.from({ length: BULBS }, (_, i) => {
        const p = (i + 0.5) / BULBS;
        const y = (1 - p) ** 2 * 2 + 2 * (1 - p) * p * 22 + p ** 2 * 2; // curva Q do fio, em unidades do viewBox
        return <span key={i} className="bulb" style={{ left: p * 100 + "%", top: y * 1.5 + "px", animationDelay: (i % 3) * 0.5 + "s" }} />;
      })}
    </div>
  );
}

// Varal com luzinhas: as fotos ficam penduradas com prendedor, balançando
export function Gallery({ onOpen }: Props) {
  if (!media.galeria.length) return null;
  const rows: typeof media.galeria[] = [];
  for (let i = 0; i < media.galeria.length; i += 2) rows.push(media.galeria.slice(i, i + 2));
  return (
    <Band tone="blush" title={content.galeria.titulo}>
      <div className="clothesline">
        {rows.map((row, r) => (
          <div className="line-row" key={r}>
            <svg className="string" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 2 Q 50 22 100 2" fill="none" stroke="var(--ink)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            </svg>
            <Bulbs />
            {row.map((g, i) => (
              <div className="hang reveal" key={i} style={{ animationDelay: (r * 2 + i) * -0.7 + "s" }}>
                <span className="peg" aria-hidden="true" />
                <Polaroid src={g.src} caption={t(g.legenda)} rotate={i ? 2 : -2} tape="transparent" onOpen={onOpen} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </Band>
  );
}

function FilmStrip({ className }: { className: string }) {
  return <div className={"filmstrip " + className} aria-hidden="true"><div className="holes" /></div>;
}

// Sala de cinema: rolos de filme, holofote e carrossel estilo stories
export function Reels({ onOpen }: Props) {
  const c = content.videos;
  if (!media.videos.length) return null;
  return (
    <Band tone="night" title={c.titulo} stamp={c.selo} stampStyle="rec" className="cinema"
      decor={<><FilmStrip className="top" /><div className="spotlight" aria-hidden="true" /><FilmStrip className="bottom" /></>}>
      <p className="note-small">{t(c.dica)}</p>
      <div className="reels">
        {media.videos.map((v, i) => (
          <Polaroid key={i} className="reel" src={v.src} caption={t(v.legenda)} rotate={[-2, 2, -1, 3][i % 4]}
            tape={CUTE[(i + 2) % 5]} tapeRotate={[-5, 4, -3, 6][i % 4]} onOpen={onOpen}>
            <span className="play" aria-hidden="true">▶</span>
          </Polaroid>
        ))}
      </div>
      {media.videos.length > 1 && <span className="swipe">{t(c.arraste)}</span>}
    </Band>
  );
}
