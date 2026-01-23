# Intori Brand Pack

> Extracted from `intori-app` codebase on 2026-01-22
> Source of truth: `src/app/globals.css`, `src/utils/clusterAssets.ts`, component CSS modules

---

## 1. Color Palette

### Primary Brand Colors

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--background` | `#121212` | `rgb(18, 18, 18)` | Primary dark background, app chrome |
| `--foreground` | `#121212` | `rgb(18, 18, 18)` | Primary text on light backgrounds |
| `--button-primary-bg` | `#D5F74E` | `rgb(213, 247, 78)` | **Primary CTA buttons**, selection highlight, claimed states |
| `--button-primary-color` | `#121212` | `rgb(18, 18, 18)` | Text on primary buttons |

### Surface Colors

| Name | Hex | Usage |
|------|-----|-------|
| Panel Background | `#F8F8F7` | Cards, panels, content areas |
| White | `#FFFFFF` | Modals, inputs, tab backgrounds |
| Secondary Button | `#E6E6E6` | Secondary button background |
| Disabled | `#dcdcdc` | Disabled buttons, locked states |

### Text Colors

| Name | Hex / RGBA | Usage |
|------|------------|-------|
| Primary Text | `#121212` | Headings, body text on light bg |
| Primary Text (light bg) | `#000000` | Alternative primary text |
| White Text | `#FFFFFF` | Text on dark backgrounds |
| Secondary Text | `rgba(18, 18, 18, 0.6)` | Subtitles, labels, metadata |
| Muted Text | `rgba(18, 18, 18, 0.7)` | Descriptions, helper text |
| Placeholder | `#888888` | Input placeholders, inactive tabs |

### Cluster/Stamp Category Colors

| Cluster | Hex | RGB |
|---------|-----|-----|
| Bookworms | `#D467FF` | `rgb(212, 103, 255)` |
| Casual Socializers | `#60B3D7` | `rgb(96, 179, 215)` |
| Collectors | `#72B01D` | `rgb(114, 176, 29)` |
| Community Builders | `#F76B15` | `rgb(247, 107, 21)` |
| Creators | `#F2FD00` | `rgb(242, 253, 0)` |
| Dreamers & Ambition Seekers | `#72B01D` | `rgb(114, 176, 29)` |
| Fitness & Wellness | `#60B3D7` | `rgb(96, 179, 215)` |
| Foodies | `#E5484D` | `rgb(229, 72, 77)` |
| Gamers | `#F2FD00` | `rgb(242, 253, 0)` |
| Investors & Finance | `#72B01D` | `rgb(114, 176, 29)` |
| Movie & TV Fans | `#60B3D7` | `rgb(96, 179, 215)` |
| Music Lovers | `#D467FF` | `rgb(212, 103, 255)` |
| Night Owls & Early Birds | `#60B3D7` | `rgb(96, 179, 215)` |
| Outdoors & Nature | `#F2FD00` | `rgb(242, 253, 0)` |
| Pet Owners | `#F76B15` | `rgb(247, 107, 21)` |
| Regional & Local Ties | `#D467FF` | `rgb(212, 103, 255)` |
| Sports Fans | `#F76B15` | `rgb(247, 107, 21)` |
| Sustainable Living | `#72B01D` | `rgb(114, 176, 29)` |
| Tech & AI Curious | `#D467FF` | `rgb(212, 103, 255)` |
| Travel Enthusiasts | `#60B3D7` | `rgb(96, 179, 215)` |

**Cluster Color Groups:**
- **Purple** (`#D467FF`): Bookworms, Music Lovers, Regional & Local Ties, Tech & AI Curious
- **Blue** (`#60B3D7`): Casual Socializers, Fitness & Wellness, Movie & TV Fans, Night Owls, Travel
- **Green** (`#72B01D`): Collectors, Dreamers, Investors & Finance, Sustainable Living
- **Orange** (`#F76B15`): Community Builders, Pet Owners, Sports Fans
- **Yellow** (`#F2FD00`): Creators, Gamers, Outdoors & Nature
- **Red** (`#E5484D`): Foodies

### Special/Premium Colors

| Name | Hex | Usage |
|------|-----|-------|
| Intori Plus Gold | `#FFD700` | Premium user borders, badges |
| Plus Glow | `rgba(255, 215, 0, 0.6)` | Gold glow effect |
| Purple Accent | `rgba(142, 109, 242, 0.12)` | Stamp badge backgrounds |
| Toast Shadow | `rgba(196, 179, 243, 0.75)` | Toast notification shadow |

### Semantic Colors

| Name | Hex | Usage |
|------|-----|-------|
| Success | `#00b33c` | Success states, switch on |
| Error | `#FF3B30` | Error states |

---

## 2. Typography

### Font Family

```css
:root {
  --font-family: "Arial";
}

* {
  font-family: var(--font-family);
}
```

**Stack:** `Arial, Helvetica, sans-serif` (system fonts only, no custom web fonts)

