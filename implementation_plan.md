# Mobile Layout Fixes Implementation Plan

## Goal
Fix layout issues on mobile devices (specifically Samsung A52) where:
1. The season bar on the Events subpage is truncated/not fully visible.
2. The Gallery layout has positioning issues (gallery not right under the button).

## Proposed Changes

### Events Page (`src/modules/Events.svelte`)
- Change `.events-container` height from `100vh` to `100dvh` (and `min-height: 100dvh`) to account for mobile browser UI (address bars).
- Ensure `.season-menu-container` has safe padding at the bottom if necessary, but `100dvh` should mostly fix the clipping.
- Verify `overflow: hidden` usage. Ideally, we should want to fit everything, but if content is too large, we might need to allow scrolling or `min-height`. However, the design seems to intend a fixed viewport. I will stick to `100dvh` and check flex sizing.

### Gallery Page (`src/modules/Gallery.svelte`)
- Change `.gallery-container` height from `100vh` to `min-height: 100dvh` to ensure it fills the screen but allows scrolling if content is taller.
- Examine `.top-section` gap and alignment on mobile.
- Ensure the "See All Photos" button (`.mobile-only`) has correct spacing from the `.image-column` below it.
- Remove `height: 100%` constraints on mobile where they might force unwanted spacing or overlaps.

## Verification Plan

### Manual Verification
- **Emulate Samsung A52**: Use Browser Tool with viewport `412x915` (Samsung A52 specs roughly).
- **Events Page**: 
    - Check if the season bar is fully visible at the bottom.
    - Check if it stays visible with/without address bar (simulated by height changes).
- **Gallery Page**:
    - Check if "See All Photos" button is immediately above the gallery grid.
    - Ensure scrolling works and nothing is cut off.

### Automated Tests
- None specific to layout rendering (visual regression is manual here).
