export interface ActivityTemplate {
  id: string;
  name: string;
  frequency: string;
  hz: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export const QUANTUM_ACTIVITIES: readonly ActivityTemplate[] = [
  {
    id: 'daily',
    name: 'Ressonância Interna',
    frequency: 'diário',
    hz: '528 Hz',
    icon: '🧘',
    color: 'text-cyan-700 dark:text-cyan-300',
    bgColor: 'bg-cyan-50 dark:bg-cyan-950/30',
    borderColor: 'border-cyan-200 dark:border-cyan-800'
  },
  {
    id: 'weekly',
    name: 'Portal da Prosperidade',
    frequency: 'semanal',
    hz: '639 Hz',
    icon: '🌀',
    color: 'text-blue-700 dark:text-blue-300',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    borderColor: 'border-blue-200 dark:border-blue-800'
  },
  {
    id: 'monthly',
    name: 'Ciclo da Abundância',
    frequency: 'mensal',
    hz: '741 Hz',
    icon: '🌊',
    color: 'text-indigo-700 dark:text-indigo-300',
    bgColor: 'bg-indigo-50 dark:bg-indigo-950/30',
    borderColor: 'border-indigo-200 dark:border-indigo-800'
  }
] as const;
