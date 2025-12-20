import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LinksProvider {
  links = signal<Array<Link>>([
    {
      name: 'Email',
      description: 'Send me an email',
      icon: 'lucideMail',
      route: 'mailto:ramiro@olivencia.com.ar',
      type: 'external',
    },
    {
      name: 'LinkedIn',
      description: 'Browse my LinkedIn profile',
      icon: 'lucideLinkedin',
      route: 'https://www.linkedin.com/in/rolivencia',
      type: 'external',
    },
    {
      name: 'GitHub',
      description: 'Check my Github profile',
      icon: 'lucideGithub',
      route: 'https://github.com/rolivencia',
      type: 'external',
    },
    {
      name: 'Twitter',
      description: "Let's connect on Twitter",
      icon: 'lucideTwitter',
      route: 'https://twitter.com/rolivencia',
      type: 'external',
    },
    {
      name: 'Calendar appointment',
      description: 'Book me via a Google Calendar appointment',
      icon: 'lucideCalendarClock',
      route: 'https://calendar.app.google/KjNqTaA2QuQaNtrR8',
      type: 'external',
    },
    {
      name: 'VSCO',
      description: 'Pictures I took and shared on VSCO',
      icon: 'lucideCamera',
      route: 'https://vsco.co/rolivencia/gallery',
      type: 'external',
    },
  ]);
}
