import { Injectable, inject } from '@angular/core';
import { StorageService } from './storage.service';
import { STORAGE_KEY_QUANTUM_ACTIVITIES, STORAGE_KEY_QUANTUM_PENDING } from '../../config/storage';
import { DateUtils } from '../../shared/utils/date.utils';

interface MonthlyData {
  timestamp: number;
  focus?: string;
  goal?: string;
}

type ActivityData = number | MonthlyData;

@Injectable({
  providedIn: 'root'
})
export class QuantumActivitiesService {
  private readonly storage = inject(StorageService);

  loadCompletedActivities(now: Date): Set<string> {
    const data = this.storage.getItem<Record<string, ActivityData>>(STORAGE_KEY_QUANTUM_ACTIVITIES);
    if (!data) return new Set();

    return new Set(
      Object.keys(data).filter(key => {
        const timestamp = typeof data[key] === 'object' ? data[key].timestamp : data[key];
        return this.isStillValid(key, timestamp, now);
      })
    );
  }

  loadMonthlyData(): { focus: string | null; goal: string | null } {
    const data = this.storage.getItem<Record<string, ActivityData>>(STORAGE_KEY_QUANTUM_ACTIVITIES);
    const monthlyData = data?.['monthly'];
    
    if (monthlyData && typeof monthlyData === 'object') {
      return {
        focus: monthlyData.focus || null,
        goal: monthlyData.goal || null
      };
    }
    
    return { focus: null, goal: null };
  }

  checkAndResetActivities(now: Date): Set<string> {
    const data = this.storage.getItem<Record<string, ActivityData>>(STORAGE_KEY_QUANTUM_ACTIVITIES);
    if (!data) return new Set();

    const updated: Record<string, ActivityData> = {};
    
    Object.keys(data).forEach(key => {
      const timestamp = typeof data[key] === 'object' ? data[key].timestamp : data[key];
      if (this.isStillValid(key, timestamp, now)) {
        updated[key] = data[key];
      }
    });

    this.storage.setItem(STORAGE_KEY_QUANTUM_ACTIVITIES, updated);
    return new Set(Object.keys(updated));
  }

  getPendingDays(activityId: string, now: Date): number {
    const data = this.storage.getItem<Record<string, number>>(STORAGE_KEY_QUANTUM_PENDING);
    const pendingDate = data?.[activityId];
    
    if (!pendingDate) {
      this.initializePendingDate(activityId);
      return 0;
    }

    const daysDiff = Math.floor((now.getTime() - pendingDate) / (1000 * 60 * 60 * 24));
    return Math.max(0, daysDiff);
  }

  initializePendingDate(activityId: string): void {
    const data = this.storage.getItem<Record<string, number>>(STORAGE_KEY_QUANTUM_PENDING) || {};
    
    if (!data[activityId]) {
      data[activityId] = Date.now();
      this.storage.setItem(STORAGE_KEY_QUANTUM_PENDING, data);
    }
  }

  private isStillValid(activityId: string, timestamp: number, now: Date): boolean {
    const completed = new Date(timestamp);

    switch (activityId) {
      case 'daily':
        return DateUtils.isSameDay(completed, now);
      case 'weekly':
        return DateUtils.isSameWeek(completed, now);
      case 'monthly':
        return DateUtils.isSameMonth(completed, now);
      default:
        return false;
    }
  }
}
