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
    
    // Domingo: Descanso e Preparação
    const sundayTasks = [
      { id: 1, label: 'Descansar das telas', completed: false },
      { id: 2, label: 'Pensar em ideias novas', completed: false },
      { id: 3, label: 'Listar coisas boas que aconteceram', completed: false },
      { id: 4, label: 'Consumir conteúdo inspirador', completed: false },
      { id: 5, label: 'Organizar próximos passos', completed: false },
      { id: 6, label: 'Criar algo livre', completed: false },
      { id: 7, label: 'Conhecer trabalhos de outros criadores', completed: false },
      { id: 8, label: 'Arrumar espaço de trabalho', completed: false },
      { id: 9, label: 'Checar como está se sentindo', completed: false },
      { id: 10, label: 'Juntar ideias em um lugar', completed: false },
      { id: 11, label: 'Fazer pausa e respirar', completed: false },
      { id: 12, label: 'Separar materiais para usar', completed: false },
      { id: 13, label: 'Ver o que está em andamento', completed: false },
      { id: 14, label: 'Anotar o que precisa resolver', completed: false },
      { id: 15, label: 'Explorar referências visuais', completed: false },
    ];

    // Dia de Trabalho: Organização
    const mondayTasks = [
      { id: 1, label: 'Organizar espaço de trabalho', completed: false },
      { id: 2, label: 'Definir prioridades do dia', completed: false },
      { id: 3, label: 'Ver o que está em andamento', completed: false },
      { id: 4, label: 'Anotar ideias que surgirem', completed: false },
      { id: 5, label: 'Fazer lista de tarefas', completed: false },
      { id: 6, label: 'Atualizar trabalhos online', completed: false },
      { id: 7, label: 'Listar o que precisa adquirir', completed: false },
      { id: 8, label: 'Fazer pausa e respirar', completed: false },
      { id: 9, label: 'Checar como está se sentindo', completed: false },
      { id: 10, label: 'Preparar materiais para próximo dia', completed: false },
      { id: 11, label: 'Revisar o que aprendeu hoje', completed: false },
      { id: 12, label: 'Explorar referências visuais', completed: false },
      { id: 13, label: 'Testar combinação de materiais', completed: false },
      { id: 14, label: 'Documentar processo com fotos', completed: false },
      { id: 15, label: 'Consumir conteúdo inspirador', completed: false },
    ];

    // Dia de Trabalho: Experimentação
    const tuesdayTasks = [
      { id: 1, label: 'Organizar espaço de trabalho', completed: false },
      { id: 2, label: 'Definir prioridades do dia', completed: false },
      { id: 3, label: 'Testar algo novo', completed: false },
      { id: 4, label: 'Explorar referências visuais', completed: false },
      { id: 5, label: 'Fazer testes rápidos', completed: false },
      { id: 6, label: 'Documentar processo com fotos', completed: false },
      { id: 7, label: 'Anotar o que funcionou', completed: false },
      { id: 8, label: 'Consumir conteúdo inspirador', completed: false },
      { id: 9, label: 'Fazer pausa e respirar', completed: false },
      { id: 10, label: 'Checar como está se sentindo', completed: false },
      { id: 11, label: 'Revisar o que aprendeu hoje', completed: false },
      { id: 12, label: 'Testar combinação de materiais', completed: false },
      { id: 13, label: 'Conhecer trabalhos de outros criadores', completed: false },
      { id: 14, label: 'Anotar ideias que surgirem', completed: false },
      { id: 15, label: 'Preparar materiais para próximo dia', completed: false },
    ];

    // Dia de Trabalho: Produção
    const wednesdayTasks = [
      { id: 1, label: 'Organizar espaço de trabalho', completed: false },
      { id: 2, label: 'Definir prioridades do dia', completed: false },
      { id: 3, label: 'Trabalhar com foco', completed: false },
      { id: 4, label: 'Aplicar técnicas no projeto', completed: false },
      { id: 5, label: 'Fazer pausas regulares', completed: false },
      { id: 6, label: 'Revisar progresso', completed: false },
      { id: 7, label: 'Avançar em etapas importantes', completed: false },
      { id: 8, label: 'Criar ambiente inspirador', completed: false },
      { id: 9, label: 'Anotar ideias que surgirem', completed: false },
      { id: 10, label: 'Fazer pausa e respirar', completed: false },
      { id: 11, label: 'Revisar o que aprendeu hoje', completed: false },
      { id: 12, label: 'Checar como está se sentindo', completed: false },
      { id: 13, label: 'Documentar processo com fotos', completed: false },
      { id: 14, label: 'Explorar referências visuais', completed: false },
      { id: 15, label: 'Preparar materiais para próximo dia', completed: false },
    ];

    // Dia de Trabalho: Refinamento
    const thursdayTasks = [
      { id: 1, label: 'Organizar espaço de trabalho', completed: false },
      { id: 2, label: 'Definir prioridades do dia', completed: false },
      { id: 3, label: 'Revisar trabalhos recentes', completed: false },
      { id: 4, label: 'Adicionar detalhes', completed: false },
      { id: 5, label: 'Ajustar o que precisa', completed: false },
      { id: 6, label: 'Documentar processo com fotos', completed: false },
      { id: 7, label: 'Organizar arquivos', completed: false },
      { id: 8, label: 'Editar registros visuais', completed: false },
      { id: 9, label: 'Escrever sobre o trabalho', completed: false },
      { id: 10, label: 'Fazer pausa e respirar', completed: false },
      { id: 11, label: 'Revisar o que aprendeu hoje', completed: false },
      { id: 12, label: 'Checar como está se sentindo', completed: false },
      { id: 13, label: 'Explorar referências visuais', completed: false },
      { id: 14, label: 'Anotar ideias que surgirem', completed: false },
      { id: 15, label: 'Preparar materiais para próximo dia', completed: false },
    ];

    // Dia de Trabalho: Finalização
    const fridayTasks = [
      { id: 1, label: 'Organizar espaço de trabalho', completed: false },
      { id: 2, label: 'Definir prioridades do dia', completed: false },
      { id: 3, label: 'Finalizar o que está pendente', completed: false },
      { id: 4, label: 'Compartilhar trabalho online', completed: false },
      { id: 5, label: 'Escrever sobre aprendizados', completed: false },
      { id: 6, label: 'Limpar e organizar espaço', completed: false },
      { id: 7, label: 'Revisar progresso', completed: false },
      { id: 8, label: 'Interagir com outros criadores', completed: false },
      { id: 9, label: 'Mostrar processo de trabalho', completed: false },
      { id: 10, label: 'Fazer pausa e respirar', completed: false },
      { id: 11, label: 'Revisar o que aprendeu hoje', completed: false },
      { id: 12, label: 'Checar como está se sentindo', completed: false },
      { id: 13, label: 'Conhecer trabalhos de outros criadores', completed: false },
      { id: 14, label: 'Anotar ideias que surgirem', completed: false },
      { id: 15, label: 'Ver o que ficou para próxima semana', completed: false },
    ];

    // Dia Livre: Exploração
    const saturdayTasks = [
      { id: 1, label: 'Limpar espaço de trabalho', completed: false },
      { id: 2, label: 'Sair e observar ao redor', completed: false },
      { id: 3, label: 'Conversar com pessoas', completed: false },
      { id: 4, label: 'Cuidar do ambiente', completed: false },
      { id: 5, label: 'Criar algo livre', completed: false },
      { id: 6, label: 'Trabalhar em lugar diferente', completed: false },
      { id: 7, label: 'Testar combinação de materiais', completed: false },
      { id: 8, label: 'Checar como está se sentindo', completed: false },
      { id: 9, label: 'Anotar ideias que surgirem', completed: false },
      { id: 10, label: 'Fazer pausa e respirar', completed: false },
      { id: 11, label: 'Revisar coisas boas que aconteceram', completed: false },
      { id: 12, label: 'Explorar referências visuais', completed: false },
      { id: 13, label: 'Conhecer trabalhos de outros criadores', completed: false },
      { id: 14, label: 'Consumir conteúdo inspirador', completed: false },
      { id: 15, label: 'Reorganizar materiais', completed: false },
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
