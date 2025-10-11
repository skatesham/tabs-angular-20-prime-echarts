import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'p-app-loader',
  standalone: true,
  templateUrl: './app-loader.component.html',
  styleUrl: './app-loader.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLoaderComponent {}
