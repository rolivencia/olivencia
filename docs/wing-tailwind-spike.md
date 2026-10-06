# Spike: WingCSS on Tailwind v4

**Verdict: easy.** The working port is about 330 lines of CSS across four files and took
well under a day. Wing is small enough (about 9 KB of unminified CSS) that this is a
translation, not a migration. The real work is deciding what to keep, because Wing and Tailwind
overlap heavily.

## Where it lives

| Path | Role |
| --- | --- |
| `src/styles/wing/tokens.css` | `@theme`: colors (OKLCH), type scale, shadow, radius |
| `src/styles/wing/base.css` | `@layer base`: element styles (headings, links, lists, code, buttons, forms) |
| `src/styles/wing/components.css` | `@layer components`: grid, nav, card, table |
| `src/styles/wing/utilities.css` | `@utility`: Wing-only helpers (`center`, `hide-phone`, ...) |
| `src/app/pages/wing-showcase/` | Lazy route `/wing`: the showcase page rebuilt on the port |

Wired in through `src/styles.scss` (`@use` of the four CSS files). Opt in by wrapping a page or
section in `class="wing"`. Nothing outside that wrapper changes.

## Which "Wing" was ported

The showcase and the repo's `master` are different code bases.

- `master`'s `dist/wing.css` (Stylus source, 15 partials): px/16px base, fixed 12-column widths,
  no table, plain bordered card.
- `gh-pages` `dist/wing.css`, which the showcase page links: 62.5% root font-size and rem units,
  flex-weight grid (`.col-N` is `flex: N`), a **table** with a responsive variant, shadowed card
  with header/body/footer, `.nav-menu`/`.nav-brand`/`.nav-logo`, `pull-*`, `hide-phone`,
  `hide-tablet`, `vertical-align`/`horizontal-align`/`left`/`right`, slightly different blue.

The port follows `gh-pages`, so your note was right. Caveat: `kbrsh.github.io` is blocked by this
environment's network policy, so I read the showcase's source from the `gh-pages` branch
(`index.html`, `css/styles.css`, `dist/wing.css`) rather than the live site. If the live page was
deployed from something newer than that branch (last commit 2018-05-31), differences would be
missed.

## Wing to Tailwind mapping

| Wing | In Tailwind | Notes |
| --- | --- | --- |
| `color-*`, `background-*`, `border-*` utilities | `text-wing-*`, `bg-wing-*`, `border-wing-*` | Free from `@theme` colors |
| `text-left/center/right` | same names, native | Not reimplemented |
| `full-width`, `hidden`, `fixed`, `position-*` | `w-full`, `hidden`, `fixed`, `relative`... | Native; no port |
| `pull-left/right` | `float-left/right` | Kept as aliases |
| `hide-phone/tablet` | `max-[25rem]:hidden`, `max-md:hidden` | Kept as `@utility` for parity |
| `center`, `horizontal-align`, `vertical-align`, `left`, `right`, `full-screen` | `@utility` | Compose with variants (`md:center`) |
| `.container` | `@utility container` | **Overrides** Tailwind's: 80% wide, 60rem max |
| `.row`, `.col`, `.col-1..12` | `components` layer | Uses `gap`, not margin-left hacks |
| `.nav*`, `.card*`, `.table(.responsive)` | `components` layer | `@apply` of utilities |
| Bare-element styling (`h1`, `button`, `input`...) | `base` layer, scoped `:where(.wing)` | See "Gotchas" |
| 768px media query | `max-md:` | Same value |

## Design changes versus original Wing

Made deliberately while porting; each is a small, reversible deviation.

- **Focus is visible.** Wing sets `outline: none` on buttons and inputs with no replacement.
  Now `:focus-visible` shows a 2px blue outline.
- **No fixed heights.** `height: 45px` became `min-height` so large text and zoom do not clip.
- **Secondary text contrast.** The showcase nav uses `#797979` on `#f5f5f5` (about 4:1, fails
  AA). Token `wing-gray-text` is about 6.0:1. `wing-gray` (2.5:1 on white) is for borders only.
- **Fluid type scale.** The two-step breakpoint scale became `clamp()` tokens
  (`text-wing-1`..`6`).
- **Reduced motion.** Transitions collapse under `prefers-reduced-motion`.
- **Color in OKLCH**, as theme tokens, so they can be remapped to the site's palette in one place.

## Gotchas

1. **Do not port `html { font-size: 62.5% }`.** It makes `1rem = 10px` and would shrink every
   Tailwind spacing utility. The port keeps Tailwind's 16px root and converts Wing's rem values.
2. **Wing styles bare elements; this app has its own.** Unscoped, Wing's `p { margin-bottom }`
   and `h1` rules would reflow the existing profile card. Hence the `.wing` scope. `:where()`
   keeps specificity low and the `base` layer loses to any utility class.
3. **Name collisions.** Tailwind already owns `.container`, `.table`, `.fixed`, `.hidden`. The
   port overrides `container` on purpose and layers on top of the others.
4. **`styles.scss` is Sass.** Tailwind directives pass through Sass untouched here, so the plain
   `.css` files can be `@use`d. If the entry file ever becomes plain CSS, replace the `@use`
   lines with `@import`.
5. **Adding any route changes `/`.** `routes` was `[]`, which matches `/`. Adding `wing` alone
   made `/` unmatched and the build stopped prerendering it. Fixed with an explicit
   `{ path: '', pathMatch: 'full', children: [] }`. Worth knowing for any later route work.
6. **Showcase route hides the profile card** (`App.showProfile`), because the shell renders the
   profile unconditionally. If more pages are coming, moving the profile into a `Home` route is
   the cleaner fix, but `app.spec.ts` currently expects the shell to render the `h1`.

## Verification

- `ng build` (dev and production) passes; `/` and `/wing` both prerender.
- Screenshots at 1280px and 390px: no horizontal page scroll, no console errors from the new code.
- `ng test`: 3 failures, **identical before and after** this branch (`Profile` initials span,
  two `SocialLink` specs). Pre-existing; not touched.
- The responsive table scrolls horizontally on phones (Wing's own design); not yet tested on a
  real device.

## Not done / open

- **Impeccable was not used.** It is not among the skills or plugins available to this session,
  so the design pass above is my own judgment against its general themes (accessible focus and
  contrast, fluid type, tokens, motion). If you install it, running its critique/polish pass
  over `/wing` is the obvious next step.
- No dark mode. Wing has none; tokens are set up so adding it is a `@media`/`data-theme` remap.
- Not integrated into the home page; the spike only adds `/wing`.
- No visual-regression baseline against the original showcase.

## Recommendation

Adopt as a thin, opt-in layer if you want Wing's look. Drop the colliding or redundant utilities
(`text-*`, `hidden`, `fixed`, `position-*`) and lean on Tailwind for them. Keep tokens, base,
grid, card, nav, table. If the goal is just this site's aesthetic, the tokens plus a few
components are enough, and the base layer could shrink further.
