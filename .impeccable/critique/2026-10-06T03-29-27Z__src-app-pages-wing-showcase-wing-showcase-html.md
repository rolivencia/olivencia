---
target: Wing showcase /wing (fresh run)
total_score: 25
max_score: 36
na_heuristics: 7
p0_count: 0
p1_count: 2
target_identity: "file:/home/user/olivencia/src/app/pages/wing-showcase/wing-showcase.html"
target_fingerprint: "sha256:6cd37f484f6fa410039d8dfdf217c14a18d14dc7c591215bd0ea768875a9c7c6"
target_path: /home/user/olivencia/src/app/pages/wing-showcase/wing-showcase.html
timestamp: 2026-10-06T03-29-27Z
slug: src-app-pages-wing-showcase-wing-showcase-html
---
Method: dual-agent (A: design review · B: detector + browser overlay), isolated; neither saw the prior critique. Detector clean (0 findings, CLI and overlay at 1280 and 390).

Score 25/36 (heuristic 7 n/a). Not like-for-like with the first run (21/28, 7/9/10 n/a).

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | aria-current scroll-spy has no visible "current" style |
| 2 | Match System / Real World | 3 | "Decisions" is a vague label |
| 3 | User Control and Freedom | 3 | Toggle reversible; no form reset |
| 4 | Consistency and Standards | 2 | Section h3s (semibold, small) contradict the specimen scale (light, large); outlined buttons heavier than filled; snippets differ from demos |
| 5 | Error Prevention | 3 | Column bounds guarded |
| 6 | Recognition Rather Than Recall | 3 | Snippet beside every demo |
| 7 | Flexibility and Efficiency | n/a | Docs showcase |
| 8 | Aesthetic and Minimalist Design | 2 | About 12 identical grey code slabs carry as much weight as the demos |
| 9 | Error Recovery | 3 | No real error states shown |
| 10 | Help and Documentation | 2 | No copy buttons; snippets truncated ("…"); footer cites "repository notes" with no link |

Specimen verdict: partly authored (Edelsans hero, hairline h2 rules, the live toggle), but the Guide is a stock docs rhythm repeated seven times.

Priority issues:
- [P1] The "without Wing" state is Tailwind preflight, not real browser-default HTML, so the before/after is rigged. Fix: revert to browser defaults in the off state or label it honestly; make the toggle a two-sided switch. (clarify)
- [P1] Card footer focus ring is clipped by overflow-hidden on .card/.cards; 13 pre tab stops clutter the keyboard path. Fix: inset focus on card-footer-item, padding instead of clipping, tab stop only when scrollable, add Copy. (harden)
- [P2] Code slabs flatten hierarchy and under-serve docs. Fix: one unit per demo (Preview | Markup), lighter code, full copyable snippets. (distill)
- [P2] Type scale contradicts itself (see heuristic 4). (typeset)
- [P3] Mobile: 80% container wastes width and wraps code mid-tag; nav wraps unevenly; table labels repeat 20 times. (adapt)

Persona red flags: Sam (clipped card focus, long tab order, visually unstyled aria-current), Jordan (install snippet assumes SCSS and Tailwind v4; preflight "before"), Casey (narrow content, mid-tag code wrap, non-sticky 3-line nav).

Minor: H1 uses a bespoke size outside text-wing-1; grid cells and code share the same grey; .wing re-applies the paper background when nested; dead space under Decisions and card bodies.

Questions: Why does a showcase for minimalists use a dozen grey boxes? What if the page itself were a real Wing-built page with the guide as annotations? Does the honest story (tokens plus layers) deserve a live token editor?
