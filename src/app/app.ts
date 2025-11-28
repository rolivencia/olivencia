import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SocialLink } from './components/social-link/social-link';
import { LinksProvider } from './providers/links.provider';
import { Profile } from './components/profile/profile';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SocialLink, Profile],
  template: `<main
      class="flex min-h-screen items-center justify-center bg:white sm:bg-gradient-to-br sm:from-gray-200 sm:to-gray-400 md:p-4"
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

    <router-outlet /> `,
})
export class App {
  readonly socialLinksProvider = inject(LinksProvider);

  socialLinks = computed(() => this.socialLinksProvider.links());
}
