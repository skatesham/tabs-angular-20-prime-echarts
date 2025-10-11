import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PageHeaderComponent } from '../../../../shared/ui/page-header/page-header.component';

@Component({
  selector: 'f-tabs-ritual-monthly-page',
  standalone: true,
  imports: [PageHeaderComponent],
  templateUrl: './ritual-monthly.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RitualMonthlyPage {
  private readonly router = inject(Router);

  completeRitual() {
    const stored = localStorage.getItem('quantum-activities');
    const data = stored ? JSON.parse(stored) : {};
    data['monthly'] = Date.now();
    localStorage.setItem('quantum-activities', JSON.stringify(data));
    this.router.navigate(['/tabs/ideas']);
  }
}
