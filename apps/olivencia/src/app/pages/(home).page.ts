import { Component } from '@angular/core';

import { AnalogWelcomeComponent } from './analog-welcome.component';

@Component({
  selector: 'olivencia-home',
  standalone: true,
  imports: [AnalogWelcomeComponent],
  template: ` <olivencia-analog-welcome /> `,
})
export default class HomeComponent {}
