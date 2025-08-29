import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { SocialLink } from './components/social-link/social-link';
import { LinksProvider } from './providers/links.provider';

type TabType = 'professional' | 'projects' | 'about';

@Component({
  selector: 'app-root',
  imports: [NgIcon, RouterOutlet, SocialLink],
  styleUrl: './app.scss',
  template: `<main class="main">
      <div class="content">
        <div
          class="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-4"
        >
          <div class="mx-auto w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
            <!-- Profile Section -->
            <div class="mb-8 text-center">
              <div
                class="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-200"
              >
                <span class="text-2xl font-bold text-gray-600">RO</span>
              </div>
              <h1 class="mb-2 text-2xl font-bold">Ramiro Olivencia</h1>
              <p class="mb-4 text-gray-600">Angular Tech Lead | Senior Frontend Engineer</p>

              <!-- Social Links -->
              <div class="mb-6 justify-center flex space-x-4">
                @for (link of socialLinks(); track $index) {
                  <app-social-link [link]="link"></app-social-link>
                }
              </div>
            </div>

            <!-- Tabs -->
            <div class="mb-6 flex justify-center">
              <div class="flex space-x-1 rounded-lg bg-gray-100 p-1">
                <button
                  (click)="setActiveTab('professional')"
                  [class]="
                    activeTab() === 'professional' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  "
                  class="rounded-md px-4 py-2 text-sm font-medium transition-colors"
                >
                  Professional
                </button>
                <button
                  (click)="setActiveTab('projects')"
                  [class]="activeTab() === 'projects' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'"
                  class="rounded-md px-4 py-2 text-sm font-medium transition-colors"
                >
                  Projects
                </button>
                <button
                  (click)="setActiveTab('about')"
                  [class]="activeTab() === 'about' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'"
                  class="rounded-md px-4 py-2 text-sm font-medium transition-colors"
                >
                  About
                </button>
              </div>
            </div>

            <!-- Tab Content -->
            <div class="space-y-3">
              <!-- Professional Tab -->
              @if (activeTab() === 'professional') {
                <a
                  href="/resume.pdf"
                  download
                  class="flex w-full items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
                >
                  <div class="flex items-center">
                    <ng-icon name="file-text" class="mr-3"></ng-icon>
                    <span class="font-medium">Download Resume</span>
                  </div>
                  <ng-icon name="external-link"></ng-icon>
                </a>
              }
              <!-- Projects Tab -->
              @if (activeTab() === 'projects') {
                <a
                  href="https://github.com/rolivencia"
                  target="_blank"
                  class="flex w-full items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
                >
                  <div class="flex items-center">
                    <ng-icon name="github" class="mr-3"></ng-icon>
                    <span class="font-medium">GitHub Portfolio</span>
                  </div>
                  <ng-icon name="external-link"></ng-icon>
                </a>
                <a
                  href="https://cuentoneta.ar"
                  target="_blank"
                  class="flex w-full items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
                >
                  <div class="flex items-center">
                    <ng-icon name="external-link" class="mr-3"></ng-icon>
                    <span class="font-medium">La Cuentoneta</span>
                  </div>
                  <ng-icon name="external-link"></ng-icon>
                </a>
              }

              <!-- About Tab -->
              @if (activeTab() === 'about') {
                <div class="rounded-lg border border-gray-200 p-4">
                  <p class="text-sm leading-relaxed text-gray-700">
                    With more than 11 years of experience as a professional software developer, I
                    specialize in Angular development and team leadership. Currently working as
                    Angular Tech Lead at DOOR, developing innovative SaaS solutions.
                  </p>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </main>

    <router-outlet /> `,
})
export class App {
  readonly socialLinksProvider = inject(LinksProvider);

  activeTab = signal<TabType>('professional');
  socialLinks = computed(() => this.socialLinksProvider.links());

  setActiveTab(tab: TabType) {
    this.activeTab.set(tab);
  }
}
