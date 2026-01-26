# Apple Human Interface Guidelines (HIG) & Design Principles

This document outlines the core design principles, UI elements, and patterns that define Apple's ecosystem, specifically focusing on iOS (iPhone) and macOS (MacBook).

## 1. Core Design Principles

Apple's design philosophy centers on clarity, deference, and depth.

*   **Aesthetic Integrity**: The appearance and behavior of an app should integrate well with its function. Serious apps (like Stocks) use subtle, unobtrusive graphics, while games use immersive, playful designs.
*   **Consistency**: Use standard UI elements, well-known icons, standard text styles, and uniform terminology. The app should feel like part of the OS.
*   **Direct Manipulation**: Onscreen content stays stationary while users manipulate it. Pinching to zoom, swiping to scroll, and dragging content provide an immediate sense of control.
*   **Feedback**: Acknowledge actions and show results to keep people informed. Interactive elements should highlight briefly when tapped, progress indicators show status, and sounds/haptics reinforce interactions.
*   **Metaphors**: Use familiar metaphors (like folders, switches, and trash cans) to make the interface intuitive.
*   **User Control**: The user, not the app, should be in control. The app suggests actions or warns about consequences, but the user makes the final decision.

## 2. Typography

Apple's system font is **San Francisco (SF)**. It is designed for unmatched legibility, clarity, and consistency.

### Font Families
*   **SF Pro**: The main system font for iOS, macOS, and iPadOS.
    *   *SF Pro Text*: For sizes below 20pt.
    *   *SF Pro Display*: For sizes 20pt and larger.
*   **SF Compact**: Used primarily for Apple Watch (watchOS), designed with flat sides to be legible in tight vertical spaces.
*   **SF Mono**: Used for code and technical data.
*   **New York**: A serif typeface designed to complement SF Pro, often used in reading-centric apps (like Apple Books or News).

### Hierarchy & Sizing (iOS Standards)
Apple uses **Dynamic Type** to automatically adjust font weight, size, and leading based on user settings.

| Style | Weight | Size (Default) | Leading |
| :--- | :--- | :--- | :--- |
| **Large Title** | Regular | 34pt | 41pt |
| **Title 1** | Regular | 28pt | 34pt |
| **Title 2** | Regular | 22pt | 28pt |
| **Title 3** | Regular | 20pt | 25pt |
| **Headline** | Semibold | 17pt | 22pt |
| **Body** | Regular | 17pt | 22pt |
| **Callout** | Regular | 16pt | 21pt |
| **Subhead** | Regular | 15pt | 20pt |
| **Footnote** | Regular | 13pt | 18pt |
| **Caption 1** | Regular | 12pt | 16pt |
| **Caption 2** | Regular | 11pt | 13pt |

*   **Tracking**: SF Pro automatically adjusts letter spacing (tracking). Larger sizes have tighter tracking; smaller sizes have looser tracking.

## 3. Color

Colors are used to indicate interactivity, state, and brand identity.

### System Colors
Apple provides semantic system colors that automatically adapt to Light and Dark modes.

*   **System Blue**: `#007AFF` (Light) / `#0A84FF` (Dark) - Standard interactive color (buttons, links).
*   **System Red**: `#FF3B30` (Light) / `#FF453A` (Dark) - Destructive actions, errors.
*   **System Green**: `#34C759` (Light) / `#30D158` (Dark) - Success, active state.
*   **System Gray**: A range of 6 grays (`SystemGray` to `SystemGray6`) for backgrounds and separators.

### Background & Surface Layers
*   **iOS**:
    *   *System Background*: Primary white/black background.
    *   *Secondary System Background*: Slightly lighter/darker for grouped table views.
*   **macOS**: Uses specific material colors like `windowBackgroundColor` or `controlBackgroundColor`.

### Dark Mode
*   Avoid pure black (`#000000`) for backgrounds in Dark Mode unless strictly necessary (e.g., OLED optimization). Prefer dark greys (e.g., `#1C1C1E`) to reduce eye strain and smearing.
*   Colors in Dark Mode are generally slightly more vibrant (lighter/pastel) to ensure sufficient contrast against dark backgrounds.

