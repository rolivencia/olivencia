import { Component, computed, linkedSignal, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBookText, lucideFileText, lucideGithub, lucideLink } from '@ng-icons/lucide';

type TabType = 'professional' | 'projects';
interface Tab {
  name: string;
  type: TabType;
  links: Array<Link>;
}

@Component({
  selector: 'app-tabs',
  imports: [NgIcon],
  viewProviders: [
    provideIcons({
      lucideGithub,
      lucideBookText,
      lucideFileText,
      lucideLink,
    }),
  ],
  template: `
    <!-- Tabs -->
    <div class="w-full mb-6 flex justify-center">
      <div class="w-full gap-1 rounded-lg bg-gray-100 p-1 grid grid-cols-2">
        @for (tab of tabs(); track $index) {
          <button
            (click)="setActiveTab(tab.type)"
            [class]="activeTabType() === tab.type ? 'bg-white shadow-sm' : 'hover:bg-gray-200'"
            class="rounded-md px-4 py-2 text-sm font-medium transition-colors hover:cursor-pointer"
          >
            {{ tab.name }}
          </button>
        }
      </div>
    </div>

    <!-- Tab Content -->
    <div class="space-y-3">
      @for (link of activeTab().links; track $index) {
        <a
          [href]="link.route"
          download
          class="flex w-full items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
        >
          <div class="flex items-center">
            <ng-icon [name]="link.icon" class="mr-3"></ng-icon>
            <span class="font-medium">{{ link.name }}</span>
          </div>
          <ng-icon name="lucideLink"></ng-icon>
        </a>
      }
    </div>
  `,
  styles: ``,
})
export class Tabs {
  tabs = signal<Tab[]>([
    {
      name: 'Professional',
      type: 'professional',
      links: [
        {
          name: 'Download resume',
          description: '',
          icon: 'lucideFileText',
          route: '/resume.pdf',
          type: 'external',
        },
      ],
    },
    {
      name: 'Projects',
      type: 'projects',
      links: [
        {
          name: 'GitHub Portfolio',
          description: '',
          icon: 'lucideGithub',
          route: 'https://github.com/rolivencia',
          type: 'external',
        },
        {
          name: 'La Cuentoneta',
          description: '',
          icon: 'lucideBookText',
          route: 'https://cuentoneta.ar',
          type: 'external',
        },
      ],
    },
  ]);
  activeTabType = linkedSignal(() =>
    this.tabs().length > 0 ? this.tabs()[0].type : 'professional',
  );
  activeTab = computed((): Tab => {
    const found = this.tabs().find((tab) => tab.type === this.activeTabType());
    if (!found) throw new Error('Active tab not found');
    return found;
  });

  setActiveTab(type: TabType) {
    this.activeTabType.set(type);
  }
}