**Source:** `src/app/globals.css:4`

### Font Size Scale

| Size | Usage |
|------|-------|
| `12px` | Labels, badges, metadata labels, timestamps |
| `14px` | Small body text, buttons (sm), form fields |
| `16px` | Default body text, buttons (md), tabs |
| `18px` | Section titles, metadata values, buttons (lg) |
| `20px` | Mobile heading adjustment |
| `22px` | Stamp names |
| `24px` | Card titles, modal headings |
| `28px` | Reward modal titles |

### Font Weights

| Weight | Usage |
|--------|-------|
| `400` | Body text (default) |
| `600` | Titles, labels, buttons, emphasis |
| `700` | Modal titles, strong emphasis |

### Letter Spacing

| Value | Usage |
|-------|-------|
| `-1.2px` | Uppercase card titles |
| `-0.8px` | Subtitles, uppercase labels |
| `-0.5px` | Reward modal titles |
| `0.08em` | Metadata labels (positive tracking) |

### Text Transforms

- Uppercase: Card titles, metadata labels, subtitles
- Normal: Body text, descriptions

---

## 3. Icon System

### Primary Library: Lucide React

```bash
npm install lucide-react
```

**Usage:**
```tsx
import { Home, Bell, Check, Lock, Flame, MoveLeft, ChevronRight, X, Plus, Send, Globe } from "lucide-react"

<Home size={18} />
```

### Secondary: React Icons (Social Only)

```tsx
import { SiX, SiFarcaster } from "react-icons/si"
```

### Custom Icons

| Component | Path | Purpose |
|-----------|------|---------|
| `IntoriPlus` | `src/components/IntoriPlus/index.tsx` | Premium badge icon |
| `GiftIcon` | `src/components/GiftIcon/index.tsx` | Gift/reward icon |
| `SpecialGiftIcon` | `src/components/SpecialGiftIcons/index.tsx` | Gift type variants |

### Stamp Category Icons (SVG)

All stamp icons live in `/public/images/stamp-icons/` as SVG files.
Rendered via `<img>` tag for simplicity.

```tsx
import { getClusterIcon } from "@/utils/clusterAssets"

// Returns <img> element
const icon = getClusterIcon("gamers", 20)
```

---

## 4. UI Primitives

### Buttons

**Source:** `src/components/shared/Button/Button.module.css`

#### Variants

```css
/* Primary (CTA) */
.primary {
  background: var(--button-primary-bg, #D5F74E);
  color: var(--button-primary-color, #121212);
}

/* Secondary */
.secondary {
  background: #E6E6E6;
  color: #000;
}

/* Ghost */
.ghost {
  background: transparent;
  color: #000;
}

/* Dark (on light backgrounds) */
.footerDark {
  background: #121212;
  color: #FFF;
}

/* Disabled/Locked */
.locked {
  background: #dcdcdc;
  color: #000;
}
```

#### Sizes

```css
.sm {
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 18px;
}

.md {
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 24px;
}

.lg {
  padding: 18px 36px;
  font-size: 18px;
  border-radius: 88px; /* Pill shape */
}
```

#### Base Styles

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  text-align: center;
  transition: opacity 0.2s ease, transform 0.2s ease-out;
  white-space: nowrap;
}

.button:hover:not(:disabled) {
  opacity: 0.8;
}

.button:active:not(:disabled) {
  transform: scale(0.98);
}

.button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

### Panels/Cards

**Source:** `src/components/shared/Panel/Panel.module.css`

```css
.panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 36px;
  border-radius: 18px;
  background: #F8F8F7;
  color: #121212;
}

.withShadow {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
}
```

### Modals

**Source:** `src/components/DailyQuiz/StampRewardModal/StampRewardModal.module.css`

```css
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2147483644;
}

.modal {
  background: #fff;
  border-radius: 24px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
```

### Inputs

**Source:** `src/components/Input/Base/styles.module.css`

```css
.input {
  width: 100%;
  background: #fff;
  color: #000;
  font-size: 16px;
  padding: 10px;
  border: none;
  border-radius: 12px;
}

.input:focus {
  outline: var(--background);
}
```

### Badges

**Source:** `src/components/CountBadge/CountBadge.module.css`

```css
.countBadge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 14px;
  color: #D5F74E;
  background: #000;
}
```

---

## 5. Stamp Styling Recipe

### Stamp Tile (Standard Display)

**Source:** `src/components/StampCard/StampCard.module.css`

```css
/* Container */
.imageContainer {
  position: relative;
  width: 178px;
  height: 178px;
  border-radius: 12px;
  margin: 16px auto;
}

/* Image */
.stampImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}

/* Category icon overlay (bottom center) */
.iconOverlay {
  position: absolute;
  bottom: -16px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #121212;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
```

### Stamp Hero (Claim Modal)

**Source:** `src/components/DailyQuiz/StampRewardModal/StampHero.module.css`

