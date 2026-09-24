/* =====================================================================
   ÍNDICE DE FOTOS E VÍDEOS

   Coloque os arquivos em public/fotos e public/videos e liste aqui.
   Qualquer item aceita foto (.jpg .png .webp) ou vídeo (.mp4 .webm).
   Vídeo em moldura toca mudo em loop; ao tocar, abre com som.
   Lista vazia = a seção some da página.
   ===================================================================== */

import type { MediaEntry } from "../lib/types";

export interface MediaConfig {
  principal: string | null;
  momentos: string[];
  galeria: MediaEntry[];
  videos: MediaEntry[];
  musica: string | null;
}

export const media: MediaConfig = {
  principal: "fotos/principal.jpg",

  // na mesma ordem de content.momentos.itens
  momentos: [
    "fotos/1.jpg",
    "fotos/2.jpg",
  ],

  galeria: [
    { src: "fotos/g1.jpg", legenda: "que sorriso" },
    { src: "fotos/g2.jpg", legenda: "a gente" },
    { src: "fotos/g3.jpg", legenda: "meu dia favorito" },
    { src: "fotos/g4.jpg", legenda: "linda demais" },
  ],

  // vídeos em pé (do celular) ficam num carrossel estilo stories
  videos: [
    { src: "videos/1.mp4", legenda: "a gente rindo à toa" },
    { src: "videos/2.mp4", legenda: "você sendo você" },
    { src: "videos/3.mp4", legenda: "aquele dia" },
  ],

  // opcional: "musica/musica.mp3" toca no lugar do parabéns em caixinha de música
  musica: null,
};
