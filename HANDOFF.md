# Website Handoff Guide

> Hero layouts, asset requirements, and implementation checklist for the Intori marketing website

---

## Hero Layout Proposals

### Concept A: "Stamp Cascade" (Recommended)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│     [intori logo]                                              │
│                                                                 │
│     "Discover People,                                          │
│      Collect Stamps"         ┌─────────────┐                   │
│                              │             │   ◐ (stamp, large) │
│     [Tagline text]           │   iPhone    │ ◉ (stamp, med)    │
│                              │   Frame     │   ◑ (stamp, small)│
│     [CTA Button]             │             │                   │
│                              │  (App Home  │  ⬤ (floating)     │
│                              │  Screenshot)│                   │
│                              │             │    ◐ (bottom)     │
│                              └─────────────┘                   │
│                                                                 │
│   ◉ (bg stamp, subtle, 10% opacity)          ◑ (bg stamp)      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Layout Description:**
- Left side: Logo, headline, tagline, primary CTA
- Center-right: iPhone device frame with app screenshot
- Cascading stamps flowing from top-right to bottom-right, around the device
- 2-3 large (256px), 4-5 medium (128px), 3-4 small (64px) stamps
- 2-3 very large background stamps (512px) at 5-10% opacity behind content

**Required Assets:**
| Asset | Specs | Source |
|-------|-------|--------|
| Logo (white) | SVG | `public/images/intori-text.svg` |
| Logo (dark) | SVG | **CREATE** - flip fill to #121212 |
| iPhone Frame | PNG/SVG | **CREATE** - iPhone 15 Pro mockup |
| App Screenshot | 1170x2532 | **CREATE** - capture from app |
| Hero Stamps (12) | 512x512 WebP | Export from `public/images/STAMPS/*/MAIN.png` |
| BG Stamps (3) | 512x512 WebP @ 10% | Same source, apply opacity |

**CSS Implementation (No JS Animation):**

```css
.hero {
  position: relative;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 80px;
  overflow: hidden;
}

.hero-content {
  z-index: 10;
}

.device-wrapper {
  position: relative;
  z-index: 10;
}

/* Cascading stamps - absolute positioned */
.stamp-cascade {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 60%;
  pointer-events: none;
}

.stamp-cascade .stamp {
  position: absolute;
  border-radius: 12px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
}

/* Example positions */
.stamp-cascade .stamp-1 { top: 5%; right: 10%; width: 200px; transform: rotate(-5deg); }
.stamp-cascade .stamp-2 { top: 15%; right: 30%; width: 150px; transform: rotate(8deg); }
.stamp-cascade .stamp-3 { top: 35%; right: 5%; width: 180px; transform: rotate(-3deg); }
.stamp-cascade .stamp-4 { top: 50%; right: 25%; width: 120px; transform: rotate(12deg); }
.stamp-cascade .stamp-5 { top: 65%; right: 8%; width: 160px; transform: rotate(-8deg); }
.stamp-cascade .stamp-6 { bottom: 10%; right: 20%; width: 100px; transform: rotate(5deg); }

/* Background stamps */
.bg-stamps {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.bg-stamps .stamp {
  position: absolute;
  opacity: 0.08;
  border-radius: 24px;
}

.bg-stamps .stamp-1 { top: -10%; left: -5%; width: 400px; transform: rotate(-15deg); }
.bg-stamps .stamp-2 { bottom: -15%; right: 40%; width: 500px; transform: rotate(10deg); }
```

---

### Concept B: "Collection Grid"

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│     [intori logo]                                              │
│                                                                 │
│     "Discover People, Collect Stamps"                          │
│                                                                 │
│     ┌─────────────────────────────────────────┐                │
│     │  ◉  ◑  ◐  ◉  ◑  ◐  ◉  (stamp grid)     │                │
│     │  ◑  ◐  ◉  ◑  ◐  ◉  ◑                   │                │
│     │  ◐  ◉  ◑  ◐  ◉  ◑  ◐                   │                │
│     └─────────────────────────────────────────┘                │
│                                                                 │
│     [CTA Button]                                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Layout Description:**
- Centered layout, simpler implementation
- Headline and tagline at top
- Grid of 15-21 stamps (3 rows x 5-7 columns)
- Varying sizes: some larger (featured), most uniform
- CTA below grid

