import { Injectable, inject } from '@angular/core';
import { StorageService } from './storage.service';
import { STORAGE_KEY_MISSION_VISION_VALUES } from '../../data/constants/storage-keys.constants';
import { DEFAULT_MISSION_VISION_VALUES, PILLAR_ICONS, PILLAR_COLORS, type Pillar } from '../../data/constants/mission-vision-values.constants';

@Injectable({
  providedIn: 'root'
})
export class MissionVisionValuesService {
  private readonly storage = inject(StorageService);

  load(): Pillar[] {
    const stored = this.storage.getItem<Pillar[]>(STORAGE_KEY_MISSION_VISION_VALUES);
    if (stored) {
      return stored;
    }
    
    // Primeira vez, salva os defaults
    const defaults = [...DEFAULT_MISSION_VISION_VALUES];
    this.save(defaults);
    return defaults;
  }

  save(pillars: Pillar[]): void {
    this.storage.setItem(STORAGE_KEY_MISSION_VISION_VALUES, pillars);
  }

  createPillarsFromForm(mission: string, vision: string, values: string[]): Pillar[] {
    return [
      {
        icon: PILLAR_ICONS.MISSION,
        title: 'Missão',
        description: mission,
        color: PILLAR_COLORS.MISSION
      },
      {
        icon: PILLAR_ICONS.VISION,
        title: 'Visão',
        description: vision,
        color: PILLAR_COLORS.VISION
      },
      {
        icon: PILLAR_ICONS.VALUES,
        title: 'Valores',
        values: values,
        color: PILLAR_COLORS.VALUES
      }
    ];
  }
}
