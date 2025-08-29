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
      href: 'mailto:ramiro@olivencia.com.ar',
    },
    {
      name: 'LinkedIn',
      description: 'Browse my LinkedIn profile',
      icon: 'lucideLinkedin',
      href: 'https://www.linkedin.com/in/rolivencia',
    },
    {
      name: 'GitHub',
      description: 'Check my Github profile',
      icon: 'lucideGithub',
      href: 'https://github.com/rolivencia',
    },
    {
      name: 'Twitter',
      description: "Let's connect on Twitter",
      icon: 'lucideTwitter',
      href: 'https://twitter.com/rolivencia',
    },
    {
      name: 'Calendly',
      description: 'Book me using Calendly',
      icon: 'lucideCalendarClock',
      href: 'https://calendly.com/rolivencia',
    },
    {
      name: 'Spotify',
      description: 'Music? You have some Spotify playlists here',
      icon: 'lucideMusic',
      href: 'https://open.spotify.com/user/rolivencia',
    },
  ]);
}
