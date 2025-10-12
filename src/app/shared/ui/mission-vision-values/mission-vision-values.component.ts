import { Component, inject, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { MissionVisionValuesService } from '../../../core/services/mission-vision-values.service';
import { type Pillar } from '../../../data/constants';

@Component({
  selector: 'p-mission-vision-values',
  standalone: true,
  imports: [CardModule, ButtonModule, InputTextModule, FormsModule],
  templateUrl: './mission-vision-values.component.html',
  styleUrls: ['./mission-vision-values.component.css']
})
export class MissionVisionValuesComponent {
  private readonly service = inject(MissionVisionValuesService);
  
  readonly pillars = signal<Pillar[]>([]);
  readonly isEditMode = signal(false);
  readonly mission = signal('');
  readonly vision = signal('');
  readonly values = signal<string[]>([]);
  readonly newValue = signal('');

  constructor() {
    this.pillars.set(this.service.load());
  }

  toggleEditMode() {
    if (this.isEditMode()) {
      // Cancelar edição
      this.isEditMode.set(false);
    } else {
      // Entrar em modo de edição
      const currentPillars = this.pillars();
      this.mission.set(currentPillars[0]?.description || '');
      this.vision.set(currentPillars[1]?.description || '');
      this.values.set([...(currentPillars[2]?.values || [])]);
      this.isEditMode.set(true);
    }
  }

  addValue() {
    const value = this.newValue().trim();
    if (value) {
      this.values.set([...this.values(), value]);
      this.newValue.set('');
    }
  }

  removeValue(index: number) {
    const updated = [...this.values()];
    updated.splice(index, 1);
    this.values.set(updated);
  }

  clearAllValues() {
    this.values.set([]);
  }

  get canSave(): boolean {
    return this.mission().trim().length > 0 &&
           this.vision().trim().length > 0 &&
           this.values().length >= 3;
  }

  saveChanges() {
    if (!this.canSave) return;

    const updatedPillars = this.service.createPillarsFromForm(
      this.mission(),
      this.vision(),
      this.values()
    );

    this.service.save(updatedPillars);
    this.pillars.set(updatedPillars);
    this.isEditMode.set(false);
  }

  cancelEdit() {
    this.isEditMode.set(false);
  }
}
