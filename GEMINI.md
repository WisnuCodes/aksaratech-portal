# Workspace Guidelines: Aksara Tech Portal & Design Taste System

## 1. Design Taste & Anti-Slop Laws (Adopted from `leonxlnx/taste-skill`)

When designing, refactoring, or building any UI component or page, strictly follow these core aesthetic and layout rules to eliminate "AI slop" (templated, generic AI appearance) and deliver human-crafted, executive-grade design:

### A. House Rules (Banned Patterns)
1. **No Monospace Outside Code:** Do NOT use monospace fonts (`var(--font-mono)`, `Courier`, `JetBrains Mono`) for tags, badges, dates, or captions. Monospace is strictly reserved for literal code snippets (`<code>`, `<pre>`).
2. **No Shadows at Rest:** Static cards, containers, and sections must NOT carry resting `box-shadow` or ambient blur glows. Shadows are strictly permitted only on true floating overlays (open dropdowns, modals, sticky navbars on scroll).
3. **No Thin Rules or 1px Hairlines:** Avoid decorative divider lines, thin 1px borders around everything, or crosshairs. Differentiate sections using space, contrast in background tone, or scale.
4. **No Eyebrow Pills / Badges Above Headings:** Never add a floating pill label or tiny uppercase kicker (e.g. `[ 01 // OVERVIEW ]` or `FEATURES`) right above a title. State what it is in the headline or the first sentence.
5. **No Decorative Index Numbering:** Do NOT put artificial numbers (`01`, `02`, `03`) on cards or feature blocks. Order is conveyed through hierarchy, position, or a semantic `<ol>`.
6. **No AI Gradients or Glowing Blobs:** Do NOT use multi-color radial gradients, rainbow buttons, or violet/indigo glow blobs. Use flat, intentional background colors, solid surface tone steps, or high-contrast typography.
7. **No Emoji as UI:** Never use consumer emojis (📌, 👉, ✨, 🔥, 🚀, ★) as UI icons. Always use precise, professional SVG vectors (e.g. Lucide icons).
8. **No Generic 3-Card Grids:** Avoid the cliché formula of dividing every section into identical 3-column icon cards. Vary section geometry (split hero, lists, full-bleed bands, horizontal strips, asymmetric editorial grids).
9. **No Glassmorphism Abuse:** Do NOT apply `backdrop-filter: blur` to every surface or card. Use solid surfaces with high readability.
10. **Headlines Two Lines or Fewer:** Ensure headlines fit in two lines or fewer at all viewport widths (390px, 768px, 1440px).

### B. Positive Principles of Taste
- **Substance Over Ornament:** Richness comes from confident type scale, real photography/illustrations, solid fields of color, and complete information, not decorative widgets.
- **Palette Discipline:** Stick to 1 ground, 1 ink (high contrast text), and 1 accent color (e.g. Aksara Tech Royal Blue `#2563EB` or Golden Amber `#F59E0B`). Running text must be in full ink, not washed-out grey.
- **Responsive Geometry:** Test and optimize for mobile (390px), tablet (768px), and desktop (1440px). Ensure touch targets are comfortable and mobile viewport heights use `100svh` / `100dvh` instead of jumping `100vh`.
- **Transitions:** Name specific animated properties (`transition: transform 0.2s, opacity 0.2s`) rather than lazy `transition: all`.

## 2. Anti-Slop System Rules (Adopted from `miqdadbadjuber/anti-slop`)

All UI development must adhere to the core rules of `miqdadbadjuber/anti-slop`:

### A. Iconography (R-04 Anti-Pattern: Generic AI Icons & Pastel Squares)
- **Monochrome & Ink-Toned:** Icons must be ink-toned (`#0F172A` or subtle ink `#334155`), not colored toys.
- **No Pastel Rainbow Squares:** Strictly ban wrapping icons in pastel-colored containers (`#EEF4FF`, `#FFF9E6`, `#ECFDF5`, `#FFF1F2`). Use subtle neutral surface (`#F1F5F9`) or no background container at all.
- **No Generic AI Glyphs:** Never use sparkle, star, magic wand, lightning, robot, or glowing orbs to represent features. Icons must be precise and functionally descriptive.

### B. Button Design & Interaction (R-08 Anti-Pattern: Gratuitous Arrows)
- **No Arrows on Every Button:** Do not append `→` or `↗` as a default decoration on CTAs. Arrows are strictly reserved for genuine forward progression (e.g. multi-step order wizards or paginations).
- **Executive Button Hierarchy:**
  - Primary CTA: Solid filled, clear typographic weight, high contrast.
  - Secondary CTA: Clean subtle surface or neutral outline.
  - WhatsApp CTA: Restrained official green accent (`#25D366`), functional phone/chat icon, no glowing or pulsing effects.

### C. Palette Discipline & Restraint (R-29)
- Cap active colors at 2–3 core tones (Ground `#F8FAFC`, Ink `#0F172A`, Surface `#FFFFFF`) + 1 accent (Brand Blue `#2563EB` or Brand Amber `#F59E0B`).
- Avoid scattering 5+ random colors across feature blocks or stat badges.

### D. Available Tooling
- Run static lint scan against anti-slop rules:
  ```bash
  node .agents/skills/design-taste-frontend/scripts/lint.mjs src/
  ```
- Inspect responsive viewports and visual renders:
  ```bash
  node .agents/skills/design-taste-frontend/scripts/inspect.mjs http://localhost:5173/ --out .taste-skill/inspect
  ```


