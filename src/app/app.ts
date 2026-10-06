import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { SocialLink } from './components/social-link/social-link';
import { LinksProvider } from './providers/links.provider';
import { Profile } from './components/profile/profile';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SocialLink, Profile],
  template: `@if (showProfile()) {
      <main class="wing flex min-h-svh items-center justify-center md:p-6">
        <div
          class="mx-auto flex min-h-svh w-full max-w-md flex-col justify-center bg-wing-card p-6 md:min-h-0 md:min-w-[480px] md:rounded-wing md:p-10 md:shadow-wing-card"
        >
          <app-profile class="mb-8" />

          <ul class="m-0 grid list-none grid-cols-1 gap-3 p-0 min-[27rem]:grid-cols-2">
            @for (link of socialLinks(); track $index) {
              <li class="mb-0"><app-social-link [link]="link" /></li>
            }
          </ul>
          <!--TODO: Implement tab navigation-->
          <!-- <app-tabs />-->
        </div>
      </main>
    }

    <router-outlet /> `,
})
export class App {
  readonly socialLinksProvider = inject(LinksProvider);

  private readonly router = inject(Router);
  private readonly url = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.url),
    ),
    { initialValue: this.router.url },
  );

  // The Wing showcase (spike) is a full-page route that replaces the profile card.
  readonly showProfile = computed(() => !this.url().startsWith('/wing'));

  socialLinks = computed(() => this.socialLinksProvider.links());
}
