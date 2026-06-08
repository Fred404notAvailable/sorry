# Heartfelt — Full Interactable Website Specification
### Design & Build Guide for Antigravity

---

## 1. Project Overview

**"Heartfelt"** is a multi-page romantic apology website. The experience is intimate, sincere, and whimsical — designed to feel like a hand-delivered love letter, not a generic web app. It combines paper textures, floating hearts, polaroid cards, handwritten fonts, and interactive micro-moments to carry emotional weight.

The site has **6 pages** stitched into a single cohesive experience with a persistent bottom nav and a fixed top header. All pages share the same design system (the "Tender Reconciliation" token set).

**Emotional target:** Warmth, safety, kawaii vulnerability — softening the tension of an apology with gentle visual charm.

---

## 2. Site Map & Page Inventory

| Route | Page Title | Key Emotional Beat |
|---|---|---|
| `/` | Heartfelt Apology Home | The opening plea — hero image + bento grid |
| `/reasons` | Reasons Why I Love You | Polaroid memory board |
| `/promises` | My Promises to You | Lined letter paper + digital signature |
| `/forgive` | Will You Forgive Me? | Interactive Yes/No game |
| `/journey` | Our Beautiful Journey | Animated winding timeline |
| `/letter` | A Letter From My Heart | Full long-form letter page |

---

## 3. Design System

### 3.1 Color Tokens

Use CSS custom properties throughout. All colors derive from the "Tender Reconciliation" palette.

```css
:root {
  /* Backgrounds */
  --color-background:               #fff8f7;
  --color-surface:                  #fff8f7;
  --color-surface-bright:           #fff8f7;
  --color-surface-dim:              #edd4d4;
  --color-surface-container-lowest: #ffffff;
  --color-surface-container-low:    #fff0f0;
  --color-surface-container:        #ffe9e8;
  --color-surface-container-high:   #fbe2e2;
  --color-surface-container-highest:#f5dddc;
  --color-surface-variant:          #f5dddc;

  /* Brand Colors */
  --color-primary:                  #864e5a;  /* Sakura Pink */
  --color-on-primary:               #ffffff;
  --color-primary-container:        #ffb7c5;
  --color-on-primary-container:     #7b4551;
  --color-primary-fixed:            #ffd9df;
  --color-primary-fixed-dim:        #fbb3c1;
  --color-inverse-primary:          #fbb3c1;
  --color-surface-tint:             #864e5a;

  /* Secondary */
  --color-secondary:                #5f5f59;
  --color-on-secondary:             #ffffff;
  --color-secondary-container:      #e4e3db;
  --color-on-secondary-container:   #65655f;
  --color-secondary-fixed:          #e4e3db;
  --color-secondary-fixed-dim:      #c8c7bf;

  /* Tertiary (Heartthrob Red) */
  --color-tertiary:                 #b12a2e;
  --color-on-tertiary:              #ffffff;
  --color-tertiary-container:       #ffb9b4;
  --color-on-tertiary-container:    #a42026;
  --color-tertiary-fixed:           #ffdad7;
  --color-tertiary-fixed-dim:       #ffb3ae;

  /* Text */
  --color-on-surface:               #251818;
  --color-on-surface-variant:       #514345;
  --color-on-background:            #251818;
  --color-inverse-surface:          #3c2d2d;
  --color-inverse-on-surface:       #ffedec;

  /* Borders */
  --color-outline:                  #837375;
  --color-outline-variant:          #d6c2c4;

  /* Error */
  --color-error:                    #ba1a1a;
  --color-on-error:                 #ffffff;
  --color-error-container:          #ffdad6;
  --color-on-error-container:       #93000a;
}
```

### 3.2 Typography

Import from Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?
  family=Playfair+Display:ital,wght@0,400;0,700;1,400&
  family=Plus+Jakarta+Sans:wght@400;600&
  family=Dancing+Script:wght@500&
  display=swap" rel="stylesheet"/>
