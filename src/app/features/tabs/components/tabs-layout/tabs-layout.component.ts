import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

interface TabItem {
  id: string;
  label: string;
  path: string;
  icon: string;
}

@Component({
  selector: 'f-tabs-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './tabs-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsLayoutComponent {
  private router = inject(Router);

  readonly tabs = signal<TabItem[]>([
    { id: 'home', label: 'Home', path: 'home', icon: '🏠' },
    { id: 'ideas', label: 'Ideas', path: 'ideas', icon: '💡' },
    { id: 'config', label: 'Config', path: 'config', icon: '⚙️' },
  ]);
}
