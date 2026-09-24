/* =====================================================================
   TODA A COPY DO SITE FICA AQUI.

   Variáveis que podem ser usadas em qualquer texto:
     {para}     nome de quem faz aniversário (só o primeiro nome)
     {apelido}  apelido carinhoso (se vazio, usa o nome)
     {de}       seu nome
     {idade}  idade que a pessoa está fazendo

   Destaque com marca-texto amarelo: coloque o trecho entre *asteriscos*.
   ===================================================================== */

export const content = {
  pessoas: {
    para: "Mirian",
    apelido: "Mih",
    de: "Philipe",
    idade: 28,
    // quando vocês se conheceram (AAAA-MM-DDTHH:MM), usado no contador
    desde: "2026-07-04T00:00",
  },

  tituloDaAba: "Feliz aniversário, {apelido} ♥",

  abertura: {
    linhas: ["ei, {apelido}…", "tenho uma surpresa", "pra você"],
    envelope: "feliz aniversário, meu amor ♥",
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
    selo: "é hoje!",
    velas: 3,
    // 1. acender
    convite: "vamos acender as velinhas?",
    botaoAcender: "🔥 acender as velinhas",
    acendendo: "acendendo…",
    // 2. pedido (as luzes apagam)
    pedido: "shhh… as luzes apagaram. faz um pedido…",
    botaoPedido: "✨ fiz meu pedido",
    contagem: ["fecha os olhos…", "3", "2", "1"],
    // 3. soprar
    sopra: "agora sopra! 🌬️",
    botaoMicrofone: "🎤 soprar de verdade",
    ouvindo: "sopra forte no celular! 🌬️",
    semMicrofone: "sem microfone? toca nas velinhas 😉",
    ouToque: "ou toca em cada velinha",
    faltaUma: "falta 1…",
    faltamVarias: "faltam {n}…",
    // 4. festa
    pronto: "pedido feito! ✨",
    depois: "tomara que eu esteja nele 🙈",
    botaoCantar: "♪ cantar parabéns",
    botaoDeNovo: "🕯️ acender de novo",
  },

  contador: {
    titulo: "a gente se conheceu faz",
    selo: "ao vivo",
    unidades: { dias: "dias", horas: "horas", minutos: "minutos", segundos: "segundos" },
    rodape: "pouquinho tempo… e você já virou a melhor parte dos meus dias.",
  },

  // a foto/vídeo de cada momento fica em media.js, na mesma ordem
  momentos: {
    titulo: "*nossos primeiros capítulos*",
    selo: "capítulo 1",
    rodape: "e isso ainda é só o primeiro xote…",
    itens: [
      { data: "4 de julho de 2026", titulo: "um festival de forró", texto: "No meio da poeira, da sanfona e de tanta gente, eu só conseguia reparar em você.", legenda: "o começo de tudo" },
      { data: "a mesma noite", titulo: "posso te chamar pra dançar?", texto: "Juntei coragem e estendi a mão. Dois pra lá, dois pra cá, e eu já não queria que a música acabasse.", legenda: "dois pra lá, dois pra cá" },
      { data: "ainda naquela noite", titulo: "o primeiro beijo", texto: "Na barraca, com o forró tocando lá fora. Foi ali que eu soube que não ia te esquecer tão cedo.", legenda: "nosso primeiro beijo ♥" },
    ],
  },

  galeria: { titulo: "*um pouquinho de nós*" },

  videos: {
    titulo: "*nossos vídeos*",
    selo: "● rec",
    dica: "toca pra ver com som 🔊",
    arraste: "← arrasta pro lado →",
  },

  carta: {
    titulo: "uma cartinha pra você",
    carimbo: "correio do amor",
    saudacao: "{apelido},",
    texto: `Faz pouco tempo que um forró colocou você no meu caminho, e parece que eu te conheço há muito mais.

Eu ainda lembro da coragem que precisei pra te chamar pra dançar. Ainda bem que eu chamei.

Hoje é o seu dia, e eu queria estar aí pra te dar um abraço apertado e te roubar pra mais uma dança.

Que os seus {idade} sejam leves, cheios de risada, música boa e gente que te faz bem. E que eu esteja por perto pra ver tudo de pertinho.`,
    assinatura: "um beijo, {de}",
    dica: "(toca na carta pra ler tudo de uma vez)",
  },

  motivos: {
    titulo: "coisas que eu já *adoro em você*",
    selo: "abre!",
    dica: "abre um bilhetinho de cada vez ♥",
    frente: "nº {n}",
    abrir: "abre aqui ♥",
    itens: [
      "esse seu olhar, que me desmonta",
      "seu cabelo ondulado",
      "seu sorriso simpático, que ilumina qualquer lugar",
      "essa cinturinha de boneca",
      "dormir de conchinha com você",
      "o jeito que você dança forró",
      "sua risada, que é contagiante",
      "como a conversa com você flui fácil",
      "seu cheiro, que fica na minha memória",
      "o jeito que você me olha quando acha que eu não tô vendo",
    ],
  },

  pergunta: {
    titulo: "uma última pergunta…",
    faixa: "⚠️ PERGUNTA IMPORTANTE",
    selo: "urgente!",
    texto: "posso comemorar o seu próximo aniversário com você também?",
    sim: "sim!",
    // o botão "não" foge quando o dedo chega perto; a cada fuga troca de texto
    // o primeiro par aparece sempre primeiro; os outros vêm embaralhados, sem fim
    teimoso: [
      { botao: "não", frase: "duvido você conseguir me dizer não 😏" },
      { botao: "tem certeza?", frase: "quase… 🤭" },
      { botao: "pensa bem…", frase: "tá difícil, né?" },
      { botao: "não vale!", frase: "ele é rápido 😂" },
      { botao: "tenta de novo", frase: "você não desiste mesmo…" },
      { botao: "nem pensar 😝", frase: "tá ficando cansado, olha 👀" },
      { botao: "errou!", frase: "foi por pouco" },
      { botao: "aqui não", frase: "tenta pelo outro lado" },
      { botao: "pega eu!", frase: "pega-pega 🏃" },
      { botao: "hihi", frase: "cócegas não!" },
      { botao: "xiii", frase: "esse botão é escorregadio" },
      { botao: "opa!", frase: "ele tem vontade própria" },
      { botao: "socorro!", frase: "o botão tá com medo de você" },
      { botao: "não mesmo?", frase: "reconsidera aí 🥺" },
      { botao: "cadê?", frase: "tá procurando alguém?" },
      { botao: "tô aqui!", frase: "não, aqui!" },
      { botao: "quase!", frase: "mais rápido!" },
      { botao: "zzz", frase: "ele fingiu que dormiu" },
      { botao: "fui!", frase: "tchauzinho 👋" },
      { botao: "volta aqui", frase: "não, ele não volta" },
      { botao: "impossível", frase: "é sério, é impossível" },
      { botao: "esquece", frase: "esse botão é só enfeite" },
      { botao: "nananinanão", frase: "o não não quer ser clicado" },
      { botao: "que isso!", frase: "olha o respeito 😤" },
      { botao: "ai!", frase: "doeu, sabia?" },
      { botao: "psiu", frase: "o sim tá te esperando" },
      { botao: "sai daqui", frase: "ele é tímido" },
      { botao: "vish", frase: "tá perdendo tempo 😂" },
      { botao: "nope", frase: "nem em inglês funciona" },
      { botao: "no", frase: "nem em espanhol" },
      { botao: "talvez?", frase: "ele tá começando a ceder… ou não" },
      { botao: "hmm…", frase: "ele tá pensando" },
      { botao: "bora de sim?", frase: "a resposta certa tá bem ali" },
      { botao: "não sei", frase: "o botão ficou confuso" },
      { botao: "caiu!", frase: "quase pegou dessa vez" },
      { botao: "devagar!", frase: "precisa treinar mais 😜" },
      { botao: "ninja 🥷", frase: "modo ninja ativado" },
      { botao: "zoom!", frase: "velocidade da luz" },
      { botao: "aff", frase: "o botão ficou bravo" },
      { botao: "negado", frase: "sistema do não fora do ar" },
      { botao: "erro 404", frase: "não encontrado" },
      { botao: "carregando…", frase: "ele travou de propósito" },
      { botao: "tchau!", frase: "mais uma fuga pra conta" },
      { botao: "ops", frase: "escorregou" },
      { botao: "ahá!", frase: "pegadinha" },
      { botao: "tá quente…", frase: "tá frio… tá gelado 🥶" },
      { botao: "me deixa", frase: "o botão pediu privacidade" },
      { botao: "seu dedo 👉", frase: "ele tá de olho no seu dedo" },
      { botao: "última chance", frase: "(não era a última)" },
      { botao: "clica no sim", frase: "até o não tá mandando clicar no sim" },
    ],
    resposta: "combinado! ♥",
    respostaSub: "e dessa vez eu tô aí pessoalmente.",
    liberado: "presente liberado! desce aí 👇",
  },

  final: {
    titulo: "ah, e mais uma coisa…",
    dica: "toca no presente ✨",
    // enquanto a pergunta não for respondida, o presente fica trancado
    bloqueado: "🔒 responde a pergunta aí em cima pra abrir o presente",
    // uma linha aparece por vez; linhas com "presente" ganham destaque dourado
    linhas: [
      "eu queria muito estar aí com você hoje…",
      "te dar um abraço apertado e te chamar pra dançar de novo.",
      "mas não deu.",
      "então eu fiz isso aqui, pra ficar um pouquinho mais pertinho de você.",
      "aproveita o presente que eu te mandei 🎁",
      "só uma dica: é de comer. e não precisa dividir 😋",
      "e guarda um abraço pra mim. vou buscar ele logo.",
    ],
    assinatura: "te adoro, {de} ♥",
  },

  rodape: {
    linha: "com todo carinho do mundo,",
    assinatura: "{de}",
    pequeno: "feliz aniversário, {apelido} ♥",
  },

  musica: { tocar: "parabéns", parar: "parar" },

  fotoVazia: "foto aqui",
  videoVazio: "vídeo aqui",
  fechar: "fechar ✕",
};