```

| Token | Font | Size | Weight | Line-Height | Letter-Spacing |
|---|---|---|---|---|---|
| `headline-xl` | Playfair Display | 48px | 700 | 56px | -0.02em |
| `headline-lg` | Playfair Display | 32px | 700 | 40px | — |
| `headline-lg-mobile` | Playfair Display | 28px | 700 | 36px | — |
| `display-handwritten` | Dancing Script | 24–28px | 500 | 32px | — |
| `body-md` | Plus Jakarta Sans | 16px | 400 | 24px | — |
| `label-md` | Plus Jakarta Sans | 14px | 600 | 20px | 0.05em |

> **Usage rule:** Headlines use Playfair Display serif for editorial romanticism. Body copy uses Plus Jakarta Sans for clarity. Cursive sign-offs and "Dear You" openings use Dancing Script to simulate calligraphy. Italicize Playfair for quotes.

### 3.3 Spacing Scale (8px base unit)

```css
:root {
  --spacing-base:              8px;
  --spacing-element-gap:       16px;
  --spacing-container-padding: 24px;
  --spacing-section-margin:    64px;
}
```

### 3.4 Border Radius

```css
:root {
  --radius-sm:   0.25rem;   /* Small chips, tags */
  --radius-md:   0.5rem;    /* Inputs, small cards */
  --radius-lg:   0.75rem;   /* Larger cards */
  --radius-xl:   1.5rem;    /* Main containers — "pillow" feel */
  --radius-full: 9999px;    /* Pills, badges, buttons */
}
```

### 3.5 Shadows

All shadows are tinted pink, not neutral gray:

```css
--shadow-card:      0 8px 30px rgba(134, 78, 90, 0.12);
--shadow-button:    0 8px 20px rgba(134, 78, 90, 0.3);
--shadow-nav:       0 -4px 12px rgba(134, 78, 90, 0.1);
--shadow-letter:    0 10px 30px rgba(134, 78, 90, 0.15);
--shadow-seal:      inset 0 0 10px rgba(134, 78, 90, 0.1), 0 4px 6px rgba(134, 78, 90, 0.1);
```

---

## 4. Global Layout Rules

- **Max content width:** `800px`, horizontally centered on all pages.
- **Container padding:** `24px` left/right on mobile; same on desktop within the 800px box.
- **Mobile reflow:** Images stack above text, centered. Nav shifts to bottom bar.
- **Desktop:** Fixed centered column simulating a letter/greeting card proportions.

### 4.1 Persistent Header (Top App Bar)

```
Fixed · top-0 · full-width · z-50
Background: var(--color-surface) at 80% opacity + backdrop-blur-md
Shadow: 0 1px 0 var(--color-primary) at 10% opacity
Height: ~56px
```

**Left:** Brand wordmark `"Heartfelt"` in Dancing Script, `var(--color-primary)`, ~28px.
**Right:** Two icon buttons — `favorite` (filled heart) and `menu`, both `var(--color-primary)`, scale-down on active.

On desktop, also render inline nav links (Home · Reasons · Promises · Timeline · Letter). Active link gets `border-b-2 border-primary`.

### 4.2 Persistent Bottom Navigation Bar

```
Fixed · bottom-0 · full-width · max-width 800px · centered
Background: var(--color-surface-container)
Border-top: 1px solid var(--color-outline-variant) at 20% opacity
Border-radius: top corners rounded-xl
Shadow: var(--shadow-nav)
Padding: pb-6 pt-2 (accounts for iOS safe area)
```

**4 tabs:**

| Icon | Label | Route |
|---|---|---|
| `home` | Home | `/` |
| `favorite` | Reasons | `/reasons` |
| `auto_stories` | Promises | `/promises` |
| `calendar_heart` | Date | `/forgive` |

**Active tab state:** Pill-shaped container (`rounded-full`) with `var(--color-primary-container)` background and `var(--color-on-primary-container)` text. Use filled icon variant. Scale 1.1.

**Inactive state:** `var(--color-on-surface-variant)`, outline icon. Hover: `var(--color-primary)`.

### 4.3 Footer

Shared across all pages, appears below bottom nav padding:

```
Centered column layout
Brand wordmark (Dancing Script)
Tagline: "Made with all my love and a million apologies"
Two links: "Our Story" · "Contact Me"
Color: on-surface-variant at 60% opacity, hover to primary
```

---

## 5. Global Animation Library

Define these reusable keyframe animations once in a global stylesheet:

```css
/* 1. Floating vertical bob — used by hearts, sparkles, seal */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-10px); }
}
.animate-float { animation: float 4s ease-in-out infinite; }

/* 2. Upward fade — used by ambient floating hearts */
@keyframes rise-fade {
  0%   { transform: translateY(0) rotate(0deg); opacity: 0; }
  50%  { opacity: 0.6; }
  100% { transform: translateY(-100px) rotate(20deg); opacity: 0; }
}

