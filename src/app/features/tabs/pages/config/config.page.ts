import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Accordion, AccordionModule } from 'primeng/accordion';
import { Textarea } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'f-tabs-config-page',
  standalone: true,
  imports: [FormsModule, AccordionModule, Textarea, ButtonModule],
  templateUrl: './config.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ConfigPage {
  readonly semanalText = signal('');
  readonly mensalText = signal('');

  finalizarSemanal() {
    console.log('Semanal finalizado:', this.semanalText());
  }

  finalizarMensal() {
    console.log('Mensal finalizado:', this.mensalText());
  }
}
