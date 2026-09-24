export type Burst = (x: number, y: number, n?: number) => void;
export type Rain = () => void;

export interface MediaEntry {
  src: string;
  legenda: string;
}

export interface LightboxItem {
  src: string;
  caption: string;
}

export type OpenMedia = (item: LightboxItem) => void;

export interface EffectsProps {
  burst: Burst;
  rain: Rain;
}
