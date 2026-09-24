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
  principal: "fotos/1.png",

  // na mesma ordem de content.momentos.itens
  momentos: [
    "fotos/2.png",
    "fotos/3.jpg",
    "fotos/5.jpg",
  ],

  galeria: [
    { src: "fotos/6a.jpg", legenda: "que sorriso" },
    { src: "fotos/4.jpg", legenda: "a gente" },
    { src: "fotos/6b.jpg", legenda: "meu xodó" },
    { src: "fotos/7.jpg", legenda: "domingo bom" },
    { src: "fotos/8.jpg", legenda: "linda demais" },
  ],

  // vídeos em pé (do celular) ficam num carrossel estilo stories
  videos: [
    { src: "videos/1.mp4", legenda: "você de papo com a minha mãe 😂" },
    { src: "videos/2.mp4", legenda: "dois pra lá, dois pra cá" },
    { src: "videos/3.mp4", legenda: "aquele forró do dia que eu te conheci" },
  ],

  // opcional: "musica/musica.mp3" toca no lugar do parabéns em caixinha de música
  musica: null,
};
