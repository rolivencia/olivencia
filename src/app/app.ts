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
      <main
        class="flex h-svh items-center justify-center bg:white sm:bg-gradient-to-br sm:from-gray-200 sm:to-gray-400 md:p-4"
      >
        <div
          class="mx-auto w-full max-w-md md:rounded-3xl bg-white md:p-8 shadow-lg h-svh md:h-fit flex flex-col justify-center md:min-w-[480px]"
        >
          <app-profile class="mb-8" />

          <div class="mb-6 justify-center flex gap-4">
            @for (link of socialLinks(); track $index) {
              <!-- The special class hides social links when more than 5 exist in mobile layouts -->
              <app-social-link
                [link]="link"
                class="[*:last-child:nth-child(n+5)]:hidden md:[*:last-child:nth-child(n+5)]:block"
              />
            }
          </div>
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
