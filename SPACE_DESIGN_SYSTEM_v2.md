# 🚀 Space Portfolio — Design System v2.0
### Theme: "Mission Patch" — Monochrome + Gold + Signal Red

---

## 01 · CONCEPT

**"Apollo Monochrome"** — The aesthetic of NASA mission documentation, vintage astronaut patches,
and precision engineering manuals. Black and white as the foundation — clinical, authoritative.
Gold as the mark of excellence and craft. Red as the signal — used sparingly, only when it matters.

Think: the Apollo 13 mission log. A luxury chronograph. A classified briefing document.

---

## 02 · COLOR PALETTE

### Core — The Void & The Light

| Token                  | Hex       | Usage                                       |
|------------------------|-----------|---------------------------------------------|
| `--abyss`              | `#080808` | True page background                        |
| `--deep`               | `#111111` | Card / panel backgrounds                    |
| `--surface`            | `#1A1A1A` | Elevated surfaces, nav, inputs              |
| `--ridge`              | `#262626` | Borders, dividers                           |
| `--muted`              | `#404040` | Disabled states, subtle borders             |
| `--smoke`              | `#8A8A8A` | Secondary / body text                       |
| `--ash`                | `#C2C2C2` | Primary body text                           |
| `--stellar`            | `#F0F0F0` | Headings, high-emphasis text                |
| `--white`              | `#FAFAFA` | Maximum contrast text, icon fills           |

### Gold — The Craft

| Token                  | Hex       | Usage                                       |
|------------------------|-----------|---------------------------------------------|
| `--gold-deep`          | `#7A5C1E` | Gold in shadow / dark borders               |
| `--gold`               | `#C9921A` | Primary gold — buttons, active states       |
| `--gold-mid`           | `#D4A843` | Hover states, highlights                    |
| `--gold-bright`        | `#E8C56A` | Text on dark, icon fills                    |
| `--gold-glow`          | `rgba(201, 146, 26, 0.2)` | Box shadow, glows              |
| `--gold-shimmer`       | `rgba(232, 197, 106, 0.08)` | Card shimmer, surface sheen  |

### Red — The Signal

| Token                  | Hex       | Usage                                       |
|------------------------|-----------|---------------------------------------------|
| `--signal`             | `#C0392B` | Primary red — critical CTAs, alerts         |
| `--signal-bright`      | `#E74C3C` | Hover state of signal red                   |
| `--signal-muted`       | `rgba(192, 57, 43, 0.15)` | Red-tinted surface bg     |
| `--signal-glow`        | `rgba(231, 76, 60, 0.25)` | Red glow / shadow          |

### Usage Rules (STRICT)
```
Gold  → achievements, featured projects, primary CTA, your name, section numbers
Red   → ONE hero CTA button max, error states, "live" indicators, accent on hover
White/Grey → everything else — body text, cards, nav, general UI
```

---

## 03 · TYPOGRAPHY

### Font Stack

```css
/* DISPLAY — Hero name, section titles */
font-family: 'Cormorant Garamond', serif;
/* → Timeless, editorial, slightly military. Used by luxury brands. */
/* → Google Fonts: https://fonts.google.com/specimen/Cormorant+Garamond */

/* HEADINGS / UI — Card titles, nav, labels */
font-family: 'Barlow Condensed', sans-serif;
/* → Condensed, structured, technical. Evokes mission documentation. */
/* → Google Fonts: https://fonts.google.com/specimen/Barlow+Condensed */

/* BODY — Prose, descriptions */
font-family: 'Lato', sans-serif;
/* → Clean, neutral, high legibility on dark backgrounds. */
/* → Google Fonts: https://fonts.google.com/specimen/Lato */

/* CODE / DATA — Metrics, code, coordinates */
font-family: 'IBM Plex Mono', monospace;
/* → Technical authority, clean geometric mono. */
/* → Google Fonts: https://fonts.google.com/specimen/IBM+Plex+Mono */
```

### Type Scale