/* 3. SVG path draw — used in timeline page */
@keyframes draw {
  to { stroke-dashoffset: 0; }
}

/* 4. Slow infinite spin — used by seal's dashed border ring */
@keyframes slow-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* 5. Scale pop — used for wax seal reveal */
@keyframes pop-in {
  0%   { transform: scale(0); }
  70%  { transform: scale(1.1); }
  100% { transform: scale(1); }
}

/* 6. Confetti burst — JS-driven, no CSS keyframe needed */

/* 7. Fade-up scroll reveal — Intersection Observer driven */
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.reveal-on-scroll.in-view {
  opacity: 1;
  transform: translateY(0);
}
```

### Ambient Floating Hearts (Global Background Layer)

Render a `position: fixed; inset: 0; pointer-events: none; z-index: 0` container with id `#heart-container`.

Every 800ms, spawn a Material Symbol icon (`favorite`, `favorite_border`, `local_florist`, `auto_awesome`) with:
- Random `left` position across full viewport width
- Starts at `top: 110vh`, floats upward via `rise-fade` animation
- Random font-size: 12–24px
- Random duration: 4–8s
- 50% chance of `FILL: 1` (solid) vs outline
- Color: `var(--color-primary)` at 60% opacity

Remove element from DOM after animation completes.

---

## 6. Specialty Components

### 6.1 The Wax Seal Stamp

Used as a sign-off motif on multiple pages.

**Structure:**
```
Outer circle: w-24–32 h-24–32 (varies by page)
Background: var(--color-primary) or var(--color-tertiary)
Shape: rounded-full
Shadow: large, tinted pink
```

**Inner layer:** A dashed border ring (`border-4 border-dashed border-white/20 rounded-full`) that infinitely rotates via `slow-spin` (20s linear).

**Content:** Filled `favorite` icon (white, large) + small Dancing Script label ("Love", "Always", "I'm Sorry", "Thank You").

**Hover state:** `scale(1.1)`, transition 500ms. On hover a whisper text fades in below.

**Interactive variant** (Will You Forgive Me? page): Starts `scale(0)`, pops to full size via `pop-in` after Yes is clicked, shown in a full-screen overlay.

### 6.2 Mood Tag Chips

```
Dashed 1px border: var(--color-primary) at 30% opacity
Background: var(--color-surface-bright)
Padding: px-4 py-2
Border-radius: var(--radius-full)
Font: label-md, var(--color-primary)
```

Examples: `🥺 Sincere` · `🌸 Sweet` · `💖 Devoted` · `🎀 Princess`

These look like fabric patches — intentionally slightly imprecise/organic.

### 6.3 Polaroid Photo Cards

```
Background: var(--color-surface-container-lowest)
Padding: p-4 pb-12 (extra bottom for caption area)
Shadow: var(--shadow-card)
Default rotation: alternating -3deg, +2deg, -1deg, +3deg (CSS rotate)
Border: 1px solid var(--color-outline-variant) at 10% opacity
```

**Hover:** `scale(1.05) rotate(0deg)` via cubic-bezier spring `(0.34, 1.56, 0.64, 1)` — snaps back to upright.

**Image area:** Full-bleed square aspect-ratio image, slight grayscale/sepia filter (`grayscale(20%) sepia(10%)`). Small filled heart icon floats top-right corner.

**Caption:** Dancing Script or Playfair Display italic, centered, ~24px.

### 6.4 Lined Letter Paper

A special container that mimics notebook paper:

```css
.lined-paper {
  background-color: #fffcf0;
  background-image: linear-gradient(#e1d9c1 1px, transparent 1px);
  background-size: 100% 2.5rem;
  line-height: 2.5rem;
  position: relative;
}
.lined-paper::before {
  content: '';
  position: absolute;
  top: 0; left: 40px;
  width: 2px; height: 100%;
  background-color: rgba(255, 183, 197, 0.4); /* pink margin line */
}
```

Rotate the entire letter card `1deg` to feel hand-placed. Add a decorative "tape" strip above: `absolute -top-4 left-1/2 w-24 h-10 bg-primary/10 backdrop-blur rotate-2`.

### 6.5 Digital Signature Canvas

On the Promises page, the letter sign-off area includes a `<canvas>` element styled as a signature pad:

