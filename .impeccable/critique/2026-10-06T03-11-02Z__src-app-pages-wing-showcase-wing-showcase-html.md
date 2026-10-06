---
target: Wing showcase /wing
total_score: 21
max_score: 28
na_heuristics: 7,9,10
p0_count: 0
p1_count: 2
target_identity: "file:/home/user/olivencia/src/app/pages/wing-showcase/wing-showcase.html"
target_fingerprint: "sha256:9d60210f4db9f8c73ed86511a8ecd7dd90ae26a7b298abeecb94a37089bf07d6"
target_path: /home/user/olivencia/src/app/pages/wing-showcase/wing-showcase.html
timestamp: 2026-10-06T03-11-02Z
slug: src-app-pages-wing-showcase-wing-showcase-html
---
Method: dual-agent (A: design review · B: detector + browser overlay), run in isolation; B's findings entered synthesis after A finished.

## Design Health Score (7, 9, 10 n/a: showcase/reading surface, inert form, page is the docs)

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Top nav scrolls away, no current-section state on a 3,379px page (4,664px on phone) |
| 2 | Match System / Real World | 3 | Placeholder copy ("Header", "Item", "Logo"); table compares unlike things |
| 3 | User Control and Freedom | 3 | No link back to the site; /wing is a dead end |
| 4 | Consistency and Standards | 2 | h2 section labels quieter than h3 sub-heads; specimen h1-h6 pollute the outline; Add/Remove buttons touch |
| 5 | Error Prevention | 3 | Column demo clamped 1..12 with disabled state |
| 6 | Recognition Rather Than Recall | 2 | No markup shown anywhere; class names only in prose |
| 7 | Flexibility and Efficiency | n/a | Reading surface |
| 8 | Aesthetic and Minimalist Design | 3 | Restrained, but 70vh empty hero and uneven rhythm |
| 9 | Error Recovery | n/a | No error states exist |
| 10 | Help and Documentation | n/a | The page is the documentation |
| **Total** | | **21/28** | **Good (75%)** |

## Design Specificity Verdict
LLM: authored for its category, not for this product. A faithful, disciplined Wing port, but a generic component dump; swap the name and nothing changes. It shows output, never the "drop it in" markup that is the framework's claim.
Deterministic: `impeccable detect` static scan clean (0 findings, exit 0). Browser overlay: 3 findings (2x low-contrast placeholder 3.3:1 on #name and #message, from `placeholder:text-wing-gray-text/70` in base.css; 1x skipped-heading h3 "Navigation" -> h5 "Logo"). No false positives of note; the heading skip is partly intentional demo markup but is real in the DOM. The LLM review missed the placeholder contrast; the detector missed the duplicate h1 and inverted heading hierarchy. Both agree heading structure is wrong.

## Priority Issues
- **[P1] No code shown anywhere.** Fix: 3-6 line markup snippet per component, install line, before/after hero. Command: clarify, then delight.
- **[P1] Heading hierarchy inverted and structurally muddled.** h2 labels are the faintest elements; specimen block adds a second h1 and h2-h6 to the outline; h3 -> h5 skip in nav demo. Fix: strengthen section level, render specimens as non-heading elements, use h4 for nav-logo. Command: typeset.
- **[P2] Rhythm inconsistent; hero is dead space** (70vh, nothing below fold; Add/Remove column buttons touch). Command: layout.
- **[P2] Phone table clipped with no scroll cue; two-row table compares unlike things; placeholder text 3.3:1.** Command: adapt (and fix placeholder opacity).
- **[P3] Nav has no wayfinding or exit to the site.** Command: polish.

## Persona Red Flags
Alex (dev reading docs): no code to copy, no install command, no jump nav. Sam (a11y): all 17 tab stops show a 2px ring and body contrast is fine, but placeholders fail 4.5:1, specimen headings pollute heading navigation, and input focus ring was reported rendering ink rather than blue (not independently verified). Casey (mobile): 4,664px scroll with no sticky nav, table text clipped.

## Minor Observations
Mixed alignment in feature columns; `list-style: inside` wraps under the bullet on phone; "left / right" in one code chip reads like a literal class; Send button is silent; cards identical; page ends abruptly on a utilities list.

## Questions to Consider
- Why does a showcase for minimalists need eight sections?
- Is this a Wing product page or a portfolio piece, and where is the authorship (OKLCH tokens, scoped `:where(.wing)`, restored focus)?
- What if the hero toggled `.wing` on a raw unstyled form live?
