import { useEffect, useRef, useState } from "react";
import { content } from "./config/content";
import { media } from "./config/media";
import { t, asset, isVideo } from "./lib/text";
import { playParabens, playFile } from "./lib/parabens";
import { useMagic } from "./hooks/useMagic";
import { useReveal } from "./hooks/useReveal";
import { Intro } from "./components/Intro";
import { Hero } from "./components/Hero";
import { Cake } from "./components/Cake";
import { Counter } from "./components/Counter";
import { Moments, Gallery, Reels } from "./components/Moments";
import { Letter } from "./components/Letter";
import { Notes } from "./components/Notes";
import { Ask } from "./components/Ask";
import { Finale } from "./components/Finale";
import { Lightbox } from "./components/Lightbox";
import type { LightboxItem, OpenMedia } from "./lib/types";

export default function App() {
  const { ref, burst, rain } = useMagic();
  const [phase, setPhase] = useState<"closed" | "opening" | "open">("closed"); // closed → opening → open
  const [lightbox, setLightbox] = useState<LightboxItem | null>(null);
  const [playing, setPlaying] = useState(false);
  const [answered, setAnswered] = useState(false);
  const stopRef = useRef<(() => void) | null>(null);
  useReveal();

  useEffect(() => {
    document.title = t(content.tituloDaAba);
    // o navegador não restaura a rolagem antiga: a página sempre começa no topo
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // enquanto o envelope está na tela, a página de trás não rola
  useEffect(() => {
    const locked = phase !== "open";
    document.documentElement.classList.toggle("locked", locked);
    return () => document.documentElement.classList.remove("locked");
  }, [phase]);

  const stop = () => stopRef.current?.();
  const play = () => {
    stop();
    setPlaying(true);
    const done = () => { setPlaying(false); stopRef.current = null; };
    stopRef.current = media.musica ? playFile(asset(media.musica), done) : playParabens(done);
  };

  const openEnvelope = () => {
    if (phase !== "closed") return;
    setPhase("opening");
    window.scrollTo({ top: 0, behavior: "instant" });
    play();
    setTimeout(() => {
      setPhase("open");
      burst(innerWidth / 2, innerHeight * 0.45, 120);
      rain();
    }, 1500);
  };

  // vídeo abre com som: para a música pra não tocar os dois juntos
  const openMedia: OpenMedia = (item) => {
    if (isVideo(item.src)) stop();
    setLightbox(item);
  };

  return (
    <>
      <canvas id="magic" ref={ref} />
      <Intro phase={phase} onOpen={openEnvelope} />

      <div className="wrap">
        <Hero drawn={phase === "open" ? "draw-now" : "pre"} onOpen={openMedia} />
        <Cake burst={burst} rain={rain} onSing={play} onStopMusic={stop} />
        <Counter />
        <Moments onOpen={openMedia} />
        <Gallery onOpen={openMedia} />
        <Reels onOpen={openMedia} />
        <Letter />
        <Notes burst={burst} />
        <Ask burst={burst} rain={rain} onYes={() => setAnswered(true)} />
        <Finale burst={burst} rain={rain} unlocked={answered} />
      </div>

      <footer>
        <span className="by">{t(content.rodape.linha)}</span>
        <span className="sig">{t(content.rodape.assinatura)}</span>
        <small>{t(content.rodape.pequeno)}</small>
      </footer>

      <button className={"music" + (playing ? " on" : "")} onClick={playing ? stop : play} aria-label={playing ? content.musica.parar : content.musica.tocar}>
        <span className="note">♪</span>{playing ? content.musica.parar : content.musica.tocar}
      </button>

      <Lightbox item={lightbox} onClose={() => setLightbox(null)} />
    </>
  );
}
