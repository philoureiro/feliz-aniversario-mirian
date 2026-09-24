import { useCallback, useEffect, useRef } from "react";
import type { Burst, Rain } from "../lib/types";

const COLORS = ["#E2475F", "#F7A8BA", "#FFD34E", "#CDB9F5", "#BFE8D6"];

interface Particle {
  kind: "star" | "heart" | "paper";
  x: number;
  y: number;
  vx: number;
  vy: number;
  s: number;
  a: number;
  fade: number;
  color: string;
  rot: number;
  vr?: number;
  g?: number;
  grow?: boolean;
  sway?: number;
}

// Pó mágico em canvas: rastro de brilho no dedo, corações flutuando, confete
export function useMagic() {
  const ref = useRef<HTMLCanvasElement>(null);
  const parts = useRef<Particle[]>([]);

  useEffect(() => {
    const c = ref.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    let raf = 0;
    let frame = 0;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      c.width = innerWidth * devicePixelRatio;
      c.height = innerHeight * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };
    resize();
    addEventListener("resize", resize);

    const sparkle = (x: number, y: number) => {
      if (reduce || parts.current.length > 260) return;
      parts.current.push({
        kind: "star", x: x + (Math.random() - 0.5) * 12, y: y + (Math.random() - 0.5) * 12,
        vx: (Math.random() - 0.5) * 1.2, vy: Math.random() * 1.2, s: 3 + Math.random() * 5, a: 1, fade: 0.025,
        color: ["#FFD34E", "#F7A8BA", "#CDB9F5", "#fff"][Math.floor(Math.random() * 4)], rot: Math.random() * 3,
      });
    };
    const pmove = (e: PointerEvent) => { sparkle(e.clientX, e.clientY); sparkle(e.clientX, e.clientY); };
    const tmove = (e: TouchEvent) => {
      for (const t of Array.from(e.touches)) { sparkle(t.clientX, t.clientY); sparkle(t.clientX, t.clientY); }
    };
    const tap = (e: PointerEvent) => { for (let i = 0; i < 8; i++) sparkle(e.clientX, e.clientY); };
    addEventListener("pointermove", pmove);
    addEventListener("touchmove", tmove, { passive: true });
    addEventListener("pointerdown", tap);

    const star = (p: Particle) => {
      ctx.save(); ctx.globalAlpha = p.a; ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.color;
      ctx.beginPath();
      for (let i = 0; i < 4; i++) { ctx.lineTo(0, -p.s); ctx.rotate(Math.PI / 4); ctx.lineTo(0, -p.s * 0.3); ctx.rotate(Math.PI / 4); }
      ctx.fill(); ctx.restore();
    };
    const heart = (p: Particle) => {
      ctx.save(); ctx.globalAlpha = p.a; ctx.translate(p.x, p.y); ctx.rotate(p.rot * 0.2); ctx.scale(p.s / 30, p.s / 30); ctx.fillStyle = p.color;
      ctx.beginPath(); ctx.moveTo(0, 8);
      ctx.bezierCurveTo(0, 0, -15, -2, -15, -10); ctx.bezierCurveTo(-15, -20, -3, -22, 0, -13);
      ctx.bezierCurveTo(3, -22, 15, -20, 15, -10); ctx.bezierCurveTo(15, -2, 0, 0, 0, 8);
      ctx.fill(); ctx.restore();
    };
    const paper = (p: Particle) => {
      ctx.save(); ctx.globalAlpha = p.a; ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.color;
      ctx.fillRect(-p.s / 2, -p.s / 4, p.s, (p.s / 2) * Math.abs(Math.cos(p.rot * 2)) + 1); ctx.restore();
    };

    const tick = () => {
      frame++;
      if (!reduce && frame % 45 === 0)
        parts.current.push({ kind: "heart", x: Math.random() * innerWidth, y: innerHeight + 20, vx: 0, vy: -(0.5 + Math.random() * 0.7), s: 10 + Math.random() * 14, a: 0.35, fade: 0, color: Math.random() < 0.6 ? "#F7A8BA" : "#E2475F", rot: 0, sway: Math.random() * 9 });
      if (!reduce && frame % 22 === 0)
        parts.current.push({ kind: "star", x: Math.random() * innerWidth, y: Math.random() * innerHeight, vx: 0, vy: 0, s: 2 + Math.random() * 3, a: 0, grow: true, fade: 0.012, color: "#FFD34E", rot: 0 });

      ctx.clearRect(0, 0, innerWidth, innerHeight);
      parts.current = parts.current.filter((p) => (p.a > 0.01 || p.grow) && p.y < innerHeight + 60);
      for (const p of parts.current) {
        if (p.grow) { p.a += 0.03; if (p.a >= 0.9) p.grow = false; } else p.a -= p.fade;
        if (p.g) { p.vy += p.g; p.vx *= 0.99; }
        if (p.sway !== undefined) p.x += Math.sin((frame + p.sway * 40) / 50) * 0.5;
        p.x += p.vx; p.y += p.vy; p.rot += p.kind === "paper" ? (p.vr ?? 0) : 0.05;
        if (p.y < -40) p.a = 0;
        if (p.kind === "heart") heart(p); else if (p.kind === "paper") paper(p); else star(p);
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("pointermove", pmove);
      removeEventListener("touchmove", tmove);
      removeEventListener("pointerdown", tap);
    };
  }, []);

  const burst: Burst = useCallback((x, y, n = 60) => {
    const kinds = ["heart", "paper", "star"] as const;
    for (let i = 0; i < n; i++) {
      const ang = Math.random() * Math.PI * 2;
      const sp = 2 + Math.random() * 8;
      parts.current.push({
        kind: kinds[i % 3], x, y, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp - 3, g: 0.13,
        s: 8 + Math.random() * 12, a: 1, fade: 0.009, color: COLORS[i % 5], rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3,
      });
    }
  }, []);

  const rain: Rain = useCallback(() => {
    for (let i = 0; i < 150; i++)
      parts.current.push({
        kind: i % 4 === 0 ? "heart" : "paper", x: Math.random() * innerWidth, y: -Math.random() * innerHeight * 0.6,
        vx: (Math.random() - 0.5) * 1.5, vy: 1 + Math.random() * 3, g: 0.03, s: 8 + Math.random() * 10, a: 1, fade: 0.0025,
        color: COLORS[i % 5], rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.25,
      });
  }, []);

  return { ref, burst, rain };
}
