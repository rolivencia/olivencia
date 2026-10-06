import { Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCalendarClock,
  lucideGithub,
  lucideLinkedin,
  lucideMail,
  lucideAperture,
  lucideTwitter,
} from '@ng-icons/lucide';

@Component({
  selector: 'app-social-link',
  imports: [NgIcon],
  viewProviders: [
    provideIcons({
      lucideGithub,
      lucideMail,
      lucideLinkedin,
      lucideTwitter,
      lucideCalendarClock,
      lucideAperture,
    }),
  ],
  template: `
    <a
      [href]="link().route"
      [title]="link().description"
      target="_blank"
      rel="noopener noreferrer"
      class="button outline my-0 w-full justify-start gap-3 px-4"
    >
      <ng-icon [name]="link().icon" [size]="'18'" aria-hidden="true" />
      <span>{{ link().name }}</span>
    </a>
  `,
  styles: ``,
})
export class SocialLink {
  link = input.required<Link>();
}
