import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'olivencia-home',
  standalone: true,
  template: `
    <main class="h-screen">
      <article class="h-full grid grid-cols-1 md:grid-cols-[1fr_680px_1fr]">
        <section class="md:col-start-2 md:col-end-2">
          <div class="grid grid-col-1 gap-6">
            <ng-container *ngFor="let link of links">
              <div class="h-8 border-2">
                <a [href]="link.href">{{link.icon}} - {{link.label}}</a>
              </div>
            </ng-container>
          </div>
        </section>
      </article>
    </main>`,
  imports: [
    NgForOf
  ]
})
export default class HomeComponent {
  readonly links: Link[] = [
    {
      label: 'Discord',
      href: 'https://discord.com/users/378749330506383360',
      icon: '🎮',
    },
    {
      label: 'Email',
      href: 'mailto:ramiro@olivencia.com',
      icon: '✉️',
    },
    {
      label: 'GitHub',
      href: 'https://github.com/rolivencia',
      icon: '🐙',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/rolivencia/',
      icon: '👔',
    },
    {
      label: 'Spotify',
      href: 'https://open.spotify.com/user/11129071671',
      icon: '🎧',
    },
    {
      label: 'Telegram',
      href: 'https://t.me/rolivencia',
      icon: '✈️',
    },
    {
      label: 'Twitter',
      href: 'https://twitter.com/rolivenc',
      icon: '🐦',
    },
  ]
}

interface Link {
  label: string
  href: string
  icon: string
}
