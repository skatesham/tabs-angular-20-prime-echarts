import { Component, signal, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AppLoaderComponent } from './shared/ui/app-loader/app-loader.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppLoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('mana-vitae');
  protected readonly loading = signal(true);
  protected readonly showContent = signal(false);

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Minimum loading time of 6000ms
    setTimeout(() => {
      this.loading.set(false);
      // Pequeno delay para garantir que o DOM está pronto antes de mostrar o conteúdo
      setTimeout(() => {
        this.showContent.set(true);
      }, 100);
    }, 6000);
  }
}
