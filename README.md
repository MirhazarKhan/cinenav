# Cinematic Navigation & Viewport Transitions 🎬✨

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js 15](https://img.shields.io/badge/Next.js-15-black.svg?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-61DAFB.svg?logo=react&logoColor=black)](https://react.dev/)
[![Motion](https://img.shields.io/badge/Motion-React-yellow.svg)](https://motion.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4-38B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Status: Production Ready](https://img.shields.io/badge/Status-Production%20Ready-success.svg)]()

> **Awwwards-inspired cinematic navigation with directional viewport transitions and 3D pointer parallax.**  
> Built with Next.js 15, React 19, Motion, and Tailwind CSS v4, featuring multi-axis mouse tracking, wheel scroll state machines, and buttery-smooth cinematic page transitions.

---

## ⚡ Key Features

- **Directional Slide & Depth Transitions:** Motion-driven cinematic entry and exit transitions with physics-based spring curves.
- **Interactive 3D Mouse Parallax:** Responsive multi-layer parallax offset that tracks user cursor coordinate deltas.
- **Full Gesture & Keyboard Support:**
  - Mouse wheel throttle & threshold detection
  - Arrow keys (`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`)
  - Touch swipe gestures for mobile viewports
- **Tailwind CSS v4 Integration:** Modern, ultra-fast styling with glassmorphic overlay navigation and dynamic color palettes.

---

## 📁 Repository Structure

```text
cinenav/
├── app/
│   ├── globals.css         # Tailwind v4 styles
│   ├── layout.tsx          # Root Next.js layout
│   └── page.tsx            # Main cinematic navigation experience
├── hooks/
│   └── use-mobile.ts       # Viewport & device detection hook
├── lib/
│   └── utils.ts            # Utility functions
├── package.json            # Dependencies
├── LICENSE                 # MIT License
└── README.md               # Project documentation
```

---

## 🚀 Quickstart

### 1. Installation

```bash
git clone https://github.com/MirhazarKhan/cinenav.git
cd cinenav

# Install dependencies
npm install
```

### 2. Development

Run the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build

```bash
npm run build
npm run start
```

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

## 👨‍💻 Author

**Mirhazar Khan**  
*Senior 3D & Creative Web Engineer | AI Systems & Procedural Graphics Researcher*  
- **GitHub:** [@MirhazarKhan](https://github.com/MirhazarKhan)  
- **Website:** [mirhazarkhan.com](https://mirhazarkhan.com)
