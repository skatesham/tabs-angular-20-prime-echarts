import { ChangeDetectionStrategy, Component, inject, signal, OnInit, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuantumActivitiesComponent } from '../../../../shared/ui/quantum-activities/quantum-activities.component';
import { WelcomeCardComponent } from '../../../../shared/ui/welcome-card/welcome-card.component';
import { GoalFocusComponent } from '../../../../shared/ui/goal-focus/goal-focus.component';
import { DailyTasksComponent } from '../../../../shared/ui/daily-tasks/daily-tasks.component';
import { DailyProgressChartComponent } from '../../../../shared/ui/daily-progress-chart/daily-progress-chart.component';
import { DailyMotivationComponent } from '../../../../shared/ui/daily-motivation/daily-motivation.component';
import { MissionVisionValuesComponent } from '../../../../shared/ui/mission-vision-values/mission-vision-values.component';
import { PageHeaderComponent } from '../../../../shared/ui/page-header/page-header.component';

@Component({
  selector: 'f-tabs-home-page',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, QuantumActivitiesComponent, WelcomeCardComponent, GoalFocusComponent, DailyTasksComponent, DailyProgressChartComponent, DailyMotivationComponent, MissionVisionValuesComponent],
  templateUrl: './home.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePage implements OnInit {
  readonly chartComponent = viewChild(DailyProgressChartComponent);

  ngOnInit() {
  }

  onProgressChanged(progress: { completed: number; total: number }) {
    this.chartComponent()?.updateTodayProgress(progress.completed, progress.total);
  }
}
