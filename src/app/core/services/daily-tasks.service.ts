import { Injectable, inject } from '@angular/core';
import { DAILY_TASKS_BY_WEEKDAY } from '../../config/rituals';
import { STORAGE_KEY_DAILY_TASKS } from '../../config/storage';
import { StorageService } from './storage.service';

export interface Task {
  id: number;
  label: string;
  completed: boolean;
}

interface TasksData {
  version: number;
  date: string;
  tasks: Task[];
}

@Injectable({
  providedIn: 'root'
})
export class DailyTasksService {
  private readonly storage = inject(StorageService);
  private readonly STORAGE_KEY = STORAGE_KEY_DAILY_TASKS;
  private readonly TASKS_VERSION = 5;

  loadTasks(): Task[] {
    const today = this.formatDate(new Date());
    const data = this.storage.getItem<TasksData>(this.STORAGE_KEY);
    
    if (!data) return this.getDefaultTasks();
    
    // Verifica versão e data
    if (data.version < this.TASKS_VERSION || data.date !== today || !data.tasks?.length) {
      return this.getDefaultTasks();
    }
    
    return data.tasks;
  }

  saveTasks(tasks: Task[]): void {
    const today = this.formatDate(new Date());
    const data: TasksData = { version: this.TASKS_VERSION, date: today, tasks };
    this.storage.setItem(this.STORAGE_KEY, data);
  }

  private getDefaultTasks(): Task[] {
    const dayOfWeek = new Date().getDay();
    const today = this.formatDate(new Date());
    const taskTemplates = DAILY_TASKS_BY_WEEKDAY[dayOfWeek];
    
    const allTasks: Task[] = taskTemplates.map((template, index) => ({
      id: index + 1,
      label: template.label,
      completed: false
    }));

    return this.selectRandomTasks(allTasks, 8, today);
  }

  private selectRandomTasks(tasks: Task[], count: number, seed: string): Task[] {
    const seededRandom = this.seededRandom(seed);
    const shuffled = [...tasks].sort(() => seededRandom() - 0.5);
    
    return shuffled.slice(0, count).map((task, index) => ({
      ...task,
      id: index + 1
    }));
  }

  private seededRandom(seed: string): () => number {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = ((hash << 5) - hash) + seed.charCodeAt(i);
      hash = hash & hash;
    }
    
    return () => {
      hash = (hash * 9301 + 49297) % 233280;
      return hash / 233280;
    };
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