## 4. Layout & Spacing

### The Grid
*   **8pt Grid System**: Most layout dimensions, margins, and padding are multiples of 8 (8, 16, 24, 32).
*   **4pt Sub-grid**: Used for tighter spacing (e.g., between text and an icon).

### Touch Targets (iOS)
*   **Minimum Size**: 44x44 points. Even if the visual icon is smaller, the tappable area must be at least 44pt to ensure accuracy.

### Safe Areas
*   Respect the **Safe Area** to avoid content being clipped by rounded corners, the notch/Dynamic Island, or the home indicator.
*   **Standard Margins**: typically 16pt or 20pt on the sides of the screen.

## 5. Iconography (SF Symbols)

**SF Symbols** is a library of over 5,000 vector icons integrated into the San Francisco font.

*   **Scale & Weight**: Symbols align seamlessly with text weights (Light, Regular, Bold) and scales (Small, Medium, Large).
*   **Rendering**: Supports monochrome, hierarchical (multiple shades of one color), palette (multiple colors), and multicolor rendering.
*   **Animation**: SF Symbols 5+ supports native animations (bounce, pulse, variable color).

## 6. UI Components & Materials

### Materials (Blur/Translucency)
Apple heavily uses "materials" (blur effects) to create depth and context. This is often called **Glassmorphism**.

*   **Usage**: Control Centers, Sidebars (macOS), Tab Bars, Navigation Bars.
*   **Types**:
    *   *Ultra Thin / Thin / Regular / Thick / Chrome*: Different levels of background blur (Vibrancy).
    *   Allows content behind the layer to "shine through," maintaining context.

### Navigation (iOS vs. macOS)
*   **iOS**:
    *   *Tab Bar*: Bottom navigation for top-level hierarchy.
    *   *Navigation Bar*: Top bar for hierarchy navigation (Back button, Title, Edit).
*   **macOS**:
    *   *Sidebar*: Primary navigation on the left (transparent/translucent).
    *   *Toolbar*: Top controls unified with the window title bar.

### Buttons
*   **iOS**: Full-width rounded rectangles (filled or tinted) or borderless text buttons in navigation bars.
*   **macOS**: Push buttons, toggle buttons, and pop-up buttons suitable for mouse interaction.

## 7. Motion & Animation

Motion should be purposeful, not just decorative. It explains layout changes and spatial relationships.

### Animation Types
*   **Spring Animation**: The standard for Apple motion. It mimics physical mass and friction (no rigid linear movements).
    *   *Damping*: Controls how much the object oscillates before stopping.
    *   *Stiffness*: Controls the speed of the spring.
*   **Transitions**:
    *   *Push/Pop*: Lateral movement for navigating hierarchy (Master -> Detail).
    *   *Modal Presentation*: Sheets sliding up from the bottom (implies a temporary context).
    *   *Zoom/Morph*: Opening an app or folder (expanding from source).
*   **Parallax**: Subtle depth effects (e.g., on icons or Home Screen wallpaper).

## 8. Haptics (iOS)

Haptic feedback provides physical confirmation of actions.

*   **Impact Styles**:
    *   *Light*: Spinner ticks, subtle interactions.
    *   *Medium*: Toggle switches, standard buttons.
    *   *Heavy*: firm snaps, distinct actions.
*   **Notification Types**:
    *   *Success*: Two quick pulses.
    *   *Warning*: Two sharp pulses.
    *   *Error*: A rapid, distinctive vibration.

## 9. App Icons

### iOS
*   **Shape**: Rounded rectangle (Squircle).
*   **Grid**: Internal grid to align circles and squares optically.
*   **Style**: Simple, focused point of interest, no transparent backgrounds.

### macOS
*   **Shape**: Rounded rectangle (uniform across the system since Big Sur).
*   **Style**: Realistic rendering, drop shadows, slightly tilted perspective (sometimes), implying a physical object.
