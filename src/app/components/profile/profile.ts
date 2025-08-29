import { Component, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-profile',
  template: `
    <div class="flex-col items-center">
      @if (profile(); as profile) {
        <div
          class="mx-auto mb-4 flex h-32 w-32 items-center justify-between md:justify-center rounded-full bg-gray-200"
        >
          <img
            [ngSrc]="profile.imageUrl"
            class="text-2xl font-bold text-gray-600 rounded-full"
            height="128"
            width="128"
          />
        </div>
        <h1 class="mb-2 text-2xl font-bold text-center">{{ profile.name }}</h1>
        <p class="text-gray-600">{{ profile.description }}</p>
      }
    </div>
  `,
  styles: ``,
  imports: [NgOptimizedImage],
})
export class Profile {
  private calculateYearsOfExperience(): number {
    const diffInMs = new Date().getTime() - new Date('2014-05-01').getTime();
    const diffInYears = diffInMs / (1000 * 60 * 60 * 24 * 365.25);
    return Math.floor(diffInYears);
  }

  profile = signal({
    name: 'Ramiro Olivencia',
    imageUrl: 'profile.jpg',
    description: `R&D Software Engineer. Angular Tech Lead. ${this.calculateYearsOfExperience()}+ years as a professional in software engineering. Staff @ FrontendCafé`,
  });
}
