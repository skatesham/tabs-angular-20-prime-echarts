import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'f-tabs-config-page',
  standalone: true,
  templateUrl: './config.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ConfigPage {}
