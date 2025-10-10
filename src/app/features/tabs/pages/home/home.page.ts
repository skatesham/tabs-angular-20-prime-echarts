import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyerService } from '../../../buyers/services/buyer.service';

@Component({
  selector: 'f-tabs-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePage implements OnInit {
  private buyerService = inject(BuyerService);

  readonly stats = signal<{ total: number }>({ total: 0 });
  readonly loading = signal(true);

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.loading.set(true);
    this.buyerService.getStats().subscribe({
      next: (data) => {
        console.log('Stats loaded:', data);
        this.stats.set({ total: data.total });
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading stats:', err);
        this.loading.set(false);
      }
    });
  }
}
