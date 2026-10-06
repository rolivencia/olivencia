import { Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerAperture,
  tablerBrandGithub,
  tablerBrandLinkedin,
  tablerBrandX,
  tablerCalendarClock,
  tablerMail,
} from '@ng-icons/tabler-icons';

@Component({
  selector: 'app-social-link',
  imports: [NgIcon],
  viewProviders: [
    provideIcons({
      tablerBrandGithub,
      tablerMail,
      tablerBrandLinkedin,
      tablerBrandX,
      tablerCalendarClock,
      tablerAperture,
    }),
  ],
  template: `
    <a
      [href]="link().route"
      [title]="link().description"
      target="_blank"
      rel="noopener noreferrer"
      class="flex items-center justify-center h-12 w-12  bg-black text-white rounded-full p-2 transition-colors hover:bg-gray-400"
    >
      <ng-icon [name]="link().icon" [size]="'20'" />
    </a>
  `,
  styles: ``,
})
export class SocialLink {
  link = input.required<Link>();
}
