import { Component, input } from '@angular/core';

@Component({
  selector: 'p-page-header',
  standalone: true,
  templateUrl: './page-header.component.html'
})
export class PageHeaderComponent {
  readonly title = input.required<string>();
  readonly subtitle = input.required<string>();
  readonly icon = input<string>('');
  readonly logoImage = input<string>('');
  readonly badgeIcon = input<string>('✨');
  readonly badgeLabel = input<string>('Ativo');
  readonly gradientFrom = input<string>('emerald-500');
  readonly gradientVia = input<string>('green-400');
  readonly gradientTo = input<string>('teal-500');

  getGradientStyle(): string {
    // Mapa de cores - Foco em verdes da frequência 528 Hz
    const colorMap: Record<string, string> = {
      // Verdes - Frequência 528 Hz
      'emerald-400': 'rgb(52, 211, 153)',
      'emerald-500': 'rgb(16, 185, 129)',
      'emerald-600': 'rgb(5, 150, 105)',
      'green-400': 'rgb(74, 222, 128)',
      'green-500': 'rgb(34, 197, 94)',
      'green-600': 'rgb(22, 163, 74)',
      'teal-400': 'rgb(45, 212, 191)',
      'teal-500': 'rgb(20, 184, 166)',
      'teal-600': 'rgb(13, 148, 136)',
      // Outras cores
      'amber-500': 'rgb(245, 158, 11)',
      'orange-500': 'rgb(249, 115, 22)',
      'red-500': 'rgb(239, 68, 68)',
      'blue-500': 'rgb(59, 130, 246)',
      'indigo-500': 'rgb(99, 102, 241)',
      'purple-500': 'rgb(168, 85, 247)',
      'pink-500': 'rgb(236, 72, 153)',
      'rose-500': 'rgb(244, 63, 94)',
      'cyan-500': 'rgb(6, 182, 212)',
      'yellow-500': 'rgb(234, 179, 8)',
    };

    const from = colorMap[this.gradientFrom()] || colorMap['emerald-500'];
    const via = colorMap[this.gradientVia()] || colorMap['green-400'];
    const to = colorMap[this.gradientTo()] || colorMap['teal-500'];

    return `linear-gradient(135deg, ${from}, ${via}, ${to})`;
  }
}
