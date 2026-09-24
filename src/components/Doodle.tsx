// Rabiscos que se desenham sozinhos (stroke animado via pathLength)
export const HEART = "M50 86 C 30 70, 8 52, 10 32 C 12 14, 36 8, 48 28 C 52 12, 78 6, 88 24 C 98 44, 74 66, 50 86";
export const SWIRL = "M5 40 C 30 10, 55 60, 80 30 S 130 10, 150 40";
export const STAR = "M20 5 L24 16 L35 18 L26 25 L29 36 L20 29 L11 36 L14 25 L5 18 L16 16 Z";

import type { CSSProperties } from "react";

interface DoodleProps {
  d: string;
  w?: number;
  h?: number;
  color?: string;
  sw?: number;
  style?: CSSProperties;
  className?: string;
  vb?: string;
}

export function Doodle({ d, w = 100, h = 100, color = "var(--red)", sw = 3, style, className = "", vb = "0 0 100 100" }: DoodleProps) {
  return (
    <svg className={"doodle " + className} width={w} height={h} viewBox={vb} style={style} aria-hidden="true">
      <path d={d} pathLength="1" stroke={color} strokeWidth={sw} />
    </svg>
  );
}
