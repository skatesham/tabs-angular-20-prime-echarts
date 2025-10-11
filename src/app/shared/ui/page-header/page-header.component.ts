import { Component, input } from '@angular/core';

@Component({
  selector: 'p-page-header',
  standalone: true,
  templateUrl: './page-header.component.html'
})
export class PageHeaderComponent {
  readonly title = input.required<string>();
  readonly subtitle = input.required<string>();
  readonly icon = input.required<string>();
  readonly badgeIcon = input<string>('✨');
  readonly badgeLabel = input<string>('Ativo');
  readonly gradientFrom = input<string>('indigo-500');
  readonly gradientVia = input<string>('purple-500');
  readonly gradientTo = input<string>('pink-500');
}
