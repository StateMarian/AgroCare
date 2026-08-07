---
name: AgroCare Design System
colors:
  surface: '#fbf8ff'
  surface-dim: '#d5d8f9'
  surface-bright: '#fbf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f2ff'
  surface-container: '#ececff'
  surface-container-high: '#e5e6ff'
  surface-container-highest: '#dee0ff'
  on-surface: '#161a32'
  on-surface-variant: '#414844'
  inverse-surface: '#2b2f48'
  inverse-on-surface: '#f0efff'
  outline: '#717973'
  outline-variant: '#c1c8c2'
  surface-tint: '#3f6653'
  primary: '#012d1d'
  on-primary: '#ffffff'
  primary-container: '#1b4332'
  on-primary-container: '#86af99'
  inverse-primary: '#a5d0b9'
  secondary: '#0e6c4a'
  on-secondary: '#ffffff'
  secondary-container: '#a0f4c8'
  on-secondary-container: '#19724f'
  tertiary: '#302410'
  on-tertiary: '#ffffff'
  tertiary-container: '#473a24'
  on-tertiary-container: '#b7a487'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c1ecd4'
  primary-fixed-dim: '#a5d0b9'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#274e3d'
  secondary-fixed: '#a0f4c8'
  secondary-fixed-dim: '#85d7ad'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#f6dfc0'
  tertiary-fixed-dim: '#d9c4a5'
  on-tertiary-fixed: '#251a07'
  on-tertiary-fixed-variant: '#53452e'
  background: '#fbf8ff'
  on-background: '#161a32'
  surface-variant: '#dee0ff'
  surface-main: '#FFFFFF'
  surface-muted: '#F8F9FA'
  status-healthy: '#2D6A4F'
  status-warning: '#E9C46A'
  status-critical: '#E76F51'
  border-subtle: '#E9ECEF'
  slate-text: '#22223B'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  data-mono:
    fontFamily: jetbrainsMono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  sidebar-width: 280px
  container-padding: 2rem
  gutter-md: 1.5rem
  stack-sm: 0.5rem
  stack-md: 1rem
  stack-lg: 2rem
---

## Brand & Style

The design system is built for the modern agricultural professional. It balances the rugged, grounded reality of field management with the precision of high-tech data analytics. The brand personality is **authoritative, dependable, and clear**, designed to reduce cognitive load in complex operational environments.

The visual style is **Corporate / Modern** with a focus on high-information density and utilitarian efficiency. It utilizes a structured grid, clear visual hierarchies, and a palette inspired by the lifecycle of crops—ranging from deep, fertile forest greens to soft, technical sage and earthy neutrals. The aesthetic avoids unnecessary flourishes, prioritizing legibility and task completion for orchard managers who interact with large datasets regarding plant health, treatments, and plot logistics.

## Colors

The palette is anchored by **Deep Forest Green** (#1B4332), providing a strong sense of stability and brand identity in the navigation and primary actions. **Sage Green** (#74C69D) acts as a secondary accent, bridging the gap between brand elements and functional "success" indicators.

**Earthy Sand** (#D8C3A5) is used sparingly for decorative sectioning or thematic accents that ground the UI in the agricultural domain. **Slate** (#4A4E69) and its darker derivatives serve as the primary neutral for text and iconography, ensuring high contrast against the **Off-White** (#F8F9FA) backgrounds. Status colors (Healthy, Warning, Critical) are calibrated to be distinct even when placed alongside the green-heavy brand palette, ensuring that urgent "Plant Problems" are never missed.

## Typography

This design system uses **Inter** as its primary typeface to ensure maximum legibility across all screen types and lighting conditions. For data-specific values—such as treatment dosages (e.g., liters per hectare) or phytosanitary product toxicity levels—**JetBrains Mono** is utilized to provide a technical, high-precision feel.

Hierarchy is established through weight and scale. Headlines use Semi-Bold weights to anchor page sections (Orchards, Plots, Treatments), while body text remains at a standard weight for long-form activity logs. Labels use Medium or Bold weights in all-caps or small-caps for metadata such as soil types and growth stages.

## Layout & Spacing

The layout follows a **Fixed-Fluid Sidebar** model. A persistent 280px sidebar houses the primary navigation (Dashboard, Orchards, Treatments, Settings), while the main content area utilizes a fluid 12-column grid that adapts to the available screen width.

- **Desktop:** 12-column grid, 24px gutters, 32px page margins.
- **Tablet:** 8-column grid, 16px gutters, 24px page margins. The sidebar may collapse into an icon-only rail.
- **Mobile:** 4-column grid, 12px gutters, 16px page margins. The sidebar becomes a bottom navigation bar or a hidden drawer.

Spacing follows a strict 4px/8px baseline to maintain vertical rhythm in data-heavy views. Metric cards are grouped with 16px or 24px gaps to allow for quick scanning of health stats.

## Elevation & Depth

The design system utilizes **Tonal Layering** supplemented by **Ambient Shadows** to create a structured hierarchy without cluttering the interface.

- **Level 0 (Base):** The page background (#F8F9FA), where low-priority content sits.
- **Level 1 (Cards/Tables):** White surfaces (#FFFFFF) with a soft, 4% opacity shadow (8px blur) and a 1px subtle border (#E9ECEF). This level is used for Orchard cards, Plant lists, and Treatment tables.
- **Level 2 (Active States/Popovers):** Elements like dropdown menus or active selection cards use a slightly deeper shadow (12px blur, 8% opacity) to indicate priority.
- **Level 3 (Modals):** High-priority overlays (e.g., "Report Plant Problem" form) use a semi-transparent backdrop blur and a crisp, elevated shadow to focus user attention.

## Shapes

The shape language is **Rounded**, reflecting a modern tech aesthetic while maintaining professional rigor. 

- **Containers (Cards, Input Fields):** Use 0.5rem (8px) corners to feel approachable but efficient.
- **Primary Action Buttons:** Use 0.5rem corners to match input fields for a cohesive form experience.
- **Status Badges & Chips:** Use pill-shapes (full rounding) to clearly distinguish metadata—such as "Phytosanitary Category" or "Plant Variety"—from actionable components.
- **Visual Assets:** Images of plant problems or orchard plots should maintain the standard 0.5rem radius to integrate seamlessly into card layouts.

## Components

### Buttons
Primary buttons use the Deep Forest Green background with white text. Secondary buttons use a Sage Green outline or ghost style. Buttons should have a minimum height of 44px for field-use accessibility on touch devices.

### Cards
Metric cards are the core of the Dashboard. They should feature a top-aligned label (e.g., "Total Plants"), a large data value using the mono-font, and a bottom-aligned trend indicator or status badge (e.g., "Healthy"). Orchard and Plot cards should include a small thumbnail image and key metadata like "Soil Type" and "Plant Count."

### Data Tables
Tables should be clean with no vertical borders. Headers use the `label-sm` style with Slate text. Rows should include hover states (light-gray fill) and support status badges for "Treatment Status" (Planned, Applied, Cancelled).

### Forms
Inputs use a white background with a 1px border (#E9ECEF). Label positioning is always top-aligned. For complex operations like "Treatment Registration," use multi-step form indicators to prevent information overload.

### Status Badges
High-contrast indicators are required for the "Plot Plant Problem" entity. Use a "Severity" scale: 
- **Low:** Slate background.
- **Medium:** Earthy Sand background.
- **High:** High-Contrast Alert Red background.