```
Width: 256px · Height: 128px
Border: dashed bottom only, var(--color-primary) at 30% opacity
Cursor: crosshair
Placeholder text "Sign here..." (light, pointer-events: none)
Clear button (refresh icon, top-right)
```

**JS behavior:**
- `mousedown` / `touchstart`: begin drawing
- `mousemove` / `touchmove`: draw smooth line via `ctx.lineTo()`
- `ctx.strokeStyle = var(--color-primary)`, `lineJoin = 'round'`, `lineCap = 'round'`, `lineWidth = 2`
- `mouseup` / `touchend` / `mouseout`: stop drawing
- Clear button: `ctx.clearRect()`

### 6.6 Paper / Dot Texture Backgrounds

Two background texture patterns used across pages:

**Dot grid (Reasons page):**
```css
background-image: radial-gradient(#d6c2c4 0.5px, transparent 0.5px);
background-size: 24px 24px;
```

**Letter grid (Letter page):**
```css
background-image:
  linear-gradient(90deg, rgba(134,78,90,0.05) 1px, transparent 1px),
  linear-gradient(rgba(134,78,90,0.05) 1px, transparent 1px);
background-size: 32px 32px;
```

**Grain overlay (Will You Forgive Me? page):** Use a tiled transparent PNG texture from `transparenttextures.com/patterns/p6.png` or `natural-paper.png` at low opacity.

---

## 7. Page-by-Page Specifications

---

### Page 1 — Home (`/`)

**Document title:** `Heartfelt | I'm So Sorry`

