import { ChangeDetectionStrategy, Component, effect, output, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ProgressBarModule } from 'primeng/progressbar';
import { FormsModule } from '@angular/forms';

interface Task {
  id: number;
  label: string;
  completed: boolean;
}

@Component({
  selector: 'p-daily-tasks',
  standalone: true,
  imports: [CardModule, CheckboxModule, ProgressBarModule, FormsModule],
  templateUrl: './daily-tasks.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyTasksComponent {
  readonly progressChanged = output<{ completed: number; total: number }>();
  
  readonly tasks = signal<Task[]>([]);
  private isInitialized = false;

  constructor() {
    // Carrega tarefas iniciais
    this.tasks.set(this.loadTasks());
    this.isInitialized = true;
    
    this.checkDayChange();
    
    // Emite mudanças de progresso e salva
    effect(() => {
      const tasks = this.tasks();
      
      // Só salva depois da inicialização
      if (this.isInitialized) {
        this.saveTasks(tasks);
      }
      
      this.progressChanged.emit({
        completed: this.completedCount,
        total: this.totalCount
      });
    });
  }

  private loadTasks(): Task[] {
    const today = this.formatDate(new Date());
    const stored = localStorage.getItem('daily-tasks');
    
    console.log('Carregando tarefas. Data de hoje:', today);
    console.log('LocalStorage:', stored);
    
    if (!stored) {
      console.log('Nenhuma tarefa salva, carregando padrão');
      return this.getDefaultTasks();
    }

    try {
      const data = JSON.parse(stored);
      console.log('Dados parseados:', data);
      
      // Verifica se é o mesmo dia
      if (data.date === today && data.tasks && data.tasks.length > 0) {
        console.log('Mesmo dia, carregando tarefas salvas');
        return data.tasks;
      }
      
      console.log('Dia diferente ou sem tarefas, carregando padrão');
      // Novo dia, reseta tarefas
      return this.getDefaultTasks();
    } catch (e) {
      console.error('Erro ao carregar tarefas:', e);
      return this.getDefaultTasks();
    }
  }

  private saveTasks(tasks: Task[]) {
    const today = this.formatDate(new Date());
    const data = {
      date: today,
      tasks
    };
    localStorage.setItem('daily-tasks', JSON.stringify(data));
    console.log('Tarefas salvas:', data);
  }

  private getDefaultTasks(): Task[] {
    const dayOfWeek = new Date().getDay();
    
    // Domingo: Renovação e Planejamento Consciente
    const sundayTasks = [
      { id: 1, label: 'Desconectar de telas por 2-3 horas', completed: false },
      { id: 2, label: 'Meditar sobre ideias e projetos futuros', completed: false },
      { id: 3, label: 'Praticar gratidão: listar 5 conquistas da semana', completed: false },
      { id: 4, label: 'Ler ou estudar sobre arte/técnicas inspiradoras', completed: false },
      { id: 5, label: 'Planejar intenções criativas para próxima semana', completed: false },
    ];

    // Segunda: Planejamento e Estrutura
    const mondayTasks = [
      { id: 1, label: 'Organizar ateliê e preparar materiais da semana', completed: false },
      { id: 2, label: 'Definir metas criativas e prioridades semanais', completed: false },
      { id: 3, label: 'Revisar projetos em andamento e deadlines', completed: false },
      { id: 4, label: 'Sessão de brainstorming: novas ideias e conceitos', completed: false },
      { id: 5, label: 'Criar cronograma visual da semana', completed: false },
    ];

    // Terça: Experimentação e Técnicas Inovadoras
    const tuesdayTasks = [
      { id: 1, label: 'Experimentar técnica nova: mixed media ou colagem', completed: false },
      { id: 2, label: 'Pesquisar referências visuais inspiradoras', completed: false },
      { id: 3, label: 'Criar 3 estudos rápidos com materiais diferentes', completed: false },
      { id: 4, label: 'Documentar processo criativo com fotos/vídeos', completed: false },
      { id: 5, label: 'Avaliar resultados e anotar descobertas', completed: false },
    ];

    // Quarta: Fluxo Criativo e Produção Intensa
    const wednesdayTasks = [
      { id: 1, label: 'Sessão de deep work: 2-3h de criação focada', completed: false },
      { id: 2, label: 'Aplicar técnica dominada em projeto principal', completed: false },
      { id: 3, label: 'Pausas estratégicas: alongamento a cada 50min', completed: false },
      { id: 4, label: 'Revisar progresso e ajustar ritmo de trabalho', completed: false },
      { id: 5, label: 'Finalizar pelo menos uma peça/etapa importante', completed: false },
    ];

    // Quinta: Refinamento e Detalhes
    const thursdayTasks = [
      { id: 1, label: 'Revisar trabalhos da semana com olhar crítico', completed: false },
      { id: 2, label: 'Adicionar detalhes e acabamentos refinados', completed: false },
      { id: 3, label: 'Corrigir imperfeições e ajustar composições', completed: false },
      { id: 4, label: 'Preparar portfólio: fotografar/digitalizar criações', completed: false },
      { id: 5, label: 'Organizar arquivos digitais e backups', completed: false },
    ];

    // Sexta: Síntese e Compartilhamento
    const fridayTasks = [
      { id: 1, label: 'Finalizar projetos pendentes da semana', completed: false },
      { id: 2, label: 'Compartilhar criação nas redes ou com comunidade', completed: false },
      { id: 3, label: 'Escrever reflexão sobre aprendizados da semana', completed: false },
      { id: 4, label: 'Limpar ateliê e preparar para fim de semana', completed: false },
      { id: 5, label: 'Celebrar conquistas: revisar progresso semanal', completed: false },
    ];

    // Sábado: Conexão com Vida e Ambiente
    const saturdayTasks = [
      { id: 1, label: 'Limpeza profunda do ateliê com atenção plena', completed: false },
      { id: 2, label: 'Caminhar ao ar livre e observar a natureza', completed: false },
      { id: 3, label: 'Conectar com pessoas queridas (presencial ou virtual)', completed: false },
      { id: 4, label: 'Preparar ambiente: plantas, aromas, luz natural', completed: false },
      { id: 5, label: 'Criar algo livre, sem pressão ou expectativa', completed: false },
    ];

    // Retorna tarefas baseadas no dia da semana
    switch (dayOfWeek) {
      case 0: return sundayTasks;    // Domingo
      case 1: return mondayTasks;    // Segunda
      case 2: return tuesdayTasks;   // Terça
      case 3: return wednesdayTasks; // Quarta
      case 4: return thursdayTasks;  // Quinta
      case 5: return fridayTasks;    // Sexta
      case 6: return saturdayTasks;  // Sábado
      default: return mondayTasks;
    }
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private checkDayChange() {
    setInterval(() => {
      const today = this.formatDate(new Date());
      const stored = localStorage.getItem('daily-tasks');
      
      if (stored) {
        try {
          const data = JSON.parse(stored);
          if (data.date !== today) {
            this.tasks.set(this.getDefaultTasks());
          }
        } catch {
          // Ignore
        }
      }
    }, 60000);
  }

  get completedCount() {
    return this.tasks().filter(t => t.completed).length;
  }

  get totalCount() {
    return this.tasks().length;
  }

  get progressPercentage() {
    return this.totalCount > 0 ? Math.round((this.completedCount / this.totalCount) * 100) : 0;
  }

  onTaskChange() {
    // Força atualização do signal para disparar o effect
    this.tasks.set([...this.tasks()]);
  }
}
