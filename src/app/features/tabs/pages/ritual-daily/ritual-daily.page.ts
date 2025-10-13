import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PageHeaderComponent } from '../../../../shared/ui/page-header/page-header.component';
import { StorageService } from '../../../../core/services/storage.service';
import { STORAGE_KEY_QUANTUM_ACTIVITIES } from '../../../../config/storage';

@Component({
  selector: 'f-tabs-ritual-daily-page',
  standalone: true,
  imports: [PageHeaderComponent],
  templateUrl: './ritual-daily.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RitualDailyPage {
  private readonly router = inject(Router);
  private readonly storage = inject(StorageService);

  completeRitual() {
    // Salva conclusão no storage usando o service
    const data = this.storage.getItem<Record<string, number>>(STORAGE_KEY_QUANTUM_ACTIVITIES) || {};
    data['daily'] = Date.now();
    this.storage.setItem(STORAGE_KEY_QUANTUM_ACTIVITIES, data);

    // Navega de volta para a página de rituais
    this.router.navigate(['/tabs/ideas']);
  }
}
