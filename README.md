# Pioliverse

Portafolio personal de **Alejandra Bedoya León**, Backend .NET Developer.
Sitio: https://pioliverse.vercel.app

## Stack

- Vite + React 19 + TypeScript
- Framer Motion (apariciones al hacer scroll) y animaciones CSS (órbitas, cinta de logos, bóvedas)
- Modo claro / oscuro con variables CSS (`data-theme`) y preferencia guardada
- Español / inglés con diccionarios tipados

## Levantar en local

```bash
npm install
npm run dev
```

Otros scripts: `npm run build`, `npm run preview`, `npm run lint`.

## Estructura

```
src/
├── assets/            logos SVG, pollito, foto, íconos oficiales del stack
├── components/
│   ├── layout/        Navbar, Footer
│   ├── sections/      Hero, About (OrbitPhoto), Stack, Experience, Projects (Vault), Contact
│   └── ui/            Button, Card, Chip, Icon, Logo, Reveal, SectionHeader, Sparkle
├── context/           ThemeProvider, LanguageProvider
├── data/              stack, proyectos, contacto
├── hooks/             useTheme, useLanguage
├── i18n/              es.ts (fuente de los tipos), en.ts
└── styles/global.css  tokens de color, base y animaciones
```

## Agregar un proyecto a las bóvedas

1. Pon la captura en `src/assets/`.
2. Agrega el proyecto en `src/data/projects.ts` (nivel, nombre, imagen, tags, links).
3. Escribe su descripción en `projects.items` de `src/i18n/es.ts` y `src/i18n/en.ts`.

## Cambiar textos

Todos los textos visibles viven en `src/i18n/es.ts` y `src/i18n/en.ts`. TypeScript avisa si a inglés le falta alguna clave.
