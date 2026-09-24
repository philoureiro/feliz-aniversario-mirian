import { useState, useRef, type MouseEvent, type PointerEvent, type TouchEvent } from "react";
import { content } from "../config/content";
import { t, Rich, vibrate } from "../lib/text";
import type { EffectsProps } from "../lib/types";
import { Caution } from "./Band";

const DODGE_RADIUS = 90; // px: dedo mais perto que isso faz o "não" fugir
const DODGE_COOLDOWN = 450; // ms entre uma fuga e outra
const PAD = 8; // margem interna da caixa

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Pergunta final: o "não" foge do dedo e troca de texto a cada fuga; o "sim" cresce
export function Ask({ burst, rain, onYes }: EffectsProps & { onYes: () => void }) {
  const c = content.pergunta;
  const box = useRef<HTMLDivElement>(null);
  const noBtn = useRef<HTMLButtonElement>(null);
  const lastDodge = useRef(0);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);
  const [tries, setTries] = useState(0);
  const [yes, setYes] = useState(false);
  // ordem embaralhada dos pares (menos o primeiro, que abre sempre)
  const [order] = useState(() => shuffle(c.teimoso.slice(1).map((_, i) => i + 1)));

  // foge pro ponto da caixa mais distante do dedo/mouse; depois de cada fuga
  // espera um pouco antes de poder fugir de novo (evita trocar de texto em rajada)
  const dodge = (px: number, py: number) => {
    const now = performance.now();
    if (now - lastDodge.current < DODGE_COOLDOWN) return;
    const b = box.current?.getBoundingClientRect();
    const n = noBtn.current;
    if (!b || !n) return;
    lastDodge.current = now;

    const w = n.offsetWidth;
    const h = n.offsetHeight;
    const maxL = Math.max(PAD, b.width - w - PAD);
    const maxT = Math.max(PAD, b.height - h - PAD);
    // cantos + pontos aleatórios; ganha o mais longe do dedo
    const candidates = [
      { left: PAD, top: PAD }, { left: maxL, top: PAD }, { left: PAD, top: maxT }, { left: maxL, top: maxT },
      ...Array.from({ length: 16 }, () => ({ left: PAD + Math.random() * (maxL - PAD), top: PAD + Math.random() * (maxT - PAD) })),
    ];
    const dist = (p: { left: number; top: number }) => Math.hypot(b.left + p.left + w / 2 - px, b.top + p.top + h / 2 - py);
    // entre os 4 mais distantes, sorteia um, pra não ficar previsível
    const far = candidates.sort((a, z) => dist(z) - dist(a)).slice(0, 4);
    setPos(far[Math.floor(Math.random() * far.length)]);
    setTries((t) => t + 1);
    vibrate(15);
  };

  const nearNo = (x: number, y: number) => {
    const r = noBtn.current?.getBoundingClientRect();
    if (!r) return false;
    return Math.hypot(x - (r.left + r.width / 2), y - (r.top + r.height / 2)) < DODGE_RADIUS;
  };

  const onBoxPointer = (e: PointerEvent) => {
    if (nearNo(e.clientX, e.clientY)) dodge(e.clientX, e.clientY);
  };
  const onBoxTouchMove = (e: TouchEvent) => {
    const touch = e.touches[0];
    if (touch && nearNo(touch.clientX, touch.clientY)) dodge(touch.clientX, touch.clientY);
  };
  // se mesmo assim ela acertar o "não", ele foge do mesmo jeito
  const onNoClick = (e: MouseEvent) => {
    e.preventDefault();
    dodge(e.clientX, e.clientY);
  };

  const sayYes = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setYes(true);
    const r = e.currentTarget.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top, 150);
    rain();
    vibrate([40, 60, 40]);
    onYes();
    setTimeout(() => document.querySelector(".finale")?.scrollIntoView({ behavior: "smooth", block: "start" }), 2600);
  };

  const current = c.teimoso[tries === 0 ? 0 : order[(tries - 1) % order.length]];
  const noScale = Math.max(0.7, 1 - tries * 0.03);

  return (
    <section className="band band--red ask-section">
      <Caution text={t(c.faixa)} className="top" />
      <h2><Rich text={c.titulo} /></h2>
      <div className="ask reveal" ref={box} onPointerDown={yes ? undefined : onBoxPointer} onPointerMove={yes ? undefined : onBoxPointer} onTouchMove={yes ? undefined : onBoxTouchMove}>
        {yes ? (
          <>
            <p className="answer">{t(c.resposta)}</p>
            <p className="note-small" style={{ marginTop: 16 }}>{t(c.respostaSub)}</p>
            <p className="unlocked">{t(c.liberado)}</p>
          </>
        ) : (
          <>
            <span className="stamp">{t(c.selo)}</span>
            <p className="q">{t(c.texto)}</p>
            <p className="tease" key={tries}>{t(current.frase)}</p>
            <div className="yes-row">
              <button className="btn yes" onClick={sayYes} style={{ transform: `scale(${Math.min(1 + tries * 0.04, 1.4)})` }}>{t(c.sim)}</button>
              <button ref={noBtn} className={"btn no" + (pos ? " moved" : "")} onClick={onNoClick}
                style={{ ...(pos ? { position: "absolute", left: pos.left, top: pos.top } : {}), "--s": noScale }}>
                {t(current.botao)}
              </button>
            </div>
          </>
        )}
      </div>
      <Caution text={t(c.faixa)} className="bottom" />
    </section>
  );
}
