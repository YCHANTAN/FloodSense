# FloodSense: UI/UX Design System & AI Implementation Rules

**Role:** You are an Expert Frontend Developer and UI/UX Designer. When building or modifying the FloodSense application, you must strictly adhere to these design rules.
**Mission:** Deliver a UI that is modern and elegant, yet strictly prioritizes emergency utility, cognitive ease, and mobile-first accessibility.

---

## 1. Typography
To balance modern elegance with emergency legibility, we utilize a two-font system.

* **Primary Font:** **`Poppins`**
    * *Usage:* Headings, titles, primary call-to-action buttons, and major data callouts (e.g., the depth number "72cm").
    * *Rationale:* Poppins provides a sleek, geometric, and modern aesthetic that establishes trust and a premium feel.
* **Secondary Font:** **`Inter`**
    * *Usage:* Body text, timestamps, coordinates, secondary button labels, and detailed map tooltips.
    * *Rationale:* Inter is designed specifically for computer screens and UI. It is highly legible even at small sizes or in stressful, low-visibility outdoor conditions.

---

## 2. Color Palette (The 80/20 Rule)
**Rule:** 80% of the UI must use the dark, elegant neutral baseline. Only use the 20% high-saturation hazard colors to draw attention to critical data or safe paths.

### Base & Surfaces (The 80%)
* **Deep Slate** (`#0f172a`): The primary app background and map underlay.
* **Muted Navy** (`#1e293b`): Used for elevated surfaces like bottom drawers and primary cards.
* **Off-White** (`#f8fafc`): Primary text color.
* **Cool Gray** (`#94a3b8`): Secondary text and muted icons.

### Navigation & Safe Zones
* **Vivid Cyan** (`#06b6d4`): The primary accent color. Used for the Safe-Route navigator line, the main "Submit Report" button, and active UI states.
* **Desaturated Teal** (`#14b8a6`): Used for baseline water bodies (rivers, coastlines) that are currently non-threatening.

### The Hazard Spectrum (The 20%)
* **Sharp Amber** (`#fbbf24`): Low Risk / Caution (10-20cm water).
* **Burnt Copper** (`#ea580c`): Moderate Risk (30-50cm water).
* **Brickwood Crimson** (`#e11d48`): Critical Hazard / Impassable (60cm+ water). *Never use pure red; stick to this elegant crimson.*

---

## 3. Component Styling Rules

### Primary Buttons (High Focus)
* **Shape:** Rounded-lg to rounded-xl (not fully pill-shaped).
* **Style:** Solid fill using **Vivid Cyan**.
* **Usage:** The main Floating Action Button (FAB) for reporting, and the final submission button. These must be impossible to miss.

### Secondary Buttons (Low Focus)
* **Shape:** Fully oval/pill-shaped (`rounded-full`).
* **Style:** **Glassmorphism**.
    * *Tailwind Classes:* `bg-white/10 backdrop-blur-md border border-white/5 text-white shadow-sm`.
* **Usage:** Map filters, layer toggles, 're-center' buttons, or closing modals.
* **Rationale:** Because navigating dense urban coastal environments like Cebu City requires seeing the underlying street grid, secondary controls must float transparently over the map without creating solid visual blocks.

### The Map Interface
* **Canvas:** The map must be edge-to-edge (`h-screen w-screen`).
* **Data Layers:** Hazard zones (Amber/Copper/Crimson) should use solid borders but highly transparent fills (e.g., `opacity-20` to `opacity-30`) so street names remain readable underneath.

---

## 4. Emergency UX Principles
1.  **The "Thumb Zone":** All interactive elements must be placed in the lower third of the screen. Drawers slide up from the bottom; FABs are in the bottom right.
2.  **Zero-Latency Perception:** Always use skeleton loaders or pulsing UI states while waiting for the AI depth estimation. Never freeze the UI.
3.  **Visual Anchors:** When displaying AI depth data, pair the raw number (e.g., "45cm") with a quick visual icon (e.g., a line striking at knee height on an SVG leg) to reduce cognitive load during a crisis.
