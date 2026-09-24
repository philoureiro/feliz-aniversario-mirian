# feliz-aniversario

Página de aniversário romântica, com cara de scrapbook feito à mão e pensada para celular. Tem envelope de abertura, bandeirinhas, bolo com velas para apagar, parabéns em caixinha de música, contador, fotos, vídeos estilo stories, carta que se escreve sozinha, bilhetinhos, pergunta com botão que foge e um presente mágico no final.

Feita em React + TypeScript + Vite, pronta para GitHub Pages.

## Personalizar

Tudo que muda de um aniversário para outro fica em dois arquivos:

| Arquivo | O que tem |
|---|---|
| `src/config/content.ts` | Toda a copy: nomes, idade, data, títulos, carta, motivos, pergunta, mensagem final |
| `src/config/media.ts` | Índice de fotos, vídeos e música |

Os arquivos de mídia vão em `public/fotos` e `public/videos`.

- Nos textos, `{para}`, `{de}` e `{idade}` são trocados automaticamente.
- `*assim*` vira destaque com marca-texto.
- Qualquer item de mídia aceita foto ou vídeo (`.mp4` / `.webm`). Vídeo `.mov` do iPhone não toca em todo navegador, então converta para `.mp4` antes.
- Lista vazia esconde a seção.

## Rodar

```bash
yarn install
yarn dev
```

## Publicar

1. No GitHub: **Settings → Pages → Source: GitHub Actions**.
2. Dê push na `main`. O workflow em `.github/workflows/deploy.yml` faz o build e publica.

O site fica em `https://<usuario>.github.io/<repositorio>/`.
