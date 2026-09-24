import { useEffect, useRef } from "react";

const COLORS = ["#FF6B8B", "#FFD1E0", "#FFE27A", "#F7A8BA", "#E5C6F2", "#FFFFFF"];

interface Spark { x: number; y: number; vx: number; vy: number; life: number; max: number; color: string; size: number }
interface Rocket { x: number; y: number; vy: number; targetY: number; color: string }

// Fogos de artifício dentro da seção: metade explode em forma de coração
export function Fireworks({ run, duration = 5200 }: { run: number; duration?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!run) return;
    const c = ref.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = devicePixelRatio;
    const W = c.offsetWidth;
    const H = c.offsetHeight;
    c.width = W * dpr;
    c.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const rockets: Rocket[] = [];
    const sparks: Spark[] = [];
    const start = performance.now();
    let lastLaunch = 0;
    let raf = 0;

    const explode = (x: number, y: number, color: string) => {
      const heart = Math.random() < 0.55;
      const n = heart ? 70 : 56;
      const scale = 0.18 + Math.random() * 0.1;
      for (let i = 0; i < n; i++) {
        const t = (i / n) * Math.PI * 2;
        let vx: number;
        let vy: number;
        if (heart) {
          vx = 16 * Math.sin(t) ** 3 * scale;
          vy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * scale;
        } else {
          const sp = 2 + Math.random() * 2.5;
          vx = Math.cos(t) * sp;
          vy = Math.sin(t) * sp;
        }
        const max = 70 + Math.random() * 30;
        sparks.push({ x, y, vx, vy, life: max, max, color: Math.random() < 0.8 ? color : "#fff", size: 1.6 + Math.random() * 1.6 });
      }
    };

    const tick = (now: number) => {
      const elapsed = now - start;
      if (elapsed < duration && now - lastLaunch > (reduce ? 1200 : 420)) {
        lastLaunch = now;
        rockets.push({ x: W * (0.15 + Math.random() * 0.7), y: H, vy: -(7 + Math.random() * 3), targetY: H * (0.12 + Math.random() * 0.3), color: COLORS[Math.floor(Math.random() * COLORS.length)] });
      }

      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,.28)";
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.y += r.vy;
        r.vy *= 0.985;
        ctx.fillStyle = r.color;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
        if (r.y <= r.targetY || r.vy > -1.5) { explode(r.x, r.y, r.color); rockets.splice(i, 1); }
      }
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.vx *= 0.975;
        s.vy = s.vy * 0.975 + 0.035;
        s.x += s.vx;
        s.y += s.vy;
        s.life--;
        const a = Math.max(0, s.life / s.max);
        ctx.globalAlpha = a;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * (0.6 + a * 0.6), 0, Math.PI * 2);
        ctx.fill();
        if (s.life <= 0) sparks.splice(i, 1);
      }
      ctx.globalAlpha = 1;

      if (elapsed < duration + 2500 || sparks.length) raf = requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, W, H);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, duration]);

  return <canvas ref={ref} className="fireworks" aria-hidden="true" />;
}
