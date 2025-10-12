/**
 * Mensagens de inspiração de diversas fontes
 * Incluem sabedoria budista, poesia, música, filosofia, literatura, samurais e arte
 */

export interface InspirationMessage {
  text: string;
  type: 'budista' | 'poesia' | 'música' | 'filosofia' | 'literatura' | 'samurai' | 'arte';
  icon: string;
  reference?: string;
}

export const INSPIRATION_MESSAGES: readonly InspirationMessage[] = [
  // Budismo
  {
    text: 'O caminho se revela a cada passo',
    type: 'budista',
    icon: '🧘',
    reference: 'Sabedoria Zen'
  },
  {
    text: 'A prática diária cultiva a paz interior',
    type: 'budista',
    icon: '🧘',
    reference: 'Ensinamento Budista'
  },
  {
    text: 'O presente é o único momento de poder',
    type: 'budista',
    icon: '🧘',
    reference: 'Mindfulness'
  },
  {
    text: 'Cada respiração é uma nova oportunidade',
    type: 'budista',
    icon: '🧘',
    reference: 'Meditação Vipassana'
  },

  // Samurai
  {
    text: 'A espada tem que ser mais do que uma simples arma; tem que ser uma resposta à vida',
    type: 'samurai',
    icon: '⚔️',
    reference: 'Miyamoto Musashi'
  },
  {
    text: 'O caminho do guerreiro é a aceitação resoluta da morte',
    type: 'samurai',
    icon: '⚔️',
    reference: 'Hagakure - Yamamoto Tsunetomo'
  },
  {
    text: 'Conheça o inimigo e conheça a si mesmo; em cem batalhas você nunca correrá perigo',
    type: 'samurai',
    icon: '⚔️',
    reference: 'Sun Tzu - A Arte da Guerra'
  },
  {
    text: 'A verdadeira vitória é a vitória sobre si mesmo',
    type: 'samurai',
    icon: '⚔️',
    reference: 'Morihei Ueshiba'
  },
  {
    text: 'Não há nada fora de você que possa lhe permitir tornar-se melhor, mais forte, mais rico, mais rápido ou mais inteligente. Tudo está dentro de você',
    type: 'samurai',
    icon: '⚔️',
    reference: 'Miyamoto Musashi'
  },
  {
    text: 'O guerreiro que confia em seu caminho não precisa provar que o caminho do outro está errado',
    type: 'samurai',
    icon: '⚔️',
    reference: 'Bushido'
  },

  // Arte e Grandes Artistas
  {
    text: 'A arte lava da alma a poeira do cotidiano',
    type: 'arte',
    icon: '🎨',
    reference: 'Pablo Picasso'
  },
  {
    text: 'Tudo que você pode imaginar é real',
    type: 'arte',
    icon: '🎨',
    reference: 'Pablo Picasso'
  },
  {
    text: 'A criatividade é a inteligência se divertindo',
    type: 'arte',
    icon: '🎨',
    reference: 'Albert Einstein'
  },
  {
    text: 'A arte não reproduz o visível, mas torna visível',
    type: 'arte',
    icon: '🎨',
    reference: 'Paul Klee'
  },
  {
    text: 'Eu não procuro, eu encontro',
    type: 'arte',
    icon: '🎨',
    reference: 'Pablo Picasso'
  },
  {
    text: 'A simplicidade é a sofisticação máxima',
    type: 'arte',
    icon: '🎨',
    reference: 'Leonardo da Vinci'
  },
  {
    text: 'Cada artista foi primeiro um amador',
    type: 'arte',
    icon: '🎨',
    reference: 'Ralph Waldo Emerson'
  },
  {
    text: 'A arte é a mentira que nos permite conhecer a verdade',
    type: 'arte',
    icon: '🎨',
    reference: 'Pablo Picasso'
  },
  {
    text: 'Não há linhas na natureza, apenas áreas de cor, umas contra as outras',
    type: 'arte',
    icon: '🎨',
    reference: 'Édouard Manet'
  },
  {
    text: 'Eu sonho minha pintura e então pinto meu sonho',
    type: 'arte',
    icon: '🎨',
    reference: 'Vincent van Gogh'
  },
  {
    text: 'A cor é o lugar onde nosso cérebro e o universo se encontram',
    type: 'arte',
    icon: '🎨',
    reference: 'Paul Cézanne'
  },
  {
    text: 'A arte é a expressão da alma que deseja ser ouvida',
    type: 'arte',
    icon: '🎨',
    reference: 'Frida Kahlo'
  },
  {
    text: 'Eu pinto objetos como os penso, não como os vejo',
    type: 'arte',
    icon: '🎨',
    reference: 'Pablo Picasso'
  },
  {
    text: 'A arte é a única maneira de fugir sem sair de casa',
    type: 'arte',
    icon: '🎨',
    reference: 'Twyla Tharp'
  },
  {
    text: 'Grandes coisas são feitas por uma série de pequenas coisas reunidas',
    type: 'arte',
    icon: '🎨',
    reference: 'Vincent van Gogh'
  },

  // Poesia
  {
    text: 'Navegar é preciso, viver não é preciso',
    type: 'poesia',
    icon: '📜',
    reference: 'Fernando Pessoa'
  },
  {
    text: 'Tudo vale a pena se a alma não é pequena',
    type: 'poesia',
    icon: '📜',
    reference: 'Fernando Pessoa - Mar Português'
  },

  // Música
  {
    text: 'A música é a linguagem do espírito. Ela abre o segredo da vida trazendo paz, abolindo conflitos',
    type: 'música',
    icon: '🎵',
    reference: 'Khalil Gibran'
  },
  {
    text: 'A vida é aquilo que acontece enquanto você está ocupado fazendo outros planos',
    type: 'música',
    icon: '🎵',
    reference: 'John Lennon - Beautiful Boy'
  },
  {
    text: 'A música pode mudar o mundo porque pode mudar as pessoas',
    type: 'música',
    icon: '🎵',
    reference: 'Bono - U2'
  },

  // Filosofia
  {
    text: 'Você pode sonhar, criar, desenhar e construir o lugar mais maravilhoso do mundo, mas é necessário ter pessoas para transformar seu sonho em realidade',
    type: 'filosofia',
    icon: '💭',
    reference: 'Walt Disney'
  },
  {
    text: 'Não é sobre ter tempo, é sobre fazer tempo',
    type: 'filosofia',
    icon: '💭',
    reference: 'Sabedoria Popular'
  },
  {
    text: 'Pequenas ações criam grandes transformações',
    type: 'filosofia',
    icon: '💭',
    reference: 'Efeito Borboleta'
  },

  // Literatura
  {
    text: 'Ser ou não ser, eis a questão',
    type: 'literatura',
    icon: '📚',
    reference: 'Shakespeare - Hamlet'
  }
] as const;

// Mantém compatibilidade com código existente
export const ZEN_MESSAGES: readonly string[] = INSPIRATION_MESSAGES.map(m => m.text);
