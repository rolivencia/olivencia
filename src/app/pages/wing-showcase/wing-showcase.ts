import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

/** Spike: a port of the Wing showcase page (kbrsh/wing, gh-pages) running on Wing-for-Tailwind. */
@Component({
  selector: 'app-wing-showcase',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './wing-showcase.html',
})
export class WingShowcase {
  readonly colCount = signal(3);
  readonly cols = computed(() => Array.from({ length: this.colCount() }, (_, i) => i + 1));
  readonly canRemove = computed(() => this.colCount() > 1);

  readonly features = [
    {
      title: 'Intuitive',
      body: 'Wrap a page in .wing and every element is styled automatically. There is a minimal number of classes to learn.',
    },
    {
      title: 'Token-driven',
      body: 'Colors, type scale and shadows are Tailwind theme variables, so bg-wing-blue and text-wing-3 work anywhere.',
    },
    {
      title: 'Composable',
      body: 'Wing components sit in the components layer. Any Tailwind utility on the same element wins.',
    },
  ];

  readonly utilities = [
    ['center', 'center children on both axes'],
    ['horizontal-align', 'horizontally align children'],
    ['vertical-align', 'vertically align children'],
    ['left / right', 'align children to the left or right'],
    ['full-screen', 'full width, at least one viewport tall'],
    ['pull-left / pull-right', 'float the element'],
    ['hide-phone', 'hide at 400px and below'],
    ['hide-tablet', 'hide at 768px and below'],
  ] as const;

  readonly languages = [
    { name: 'Wing (Stylus)', size: '5 kB', layer: 'global CSS' },
    { name: 'Wing for Tailwind', size: 'tree-shaken', layer: 'base + components' },
  ];

  addColumn() {
    this.colCount.update((n) => Math.min(n + 1, 12));
  }

  removeColumn() {
    this.colCount.update((n) => Math.max(n - 1, 1));
  }
}
