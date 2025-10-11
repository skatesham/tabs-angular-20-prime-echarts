import { ChangeDetectionStrategy, Component } from '@angular/core';
import { QuantumActivitiesComponent } from '../../../../shared/ui/quantum-activities/quantum-activities.component';
import { PageHeaderComponent } from '../../../../shared/ui/page-header/page-header.component';

@Component({
  selector: 'f-tabs-ideas-page',
  standalone: true,
  imports: [PageHeaderComponent, QuantumActivitiesComponent],
  templateUrl: './ideas.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IdeasPage {}
