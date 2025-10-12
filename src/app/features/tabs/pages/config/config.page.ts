import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageHeaderComponent } from '../../../../shared/ui/page-header/page-header.component';
import { MissionVisionValuesComponent } from '../../../../shared/ui/mission-vision-values/mission-vision-values.component';

@Component({
  selector: 'f-tabs-config-page',
  standalone: true,
  imports: [PageHeaderComponent, MissionVisionValuesComponent],
  templateUrl: './config.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ConfigPage {
  // Toda lógica de edição foi movida para MissionVisionValuesComponent
}
