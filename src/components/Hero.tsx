import { content } from "../config/content";
import { media } from "../config/media";
import { t, HEX } from "../lib/text";
import { Doodle, HEART, STAR } from "./Doodle";
import { Polaroid } from "./Media";
import type { OpenMedia } from "../lib/types";

function Bunting() {
  const letters = [...content.bandeirinhas];
  const mid = (letters.length - 1) / 2;
  return (
    <div className="bunting" aria-hidden="true">
      <svg viewBox="0 0 400 40" preserveAspectRatio="none"><path d="M0 6 Q 200 46 400 6" fill="none" stroke="var(--ink)" strokeWidth="2" /></svg>
      <div className="flags">
        {letters.map((l, i) => {
          const y = (1 - ((i - mid) / (mid + 1)) ** 2) * 16;
          return <div key={i} className="flag" style={{ background: HEX[i % 5], "--y": y + "px", animationDelay: i * 0.15 + "s" }}>{l}</div>;
        })}
      </div>
    </div>
  );
}

export function Hero({ drawn, onOpen }: { drawn: string; onOpen: OpenMedia }) {
  const c = content.inicio;
  const name = t("{para}");
  return (
    <>
      <Bunting />
      <section className="hero">
        <div className="balloons" aria-hidden="true">
          <span className="bal" style={{ background: "var(--pink)", left: -6, top: 60 }} />
          <span className="bal" style={{ background: "var(--mint)", left: 30, top: 120, width: 40, height: 50, animationDelay: "-1.5s" }} />
          <span className="bal" style={{ background: "var(--lilac)", right: -4, top: 70, animationDelay: "-.7s" }} />
          <span className="bal" style={{ background: "var(--hl)", right: 34, top: 132, width: 40, height: 50, animationDelay: "-2.2s" }} />
        </div>
        <h1>
          <span className="l1">{t(c.linha1)}</span>
          <span className="l2">{[...name].map((ch, i) => <span key={i} style={{ animationDelay: i * 0.12 + "s" }}>{ch}</span>)}</span>
        </h1>
        <span className="age">{t(c.selo)}</span>

        {media.principal && (
          <div className="main-photo">
            <Doodle d={HEART} w={80} h={80} className={drawn} style={{ left: -40, top: -34, transform: "rotate(-14deg)" }} />
            <Doodle d={STAR} w={42} h={42} vb="0 0 40 40" color="#E0A800" sw={2.5} className={drawn} style={{ right: -22, bottom: 50 }} />
            <Polaroid src={media.principal} caption={t(c.legendaFotoPrincipal)} onOpen={onOpen} />
          </div>
        )}
        {c.recado && (
          <div className="sticky">
            {t(c.recado)}
            <span className="sig">— {t("{de}")}</span>
          </div>
        )}
      </section>
    </>
  );
}
