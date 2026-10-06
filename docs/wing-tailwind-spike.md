# Spike: WingCSS on Tailwind v4

**Verdict: easy.** The working port is about 240 lines of CSS across three files and took
well under a day. Wing is small enough (about 9 KB of unminified CSS) that this is a
translation, not a migration. The real work is deciding what to keep, because Wing and Tailwind
overlap heavily.

## Where it lives

| Path | Role |
| --- | --- |
| `src/styles/wing/tokens.css` | `@theme`: colors (OKLCH), type scale, shadow, radius |
| `src/styles/wing/base.css` | `@layer base`: element styles (headings, links, lists, code, buttons, forms) |
| `src/styles/wing/components.css` | `@layer components`: card, table, button group |
| `src/app/pages/wing-showcase/` | Lazy route `/wing`: the showcase page rebuilt on the port |

Wired in through `src/styles.scss` (`@use` of the three CSS files). Opt in by wrapping a page or
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
| `.row`, `.col`, `.col-1..12`, `.container`, `.cards`, `.nav*`, `hide-phone/tablet`, `center`, `horizontal-align`, `vertical-align`, `left`, `right`, `full-screen`, `pull-left/right` | Not ported | Tailwind's own `flex`/`grid`, `float-*`, `min-h-dvh`, `max-md:hidden` and width utilities cover these (e.g. `grid md:grid-cols-3`, `w-[min(100%-2rem,60rem)]`) |
| `.card*`, `.table` | `components` layer | `@apply` of utilities |
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
- **Links are underlined.** Tailwind's preflight strips the browser underline that Wing relied on,
  which left prose links distinguished by color alone. `base` restores it; `.card-footer-item`
  opts out.
- **Lists use outside markers.** Wing's `inside` markers made wrapped lines tuck under the bullet.
- **The table restacks** into label/value rows on mobile when its cells carry `data-label`
  instead of Wing's hidden horizontal scroll, which clipped content with no cue.
- **`.button-group`** (new) keeps adjacent buttons from touching.
- **Prose measure** is capped at 68ch, and inline `code` may wrap instead of forcing overflow.
- **Browser surfaces** are themed: `::selection`, caret and accent colors.
- **No outline-color transition.** Inputs animated `outline-color` from `currentcolor`, flashing a
  dark ring for 200ms when focus landed; only border and background animate now.

## Gotchas

1. **Do not port `html { font-size: 62.5% }`.** It makes `1rem = 10px` and would shrink every
   Tailwind spacing utility. The port keeps Tailwind's 16px root and converts Wing's rem values.
2. **Wing styles bare elements; this app has its own.** Unscoped, Wing's `p { margin-bottom }`
   and `h1` rules would reflow the existing profile card. Hence the `.wing` scope. `:where()`
   keeps specificity low and the `base` layer loses to any utility class.
3. **Name collisions.** Tailwind already owns `.table`, `.fixed`, `.hidden`; the port layers on
   top of them instead of redefining them.
4. **`styles.scss` is Sass.** Tailwind directives pass through Sass untouched here, so the plain
   `.css` files can be `@use`d. If the entry file ever becomes plain CSS, replace the `@use`
   lines with `@import`.
5. **Adding any route changes `/`.** `routes` was `[]`, which matches `/`. Adding `wing` alone
   made `/` unmatched and the build stopped prerendering it. Fixed with an explicit
   `{ path: '', pathMatch: 'full', children: [] }`. Worth knowing for any later route work.
6. **Showcase route hides the profile card** (`App.showProfile`), because the shell renders the
   profile unconditionally. If more pages are coming, moving the profile into a `Home` route is
   the cleaner fix, but `app.spec.ts` currently expects the shell to render the `h1`.
7. **A toggled `.wing` scope cannot sit inside another `.wing`.** The "drop it in" demo removes
   the class from its wrapper, so the page shell around it is deliberately not `.wing`; each
   section opts in. The `Snippet` component carries its own `wing` class for the same reason.
