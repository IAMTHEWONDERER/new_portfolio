# 🚀 Space Portfolio — Mission Patch

**"Apollo Monochrome" — The aesthetic of NASA mission documentation, vintage astronaut patches, and precision engineering manuals.**

This portfolio is a high-performance, immersive 3D experience built with React, Three.js, and GSAP. It follows a strict design philosophy that combines military-grade precision with luxury minimalism.

---

## 🛰️ Project Structure

The project is organized into modular directories for clarity and scalability:

-   `src/components`: Atomic UI elements and specialized 3D components (e.g., `SolarSystem.jsx`, `StarField.jsx`).
-   `src/sections`: Thematic page layouts that represent the "Mission Patch" sections (e.g., `Hero.jsx`, `LifeStory.jsx`, `PlanetPage.jsx`).
-   `src/data`: Static data configurations for environment generation (e.g., `stars.js`).
-   `public/`: Static assets including textures and potential 3D assets.

---

## 🛠️ Technology Stack

-   **Framework**: [React 19](https://react.dev/)
-   **Bundler**: [Vite](https://vitejs.dev/)
-   **3D Engine**: [Three.js](https://threejs.org/) via [@react-three/fiber](https://github.com/pmndrs/react-three-fiber)
-   **Animations**: [GSAP](https://greensock.com/gsap/) & [Framer Motion](https://www.framer.com/motion/)
-   **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/) & Vanilla CSS

---

## 📝 Code Quality & Known Issues

During development, the following areas have been identified for future refactoring:

1.  **Content Hardcoding**: Substantial content arrays (e.g., `PLANET_CONTENT` in `PlanetPage.jsx` and `projects` in `Hero.jsx`) are currently hardcoded within component files. These should be moved to external data files or a CMS.
2.  **Styling Fragmentation**: There is a mix of Tailwind CSS classes and extensive React inline styles (notably in `PlanetPage.jsx`). Standardizing on Tailwind or CSS Modules would improve maintainability.
3.  **Token Consistency**: The "Geom" font used in `PlanetPage.jsx` deviates from the primary font stack defined in the official [Space Design System](SPACE_DESIGN_SYSTEM_v2.md).
4.  **Performance Overhead**: Multiple instances of the `SolarSystem` background across sections may cause unnecessary GPU load if not carefully orchestrated via global state.

---

## 🌍 i18n Roadmap: Multi-Language Support (FR/EN)

To implement a bilingual experience (French/English), follow these steps:

### Step 1: Install i18n dependencies
Install the industry-standard libraries:
```bash
npm install i18next react-i18next i18next-browser-languagedetector
```

### Step 2: Extract hardcoded strings
Create a `src/locales` directory with `en.json` and `fr.json`. Move all text from `PLANET_CONTENT` and `Hero.jsx` into these files.
*Example `en.json`:*
```json
{
  "about": { "title": "About Me", "subtitle": "Who I Am" }
}
```

### Step 3: Initialize i18next
Create `src/i18n.js` to configure the library and load your translation files. Import this file in your `main.jsx` entry point.

### Step 4: Component Integration
Replace static text with the `useTranslation` hook:
```jsx
// src/sections/PlanetPage.jsx
const { t } = useTranslation();
// ...
<h1>{t('about.title')}</h1>
```

### Step 5: Mission Comms Switcher
Create a "Mission Comms" toggle component. Use `i18n.changeLanguage('fr')` to trigger the global state update.

### Step 6: Dynamic 3D Labels
Ensure any 3D text labels (inside `SolarSystem.jsx`) are also passed through the translation hook to maintain immersion.

---

## 🚀 Getting Started

1.  **Clone & Install**:
    ```bash
    npm install
    ```
2.  **Launch Mission**:
    ```bash
    npm run dev
    ```
3.  **Build for Deployment**:
    ```bash
    npm run build
    ```

---

*Design System v2.0 — "Apollo Monochrome" — Morocco 2026*
