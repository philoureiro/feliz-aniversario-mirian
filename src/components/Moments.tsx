import { content } from "../config/content";
import { media } from "../config/media";
import { t, Rich, CUTE } from "../lib/text";
import { Polaroid } from "./Media";
import type { OpenMedia } from "../lib/types";

interface Props { onOpen: OpenMedia }

export function Moments({ onOpen }: Props) {
  const c = content.momentos;
  if (!c.itens.length) return null;
  return (
    <section>
      <h2><Rich text={c.titulo} /></h2>
      <div className="timeline">
        {c.itens.map((m, i) => (
          <div className="moment reveal" key={i}>
            <Polaroid src={media.momentos[i]} caption={t(m.legenda)} rotate={i % 2 ? 3 : -3}
              tape={CUTE[(i + 1) % 5]} tapeRotate={i % 2 ? 6 : -6} onOpen={onOpen} />
            <div className="txt">
              <span className="date" style={{ "--c": CUTE[(i + 2) % 5] }}>{t(m.data)}</span>
              <h3>{t(m.titulo)}</h3>
              <p>{t(m.texto)}</p>
            </div>
          </div>
        ))}
      </div>
      {c.rodape && <p className="note-small">{t(c.rodape)}</p>}
    </section>
  );
}

export function Gallery({ onOpen }: Props) {
  if (!media.galeria.length) return null;
  return (
    <section>
      <h2><Rich text={content.galeria.titulo} /></h2>
      <div className="gallery">
        {media.galeria.map((g, i) => (
          <Polaroid key={i} className="reveal" src={g.src} caption={t(g.legenda)} rotate={[-4, 3, 3, -3, -2, 4][i % 6]}
            tape={CUTE[i % 5]} tapeRotate={[-6, 4, -3, 7][i % 4]} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}

// Carrossel de vídeos em pé, estilo stories
export function Reels({ onOpen }: Props) {
  const c = content.videos;
  if (!media.videos.length) return null;
  return (
    <section>
      <h2><Rich text={c.titulo} /></h2>
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
    </section>
  );
}
