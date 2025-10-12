import { Injectable, inject } from '@angular/core';
import { StorageService } from './storage.service';
import { STORAGE_KEY_DAILY_PROGRESS } from '../../data/constants';
import { DateUtils } from '../../shared/utils/date.utils';

export interface DailyProgress {
  date: string;
  completed: number;
  total: number;
  percentage: number;
}

@Injectable({
  providedIn: 'root'
})
export class DailyProgressService {
  private readonly storage = inject(StorageService);
  private readonly MAX_DAYS = 30;

  getHistory(): DailyProgress[] {
    return this.storage.getItem<DailyProgress[]>(STORAGE_KEY_DAILY_PROGRESS) || [];
  }

  saveHistory(history: DailyProgress[]): void {
    this.storage.setItem(STORAGE_KEY_DAILY_PROGRESS, history);
  }

  initializeHistory(): void {
    if (this.getHistory().length > 0) return;

    const fakeData: DailyProgress[] = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      fakeData.push({
        date: DateUtils.formatDate(date),
        completed: 0,
        total: 8,
        percentage: 0
      });
    }

    this.saveHistory(fakeData);
  }

  ensureTodayExists(): void {
    const today = DateUtils.formatDate(new Date());
    const history = this.getHistory();

    if (!history.find(d => d.date === today)) {
      history.push({ date: today, completed: 0, total: 8, percentage: 0 });
      
      if (history.length > this.MAX_DAYS) {
        history.shift();
      }
      
      this.saveHistory(history);
    }
  }

  updateTodayProgress(completed: number, total: number): void {
    const today = DateUtils.formatDate(new Date());
    const history = this.getHistory();
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    const todayIndex = history.findIndex(d => d.date === today);

    const progressData: DailyProgress = { date: today, completed, total, percentage };

    if (todayIndex >= 0) {
      history[todayIndex] = progressData;
    } else {
      history.push(progressData);
    }

    this.saveHistory(history);
  }

  getLastSevenDays(): DailyProgress[] {
    return this.getHistory().slice(-7);
  }
}
