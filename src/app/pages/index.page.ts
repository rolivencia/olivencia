import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <p>Website under construction 🛠️</p>
  `,
  styles: [
    ``,
  ],
})
export default class HomeComponent {
  count = 0;

  increment() {
    this.count++;
  }
}
