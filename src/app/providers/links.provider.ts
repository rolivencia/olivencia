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
      name: 'X',
      description: "Let's connect on X",
      icon: 'tablerBrandX',
      route: 'https://x.com/rolivencia',
      type: 'external',
    },
    {
      name: 'Book a meeting',
      description: 'Book a meeting with me on Google Calendar',
      icon: 'lucideCalendarClock',
      route: 'https://calendar.app.google/kUzbG7PHpF3QaiHV6',
      type: 'external',
    },
    {
      name: '500px',
      description: 'Pictures I took and shared on 500px',
      icon: 'lucideAperture',
      route: 'https://500px.com/p/rolivencia',
      type: 'external',
    },
  ]);
}
