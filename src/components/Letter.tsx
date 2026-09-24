import { useEffect, useRef, useState } from "react";
import { content } from "../config/content";
import { t } from "../lib/text";
import { Band } from "./Band";

// Carta de correio aéreo que se escreve letra por letra quando aparece na tela
export function Letter() {
  const c = content.carta;
  const text = t(c.texto);
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);
  const [go, setGo] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setGo(true); io.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!go || n >= text.length) return;
    const ch = text[n - 1];
    const id = setTimeout(() => setN(n + 1), ch === "\n" ? 300 : ".,!?".includes(ch) ? 180 : 36);
    return () => clearTimeout(id);
  }, [go, n, text]);

  const done = n >= text.length;
  return (
    <Band tone="pink" title={c.titulo}>
      <div className="airmail reveal" ref={ref} onClick={() => setN(text.length)}>
        <div className="letter">
          <span className="postage" aria-hidden="true"><span>♥</span></span>
          <span className="postmark" aria-hidden="true">
            <svg viewBox="0 0 100 100">
              <defs><path id="pm-circle" d="M50 50 m-36 0 a36 36 0 1 1 72 0 a36 36 0 1 1 -72 0" /></defs>
              <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2.5" />
              <circle cx="50" cy="50" r="26" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <text fontSize="11.5" fill="currentColor" letterSpacing="1.5"><textPath href="#pm-circle">{t(c.carimbo).toUpperCase()} ♥ {t(c.carimbo).toUpperCase()} ♥</textPath></text>
              <text x="50" y="55" textAnchor="middle" fontSize="13" fill="currentColor">♥ {new Date().getDate()}/{new Date().getMonth() + 1}</text>
            </svg>
          </span>
          <p className="hi">{t(c.saudacao)}</p>
          <div className="body">{text.slice(0, n)}{!done && <span className="caret" />}</div>
          <p className="sign" style={{ opacity: done ? 1 : 0 }}>{t(c.assinatura)}</p>
          {done && <span className="kiss" aria-hidden="true">💋</span>}
        </div>
      </div>
      <span className="tip">{t(c.dica)}</span>
    </Band>
  );
}
