/**
 * Constantes de chaves do localStorage
 * Centraliza todas as chaves usadas na aplicação para evitar duplicação e typos
 */

export interface StorageKeyConfig {
  key: string;
  description: string;
  dataType: string;
}

/**
 * Chave para armazenar tarefas diárias
 * Estrutura: { version: number, date: string, tasks: Task[] }
 */
export const STORAGE_KEY_DAILY_TASKS = 'daily-tasks';

/**
 * Chave para armazenar histórico de progresso diário
 * Estrutura: DailyProgress[]
 * Mantém últimos 30 dias de progresso
 */
export const STORAGE_KEY_DAILY_PROGRESS = 'daily-progress-history';

/**
 * Chave para armazenar atividades quânticas completadas
 * Estrutura: { [activityId]: timestamp | { timestamp, focus?, goal? } }
 * Usado para rastrear conclusão de rituais diários/semanais/mensais
 */
export const STORAGE_KEY_QUANTUM_ACTIVITIES = 'quantum-activities';

/**
 * Chave para armazenar datas pendentes de atividades quânticas
 * Estrutura: { [activityId]: timestamp }
 * Usado para calcular dias pendentes desde última execução
 */
export const STORAGE_KEY_QUANTUM_PENDING = 'quantum-activities-pending';

/**
 * Chave para armazenar missão, visão e valores
 * Estrutura: Pillar[]
 * Usado para personalizar o propósito do ateliê
 */
export const STORAGE_KEY_MISSION_VISION_VALUES = 'mission-vision-values';

/**
 * Mapa de todas as chaves de storage com metadados
 */
export const STORAGE_KEYS_MAP: Record<string, StorageKeyConfig> = {
  DAILY_TASKS: {
    key: STORAGE_KEY_DAILY_TASKS,
    description: 'Tarefas diárias com versionamento e data',
    dataType: '{ version: number, date: string, tasks: Task[] }'
  },
  DAILY_PROGRESS: {
    key: STORAGE_KEY_DAILY_PROGRESS,
    description: 'Histórico de progresso dos últimos 30 dias',
    dataType: 'DailyProgress[]'
  },
  QUANTUM_ACTIVITIES: {
    key: STORAGE_KEY_QUANTUM_ACTIVITIES,
    description: 'Registro de atividades quânticas completadas',
    dataType: '{ [activityId]: timestamp | { timestamp, focus?, goal? } }'
  },
  QUANTUM_PENDING: {
    key: STORAGE_KEY_QUANTUM_PENDING,
    description: 'Datas de início de atividades pendentes',
    dataType: '{ [activityId]: timestamp }'
  },
  MISSION_VISION_VALUES: {
    key: STORAGE_KEY_MISSION_VISION_VALUES,
    description: 'Missão, visão e valores do ateliê',
    dataType: 'Pillar[]'
  }
} as const;

/**
 * Lista de todas as chaves de storage
 * Útil para operações de limpeza ou debug
 */
export const ALL_STORAGE_KEYS = [
  STORAGE_KEY_DAILY_TASKS,
  STORAGE_KEY_DAILY_PROGRESS,
  STORAGE_KEY_QUANTUM_ACTIVITIES,
  STORAGE_KEY_QUANTUM_PENDING,
  STORAGE_KEY_MISSION_VISION_VALUES
] as const;

/**
 * Tipo para garantir type safety ao usar chaves
 */
export type StorageKey = typeof ALL_STORAGE_KEYS[number];
