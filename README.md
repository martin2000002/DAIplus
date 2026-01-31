# DAI+ Landing Page

> **Desarrollo, Asesoría e Innovación** — Consultoría Financiera Especializada

Landing page profesional para DAI+, construida con las mejores prácticas de desarrollo web moderno.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css)
![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?logo=greensock)

---

## 📚 Tabla de Contenidos

1. [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
2. [Patrones de Diseño](#-patrones-de-diseño)
3. [Sistema de Diseño](#-sistema-de-diseño)
4. [Estructura de Archivos](#-estructura-de-archivos)
5. [Tecnologías](#-tecnologías)
6. [Instalación](#-instalación)
7. [Scripts Disponibles](#-scripts-disponibles)
8. [Guía de Desarrollo](#-guía-de-desarrollo)

---

## 🏗 Arquitectura del Proyecto

### Feature-Sliced Design (FSD)

Este proyecto implementa una variante de **Feature-Sliced Design**, una metodología arquitectónica que organiza el código por **dominios de negocio** en lugar de por tipo de archivo.

```
src/
├── features/          # Módulos de funcionalidad por dominio
├── shared/            # Código compartido (UI, hooks, utils)
└── lib/               # Utilidades de bajo nivel
```

### Principios Arquitectónicos

| Principio                       | Implementación                                |
| ------------------------------- | --------------------------------------------- |
| **Separación de Concerns**      | Cada feature es independiente y autocontenida |
| **Single Responsibility**       | Un componente = una responsabilidad           |
| **DRY (Don't Repeat Yourself)** | Componentes UI reutilizables en `shared/`     |
| **Colocación**                  | Datos, hooks y componentes juntos por feature |

---

## 🎨 Patrones de Diseño

### 1. Component Composition Pattern

Componentes pequeños y enfocados que se componen para crear UI complejas:

```tsx
// ❌ Evitar: Componente monolítico
<MegaSection data={...} config={...} handlers={...} />

// ✅ Preferir: Composición
<Section>
  <SectionHeader title="..." subtitle="..." />
  <SectionContent>
    <CardGrid items={...} />
  </SectionContent>
</Section>
```

### 2. Container/Presentational Pattern

Separación entre lógica y presentación:

```
ContactSection.tsx     → Container (lógica, estado, efectos)
useContactForm.ts      → Hook personalizado (lógica de negocio)
ContactForm.tsx        → Presentacional (solo UI)
```

### 3. Custom Hooks Pattern

Encapsulación de lógica reutilizable:

```tsx
// src/shared/hooks/useGSAPAnimations.ts
export function useHeroAnimation() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Lógica de animación
    },
    { scope: containerRef },
  );

  return containerRef;
}
```

### 4. Barrel Exports Pattern

Cada feature expone una API pública limpia:

```tsx
// src/features/hero/index.ts
export { HeroSection } from "./components/HeroSection";

// Uso en página
import { HeroSection } from "@/src/features/hero";
```

### 5. CSS-First Theming (Tailwind v4)

Configuración de tema mediante CSS en lugar de JavaScript:

```css
/* app/globals.css */
@theme {
  --color-azul: #1f4f73;
  --color-naranja: #f5a623;
  --font-heading: "Montserrat", sans-serif;
}
```

---

## 🎯 Sistema de Diseño

### Colores de Marca

| Token           | Hex       | Uso                    |
| --------------- | --------- | ---------------------- |
| `azul`          | `#1F4F73` | Color primario, textos |
| `azul-dark`     | `#153A57` | Fondos oscuros         |
| `azul-light`    | `#2C6A9E` | Acentos, hovers        |
| `naranja`       | `#F5A623` | CTAs, acentos          |
| `naranja-dark`  | `#D4890C` | Hovers de CTAs         |
| `naranja-light` | `#FFBB33` | Highlights             |

### Uso con Tailwind

```tsx
// Clases generadas automáticamente por @theme
<div className="bg-azul text-white">
<button className="bg-naranja hover:bg-naranja-dark">
<h1 className="text-azul font-heading">
```

### Tipografía

| Variable         | Fuente     | Uso                      |
| ---------------- | ---------- | ------------------------ |
| `--font-heading` | Montserrat | Títulos, botones, badges |
| `--font-body`    | Open Sans  | Texto corrido, párrafos  |

### Componentes CSS Globales

```css
/* Botones */
.btn              /* Base */
.btn-primary      /* Naranja gradient */
.btn-secondary    /* Azul gradient */
.btn-outline      /* Borde blanco */
.btn-sm/md/lg     /* Tamaños */

/* Cards */
.card             /* Base con sombra */
.card-hover       /* Con hover effect */

/* Inputs */
.input            /* Base */
.input-error      /* Estado de error */

/* Layout */
.section          /* Base de sección */
.section-light    /* Fondo claro */
.section-dark     /* Fondo azul oscuro */
.container-custom /* Container responsive */
```

---

## 📁 Estructura de Archivos

```
daiplus/
├── app/                          # Next.js App Router
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # API endpoint de contacto
│   ├── globals.css               # Sistema de diseño + @theme
│   ├── layout.tsx                # Layout raíz + metadata SEO
│   └── page.tsx                  # Página principal (composición)
│
├── src/
│   ├── features/                 # Módulos por dominio
│   │   ├── header/
│   │   │   ├── components/
│   │   │   │   └── Header.tsx
│   │   │   └── index.ts          # Barrel export
│   │   │
│   │   ├── hero/
│   │   │   ├── components/
│   │   │   │   └── HeroSection.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── insights/
│   │   │   ├── components/
│   │   │   │   └── InsightsSection.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── services/
│   │   │   ├── components/
│   │   │   │   └── ServicesSection.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── social-proof/
│   │   │   ├── components/
│   │   │   │   └── SocialProofSection.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── team/
│   │   │   ├── components/
│   │   │   │   └── TeamSection.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── contact/
│   │   │   ├── components/
│   │   │   │   └── ContactSection.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useContactForm.ts
│   │   │   └── index.ts
│   │   │
│   │   └── footer/
│   │       ├── components/
│   │       │   └── Footer.tsx
│   │       └── index.ts
│   │
│   ├── shared/                   # Código compartido
│   │   ├── hooks/
│   │   │   └── useGSAPAnimations.ts
│   │   └── ...
│   │
│   └── lib/
│       └── utils.ts              # Utilities (cn, isValidEmail, etc.)
│
├── public/                       # Assets estáticos
│   └── images/
│
└── package.json
```

### Convenciones de Nomenclatura

| Tipo         | Convención          | Ejemplo             |
| ------------ | ------------------- | ------------------- |
| Componentes  | PascalCase          | `HeroSection.tsx`   |
| Hooks        | camelCase con `use` | `useContactForm.ts` |
| Utilidades   | camelCase           | `utils.ts`          |
| Archivos CSS | kebab-case          | `globals.css`       |
| Carpetas     | kebab-case          | `social-proof/`     |

---

## 🛠 Tecnologías

### Core

- **[Next.js 16](https://nextjs.org/)** — Framework React con App Router
- **[TypeScript 5](https://www.typescriptlang.org/)** — Tipado estático
- **[React 19](https://react.dev/)** — Biblioteca UI

### Estilos

- **[Tailwind CSS 4](https://tailwindcss.com/)** — CSS utility-first
  - CSS-first configuration con `@theme`
  - Generación automática de utilidades

### Animaciones

- **[GSAP 3](https://gsap.com/)** — Animaciones profesionales
- **[@gsap/react](https://gsap.com/react)** — Integración oficial con React
  - `useGSAP` hook para cleanup automático
  - ScrollTrigger para animaciones on-scroll

### Iconos

- **[Lucide React](https://lucide.dev/)** — Iconos modernos
  - Tree-shakeable (solo importas lo que usas)
  - +1400 iconos disponibles

---

## 🚀 Instalación

### Prerrequisitos

- Node.js 18+
- npm 9+ o pnpm

### Pasos

```bash
# Clonar repositorio
git clone <repo-url>
cd daiplus

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo con Turbopack

# Producción
npm run build        # Build optimizado
npm run start        # Servidor de producción

# Linting
npm run lint         # Ejecutar ESLint
```

---

## 📖 Guía de Desarrollo

### Agregar una Nueva Feature

1. **Crear estructura de carpetas:**

```bash
mkdir -p src/features/nueva-feature/components
touch src/features/nueva-feature/index.ts
```

2. **Crear componente principal:**

```tsx
// src/features/nueva-feature/components/NuevaSection.tsx
"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export function NuevaSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Animaciones aquí
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="section py-20">
      {/* Contenido */}
    </section>
  );
}
```

3. **Exportar desde barrel:**

```tsx
// src/features/nueva-feature/index.ts
export { NuevaSection } from "./components/NuevaSection";
```

4. **Usar en página:**

```tsx
// app/page.tsx
import { NuevaSection } from "@/src/features/nueva-feature";
```

### Agregar Colores de Marca

Editar `app/globals.css`:

```css
@theme {
  /* Agregar nuevo color */
  --color-nuevo: #HEX;
}
```

Automáticamente disponible como:

- `bg-nuevo`
- `text-nuevo`
- `border-nuevo`

### Agregar Animaciones GSAP

```tsx
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Registrar plugins (solo una vez)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// En componente
useGSAP(
  () => {
    gsap.fromTo(
      ".elemento",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".elemento",
          start: "top 80%",
        },
      },
    );
  },
  { scope: containerRef },
);
```

---

## 📝 Notas Adicionales

### SEO

El metadata está configurado en `app/layout.tsx` e incluye:

- Open Graph para redes sociales
- Twitter Cards
- Schema.org (pendiente)

### Formulario de Contacto

El endpoint `/api/contact` está preparado para integrar con:

- Resend
- SendGrid
- Cualquier servicio de email

### Imágenes

Los placeholders actuales deben reemplazarse con:

- Logo DAI+ real
- Foto de Diego Andrade
- Logos de clientes
- Código QR de contacto

---

## 📄 Licencia

Proyecto privado — Todos los derechos reservados © DAI+ 2026
