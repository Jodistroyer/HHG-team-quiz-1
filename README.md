# HHG: Head, Heart, Gut System

---

## Final Year Product Explanation Video

[![Watch the video](https://img.youtube.com/vi/R0vKr5tqZfU/maxresdefault.jpg)](https://youtu.be/R0vKr5tqZfU)

A human decision-making framework that translates complex thinking into a shared visual language.

---

## What is HHG?

HHG stands for:

- Head → Logic
- Heart → Emotion
- Gut → Instinct

The system helps people understand how different forms of thinking interact during decision-making, communication, creativity, and self-awareness.

Rather than relying on highly technical terminology, HHG uses concepts that most people already understand intuitively in daily life.

---

## Features

- Interactive visual system
- Real-time relationship mapping
- Human-centered framework
- Designed for accessibility and shared understanding
- Built with React + TypeScript + Vite

---

## Philosophy

HHG is designed to create a shared language between people.

The goal is not to replace existing psychological or academic models, but to make complex internal experiences easier to discuss, visualize, and reflect on.

---

## Tech Stack

- React
- TypeScript
- Vite
- CSS / Tailwind

---

## Installation

```bash
npm install
npm run dev
```

---

## Author

Created by Wong Jo-Hann



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
