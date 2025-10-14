import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { QuantumActivitiesComponent } from '../../../../shared/ui/quantum-activities/quantum-activities.component';
import { WelcomeCardComponent } from '../../../../shared/ui/welcome-card/welcome-card.component';
import { GoalFocusComponent } from '../../../../shared/ui/goal-focus/goal-focus.component';
import { DailyTasksComponent } from '../../../../shared/ui/daily-tasks/daily-tasks.component';
import { DailyMotivationComponent } from '../../../../shared/ui/daily-motivation/daily-motivation.component';
import { MissionVisionValuesComponent } from '../../../../shared/ui/mission-vision-values/mission-vision-values.component';
import { PageHeaderComponent } from '../../../../shared/ui/page-header/page-header.component';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'f-tabs-home-page',
  standalone: true,
  imports: [CommonModule, AnimateOnScrollModule, PageHeaderComponent, QuantumActivitiesComponent, WelcomeCardComponent, GoalFocusComponent, DailyTasksComponent, DailyMotivationComponent, MissionVisionValuesComponent],
  templateUrl: './home.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePage {
  readonly appVersion = environment.version;
}
