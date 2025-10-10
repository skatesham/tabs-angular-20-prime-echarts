import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'f-tabs-ideas-page',
  standalone: true,
  templateUrl: './ideas.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IdeasPage {}