```css
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.container.revealing {
  opacity: 1;
  transform: scale(1);
}

.imageWrapper {
  position: relative;
  width: 100%;
  max-width: clamp(180px, 60vw, 280px);
  aspect-ratio: 1;
}

.stampImage {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 12px;
}

/* Icon overlay (top right for claim modal) */
.iconOverlay {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stampName {
  font-size: 22px;
  font-weight: 600;
  color: #000;
  text-align: center;
}
```

### Stamp Badge (Mini/Dashboard)

**Source:** `src/components/StampsPanel/StampsPanel.module.css`

```css
.stampBadge {
  width: 32px;
  height: 32px;
  border-radius: 100%; /* Circle */
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(142, 109, 242, 0.12); /* Purple tint */
  color: #000;
}

.stampLocked {
  opacity: 0.4;
}
```

### Available to Claim List Item

**Source:** `src/components/StampsPanel/UnclaimedStampsView/UnclaimedStampsView.module.css`

```css
.stampItem {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
}

.stampIcon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stampName {
  flex: 1;
  font-size: 16px;
  font-weight: 600;
  color: #000;
}

/* Claimed state */
.claimedButton {
  border-radius: 24px;
  background: #D5F74E;
  color: #000;
}

/* Available to claim */
.claimButton {
  border-radius: 24px;
  background: #000;
  color: #FFF;
}
```

### Key Stamp Styling Values

| Property | Rounded Square | Circle |
|----------|----------------|--------|
| Border Radius | `12px` | `50%` or `100%` |
| Sizes | 178px (card), 280px max (hero) | 30-40px (badge/icon) |
| Aspect Ratio | `1:1` (square) | `1:1` (circle) |

### Shadows

```css
/* Icon overlay shadow */
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

/* Panel shadow */
box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);

/* Modal shadow */
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
```

---

## 6. Copy-Pasteable CSS Snippets

### Stamp Tile for Marketing Site

```css
.stamp-tile {
  position: relative;
  width: 178px;
  height: 178px;
  border-radius: 12px;
  overflow: visible;
}

.stamp-tile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}

.stamp-tile .icon-badge {
  position: absolute;
  bottom: -16px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #121212;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
```

### Large Hero Stamp

```css
.stamp-hero {
  position: relative;
  width: 100%;
  max-width: 280px;
  aspect-ratio: 1;
}

.stamp-hero img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 12px;
}
```

### Stamp Circle Badge

```css
.stamp-badge {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(142, 109, 242, 0.12);
}

.stamp-badge.locked {
  opacity: 0.4;
}
```

### Primary CTA Button

```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  background: #D5F74E;
  color: #121212;
  border: none;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.2s ease-out;
}

.btn-primary:hover {
  opacity: 0.8;
}

.btn-primary:active {
  transform: scale(0.98);
}
```

### Dark Button

```css
.btn-dark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  background: #121212;
  color: #FFFFFF;
  border: none;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.btn-dark:hover {
  opacity: 0.8;
}
```

### Content Panel

```css
.panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 36px;
  border-radius: 18px;
  background: #F8F8F7;
  color: #121212;
}

.panel.with-shadow {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
}
```

---

## 7. Animation Guidelines

### Reveal Animation (Stamps)

```css
/* Initial state */
.revealing-element {
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

/* Revealed state */
.revealing-element.visible {
  opacity: 1;
  transform: scale(1);
}
```

### Modal Animations

```css
/* Overlay fade */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Modal slide up */
@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.overlay { animation: fadeIn 0.2s ease-out; }
.modal { animation: slideUp 0.3s ease-out; }
```

### Button Press

```css
.button:active:not(:disabled) {
  transform: scale(0.98);
}
```

---

## 8. Layout Constants

| Property | Value |
|----------|-------|
| Max content width | `430px` |
| Panel padding | `36px` |
| Modal padding | `24px` |
| Standard gap | `16px` |
| Small gap | `8px` |
| Border radius (panel) | `18px` |
| Border radius (modal) | `24px` |
| Border radius (stamp) | `12px` |
| Border radius (button sm) | `18px` |
| Border radius (button md) | `24px` |
| Border radius (button lg/pill) | `88px` |
| Border radius (circle) | `50%` or `100%` |

---

## 9. Z-Index Scale

| Layer | Z-Index |
|-------|---------|
| Modal overlay | `2147483644` |
| Confetti | `2147483645` |
| Modal content | `2147483646` |
| Toast notifications | `1005` |
| Bottom sheet backdrop | `1000` |
| Bottom sheet content | `1001` |
| Full screen modal backdrop | `9998` |
| Full screen modal | `9999` |

---

## 10. Accessibility Considerations

- Reduced motion support: `@media (prefers-reduced-motion: reduce)`
- Minimum touch target: `48px` (buttons)
- Color contrast: Primary lime green `#D5F74E` on dark `#121212` (check contrast)
- Focus states: Use `outline: var(--background)` for inputs
