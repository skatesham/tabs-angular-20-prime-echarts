import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PageHeaderComponent } from '../../../../shared/ui/page-header/page-header.component';

@Component({
  selector: 'f-tabs-ritual-daily-page',
  standalone: true,
  imports: [PageHeaderComponent],
  templateUrl: './ritual-daily.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RitualDailyPage {
  private readonly router = inject(Router);

  completeRitual() {
    // Salva conclusão no storage
    const stored = localStorage.getItem('quantum-activities');
    const data = stored ? JSON.parse(stored) : {};
    data['daily'] = Date.now();
    localStorage.setItem('quantum-activities', JSON.stringify(data));

    // Navega de volta para a página de rituais
    this.router.navigate(['/tabs/ideas']);
  }
}
