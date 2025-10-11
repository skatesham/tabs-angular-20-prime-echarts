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
  styles: [`
    .active-tab .tab-button {
      background: linear-gradient(to bottom right, rgb(59 130 246), rgb(37 99 235));
      color: white;
      box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
      transform: scale(1.1);
    }
    .active-tab span:last-child {
      color: rgb(37 99 235);
      font-weight: 600;
    }
    @media (prefers-color-scheme: dark) {
      .active-tab .tab-button {
        background: linear-gradient(to bottom right, rgb(37 99 235), rgb(29 78 216));
      }
      .active-tab span:last-child {
        color: rgb(96 165 250);
      }
    }
  `]
})
export class TabsLayoutComponent {
  private router = inject(Router);

  readonly tabs = signal<TabItem[]>([
    { id: 'home', label: 'Fluxo', path: 'home', icon: '✨' },
    { id: 'ideas', label: 'Rituais', path: 'ideas', icon: '🔮' },
    { id: 'config', label: 'Config', path: 'config', icon: '⚙️' },
  ]);

  // Verifica se a rota atual é de ritual para ativar a tab Rituais
  isRitualRoute(tabPath: string): boolean {
    const currentUrl = this.router.url;
    if (tabPath === 'ideas') {
      return currentUrl.includes('/ideas') || currentUrl.includes('/ritual-');
    }
    return false;
  }
}
