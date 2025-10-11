import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Accordion, AccordionModule } from 'primeng/accordion';
import { Textarea } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PageHeaderComponent } from '../../../../shared/ui/page-header/page-header.component';
import { MissionVisionValuesComponent } from '../../../../shared/ui/mission-vision-values/mission-vision-values.component';

@Component({
  selector: 'f-tabs-config-page',
  standalone: true,
  imports: [FormsModule, Textarea, ButtonModule, InputTextModule, PageHeaderComponent, MissionVisionValuesComponent],
  templateUrl: './config.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ConfigPage {
  readonly semanalText = signal('');
  readonly mensalText = signal('');
  readonly mission = signal('');
  readonly vision = signal('');
  readonly values = signal<string[]>([]);
  readonly newValue = signal('');

  constructor() {
    this.loadMissionVisionValues();
  }

  private loadMissionVisionValues() {
    const stored = localStorage.getItem('mission-vision-values');
    if (stored) {
      try {
        const data = JSON.parse(stored);
        this.mission.set(data[0]?.description || '');
        this.vision.set(data[1]?.description || '');
        this.values.set(data[2]?.values || []);
      } catch {
        // Ignore errors
      }
    }
  }

  addValue() {
    const value = this.newValue().trim();
    if (value) {
      this.values.update(vals => [...vals, value]);
      this.newValue.set('');
    }
  }

  removeValue(index: number) {
    this.values.update(vals => vals.filter((_, i) => i !== index));
  }

  get canSave(): boolean {
    return this.mission().trim().length > 0 && 
           this.vision().trim().length > 0 && 
           this.values().length >= 3;
  }

  clearAllValues() {
    this.values.set([]);
  }

  clearAll() {
    this.mission.set('');
    this.vision.set('');
    this.values.set([]);
  }

  cancelChanges() {
    this.loadMissionVisionValues();
  }

  saveMissionVisionValues() {
    if (!this.canSave) return;
    const data = [
      {
        icon: '🎯',
        title: 'Missão',
        description: this.mission(),
        color: 'text-blue-600 dark:text-blue-400'
      },
      {
        icon: '✨',
        title: 'Visão',
        description: this.vision(),
        color: 'text-purple-600 dark:text-purple-400'
      },
      {
        icon: '💎',
        title: 'Valores',
        values: this.values(),
        color: 'text-green-600 dark:text-green-400'
      }
    ];
    localStorage.setItem('mission-vision-values', JSON.stringify(data));
    window.location.reload();
  }

  finalizarSemanal() {
    console.log('Semanal finalizado:', this.semanalText());
  }

  finalizarMensal() {
    console.log('Mensal finalizado:', this.mensalText());
  }
}