**Required Assets:**
| Asset | Specs | Source |
|-------|-------|--------|
| Logo | SVG | `public/images/intori-text.svg` |
| Grid Stamps (21) | 160x160 WebP | Export from STAMPS folders |

**CSS Implementation:**

```css
.hero-grid {
  text-align: center;
  padding: 80px 40px;
}

.stamp-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 16px;
  max-width: 900px;
  margin: 48px auto;
}

.stamp-grid .stamp {
  aspect-ratio: 1;
  border-radius: 12px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.stamp-grid .stamp:hover {
  transform: scale(1.05);
}

/* Feature certain stamps */
.stamp-grid .stamp.featured {
  grid-column: span 2;
  grid-row: span 2;
}
```

---

### Concept C: "Phone Focus"

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   ◑ (floating)    [intori logo]              ◐ (floating)      │
│                                                                 │
│        ◉          "Discover People,          ◉                 │
│                    Collect Stamps"                             │
│   ◐                                              ◑             │
│              ┌───────────────────┐                             │
│              │                   │                             │
│       ◑      │     iPhone        │      ◐                      │
│              │     Frame         │                             │
│   ◉          │   (Claim Modal    │          ◉                  │
│              │    Screenshot)    │                             │
│       ◐      │                   │      ◑                      │
│              └───────────────────┘                             │
│                                                                 │
│                   [CTA Button]                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Layout Description:**
- Large centered device with claim modal screenshot
- Stamps floating in circular pattern around device
- Suggests "collecting" motion without animation
- Best for highlighting the claim experience

**Required Assets:**
| Asset | Specs | Source |
|-------|-------|--------|
| Logo | SVG | `public/images/intori-text.svg` |
| iPhone Frame | PNG/SVG | **CREATE** |
| Claim Modal Screenshot | 1170x2532 | **CREATE** - capture claim UI |
| Floating Stamps (10-12) | Various sizes | Export from STAMPS folders |

---

## Stamp Selection Recommendations

### Primary Hero Stamps (12)

Choose visually distinct, colorful stamps that represent different interests:

| Stamp | Why | Color |
|-------|-----|-------|
| Gamers | Recognizable controller icon, yellow pop | `#F2FD00` |
| Music Lovers | Universal appeal, purple | `#D467FF` |
| Foodies | Warm, inviting, red | `#E5484D` |
| Travel | Aspirational, blue | `#60B3D7` |
| Creators | Creative energy, yellow | `#F2FD00` |
| Pet Owners | Emotional connection, orange | `#F76B15` |
| Fitness & Wellness | Active lifestyle, blue | `#60B3D7` |
| Tech & AI Curious | Modern, tech-forward, purple | `#D467FF` |
| Bookworms | Intellectual, purple | `#D467FF` |
| Sports Fans | Energy, competition, orange | `#F76B15` |
| Collectors | Hobby appeal, green | `#72B01D` |
| Community Builders | Social, connection, orange | `#F76B15` |

### Background Accent Stamps (3-4)

Use with very low opacity (5-10%) as decorative elements:
- Choose stamps with interesting silhouettes
- Larger size (400-600px)
- Slight rotation for visual interest

---

## Implementation Approach

### Safe, No-Framework Method

1. **Static positioning** - Use CSS absolute/relative positioning, no JS libraries
2. **CSS transforms** - Subtle rotations with `transform: rotate(Xdeg)`
3. **Object-fit: cover** - Ensures stamps look good at any crop
4. **Border-radius: 12px** - Consistent rounded corners matching app

### Optional Subtle Enhancements