| Level      | Size        | Weight | Font               | Transform    | Usage                    |
|------------|-------------|--------|--------------------|--------------|--------------------------|
| `hero`     | `6rem`      | 700    | Cormorant Garamond | Uppercase    | Your name in hero        |
| `display`  | `3.5rem`    | 600    | Cormorant Garamond | —            | Section hero text        |
| `h1`       | `2.5rem`    | 700    | Barlow Condensed   | Uppercase    | Page titles              |
| `h2`       | `1.75rem`   | 600    | Barlow Condensed   | Uppercase    | Section headings         |
| `h3`       | `1.25rem`   | 600    | Barlow Condensed   | —            | Card titles              |
| `label`    | `0.7rem`    | 700    | Barlow Condensed   | Uppercase + wide tracking | Tags, badges  |
| `body-lg`  | `1.125rem`  | 400    | Lato               | —            | Lead paragraphs          |
| `body`     | `1rem`      | 400    | Lato               | —            | General body text        |
| `caption`  | `0.875rem`  | 400    | Lato               | —            | Metadata, timestamps     |
| `data`     | `0.85rem`   | 400    | IBM Plex Mono      | —            | Coords, numbers, code    |

> **Key pairing:** Your name in `Cormorant Garamond` at hero size, in white, will look
> incredible on a near-black background with a gold underline or accent.

---

## 04 · BUTTONS

### Border Radius Philosophy
Tighter, more geometric than the previous system. Panels, not bubbles.

| Size    | Padding          | Font Size | Border Radius | Letter Spacing |
|---------|------------------|-----------|---------------|----------------|
| `sm`    | `6px 16px`       | `0.7rem`  | `4px`         | `+0.06em`      |
| `md`    | `10px 24px`      | `0.8rem`  | `4px`         | `+0.08em`      |
| `lg`    | `14px 36px`      | `0.9rem`  | `6px`         | `+0.08em`      |
| `xl`    | `18px 48px`      | `1rem`    | `6px`         | `+0.1em`       |

> **Note:** Buttons use ALL CAPS text + wide letter spacing — reads like mission stamps.

### Button Variants

#### Gold Primary — "Command"
```css
.btn-gold {
  background: linear-gradient(135deg, #C9921A, #D4A843);
  color: #080808;           /* dark text on gold — elegant */
  border: 1px solid #E8C56A;
  border-radius: 4px;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  box-shadow: 0 0 24px rgba(201, 146, 26, 0.25);
  transition: all 0.2s ease;
}
.btn-gold:hover {
  background: linear-gradient(135deg, #D4A843, #E8C56A);
  box-shadow: 0 0 40px rgba(201, 146, 26, 0.45);
  transform: translateY(-1px);
}
```

#### Red Signal — "Launch" (use ONCE per page max)
```css
.btn-signal {
  background: transparent;
  color: #E74C3C;
  border: 1px solid #C0392B;
  border-radius: 4px;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: all 0.2s ease;
}
.btn-signal:hover {
  background: rgba(192, 57, 43, 0.12);
  border-color: #E74C3C;
  box-shadow: 0 0 20px rgba(231, 76, 60, 0.3);
}
```

#### Ghost — "Navigation"
```css
.btn-ghost {
  background: transparent;
  color: #8A8A8A;
  border: 1px solid #262626;
  border-radius: 4px;
  font-family: 'Barlow Condensed', sans-serif;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition: all 0.2s ease;
}
.btn-ghost:hover {
  color: #F0F0F0;
  border-color: #404040;
}
```

#### White Outline — "Secondary"
```css
.btn-outline {
  background: transparent;
  color: #C2C2C2;
  border: 1px solid #404040;
  border-radius: 4px;
  transition: all 0.2s ease;
}
.btn-outline:hover {
  color: #FAFAFA;
  border-color: #8A8A8A;
  background: rgba(255,255,255,0.03);
}
```

---

## 05 · BORDER RADIUS SYSTEM

| Token          | Value   | Usage                                                  |
|----------------|---------|--------------------------------------------------------|
| `--r-sharp`    | `2px`   | Tags, fine lines, classification stamps               |
| `--r-sm`       | `4px`   | Buttons, small inputs, badges                         |
| `--r-md`       | `6px`   | Standard cards, form fields                           |
| `--r-lg`       | `10px`  | Large panels, modals                                  |
| `--r-xl`       | `16px`  | Hero/featured cards only                              |
| `--r-full`     | `9999px`| Avatars, status dots                                  |

> **Overall philosophy:** Stay sharp. Round corners exist but are restrained.
> This is a mission briefing room, not a consumer app.

---

