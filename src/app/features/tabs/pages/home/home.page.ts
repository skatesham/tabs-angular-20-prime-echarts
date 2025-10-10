import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'f-tabs-home-page',
  standalone: true,
  templateUrl: './home.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePage {}
