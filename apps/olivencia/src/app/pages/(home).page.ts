import { Component } from '@angular/core';

@Component({
  selector: 'olivencia-home',
  standalone: true,
  template: `
    <main class="h-screen">
      <section class="h-full grid grid-cols-1 md:grid-cols-[1fr_680px_1fr]">
        <h1 class="md:col-start-2 md:col-end-2">Página en Construcción</h1>
      </section>
    </main>`,
})
export default class HomeComponent {}
