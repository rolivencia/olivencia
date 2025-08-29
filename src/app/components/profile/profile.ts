import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-profile',
  template: `
    <div class="mb-8 flex-col items-center">
      @if (profile(); as profile) {
        <div
          class="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-200"
        >
          <span class="text-2xl font-bold text-gray-600">{{ profile.imageUrl }}</span>
        </div>
        <h1 class="mb-2 text-2xl font-bold text-center">{{ profile.name }}</h1>
        <p class="mb-4 text-gray-600">{{ profile.description }}</p>
      }
    </div>
  `,
  styles: ``,
})
export class Profile {
  private calculateYearsOfExperience(): number {
    const diffInMs = new Date().getTime() - new Date('2014-05-01').getTime();
    const diffInYears = diffInMs / (1000 * 60 * 60 * 24 * 365.25);
    return Math.floor(diffInYears);
  }

  profile = signal({
    name: 'Ramiro Olivencia',
    imageUrl: 'RO',
    description: `R&D Software Engineer. Angular Tech Lead. ${this.calculateYearsOfExperience()}+ years as a professional in software engineering. Staff @ FrontendCafé`,
  });
}
