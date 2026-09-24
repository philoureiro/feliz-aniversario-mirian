/* =====================================================================
   TODA A COPY DO SITE FICA AQUI.

   Variáveis que podem ser usadas em qualquer texto:
     {para}   nome de quem faz aniversário (só o primeiro nome)
     {de}     seu nome
     {idade}  idade que a pessoa está fazendo

   Destaque com marca-texto amarelo: coloque o trecho entre *asteriscos*.
   ===================================================================== */

export const content = {
  pessoas: {
    para: "Nome",
    de: "Seu Nome",
    idade: 22,
    // quando vocês se conheceram (AAAA-MM-DDTHH:MM), usado no contador
    desde: "2026-06-10T20:00",
  },

  tituloDaAba: "Feliz aniversário, {para} ♥",

  abertura: {
    linhas: ["ei, {para}…", "tenho uma surpresa", "pra você"],
    envelope: "feliz aniversário ♥",
    toque: "toca no envelope",
    dicaSom: "(aumenta o som 🔊)",
  },

  // letras das bandeirinhas do topo
  bandeirinhas: "PARABÉNS",

  inicio: {
    linha1: "feliz aniversário,",
    selo: "{idade} aninhos ✨",
    legendaFotoPrincipal: "a aniversariante mais linda",
    recado: "Hoje o dia é todo seu. Aproveita cada pedacinho, sorri bastante e lembra que tem alguém aqui torcendo muito por você ♥",
  },

  bolo: {
    titulo: "hora do *bolo!*",
    velas: 3,
    pedido: "fecha os olhos e faz um pedido…",
    dica: "👇 toca em cada velinha pra apagar",
    faltaUma: "isso! falta 1…",
    faltamVarias: "isso! faltam {n}…",
    pronto: "pedido feito! ✨",
    depois: "tomara que eu esteja nele 🙈",
    botaoCantar: "♪ cantar parabéns",
  },

  contador: {
    titulo: "a gente se conheceu faz",
    unidades: { dias: "dias", horas: "horas", minutos: "minutos", segundos: "segundos" },
    rodape: "pouquinho tempo… e você já virou a melhor parte dos meus dias.",
  },

  // a foto/vídeo de cada momento fica em media.js, na mesma ordem
  momentos: {
    titulo: "*nossos primeiros capítulos*",
    rodape: "e isso é só o começo…",
    itens: [
      { data: "o primeiro oi", titulo: "quando a gente se conheceu", texto: "Conta aqui como foi. O lugar, a primeira conversa, o que você pensou na hora.", legenda: "o começo ♥" },
      { data: "o primeiro encontro", titulo: "nosso primeiro rolê", texto: "Aquele detalhe bobo que você não esquece. O nervosismo, a risada, o tchau que demorou.", legenda: "nós dois" },
    ],
  },

  galeria: { titulo: "*um pouquinho de nós*" },

  videos: {
    titulo: "*nossos vídeos*",
    dica: "toca pra ver com som 🔊",
    arraste: "← arrasta pro lado →",
  },

  carta: {
    titulo: "uma cartinha pra você",
    saudacao: "{para},",
    texto: `Faz pouquinho tempo que você chegou, mas já mudou muita coisa por aqui.

Eu fico procurando motivo pra te mandar mensagem, pra te ver, pra ouvir sua risada de novo.

Hoje é o seu dia, e eu queria que você soubesse o quanto eu tô feliz de estar do seu lado nele.

Que esse novo ano seja lindo como você. E que eu esteja por perto pra ver tudo de pertinho.`,
    assinatura: "um beijo, {de}",
    dica: "(toca na carta pra ler tudo de uma vez)",
  },

  motivos: {
    titulo: "coisas que eu já *adoro em você*",
    dica: "abre um bilhetinho de cada vez ♥",
    frente: "nº {n}",
    abrir: "abre aqui ♥",
    itens: [
      "sua risada, que é contagiante",
      "o jeito que você fala das coisas que ama",
      "como o tempo passa rápido do seu lado",
      "seu jeitinho carinhoso",
      "seu olhar",
      "você ser exatamente quem você é",
    ],
  },

  pergunta: {
    titulo: "uma última pergunta…",
    texto: "posso comemorar o seu próximo aniversário com você também?",
    sim: "sim!",
    // o botão "não" foge e troca de texto a cada tentativa
    nao: ["não", "tem certeza?", "pensa bem…", "não vale!", "tenta de novo", "nem pensar 😝"],
    resposta: "combinado! ♥",
    respostaSub: "já tô contando os dias.",
  },

  final: {
    titulo: "ah, e mais uma coisa…",
    dica: "toca no presente ✨",
    // uma linha aparece por vez; linhas com "presente" ganham destaque dourado
    linhas: [
      "eu queria muito estar aí com você hoje…",
      "te dar um abraço apertado e cantar parabéns bem desafinado no seu ouvido.",
      "mas não deu.",
      "então eu fiz isso aqui, pra ficar um pouquinho mais pertinho de você.",
      "aproveita o presente que eu te mandei 🎁",
      "e guarda um abraço pra mim. vou buscar ele logo.",
    ],
    assinatura: "te adoro, {de} ♥",
  },

  rodape: {
    linha: "com todo carinho do mundo,",
    assinatura: "{de}",
    pequeno: "feliz aniversário, {para} ♥",
  },

  musica: { tocar: "parabéns", parar: "parar" },

  fotoVazia: "foto aqui",
  videoVazio: "vídeo aqui",
  fechar: "fechar ✕",
};
