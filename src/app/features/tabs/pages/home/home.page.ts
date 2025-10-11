import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyerService } from '../../../buyers/services/buyer.service';
import { WelcomeCardComponent } from '../../../../shared/ui/welcome-card/welcome-card.component';
import { DailyTasksComponent } from '../../../../shared/ui/daily-tasks/daily-tasks.component';

@Component({
  selector: 'f-tabs-home-page',
  standalone: true,
  imports: [CommonModule, WelcomeCardComponent, DailyTasksComponent],
  templateUrl: './home.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePage implements OnInit {

  ngOnInit() {
  }

}
