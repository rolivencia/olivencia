import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** A labelled, scrollable markup sample. */
@Component({
  selector: 'app-snippet',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'wing block min-w-0' },
  template: `<pre
    class="mb-0"
    tabindex="0"
    role="region"
    [attr.aria-label]="label()"
  ><code>{{ code() }}</code></pre>`,
})
export class Snippet {
  readonly code = input.required<string>();
  readonly label = input('Markup sample');
}
