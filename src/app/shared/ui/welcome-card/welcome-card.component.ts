import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CardModule } from 'primeng/card';

interface WeekDay {
  index: number;
  name: string;
  theme: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'p-welcome-card',
  standalone: true,
  imports: [CardModule],
  templateUrl: './welcome-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeCardComponent {
  private readonly now = signal(new Date());

  // Única fonte de verdade para os temas dos dias
  readonly weekDays: WeekDay[] = [
    { index: 0, name: 'Dom', theme: 'Renovação', description: 'Energia se renova, possibilidades se expandem', icon: '🌙' },
    { index: 1, name: 'Seg', theme: 'Planejamento', description: 'Movimento inicial que cria momentum infinito', icon: '🚀' },
    { index: 2, name: 'Ter', theme: 'Experimentação', description: 'Atenção concentrada manifesta realidades', icon: '⚛️' },
    { index: 3, name: 'Qua', theme: 'Fluxo Criativo', description: 'Observar transforma o que está em potencial', icon: '🔮' },
    { index: 4, name: 'Qui', theme: 'Refinamento', description: 'Ação colapsa ondas em resultados tangíveis', icon: '💫' },
    { index: 5, name: 'Sex', theme: 'Síntese', description: 'Reconhecer conquistas amplifica frequências', icon: '✨' },
    { index: 6, name: 'Sáb', theme: 'Conexão', description: 'Consciência expande o campo de possibilidades', icon: '🌌' }
  ];

  // Atualiza o horário a cada minuto
  constructor() {
    setInterval(() => this.now.set(new Date()), 60000);
  }

  get currentDayIndex() {
    return this.now().getDay();
  }

  get orderedWeekDays() {
    const currentIndex = this.currentDayIndex;
    // Reorganiza array para começar com o dia atual
    return [
      ...this.weekDays.slice(currentIndex),
      ...this.weekDays.slice(0, currentIndex)
    ];
  }

  get greeting() {
    const hour = this.now().getHours();
    if (hour >= 5 && hour < 12) return 'Bom dia';
    if (hour >= 12 && hour < 18) return 'Boa tarde';
    return 'Boa noite';
  }

  get dayOfWeek() {
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    return days[this.now().getDay()];
  }

  get dayTheme() {
    // Reutiliza weekDays como fonte única de verdade
    const currentDay = this.weekDays[this.now().getDay()];
    return {
      name: currentDay.theme,
      description: currentDay.description,
      icon: currentDay.icon
    };
  }

  get formattedDate() {
    const date = this.now();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  get quantumMessage() {
    const hour = this.now().getHours();
    const dayIndex = this.now().getDay();
    
    // 7 variações por dia da semana baseadas no horário
    const messages = [
      // Domingo
      [
        'Sua energia se renova a cada respiração consciente',
        'O universo conspira a favor dos que descansam com propósito',
        'Hoje é o dia perfeito para alinhar suas intenções',
        'A quietude de hoje prepara as manifestações de amanhã',
        'Sua frequência se eleva quando você honra o descanso',
        'O campo quântico responde à sua presença relaxada',
        'Neste momento de pausa, novas possibilidades emergem'
      ],
      // Segunda
      [
        'Cada novo começo carrega infinitas possibilidades',
        'Sua intenção clara hoje cria ondas de realidade amanhã',
        'O momentum que você cria agora se multiplica',
        'Pequenas ações conscientes geram grandes transformações',
        'Você é o observador que colapsa potenciais em realidade',
        'Sua energia de início atrai oportunidades alinhadas',
        'O universo já está organizando o que você decidiu criar'
      ],
      // Terça
      [
        'Experimentar é dançar com o campo de possibilidades',
        'Cada teste é uma conversa com o universo',
        'Sua curiosidade abre portais para novas frequências',
        'Ouse explorar, o universo ama os corajosos',
        'Inovação é a linguagem da cocriação consciente',
        'Você está sintonizado na frequência da descoberta',
        'Cada experimento expande seu campo de manifestação'
      ],
      // Quarta
      [
        'Você está no fluxo perfeito da criação',
        'Sua energia criativa está alinhada com o cosmos',
        'O que você cria hoje ressoa em múltiplas dimensões',
        'Você é um canal aberto para a abundância universal',
        'Sua presença focada materializa o invisível',
        'O universo trabalha através das suas mãos hoje',
        'Cada criação sua eleva a frequência coletiva'
      ],
      // Quinta
      [
        'Detalhes refinados amplificam sua frequência vibracional',
        'Você está polindo diamantes de manifestação',
        'Cada ajuste fino ressoa com perfeição universal',
        'Sua atenção aos detalhes é um ato de amor cósmico',
        'O refinamento é a ponte entre intenção e realidade',
        'Você está calibrando sua obra-prima quântica',
        'Excelência é sua assinatura energética hoje'
      ],
      // Sexta
      [
        'Celebrar conquistas multiplica sua capacidade de receber',
        'Você completou um ciclo de cocriação consciente',
        'Sua gratidão abre portais de abundância infinita',
        'Reconhecer o progresso atrai mais prosperidade',
        'Você está colhendo os frutos da sua frequência elevada',
        'Compartilhar sua luz amplifica o brilho coletivo',
        'O universo celebra cada passo da sua jornada'
      ],
      // Sábado
      [
        'Conexões autênticas expandem seu campo quântico',
        'Você é parte de uma rede infinita de consciência',
        'Sua presença eleva a frequência de todos ao redor',
        'Liberdade criativa é seu estado natural de ser',
        'Você está sincronizado com o pulso do universo',
        'Cada interação é uma troca de energia sagrada',
        'Sua essência livre inspira possibilidades infinitas'
      ]
    ];

    // Seleciona mensagem baseada no horário (7 faixas horárias)
    let timeIndex = 0;
    if (hour >= 5 && hour < 8) timeIndex = 0;      // Madrugada/Manhã cedo
    else if (hour >= 8 && hour < 11) timeIndex = 1; // Manhã
    else if (hour >= 11 && hour < 14) timeIndex = 2; // Meio-dia
    else if (hour >= 14 && hour < 17) timeIndex = 3; // Tarde
    else if (hour >= 17 && hour < 20) timeIndex = 4; // Final de tarde
    else if (hour >= 20 && hour < 23) timeIndex = 5; // Noite
    else timeIndex = 6;                               // Noite tardia/Madrugada

    return messages[dayIndex][timeIndex];
  }
}
