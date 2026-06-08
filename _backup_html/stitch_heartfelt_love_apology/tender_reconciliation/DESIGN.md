---
name: Tender Reconciliation
colors:
  surface: '#fff8f7'
  surface-dim: '#edd4d4'
  surface-bright: '#fff8f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff0f0'
  surface-container: '#ffe9e8'
  surface-container-high: '#fbe2e2'
  surface-container-highest: '#f5dddc'
  on-surface: '#251818'
  on-surface-variant: '#514345'
  inverse-surface: '#3c2d2d'
  inverse-on-surface: '#ffedec'
  outline: '#837375'
  outline-variant: '#d6c2c4'
  surface-tint: '#864e5a'
  primary: '#864e5a'
  on-primary: '#ffffff'
  primary-container: '#ffb7c5'
  on-primary-container: '#7b4551'
  inverse-primary: '#fbb3c1'
  secondary: '#5f5f59'
  on-secondary: '#ffffff'
  secondary-container: '#e4e3db'
  on-secondary-container: '#65655f'
  tertiary: '#b12a2e'
  on-tertiary: '#ffffff'
  tertiary-container: '#ffb9b4'
  on-tertiary-container: '#a42026'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd9df'
  primary-fixed-dim: '#fbb3c1'
  on-primary-fixed: '#360c19'
  on-primary-fixed-variant: '#6b3743'
  secondary-fixed: '#e4e3db'
  secondary-fixed-dim: '#c8c7bf'
  on-secondary-fixed: '#1b1c17'
  on-secondary-fixed-variant: '#474742'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3ae'
  on-tertiary-fixed: '#410005'
  on-tertiary-fixed-variant: '#8f0d19'
  background: '#fff8f7'
  on-background: '#251818'
  surface-variant: '#f5dddc'
typography:
  headline-xl:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  display-handwritten:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '400'
    lineHeight: 32px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-padding: 24px
  element-gap: 16px
  section-margin: 64px
---

## Brand & Style
The brand personality is deeply sincere, soft-spoken, and intentionally vulnerable. It targets individuals seeking to mend relationships through a digital medium that feels as personal as a handwritten note. The emotional response is one of warmth, safety, and "kawaii" charm—softening the tension of an apology with whimsical visual cues.

The design style is a hybrid of **Minimalism** and **Tactile/Skeuomorphism**. It leverages heavy whitespace to let the message breathe, combined with soft, paper-like textures and "squishy" interactive elements that respond with gentle depth. This creates a digital experience that feels tangible and heartfelt rather than clinical.

## Colors
The palette is built on a foundation of emotional safety and affection.
- **Primary (Sakura Pink):** Used for key brand moments, active states, and decorative flourishes. It evokes tenderness.
- **Secondary (Clotted Cream):** The primary surface color. It provides a warmer, more intimate backdrop than pure white, mimicking high-quality stationery.
- **Tertiary (Heartthrob Red):** Reserved for accents, heart icons, and high-importance emphasis. It represents the "pulse" of the apology.
- **Neutral (Cocoa Dust):** A soft, warm brown used for text and borders instead of harsh black, maintaining the low-contrast, gentle aesthetic.

## Typography
The typographic system relies on the contrast between the sophisticated, editorial feel of the serif and the modern, friendly accessibility of the sans-serif. 

- **Headlines:** Use the serif font to convey importance and classic romanticism. High-level headers should use tighter letter spacing for a more "locked-in" look.
- **Body Text:** The sans-serif is used for maximum readability in long-form apologies, keeping the tone grounded and clear.
- **Italic Stylings:** Use the italic variant of the serif font frequently for quotes or "hand-signed" names to mimic the flow of calligraphy.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy on desktop (centered, max-width 800px) to simulate the proportions of a physical letter or greeting card. On mobile, it transitions to a fluid model with generous margins.

- **Rhythm:** Use an 8px base unit. 
- **Whitespace:** Prioritize "breathe room" around text blocks; margins should be wider than standard SaaS layouts to evoke a sense of calm.
- **Reflow:** On mobile, imagery (illustrations) should stack above text, centered to maintain the whimsical, storybook-like flow.

## Elevation & Depth
Depth in the design system is achieved through **Tonal Layers** and **Ambient Shadows**. Surfaces do not "float" high above the background; instead, they sit snugly with soft, low-opacity shadows tinted with the primary pink color (e.g., `rgba(255, 183, 197, 0.3)`).

- **Surface Tiers:** The main content area uses a slightly lighter cream than the background, separated by a very thin (1px) cocoa-dust border with 20% opacity.
- **Micro-shadows:** Interactive elements like buttons use a "pressed" effect on hover, moving from a soft shadow to a flat state to simulate physical touch.

## Shapes
The shape language is consistently "bubbly" and organic. Sharp corners are strictly avoided to ensure the UI feels approachable and non-threatening.
- **Standard Radius:** 0.5rem for small components.
- **Large Radius:** 1.5rem for cards and main containers to give them a "pillow" appearance.
- **Illustrations:** Borders around hand-drawn assets should have a slightly irregular, "hand-cut" feel rather than perfect geometric circles or squares.

## Components
- **Buttons:** Large, pill-shaped, and filled with the Primary Pink. The text is Cocoa Dust for high contrast without the harshness of black. Use a subtle inner-glow to make them look slightly 3D.
- **Chips/Tags:** Used for "Mood Tags" (e.g., 🥺 Sincere, 🌸 Sweet). These should have a 1px dashed border to look like fabric patches.
- **Cards:** Backgrounds in the Secondary Cream color with a `rounded-xl` radius. Include a small heart icon in the top-right corner as a persistent motif.
- **Input Fields:** Soft-focus borders. When focused, the border transitions to Primary Pink with a faint outer glow.
- **Specialty Component - "The Stamp":** A circular, scalloped-edge component used for the final "I'm Sorry" or "I Love You" sign-off, resembling a wax seal.
- **Hand-drawn Illustrations:** Integrate simple, line-art hearts, sparkles, and floral doodles around the margins of containers to reinforce the whimsical theme.