8. **`font-sans` is Avenir here.** `.wing` sets `font-sans`, and the project's `@theme` points
   `--font-sans` at the site's Avenir stack, so Wing inherits the site face instead of the
   system stack.
9. **Angular's critical-CSS inlining breaks layered Tailwind CSS.** It copies only the rules it
   can match to the prerendered HTML into an inline `<style>` and loads the rest later. It cannot
   match `@layer` rules scoped with `:where(.wing)`, so the first paint was the bare page (Arial
   heading, plain links, no background) and then snapped to the Wing design when the full
   stylesheet arrived. Production now sets `optimization.styles.inlineCritical: false`, so the
   stylesheet is a normal blocking `<link>`.
10. **Fonts are preloadable.** `@font-face` points at `/fonts/...` (served from `public/`, not
    hashed by the bundler), and `index.html` preloads the two faces above the fold, so text no
    longer swaps from a fallback face.
11. **The client router must finish its first navigation before rendering.** `showProfile` reads
    the URL, and with the default non-blocking initial navigation the client briefly rendered
    the profile card on `/wing` before switching. `withEnabledBlockingInitialNavigation()` makes
    the first client render match the server HTML.

## Landing page

The home page (`/`) now uses the library: `.wing` wrapper, paper background and `wing-card`
surface with `shadow-wing-card` (replacing the gray gradient and `rounded-3xl` card), the Edelsans
name at `text-wing-3`, secondary lines in `wing-gray-text`, and the inline link underlined by the
base layer. The six social links went from icon-only black circles to labelled Wing `outline`
buttons in a two-column list; the `title` tooltips, `href`, `target` and `rel` are unchanged.
Copy and content are unchanged.

Behavior changes to know about: the old rule that hid the sixth link on mobile is gone (a
two-column labelled grid fits all six), and the avatar now loads with `priority` (it is the LCP
image; the console warned about it).

## Critique follow-up

A design critique (run with the Impeccable skill, which lives on the separate
`chore/impeccable-design-skill` branch) scored `/wing` at 21/28. Every priority issue was
addressed: markup beside every component plus a live raw-versus-`.wing` toggle (P1); one h1, a
strict h2/h3/h4 outline, and specimens rendered as paragraphs (P1); a shorter hero, consistent
section rhythm, button groups (P2); stacked mobile table and placeholder contrast (P2); a sticky
back-to-site nav with `aria-current` (P3). Minor observations were also handled (alignment,
list markers, chip wrapping, distinct card copy, a form status message, a closing action).

## Verification

- `ng build` (dev and production) passes; `/` and `/wing` both prerender.
- Screenshots at 1280px and 390px for both pages: no horizontal page scroll, no new console
  errors. Heading outline checked in the browser: one h1, no skipped levels.
- Focus rings measured after transitions settle: 2px blue on buttons, links, inputs.
- `ng test`: 14 of 14 pass. Three new specs cover the showcase (heading outline, toggle, table
  labels). Three pre-existing failures were stale test data (`SocialLink` used an
  old `href`/`featherGithub` shape; `Profile` expected an initials span the component no longer
  renders) and are corrected.
- An automated design-detector scan of the pages and components: no findings.
- Not checked: real devices, dark mode, and a critique of the final state.

## Not done / open

- No dark mode. Wing has none; tokens are set up so adding it is a `@media`/`data-theme` remap.
- No visual-regression baseline against the original showcase.
- A later critique (`/wing` 25/36, landing page 21/28) left some findings open. On `/wing`: the
  "without Wing" toggle state shows Tailwind's reset instead of real browser defaults, and the
  card footer focus ring is clipped. On the landing page: no primary action among the links, and
  a generic identity.

## Recommendation

Adopt as a thin, opt-in layer if you want Wing's look. Drop the colliding or redundant utilities
(`text-*`, `hidden`, `fixed`, `position-*`) and lean on Tailwind for them. Keep tokens, base,
card, table. If the goal is just this site's aesthetic, the tokens plus a few
components are enough, and the base layer could shrink further.
