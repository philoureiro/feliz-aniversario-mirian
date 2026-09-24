import { content } from "../config/content";

type Vars = Record<string, string | number>;

const primeiroNome = content.pessoas.para.split(" ")[0];

// troca {para}, {de}, {idade} e variáveis extras como {n}
export function t(str: string | null | undefined, vars: Vars = {}): string {
  const all: Vars = { para: primeiroNome, de: content.pessoas.de, idade: content.pessoas.idade, ...vars };
  return String(str ?? "").replace(/\{(\w+)\}/g, (m, k: string) => (k in all ? String(all[k]) : m));
}

// renderiza *trecho* com marca-texto
export function Rich({ text, vars }: { text: string; vars?: Vars }) {
  const parts = t(text, vars).split(/\*([^*]+)\*/g);
  return <>{parts.map((p, i) => (i % 2 ? <span key={i} className="mark">{p}</span> : p))}</>;
}

export const isVideo = (s?: string | null): boolean => /\.(mp4|mov|webm|m4v)$/i.test(s || "");

// caminhos relativos ao site (funciona em subpasta do GitHub Pages)
export const asset = (s: string): string =>
  /^(https?:|data:|blob:)/.test(s) ? s : import.meta.env.BASE_URL + s.replace(/^\//, "");

// paleta romântica: rosa, rosé, pêssego-rosado, lavanda, champanhe
export const CUTE = ["#F7A8BA", "#FFC4CF", "#FFCDB8", "#E5C6F2", "#F8E0B5"];
export const HEX = ["#F7A8BA", "#E88AA5", "#FFCDB8", "#E5C6F2", "#F8E0B5"];

export const vibrate = (pattern: number | number[]): void => {
  navigator.vibrate?.(pattern);
};

export const center = (el: Element): [number, number] => {
  const r = el.getBoundingClientRect();
  return [r.left + r.width / 2, r.top + r.height / 2];
};
