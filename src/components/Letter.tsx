import { useEffect, useRef, useState } from "react";
import { content } from "../config/content";
import { t, Rich } from "../lib/text";

// Carta que se escreve letra por letra quando aparece na tela
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
    <section>
      <h2><Rich text={c.titulo} /></h2>
      <div className="letter reveal" ref={ref} onClick={() => setN(text.length)}>
        <p className="hi">{t(c.saudacao)}</p>
        <div className="body">{text.slice(0, n)}{!done && <span className="caret" />}</div>
        <p className="sign" style={{ opacity: done ? 1 : 0 }}>{t(c.assinatura)}</p>
      </div>
      <span className="tip">{t(c.dica)}</span>
    </section>
  );
}
