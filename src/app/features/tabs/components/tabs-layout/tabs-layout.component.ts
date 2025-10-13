import { ChangeDetectionStrategy, Component, inject, signal, OnInit, PLATFORM_ID, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { filter, Subscription } from 'rxjs';

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
    
    /* Mobile optimizations */
    main {
      padding-bottom: 80px; /* Space for fixed bottom nav */
    }
    
    @media (min-width: 768px) {
      main {
        padding-bottom: 96px;
      }
    }
    
    /* Safe area for mobile devices with notches */
    .safe-area-inset-bottom {
      padding-bottom: env(safe-area-inset-bottom);
    }
    
    .pb-safe {
      padding-bottom: calc(80px + env(safe-area-inset-bottom));
    }
    
    @media (min-width: 768px) {
      .pb-safe {
        padding-bottom: calc(96px + env(safe-area-inset-bottom));
      }
    }
  `]
})
export class TabsLayoutComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private routerSubscription?: Subscription;

  readonly tabs = signal<TabItem[]>([
    { id: 'home', label: 'Fluxo', path: 'home', icon: '✨' },
    { id: 'ideas', label: 'Rituais', path: 'ideas', icon: '🔮' },
    { id: 'config', label: 'Config', path: 'config', icon: '⚙️' },
  ]);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Scroll inicial
      this.ensureTabsVisible();
      
      // Scroll em cada mudança de rota
      this.routerSubscription = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          this.ensureTabsVisible();
        });
    }
  }

  ngOnDestroy() {
    this.routerSubscription?.unsubscribe();
  }

  private ensureTabsVisible() {
    // Aguarda o DOM estar pronto
    setTimeout(() => {
      if (window.innerWidth <= 768) {
        // Scroll para o topo em mobile para garantir que as tabs estejam visíveis
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }, 100);
  }

  // Verifica se a rota atual é de ritual para ativar a tab Rituais
  isRitualRoute(tabPath: string): boolean {
    const currentUrl = this.router.url;
    if (tabPath === 'ideas') {
      return currentUrl.includes('/ideas') || currentUrl.includes('/ritual-');
    }
    return false;
  }
}
