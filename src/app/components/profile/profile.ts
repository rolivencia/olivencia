import { Component, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-profile',
  template: `
    <div class="flex-col items-center">
      @if (profile(); as profile) {
        <div
          class="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-wing-gray-line"
        >
          <img
            [ngSrc]="profile.imageUrl"
            class="rounded-full"
            height="128"
            width="128"
            alt="Ramiro's profile picture"
            priority
          />
        </div>
        <h1 class="font-edelsans text-wing-3 mb-3 text-center">
          {{ profile.name }}
        </h1>
        @for (line of profile.description; track $index) {
          <p
            class="mx-auto mb-1 text-center"
            [class.text-wing-gray-text]="!$first"
            [innerHTML]="line"
          ></p>
        }
      }
    </div>
  `,
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
    description: [
      'R&D Software Engineer — Angular Tech Lead.',
      `${this.calculateYearsOfExperience()}+ years crafting enterprise-grade web apps.`,
      `Staff @ <a href="https://frontend.cafe">FrontendCafé</a> online community`,
    ],
  });
}