## 06 · CARDS & SURFACE PATTERNS

### Standard Panel
```css
.panel {
  background: #111111;
  border: 1px solid #262626;
  border-radius: 6px;
}
.panel:hover {
  border-color: #404040;
  background: #151515;
}
```

### Featured / Gold-Accented Panel
```css
.panel-featured {
  background: #111111;
  border: 1px solid rgba(201, 146, 26, 0.3);
  border-radius: 6px;
  box-shadow: 0 0 32px rgba(201, 146, 26, 0.08), inset 0 1px 0 rgba(232, 197, 106, 0.05);
}
.panel-featured:hover {
  border-color: rgba(212, 168, 67, 0.5);
  box-shadow: 0 0 48px rgba(201, 146, 26, 0.15);
}
```

### Mission Log Entry (for Timeline)
```css
.mission-entry {
  background: transparent;
  border-left: 2px solid #C9921A;  /* gold left border */
  padding-left: 24px;
  position: relative;
}
.mission-entry::before {
  content: '';
  position: absolute;
  left: -5px;
  top: 6px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #C9921A;
  box-shadow: 0 0 12px rgba(201, 146, 26, 0.6);
}
```

---

## 07 · VISUAL FX PATTERNS

### Background — Deep Space Monochrome
```css
body {
  background:
    radial-gradient(ellipse at 15% 15%, rgba(201,146,26,0.03) 0%, transparent 50%),
    radial-gradient(ellipse at 85% 85%, rgba(192,57,43,0.025) 0%, transparent 50%),
    #080808;
}
```

### Gold Glowing Divider
```css
.divider-gold {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(201, 146, 26, 0.6) 40%,
    rgba(232, 197, 106, 0.8) 50%,
    rgba(201, 146, 26, 0.6) 60%,
    transparent
  );
}
```

### Section Number Stamp
```css
/* e.g. "01 ·" before each section heading */
.section-stamp {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.75rem;
  color: #C9921A;
  letter-spacing: 0.1em;
  margin-bottom: 8px;
}
```

### Noise Texture Overlay (optional — adds grain/depth)
```css
body::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 9999;
  opacity: 0.4;
}
```

---

## 08 · 3D MODEL TONE

With this palette, your 3D models should match:

- **Astronaut suit:** White/grey suit with **gold visor** — matches perfectly
- **Avoid:** Colorful sci-fi suits, neon trim, bright blue suits
- **Rocket/spacecraft:** White + black + gold decals (Apollo-era aesthetic)
- **Stars:** Small, dim, white — not colored
- **Lighting on 3D:** One warm gold key light + one cool white fill — cinematic

### Recommended Search Terms for Models/Generation
```
AI generation prompts:
→ "retro NASA astronaut white suit gold visor, black background, photorealistic"
→ "Apollo era rocket monochrome dramatic lighting studio"
→ "vintage space capsule interior black white gold accents"

Sketchfab search:
→ "apollo astronaut" / "nasa spacesuit" / "gemini capsule"
```

---

## 09 · MOTION PRINCIPLES

| Principle         | Value                                        |
|-------------------|----------------------------------------------|
| Easing            | `cubic-bezier(0.25, 0, 0, 1)` — slow start, sharp land |
| Default duration  | `350ms`                                      |
| Hover duration    | `200ms`                                      |
| Gold reveals      | Animate with a left-to-right wipe sweep      |
| Scroll reveals    | Fade up `24px` with slight opacity           |
| 3D model          | Slow rotate, warm gold rim light             |
| Red               | Never animated — it's a static signal        |

---

## 10 · WHAT TO AVOID

| ❌ Don't                              | ✅ Do instead                                  |
|---------------------------------------|------------------------------------------------|
| Rainbow or colorful star glow effects | Monochrome stars, white points only            |
| Purple or blue neon accents           | Gold or red — that's it                        |
| Pill-shaped buttons                   | Rectangular with 4–6px radius                  |
| Too much gold (oversaturation)        | Gold on key elements only (~10% of UI)         |
| Too much red (alarm fatigue)          | Red on ONE primary action max per screen       |
| Gradients between colors             | Gradients within same hue (gold light→gold dark)|
| White backgrounds                     | Stick to near-black surface hierarchy          |

---

*Design System v2.0 — "Apollo Monochrome" — Space Portfolio*