```css
/* Subtle float effect on hover (optional) */
.stamp {
  transition: transform 0.4s ease;
}

.stamp:hover {
  transform: translateY(-4px) rotate(var(--rotation));
}

/* Subtle parallax on scroll (CSS only) */
@supports (animation-timeline: scroll()) {
  .stamp-cascade .stamp {
    animation: float linear;
    animation-timeline: scroll();
  }

  @keyframes float {
    from { transform: translateY(0); }
    to { transform: translateY(-20px); }
  }
}
```

### Performance Tips

- Use WebP format for all stamp images
- Lazy load stamps below the fold
- Consider `loading="eager"` for hero stamps
- Use `srcset` for responsive images

---

## Handoff Checklist

### Assets to Export from This Repo

- [ ] Copy `public/images/intori-text.svg` (white logo)
- [ ] Copy `public/images/logo.png` (square logo)
- [ ] Copy `public/images/intori-plus.svg` (if showing premium features)
- [ ] Copy all files from `public/images/stamp-icons/` (category icons)
- [ ] Export 12-20 stamp images from `public/images/STAMPS/*/MAIN.png`:
  - Resize to 512x512 for hero, 256x256 for background
  - Convert to WebP for web optimization
  - Apply 12px border-radius in CSS (not baked into image)

### Assets to Create

- [ ] **iPhone Device Frame** - Find or create iPhone 15 Pro mockup PNG/SVG
- [ ] **App Screenshots** (3 recommended):
  - Home/dashboard view showing stamp collection
  - Claim modal showing a stamp being claimed
  - Profile view showing collected stamps
- [ ] **Dark Logo Variant** - Edit `intori-text.svg`, change fill to `#121212`

### Brand Tokens to Apply

- [ ] Primary CTA: `background: #D5F74E; color: #121212;`
- [ ] Secondary/Dark button: `background: #121212; color: #FFFFFF;`
- [ ] Panel backgrounds: `#F8F8F7`
- [ ] Page background: `#FFFFFF` (marketing site) or `#121212` (dark sections)
- [ ] Font: `font-family: Arial, Helvetica, sans-serif;`
- [ ] Button radius: `24px` (medium), `88px` (pill/large)
- [ ] Card radius: `18px`
- [ ] Stamp radius: `12px`

### Quality Checks

- [ ] All stamp images have consistent 12px border-radius
- [ ] CTA buttons use lime green `#D5F74E`
- [ ] Text hierarchy matches app (600 weight for titles)
- [ ] Cluster colors match brand (see BRAND.md for palette)
- [ ] Responsive layout works on mobile (stamps scale down)
- [ ] No heavy JS animations - CSS only for performance
- [ ] Images optimized (WebP, appropriate sizes)

### Folder Structure for Website Repo

```
/public/
├── brand/
│   ├── intori-logo-white.svg
│   ├── intori-logo-dark.svg
│   └── intori-logo-square.png
├── stamps/
│   ├── gamers.webp
│   ├── music-lovers.webp
│   ├── foodies.webp
│   └── ... (12-20 stamps)
├── icons/
│   └── stamp-icons/
│       ├── gamers.svg
│       └── ... (all category icons)
└── screenshots/
    ├── app-home.png
    ├── app-claim.png
    └── device-frame.png
```

---

## Quick Reference: Stamp Styling

```css
/* Rounded square stamp (standard) */
.stamp {
  border-radius: 12px;
  aspect-ratio: 1;
  object-fit: cover;
}

/* With shadow (for floating stamps) */
.stamp.elevated {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
}

/* Circle variant (for badges) */
.stamp-badge {
  border-radius: 50%;
  width: 32px;
  height: 32px;
}

/* Background stamp (subtle) */
.stamp.bg {
  opacity: 0.08;
  border-radius: 24px; /* Softer corners for bg */
}
```

---

## Contact / Questions

This brand pack was extracted from the `intori-app` codebase. For clarification on any tokens or patterns, reference:

- `src/app/globals.css` - CSS variables
- `src/utils/clusterAssets.ts` - Cluster colors and asset paths
- `src/components/shared/Button/Button.module.css` - Button styles
- `src/components/DailyQuiz/StampRewardModal/` - Claim UI styling
