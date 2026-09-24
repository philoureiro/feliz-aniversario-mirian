import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import type { EffectsProps } from "../lib/types";
import { content } from "../config/content";
import { t, HEX, vibrate } from "../lib/text";
import { Band } from "./Band";
import { Fireworks } from "./Fireworks";
import { startSuspense, type Suspense } from "../lib/suspense";

interface Dot { l: number; t: number; r: number; c: string }
type CandleState = "off" | "lit" | "out";
type Stage = "unlit" | "lighting" | "lit" | "wish" | "blow" | "dark" | "party";

const DOT_COLORS = ["#E2475F", "#FFE27A", "#FFD1E0", "#fff"];
const BLOW_THRESHOLD = 0.11;  // volume (RMS) que conta como sopro
const BLOW_HOLD = 0.15;       // segundos de sopro contínuo pra apagar uma vela

function Dots({ items }: { items: Dot[] }) {
  return (
    <div className="dots">
      {items.map((d, i) => <i key={i} style={{ left: d.l + "%", top: d.t + "%", transform: `rotate(${d.r}deg)`, background: d.c }} />)}
    </div>
  );
}

// O bolo vira um ritual: acender, apagar as luzes, pedido, soprar (no microfone!) e fogos
export function Cake({ burst, rain, onSing, onStopMusic }: EffectsProps & { onSing: () => void; onStopMusic: () => void }) {
  const c = content.bolo;
  const total = c.velas;
  const [candles, setCandles] = useState<CandleState[]>(() => Array(total).fill("off"));
  const [stage, setStage] = useState<Stage>("unlit");
  const [count, setCount] = useState(0);
  const [listening, setListening] = useState(false);
  const [micError, setMicError] = useState(false);
  const [fireworks, setFireworks] = useState(0);
  const [dots] = useState<Dot[]>(() => Array.from({ length: 16 }, (_, i) => ({ l: Math.random() * 92, t: Math.random() * 80, r: Math.random() * 180, c: DOT_COLORS[i % 4] })));

  const areaRef = useRef<HTMLDivElement>(null);
  const candleRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const candlesRef = useRef(candles);
  candlesRef.current = candles;
  const micStop = useRef<(() => void) | null>(null);
  const suspense = useRef<Suspense | null>(null);
  const timers = useRef<number[]>([]);

  const later = (fn: () => void, ms: number) => { timers.current.push(window.setTimeout(fn, ms)); };
  useEffect(() => () => { timers.current.forEach(clearTimeout); micStop.current?.(); suspense.current?.stop(); }, []);

  const litCount = candles.filter((s) => s === "lit").length;
  const lightsOff = stage === "lit" || stage === "wish" || stage === "blow" || stage === "dark";
  // durante o ritual a seção ocupa a tela inteira, como a sala com as luzes apagadas
  const fullscreen = stage !== "unlit" && stage !== "party";

  useEffect(() => {
    if (!fullscreen) return;
    const id = requestAnimationFrame(() =>
      document.querySelector(".cake-band")?.scrollIntoView({ behavior: "smooth", block: "start" }));
    return () => cancelAnimationFrame(id);
  }, [fullscreen]);

  const sparkAt = (i: number, n: number) => {
    const el = candleRefs.current[i];
    if (!el) return;
    const r = el.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top - 14, n);
  };

  const setCandle = (i: number, s: CandleState) =>
    setCandles((prev) => prev.map((v, j) => (j === i ? s : v)));

  // trilha de suspense: começa ao acender (precisa nascer dentro de um toque)
  const beginSuspense = () => {
    if (suspense.current) return;
    onStopMusic();
    suspense.current = startSuspense();
  };
  const endSuspense = () => { suspense.current?.stop(); suspense.current = null; };

  // 1. acender uma a uma
  const lightAll = () => {
    beginSuspense();
    setStage("lighting");
    candlesRef.current.forEach((_, i) => later(() => { setCandle(i, "lit"); sparkAt(i, 10); vibrate(15); }, 350 + i * 420));
    later(() => setStage("lit"), 350 + total * 420 + 500);
  };

  // 2. pedido com contagem
  const makeWish = () => {
    setStage("wish");
    setCount(0);
    suspense.current?.intensify();
    c.contagem.forEach((_, i) => later(() => setCount(i), i === 0 ? 0 : 1300 + (i - 1) * 850));
    later(() => setStage("blow"), 1300 + (c.contagem.length - 1) * 850);
  };

  // 3. apagar (toque ou sopro)
  const blowOut = (i: number) => {
    if (candlesRef.current[i] !== "lit") return;
    const next = candlesRef.current.map((v, j) => (j === i ? "out" : v)) as CandleState[];
    candlesRef.current = next;
    setCandles(next);
    vibrate(30);
    if (next.every((s) => s !== "lit")) finish();
  };

  // 4. escuro, fumaça, fogos, luzes de volta
  const finish = () => {
    micStop.current?.();
    endSuspense();
    setStage("dark");
    later(() => { setFireworks((n) => n + 1); onSing(); }, 900);
    later(() => {
      setStage("party");
      rain();
      const r = areaRef.current?.getBoundingClientRect();
      if (r) burst(r.left + r.width / 2, r.top + r.height / 2, 120);
    }, 5200);
  };

  const onCandle = (i: number, e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (stage === "unlit" && candles[i] === "off") {
      beginSuspense();
      setCandle(i, "lit");
      sparkAt(i, 10);
      if (candles.filter((s) => s === "off").length === 1) later(() => setStage("lit"), 500);
    } else if (stage === "blow") {
      sparkAt(i, 8);
      blowOut(i);
    }
  };

  // sopro de verdade: lê o volume do microfone, inclina as chamas e apaga
  const startMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } });
      const Ctor = window.AudioContext ?? window.webkitAudioContext!;
      const ac = new Ctor();
      const an = ac.createAnalyser();
      an.fftSize = 1024;
      ac.createMediaStreamSource(stream).connect(an);
      const data = new Uint8Array(an.fftSize);
      suspense.current?.duck(); // o microfone não pode confundir a música com sopro
      let raf = 0;
      let held = 0;
      let last = performance.now();
      setListening(true);

      const loop = (now: number) => {
        const dt = (now - last) / 1000;
        last = now;
        an.getByteTimeDomainData(data);
        let sum = 0;
        for (const v of data) sum += ((v - 128) / 128) ** 2;
        const rms = Math.sqrt(sum / data.length);
        const wind = Math.min(1, Math.max(0, (rms - 0.02) / 0.18));
        areaRef.current?.style.setProperty("--wind", wind.toFixed(3));
        held = rms > BLOW_THRESHOLD ? held + dt : Math.max(0, held - dt * 2);
        if (held > BLOW_HOLD) {
          held = 0;
          const lit = candlesRef.current.map((s, i) => (s === "lit" ? i : -1)).filter((i) => i >= 0);
          if (lit.length) blowOut(lit[Math.floor(Math.random() * lit.length)]);
        }
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      micStop.current = () => {
        cancelAnimationFrame(raf);
        stream.getTracks().forEach((tr) => tr.stop());
        void ac.close();
        areaRef.current?.style.setProperty("--wind", "0");
        setListening(false);
        micStop.current = null;
      };
    } catch {
      setMicError(true);
    }
  };

  const reset = () => {
    endSuspense();
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setCandles(Array(total).fill("off"));
    setMicError(false);
    setStage("unlit");
  };

  const outLeft = candles.filter((s) => s === "lit").length;
  let msg: ReactNode = null;
  if (stage === "unlit") msg = t(c.convite);
  else if (stage === "lighting") msg = t(c.acendendo);
  else if (stage === "lit") msg = t(c.pedido);
  else if (stage === "blow") msg = listening ? t(c.ouvindo) : outLeft < total ? (outLeft === 1 ? t(c.faltaUma) : t(c.faltamVarias, { n: outLeft })) : t(c.sopra);
  else if (stage === "party") msg = <span className="wish">{t(c.pronto)}</span>;

  return (
    <Band tone="rose" title={c.titulo} stamp={c.selo} stampStyle="burst"
      className={`cake-band stage-${stage}${lightsOff ? " lights-off" : ""}${fullscreen ? " is-fullscreen" : ""}`}
      decor={<><div className="darkness" aria-hidden="true" /><Fireworks run={fireworks} /></>}>
      <div className="cake-stage">
        {stage === "wish"
          ? <p className={"countdown" + (c.contagem[count].length > 3 ? " long" : "")} key={count}>{t(c.contagem[count])}</p>
          : msg && <p className="cake-msg" key={stage}>{msg}</p>}

        <div className="cake-area" ref={areaRef} style={{ "--glow": total ? litCount / total : 0 }}>
          <div className="sunburst" aria-hidden="true" />
          <div className="candle-glow" aria-hidden="true" />
          <div className="candles">
            {candles.map((s, i) => (
              <button key={i} ref={(el) => { candleRefs.current[i] = el; }} className={"candle " + s}
                style={{ "--c": HEX[[0, 2, 1, 4, 3][i % 5]], "--i": i }} onClick={(e) => onCandle(i, e)}
                aria-label={s === "lit" ? t(c.ouToque) : t(c.botaoAcender)}>
                <span className="flame-wrap"><span className="flame" /></span>
                {s === "out" && <><span className="smoke" /><span className="smoke s2" /></>}
              </button>
            ))}
          </div>
          <div className="tier top">
            <svg className="drip" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 0 H100 V10 Q95 22 90 10 Q84 4 78 12 Q72 26 66 12 Q58 2 50 12 Q44 20 38 10 Q30 2 24 14 Q18 24 12 10 Q6 4 0 12 Z" fill="#fff" stroke="var(--ink)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
            </svg>
            <Dots items={dots.slice(0, 6)} />
          </div>
          <div className="tier bottom">
            <svg className="drip" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 0 H100 V10 Q94 24 88 10 Q80 2 72 12 Q66 22 60 10 Q52 2 44 14 Q38 24 32 10 Q24 2 16 12 Q10 22 4 10 L0 10 Z" fill="var(--pink)" stroke="var(--ink)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
            </svg>
            <Dots items={dots.slice(6)} />
          </div>
          <div className="plate" />
        </div>

        <div className="cake-controls">
          {stage === "unlit" && <button className="btn big-cta" onClick={lightAll}>{t(c.botaoAcender)}</button>}
          {stage === "lit" && <button className="btn big-cta" onClick={makeWish}>{t(c.botaoPedido)}</button>}
          {stage === "blow" && (
            <>
              {!listening && !micError && <button className="btn big-cta" onClick={startMic}>{t(c.botaoMicrofone)}</button>}
              <p className="tip">{micError ? t(c.semMicrofone) : t(c.ouToque)}</p>
            </>
          )}
          {stage === "party" && (
            <>
              <p className="note-small wish">{t(c.depois)}</p>
              <div className="cake-buttons">
                <button className="btn alt" onClick={onSing}>{t(c.botaoCantar)}</button>
                <button className="btn alt" onClick={reset}>{t(c.botaoDeNovo)}</button>
              </div>
            </>
          )}
        </div>
      </div>
    </Band>
  );
}
