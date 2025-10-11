import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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

  ngOnInit(): void {
    // Minimum loading time of 3000ms
    setTimeout(() => {
      this.loading.set(false);
    }, 6000);
  }
}
