export interface DailyTaskTemplate {
  label: string;
}

export const SUNDAY_TASKS: readonly DailyTaskTemplate[] = [
  { label: 'Descansar das telas' },
  { label: 'Pensar em ideias novas' },
  { label: 'Listar coisas boas que aconteceram' },
  { label: 'Consumir conteúdo inspirador' },
  { label: 'Organizar próximos passos' },
  { label: 'Criar algo livre' },
  { label: 'Conhecer trabalhos de outros criadores' },
  { label: 'Arrumar espaço de trabalho' },
  { label: 'Checar como está se sentindo' },
  { label: 'Juntar ideias em um lugar' },
  { label: 'Fazer pausa e respirar' },
  { label: 'Separar materiais para usar' },
  { label: 'Ver o que está em andamento' },
  { label: 'Anotar o que precisa resolver' },
  { label: 'Explorar referências visuais' },
] as const;

export const MONDAY_TASKS: readonly DailyTaskTemplate[] = [
  { label: 'Organizar espaço de trabalho' },
  { label: 'Definir prioridades do dia' },
  { label: 'Ver o que está em andamento' },
  { label: 'Anotar ideias que surgirem' },
  { label: 'Fazer lista de tarefas' },
  { label: 'Atualizar trabalhos online' },
  { label: 'Listar o que precisa adquirir' },
  { label: 'Fazer pausa e respirar' },
  { label: 'Checar como está se sentindo' },
  { label: 'Preparar materiais para próximo dia' },
  { label: 'Revisar o que aprendeu hoje' },
  { label: 'Explorar referências visuais' },
  { label: 'Testar combinação de materiais' },
  { label: 'Documentar processo com fotos' },
  { label: 'Consumir conteúdo inspirador' },
] as const;

export const TUESDAY_TASKS: readonly DailyTaskTemplate[] = [
  { label: 'Organizar espaço de trabalho' },
  { label: 'Definir prioridades do dia' },
  { label: 'Testar algo novo' },
  { label: 'Explorar referências visuais' },
  { label: 'Fazer testes rápidos' },
  { label: 'Documentar processo com fotos' },
  { label: 'Anotar o que funcionou' },
  { label: 'Consumir conteúdo inspirador' },
  { label: 'Fazer pausa e respirar' },
  { label: 'Checar como está se sentindo' },
  { label: 'Revisar o que aprendeu hoje' },
  { label: 'Testar combinação de materiais' },
  { label: 'Conhecer trabalhos de outros criadores' },
  { label: 'Anotar ideias que surgirem' },
  { label: 'Preparar materiais para próximo dia' },
] as const;

export const WEDNESDAY_TASKS: readonly DailyTaskTemplate[] = [
  { label: 'Organizar espaço de trabalho' },
  { label: 'Definir prioridades do dia' },
  { label: 'Trabalhar com foco' },
  { label: 'Aplicar técnicas no projeto' },
  { label: 'Fazer pausas regulares' },
  { label: 'Revisar progresso' },
  { label: 'Avançar em etapas importantes' },
  { label: 'Criar ambiente inspirador' },
  { label: 'Anotar ideias que surgirem' },
  { label: 'Fazer pausa e respirar' },
  { label: 'Revisar o que aprendeu hoje' },
  { label: 'Checar como está se sentindo' },
  { label: 'Documentar processo com fotos' },
  { label: 'Explorar referências visuais' },
  { label: 'Preparar materiais para próximo dia' },
] as const;

export const THURSDAY_TASKS: readonly DailyTaskTemplate[] = [
  { label: 'Organizar espaço de trabalho' },
  { label: 'Definir prioridades do dia' },
  { label: 'Revisar trabalhos recentes' },
  { label: 'Adicionar detalhes' },
  { label: 'Ajustar o que precisa' },
  { label: 'Documentar processo com fotos' },
  { label: 'Organizar arquivos' },
  { label: 'Editar registros visuais' },
  { label: 'Escrever sobre o trabalho' },
  { label: 'Fazer pausa e respirar' },
  { label: 'Revisar o que aprendeu hoje' },
  { label: 'Checar como está se sentindo' },
  { label: 'Explorar referências visuais' },
  { label: 'Anotar ideias que surgirem' },
  { label: 'Preparar materiais para próximo dia' },
] as const;

export const FRIDAY_TASKS: readonly DailyTaskTemplate[] = [
  { label: 'Organizar espaço de trabalho' },
  { label: 'Definir prioridades do dia' },
  { label: 'Finalizar o que está pendente' },
  { label: 'Compartilhar trabalho online' },
  { label: 'Escrever sobre aprendizados' },
  { label: 'Limpar e organizar espaço' },
  { label: 'Revisar progresso' },
  { label: 'Interagir com outros criadores' },
  { label: 'Mostrar processo de trabalho' },
  { label: 'Fazer pausa e respirar' },
  { label: 'Revisar o que aprendeu hoje' },
  { label: 'Checar como está se sentindo' },
  { label: 'Conhecer trabalhos de outros criadores' },
  { label: 'Anotar ideias que surgirem' },
  { label: 'Ver o que ficou para próxima semana' },
] as const;

export const SATURDAY_TASKS: readonly DailyTaskTemplate[] = [
  { label: 'Limpar espaço de trabalho' },
  { label: 'Sair e observar ao redor' },
  { label: 'Conversar com pessoas' },
  { label: 'Cuidar do ambiente' },
  { label: 'Criar algo livre' },
  { label: 'Trabalhar em lugar diferente' },
  { label: 'Testar combinação de materiais' },
  { label: 'Checar como está se sentindo' },
  { label: 'Anotar ideias que surgirem' },
  { label: 'Fazer pausa e respirar' },
  { label: 'Revisar coisas boas que aconteceram' },
  { label: 'Explorar referências visuais' },
  { label: 'Conhecer trabalhos de outros criadores' },
  { label: 'Consumir conteúdo inspirador' },
  { label: 'Reorganizar materiais' },
] as const;

export const DAILY_TASKS_BY_WEEKDAY: readonly (readonly DailyTaskTemplate[])[] = [
  SUNDAY_TASKS,
  MONDAY_TASKS,
  TUESDAY_TASKS,
  WEDNESDAY_TASKS,
  THURSDAY_TASKS,
  FRIDAY_TASKS,
  SATURDAY_TASKS,
] as const;
