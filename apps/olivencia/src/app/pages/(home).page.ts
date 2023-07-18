import { Component } from '@angular/core';

import { AnalogWelcomeComponent } from './analog-welcome.component';

@Component({
  selector: 'olivencia-home',
  standalone: true,
  // imports: [AnalogWelcomeComponent],
  template: `
    <main class="h-screen">
      <section class="h-full grid grid-cols-1 md:grid-cols-3">
        <h1 class="md:col-start-2 md:col-end-2">Página en Construcción</h1>
      </section>
    </main>`,
})
export default class HomeComponent {}
