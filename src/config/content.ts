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
    legendaFotoPrincipal: "a aniversariante mais gata",
    recado: "Hoje o dia é todo seu. Mas já vou avisando: tô só esperando a hora de te encher de beijo 😏♥",
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
    depois: "se o pedido fui eu, pode considerar realizado 😏",
    botaoCantar: "♪ cantar parabéns",
    botaoDeNovo: "🕯️ acender de novo",
  },

  contador: {
    titulo: "a gente se conheceu faz",
    selo: "ao vivo",
    unidades: { dias: "dias", horas: "horas", minutos: "minutos", segundos: "segundos" },
    rodape: "pouquinho tempo… e eu já não consigo tirar você da cabeça.",
  },

  // a foto/vídeo de cada momento fica em media.js, na mesma ordem
  momentos: {
    titulo: "*nossos primeiros capítulos*",
    selo: "capítulo 1",
    rodape: "e isso ainda é só o primeiro xote…",
    itens: [
      { data: "4 de julho de 2026", titulo: "um festival de forró", texto: "No meio da poeira, da sanfona e de tanta gente, eu só conseguia olhar pra você. E não era só pelo sorriso 😏", legenda: "o começo de tudo" },
      { data: "a mesma noite", titulo: "posso te chamar pra dançar?", texto: "Juntei coragem e estendi a mão. Com você coladinha em mim, o forró podia durar a noite inteira.", legenda: "dois pra lá, dois pra cá" },
      { data: "ainda naquela noite", titulo: "o primeiro beijo", texto: "Na barraca, com o forró tocando lá fora. Um beijo e eu já tava viciado.", legenda: "nosso primeiro beijo ♥" },
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
    // linha em destaque logo abaixo da saudação (vazio = sem destaque)
    destaque: "meu amor de forró ♥",
    texto: `Presta atenção que eu vou falar uma vez só (mentira, vou falar a vida inteira): você é a coisa mais linda que já passou na frente desse homem aqui.

Eu tava lá no festival, quietinho, na minha, quando você apareceu com esse cabelo ondulado e esse olhar de quem sabe exatamente o que tá fazendo. Pronto. Perdi o rumo, o ritmo e a vergonha na cara. Te chamei pra dançar porque bobo eu não sou.

E aquela nossa manhã de domingo na barraca? Olha… ali eu entendi que tinha ganhado na loteria sem nem ter jogado. E que sorte…

Hoje é o seu dia, e eu devia estar aí te pegando pela cintura e te enchendo de beijo na frente de todo mundo. Não deu. Mas relaxa: tô guardando beijo acumulado, com juros e correção monetária.

{idade} aninhos, hein? Tá cada vez mais perigosa. Sorte a minha.

Feliz aniversário, meu bombom. Aproveita o dia, que o resto eu resolvo pessoalmente 😏`,
    assinatura: "do seu malandro apaixonado, {de}",
    dica: "(toca na carta pra ler tudo de uma vez)",
  },

  motivos: {
    titulo: "coisas que eu já *adoro em você*",
    selo: "abre!",
    dica: "abre um bilhetinho de cada vez ♥",
    frente: "nº {n}",
    abrir: "abre aqui ♥",
    itens: [
      "esse seu olhar, que me desmonta inteiro",
      "esse cabelo ondulado que eu adoro bagunçar",
      "seu sorriso, que me ganha toda vez",
      "essa cinturinha de boneca na minha mão",
      "dormir de conchinha com você (e acordar também)",
      "o jeito que você dança forró coladinha em mim",
      "sua boca. só isso 😏",
      "seu cheiro, que fica em mim depois",
      "sua risada, que é contagiante",
      "o jeito que você me olha quando quer beijo",
    ],
  },

  pergunta: {
    titulo: "uma última pergunta…",
    faixa: "⚠️ PERGUNTA IMPORTANTE",
    selo: "urgente!",
    texto: "posso passar o seu próximo aniversário te enchendo de beijo?",
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
    resposta: "combinado! 😏♥",
    respostaSub: "e dessa vez eu tô aí pessoalmente. vai separando os beijos.",
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
      "te agarrar pela cintura e roubar uns beijos no meio do parabéns.",
      "mas não deu.",
      "então eu fiz isso aqui, pra ficar um pouquinho mais pertinho de você.",
      "aproveita o presente que eu te mandei 🎁",
      "só uma dica: é de comer. a sobremesa de verdade fica pra quando eu chegar 😏",
      "e vai guardando os beijos. vou buscar todos, com juros.",
    ],
    assinatura: "doido por você, {de} ♥",
  },

  rodape: {
    linha: "de quem não para de pensar em você,",
    assinatura: "{de}",
    pequeno: "feliz aniversário, meu amor ♥",
  },

  musica: { tocar: "parabéns", parar: "parar" },

  fotoVazia: "foto aqui",
  videoVazio: "vídeo aqui",
  fechar: "fechar ✕",
};
