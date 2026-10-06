import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Snippet } from './snippet';
import { snippets, typeSpecimens, utilityRows } from './snippets';

const SECTION_IDS = ['demo', 'decisions', 'guide'] as const;

/** Spike: a port of the Wing showcase page (kbrsh/wing, gh-pages) running on Wing-for-Tailwind. */
@Component({
  selector: 'app-wing-showcase',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RouterLink, Snippet],
  templateUrl: './wing-showcase.html',
})
export class WingShowcase {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly snippets = snippets;
  protected readonly utilityRows = utilityRows;
  protected readonly typeSpecimens = typeSpecimens;

  protected readonly styled = signal(true);
  protected readonly colCount = signal(3);
  protected readonly cols = computed(() =>
    Array.from({ length: this.colCount() }, (_, i) => i + 1),
  );
  protected readonly activeSection = signal<string>('');
  protected readonly formStatus = signal('');

  protected readonly form = this.fb.nonNullable.group({
    name: '',
    type: 'message',
    message: '',
  });

  constructor() {
    afterNextRender(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries.find((entry) => entry.isIntersecting);
          if (visible) {
            this.activeSection.set(visible.target.id);
          }
        },
        { rootMargin: '-30% 0px -60% 0px' },
      );
      for (const id of SECTION_IDS) {
        const element = document.getElementById(id);
        if (element) {
          observer.observe(element);
        }
      }
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  toggleStyled() {
    this.styled.update((value) => !value);
  }

  addColumn() {
    this.colCount.update((count) => Math.min(count + 1, 12));
  }

  removeColumn() {
    this.colCount.update((count) => Math.max(count - 1, 1));
  }

  send() {
    this.formStatus.set('This is a demo form. Nothing was sent.');
  }
}
