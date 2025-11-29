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
      route: 'https://twitter.com/rolivenc',
      type: 'external',
    },
    {
      name: 'Calendly',
      description: 'Book me using Calendly',
      icon: 'lucideCalendarClock',
      route: 'https://calendly.com/rolivencia',
      type: 'external',
    },
    {
      name: 'Spotify',
      description: 'Music? You have some Spotify playlists here',
      icon: 'lucideMusic',
      route: 'https://open.spotify.com/user/11129071671?si=e5fd6aff7d774d17',
      type: 'external',
    },
  ]);
}
