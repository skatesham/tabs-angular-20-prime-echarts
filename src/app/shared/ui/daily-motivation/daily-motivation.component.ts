import { Component, signal } from '@angular/core';
import { CardModule } from 'primeng/card';

interface MotivationalQuote {
  quote: string;
  author: string;
  context: string;
}

@Component({
  selector: 'p-daily-motivation',
  standalone: true,
  imports: [CardModule],
  templateUrl: './daily-motivation.component.html',
  styleUrls: ['./daily-motivation.component.css']
})
export class DailyMotivationComponent {
  private readonly now = signal(new Date());

  private readonly quotes: MotivationalQuote[] = [
    {
      quote: 'O observador afeta o observado. Sua consciência molda a realidade.',
      author: 'Werner Heisenberg',
      context: 'Princípio da Incerteza - Física Quântica'
    },
    {
      quote: 'A inovação distingue um líder de um seguidor.',
      author: 'Steve Jobs',
      context: 'Visão Empresarial e Liderança'
    },
    {
      quote: 'Tudo é energia e isso é tudo o que existe. Sintonize a frequência da realidade que deseja.',
      author: 'Nikola Tesla',
      context: 'Ressonância e Manifestação'
    },
    {
      quote: 'O sucesso não é final, o fracasso não é fatal: é a coragem de continuar que conta.',
      author: 'Winston Churchill',
      context: 'Persistência e Resiliência Empresarial'
    },
    {
      quote: 'A realidade é meramente uma ilusão, embora muito persistente.',
      author: 'Albert Einstein',
      context: 'Relatividade e Perspectiva'
    },
    {
      quote: 'Sua tarefa não é buscar o amor, mas buscar e encontrar todas as barreiras que você construiu contra ele.',
      author: 'Rumi',
      context: 'Consciência e Expansão Interior'
    },
    {
      quote: 'O universo não é apenas mais estranho do que imaginamos, é mais estranho do que podemos imaginar.',
      author: 'J.B.S. Haldane',
      context: 'Possibilidades Infinitas'
    }
  ];

  get todayQuote(): MotivationalQuote {
    const dayOfWeek = this.now().getDay();
    return this.quotes[dayOfWeek];
  }
}