**Background:** `var(--color-surface-container-low)` (#fff0f0), plus ambient floating hearts layer.

#### Hero Section

Centered column, `text-center`:

1. **Illustration container:** `max-width: 400px`, square aspect ratio, `rounded-xl`. Contains a heart illustration image. Add a small bouncing `animate-bounce` icon badge (`w-12 h-12 rounded-full bg-primary-container`) at `-top-4 -right-4` with a filled heart icon. On group hover, image scales to 1.05 (transition 500ms).

2. **H1:** "I'm So Sorry, Princess" — `headline-xl`, `var(--color-primary)`.

3. **Body paragraph:** 1–2 sentences of sincere copy. `body-md`, `on-surface-variant`, max-width `xl` (560px).

4. **Two CTA buttons:**
   - Primary: `"See Why I Love You"` — pill, `var(--color-primary)` background, white text, `shadow-button`, hover opacity-90, active scale-95.
   - Secondary: `"Read My Promises"` — pill outline, `border-2 border-primary`, primary text color, hover `bg-primary-container`.

#### Bento Apology Grid

2-column grid on desktop, 1-column on mobile. Gap: `element-gap`.

**Card A (Large, left column):** `min-height: 300px`, `bg-surface-container`, `rounded-xl`, `shadow-sm`. Contains:
- Small heart icon badge (top-right, 40% opacity, fills to 100% on group hover)
- Pill label chip: icon + `"OUR STORY"` uppercase
- H3 headline + body paragraph
- Row of 3 emoji avatar circles (🌸 ✨ 🧸) with negative margin overlap (`-space-x-3`)

**Card B1 (top-right, small):** White background, `hand-drawn-border` (dashed 1px `outline-variant`), flex row with icon circle + text. Hover: shadow deepens.

**Card B2 (bottom-right, small):** `bg-primary-fixed`, displays mood tag chips (🥺 Sincere · 🌸 Sweet · 💖 Devoted · 🎀 Princess).

#### Wax Seal Sign-off Section

Centered, `py-section-margin`. The Wax Seal component rotated `rotate-12`, transitions to `rotate-0` on hover (cursor pointer). Below it: italic Dancing Script quote `"Forever & Always, Yours."` in primary.

---

### Page 2 — Reasons Why I Love You (`/reasons`)

**Background:** Dot-grid paper texture on `var(--color-background)`.

#### Hero

Centered, `text-center`:
- H1: "Every Little Thing" — `headline-xl`, `var(--color-primary)`
- Subheading italic: body copy about being a memory board

#### Polaroid Grid

2-column grid on desktop, 1-column mobile. 4 polaroid cards, each with alternating rotations. Apply **scroll reveal** animation (`reveal-on-scroll` class + IntersectionObserver). Images use slight warm filter.

Card captions (Dancing Script italic):
- "The way you smile"
- "Your kindness"
- "How you listen"
- "Our quiet moments"

Each card has a filled heart icon top-right.

Apply a `md:mt-12` offset to Card 3 to create staggered vertical rhythm on desktop.

#### Wax Seal + Mood Tags

Centered section at bottom:
- Seal: w-24 h-24, `var(--color-primary)`, internal dashed ring on slow-spin
- Label below: "I'm Sorry" in Dancing Script
- Two mood chips: `🥺 Sincere` · `🌸 Sweet`

---

### Page 3 — My Promises to You (`/promises`)

**Background:** `var(--color-background)`.

#### Hero

Centered:
- H1: "My Heart on Paper" — `headline-xl`, `var(--color-primary)`
- Subheading body copy

#### The Letter Card

Outer wrapper: `rotate-1` slight tilt, `rounded-xl`, `shadow-letter`. Contains:
- Decorative tape strip at top
- Lined Paper Container (`.lined-paper` styles)
- Left padding to clear the margin line (`pl-12`)

**Letter content:**

Opening: `"Dear You,"` in Dancing Script, 3xl, primary, opacity 80%.

Promise list — 6 items, each `flex items-center gap-4`:
- Small icon (40% opacity primary) — `spark`, `restaurant`, `nightlight`, `local_florist`, `auto_stories`, `favorite`
- Promise text in Dancing Script 2xl: `"I promise to listen more than I speak."`, etc.
- Hover (`.scribble-hover`): slight rotate(-1deg) scale(1.02) + text color shifts randomly between primary shades

Closing area (right-aligned):
- `"With all my love,"` in Dancing Script
- **Digital Signature Canvas component** (see §6.5)

**Wax Seal** bottom-left: `w-20 h-20`, `bg-primary`, `-rotate-12`, `border-4 border-primary-container`.

#### Bento Insights Grid

3-column grid (1 col mobile):

**Card (2-col span):** `bg-surface-container`, `rounded-xl`. Left side: mood chip + H3 "Our Growth" + body. Bottom: 3 dot progression indicator. Right side: faded background photo (10% opacity, 20% on hover).

**Card (1-col):** Solid `bg-primary`, centered — animated pulse circle with `volunteer_activism` icon + italic script quote `"Love is a quiet promise."`.

#### Action Button

Centered: `"Save My Promises"` pill button with arrow icon that translates on group hover.

---

### Page 4 — Will You Forgive Me? (`/forgive`)

**Background:** Paper grain texture + radial gradient glows (primary-container top-left, surface-container-highest bottom-right blurred to 100–120px).

**Purpose:** Interactive emotional centerpiece.

#### Layout

Full viewport centered column with:

1. **Floating illustration** — image in `max-width: 400px`, rounded-[40px], `animate-float` (4s bob), border-4 surface. Two doodle icons overlaid at corners (sparkle top-right, heart bottom-left, both 40% opacity primary).

2. **Badge chip:** `🥺 Sincere Request` — dashed border chip

3. **H1:** "Will you forgive me?" — `headline-xl`, `var(--color-primary)`

4. **Body paragraph:** Sincere 1-sentence plea.

#### Yes / No Buttons

```
Flex row, gap-6, centered
```

**NO button** (secondary/soft):
```
bg-secondary-container text-on-secondary-container
Rounded-full, px-10 py-4, label-md
Hover: translate-y(+4px), bg-outline-variant
```

**YES button** (primary, large):
```
bg-primary text-white
Rounded-full, px-12 py-5, text-headline-lg-mobile
Shadow-button
Hover: scale(1.1), active: scale(0.9)
Includes filled heart icon to the right
```

#### JS Interaction Logic

**When NO is clicked:**
1. YES button `transform: scale(+=0.4)` — grows more aggressive each click
2. NO button shrinks by 0.1 (minimum 0.2 scale)
3. NO button gets random `translate(±20px, ±20px)` appended — harder to hit
4. NO button label cycles through: `"Are you sure?"` → `"Really?"` → `"Think again..."` → `"Pretty please?"` → `"I'll be good!"` → `"Don't be mean!"` → `"Pout..."`

**When YES is clicked:**
1. Show full-screen overlay `#success-seal`:
   - Background: surface/60% + backdrop-blur-sm
   - Centered Wax Seal (`w-48 h-48`) pops in via `pop-in` keyframe (scale 0 → 1)
   - Seal shows: filled heart icon (6xl) + "Thank You" + "Forever Yours" tiny uppercase
   - Dashed border ring rotates infinitely
2. Trigger confetti burst (50 particles, pink palette, JS physics)
3. Reset button below seal restores everything to initial state

**Confetti particle system:**
- 50 `div` particles, 8×8px circles
- Colors: `#ffb7c5`, `#864e5a`, `#fbb3c1`, `#ffd9df`
- Spawn at viewport center
- Random angle + velocity (5–20px/frame)
- Gravity: +0.5px/frame
- Fade opacity 1→0 and remove on complete

---

### Page 5 — Our Beautiful Journey (`/journey`)

**Background:** `natural-paper.png` texture overlay on `var(--color-background)`.

#### Hero

Centered:
- H1: "Our Journey Together" — `headline-xl`, `var(--color-primary)`
- Subheading italic body copy

#### Animated Winding Path (Desktop Only)

Behind the timeline content, render an absolutely-positioned SVG path:

```html
<svg viewBox="0 0 400 1800" ...>
  <path
    d="M200 0C200 100 350 150 350 300C350 450 100 500 100 650..."
    stroke="#ffb7c5"
    stroke-dasharray="12 12"
    stroke-linecap="round"
    stroke-width="4"
    fill="none"
    class="handwritten-path"
  />
</svg>
```

Apply the `draw` animation (stroke-dasharray technique, 3s ease-out forwards) so the path draws itself on page load.

Hide on mobile (`hidden md:block`).

#### Floating Background Doodles

3 absolutely-positioned floating elements with `animate-float` and staggered `animation-delay` (0s, 1s, 2s):
- `auto_awesome` icon (top-left)
- `favorite` icon (top-right)
- `potted_plant` icon (bottom-left)
All `var(--color-primary-container)` at 40% opacity.

#### Timeline Milestones

5 events, alternating left/right on desktop (`justify-end` then `justify-start`), stacked on mobile. Each event is a `.timeline-card`:

```
bg-surface-container-low
border: 1px solid outline-variant/20
rounded-xl, p-8
shadow-sm shadow-primary/10
Hover: translateY(-8px) scale(1.02) — cubic-bezier spring
```

**Icon badge:** `w-12 h-12 bg-primary text-white rounded-full` positioned at `-top-4 -right-4` (or `-left-4` depending on side). Contains a Material Symbol icon relevant to the milestone.

**Date chip:** `bg-secondary-container text-on-secondary-container rounded-full`, dashed border, `label-md`.

**Event 5 (Bump in the Road):** Uses `bg-tertiary-container text-on-tertiary-container` for the date chip to signal emotional weight.

**Milestone data:**
1. June 12, 2022 · `coffee` icon · "The First Sip" · café origin story
2. Aug 05, 2022 · `park` icon · "Our First Walk" · botanical garden adventure
3. Oct 31, 2022 · `movie` icon · "Spooky Movie Night" · Halloween memory
4. Jan 01, 2023 · `favorite` icon · "New Year, New Us" · rooftop fireworks (this card has a full-bleed image at top, then text below)
5. Recently · `heart_broken` icon · "A Bump in the Road" · the apology context

**Micro-interaction (hover):** On card `mouseenter`, spawn a floating `🌸` emoji that translates upward and fades out (1s, JS-driven).

**Scroll reveal:** Apply `reveal-on-scroll` class + IntersectionObserver to each card.

#### Final Wax Seal Sign-off

Centered, `mt-32`:
- `w-32 h-32`, `var(--color-primary)`, internal dashed ring
- "Always" in Dancing Script
- On hover: a whispered phrase fades in below: `"I'm so sorry, truly."` in Dancing Script primary

---

### Page 6 — A Letter From My Heart (`/letter`)

**Background:** Grid paper texture (`letter-paper` CSS class) on `var(--color-surface)`.

**Special nav feature:** Desktop top nav includes an "Atmosphere" toggle button that simulates background audio UI state (`music_note` ↔ `pause` icon, `bg-secondary-container` ↔ `bg-primary-container`).

**Parallax doodle:** Decorative floral illustration (top-right, 20% opacity) shifts with mouse position via `mousemove` event (`±20px translate`).

#### The Letter Article

Full card container:
```
bg-surface-container-lowest
border: 1px solid outline-variant/30
rounded-xl
shadow: shadow-letter
padding: p-8 md:p-16
min-height: 1000px
letter-paper background
```

**Header:**
- Pill badge: filled heart + "Sincere Heart" — dashed border, bg-primary-container/10
- H1: "My Sincerest Apology" — `headline-xl`, `var(--color-primary)`
- Decorative scribble underline: `h-3px, gradient left-to-right from transparent → #ffb7c5 → transparent, rounded, w-32, mx-auto`
- Date line: `"Written with love and reflection • October 24th, 2023"` — italic, label-md, on-surface-variant

**Body:** Playfair Display serif, 20px, 1.75 leading, `on-surface-variant`. Three paragraphs, one full-bleed image mid-letter (60% opacity, rounded-xl), one pull-quote in a container:

```
bg-surface-container-low p-8 rounded-xl border border-primary/10 italic
"Love is not just a feeling, but a consistent choice to understand, even when understanding seems impossible."
```

**Footer of letter:**
- `"With all my love and sincerity,"` label-md
- `"Always yours."` in Dancing Script 48px, primary, `line-height: 1`
- Wax Seal (tertiary color: `#b12a2e`) with pulsing outer glow (`bg-tertiary/20 blur-xl scale-125`), `animate-float`

**Bottom doodle:** `auto_awesome` icon, bottom-left, 30% opacity, `rotate-12`.

#### Post-Letter Action Buttons

Two pill buttons side by side:
- `"Send a Response"` — primary fill + `send` icon
- `"Save as Draft"` — `bg-surface-container-highest`, primary text, outlined, `content_copy` icon

---

## 8. Interaction & Animation Summary

| Interaction | Trigger | Effect |
|---|---|---|
| Hero image | Hover | Scale 1.05, smooth 500ms |
| Polaroid cards | Hover | Spring-pop to upright, scale 1.05 |
| Polaroid cards | Scroll into view | Fade up from translateY(20px) |
| Timeline cards | Hover | translateY(-8px) scale(1.02), spawn 🌸 |
| Timeline cards | Scroll into view | Fade up reveal |
| SVG path | Page load | Stroke draws itself (3s) |
| Letter promises | Hover each row | Slight tilt + color shift |
| Signature canvas | Mouse/touch drag | Free-hand draw in primary pink |
| No button | Click | YES grows, NO shrinks + jumps away + label changes |
| Yes button | Click | Full-screen seal overlay pops in + confetti burst |
| Wax seal | Hover | Scale up, whisper text fades in |
| Wax seal (home) | Hover | Rotates from 12deg to 0deg |
| Music toggle (letter) | Click | Icon swaps, bg color changes |
| Floral doodle (letter) | Mouse move | Subtle parallax offset |
| Floating hearts | Always on | Background particles rise and fade |
| Bottom nav tabs | Click | Active pill highlight animates in |
| CTA buttons (all) | Active/press | Scale 0.92–0.95 "squishy" press feel |
| Top bar heart icon | Click | Scale 0.9, bounce back |

---

## 9. Responsive Breakpoints

```
Mobile:  < 768px  (md breakpoint)
Desktop: ≥ 768px
```

**Mobile-specific rules:**
- Bottom nav always visible
- Top nav desktop links hidden
- Timeline: all cards stack vertically, centered
- SVG path hidden
- Polaroid grid: single column
- Bento grid: single column
- Letter padding reduced: `p-8` instead of `p-16`
- Hero H1 uses `headline-lg-mobile` (28px) instead of `headline-xl` (48px)

---

## 10. Assets & External Dependencies

### Fonts

```
Google Fonts: Playfair Display, Plus Jakarta Sans, Dancing Script
Google Material Symbols Outlined (variable icon font)
FILL axis: 0..1 · wght axis: 100..700
```

### Icons

All icons from Material Symbols Outlined. Key icons used:
`favorite`, `favorite_border`, `home`, `auto_stories`, `calendar_heart`, `menu`, `verified_user`, `auto_awesome`, `spark`, `restaurant`, `nightlight`, `local_florist`, `coffee`, `park`, `movie`, `heart_broken`, `volunteer_activism`, `music_note`, `pause`, `send`, `content_copy`, `arrow_forward`, `refresh`, `potted_plant`

Icon FILL toggle: Apply `font-variation-settings: 'FILL' 1` inline for filled state.

### Image Placeholders

6 images used across the site. Replace with your own or use AI-generated equivalents with these art direction prompts:

| Location | Prompt |
|---|---|
| Home hero | Hand-drawn charcoal heart on cream paper, watercolor pink splatters, warm diffused light, whimsical |
| Reasons Card 1 | Hand-crafted paper heart on cream surface, golden window light, minimalist romantic |
| Reasons Card 2 | Two hands reaching toward each other, red string on pinky fingers, line-art illustration, pink/cocoa palette |
| Reasons Card 3 | Ceramic mug with heart foam, soft knit blanket, muted creams and warm browns, cozy morning |
| Reasons Card 4 | Polaroid-style field of wild daisies, lavender twilight sky, pastel pastels, precious memory feel |
| Promises page | Dried lavender and pink blossoms on cream workspace, warm natural shadows, whimsical |
| Forgive page | Fluffy puppy with enormous glistening eyes, soft pastel pinks and creams, heartwarming + slightly melancholy |
| Journey card 4 | Two hands intertwined on cream knitted blanket, golden sunset light, dried wildflower beside hands |
| Letter page | Weathered wooden desk, vintage fountain pen on cream parchment, dried pink rose petal, warm afternoon light |
| Letter page floral | Watercolor peonies and sage leaves, sparkles and line-art hearts, airy bright background |

### Texture URLs

```
Paper grain:  https://www.transparenttextures.com/patterns/p6.png
Natural paper: https://www.transparenttextures.com/patterns/natural-paper.png
```

---

## 11. Accessibility Notes

- All images must have descriptive `alt` text
- Bottom nav: `aria-label` on `<nav>`, `aria-current="page"` on active tab
- Color contrast: primary `#864e5a` on white meets WCAG AA for large text (verify for small text)
- Signature canvas: provide `aria-label="Signature pad — draw your signature here"`
- `prefers-reduced-motion`: wrap `rise-fade`, `animate-float`, and confetti behind a `@media (prefers-reduced-motion: no-preference)` check
- Buttons: always include visible focus ring
- `touch-action: none` on signature canvas to prevent scroll conflict

---

## 12. Tech Stack Recommendations

| Concern | Recommendation |
|---|---|
| Framework | Plain HTML/CSS/JS (works as-is from source), or React/Next.js for SPA routing |
| CSS | Tailwind CSS v3 with custom config (token config already defined per page) |
| Icons | Material Symbols via Google Fonts CDN (variable font) |
| Routing | Next.js App Router or React Router if SPA |
| Animation | CSS keyframes for ambient, Web Animations API or GSAP for scroll-triggered and complex sequences |
| Signature | HTML5 Canvas (vanilla JS, no lib needed) |
| Build | Vite or Next.js |

**If building as a single React SPA:**
- Shared `<TopBar />`, `<BottomNav />`, `<Footer />`, `<HeartParticles />` components
- Page components per route
- Shared design token CSS vars in `:root`
- `useIntersectionObserver` hook for scroll reveals

---

## 13. File Structure (Suggested)

```
/src
  /components
    TopBar.jsx
    BottomNav.jsx
    Footer.jsx
    HeartParticles.jsx      ← global ambient hearts
    WaxSeal.jsx
    MoodChip.jsx
    PolaroidCard.jsx
    LinedPaper.jsx
    SignaturePad.jsx
  /pages
    Home.jsx
    Reasons.jsx
    Promises.jsx
    ForgiveMe.jsx
    Journey.jsx
    Letter.jsx
  /styles
    tokens.css              ← all CSS custom properties
    animations.css          ← all @keyframe definitions
    textures.css            ← paper/dot/grid backgrounds
  /assets
    /images                 ← all 9 images
```

---

## 14. Build Priority Order

1. **Design tokens** — CSS vars, fonts, shadows, radii
2. **Global animations** — keyframes + JS heart particle system
3. **Shell** — TopBar + BottomNav + Footer
4. **Home page** — hero + bento grid + wax seal
5. **Forgive Me page** — highest interactivity, most memorable moment
6. **Promises page** — letter + signature canvas
7. **Reasons page** — polaroid grid + scroll reveal
8. **Journey page** — SVG path animation + timeline
9. **Letter page** — full letter + parallax + atmosphere toggle
10. **Polish pass** — all hover states, mobile QA, reduced-motion

---

*End of Specification. Total pages: 6. Shared components: 7. Unique interactions: 15+.*