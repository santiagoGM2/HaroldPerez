# Diagnóstico PYMES 4.0 — Harold Pérez

Landing de una sola pantalla (estilo aplicación) que funciona como un diagnóstico
empresarial interactivo para captar leads. El empresario responde 12 preguntas,
descubre en qué etapa está su empresa (PyME 1.0 a 4.0), recibe un análisis
personalizado y termina en una conversación de WhatsApp.

Construida con **Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion**.
Lista para desplegar en **Vercel**.

---

## Cómo correr el proyecto en local

```bash
npm install
npm run dev
```

Luego abre [http://localhost:3000](http://localhost:3000).

Para una versión de producción:

```bash
npm run build
npm run start
```

> El proyecto funciona sin configurar nada: si no hay clave de API, el análisis
> personalizado se genera con plantillas locales. El usuario nunca ve un error.

---

## Lo que vas a personalizar

### 1. La foto de Harold

Coloca la foto en `public/harold.webp` (ver `public/LEEME.txt`). Mientras no
exista, se muestra un placeholder con las iniciales "HP".

### 2. El número de WhatsApp

Edita la constante en [`lib/whatsapp.ts`](lib/whatsapp.ts):

```ts
export const WHATSAPP_NUMBER = "57XXXXXXXXXX";
```

Usa el formato internacional sin signos (código de país + número).
Ejemplo Colombia: `"573001234567"`.

### 3. El gancho de Harold

Edita `HAROLD.hook` en [`lib/content.ts`](lib/content.ts). Hay dos alternativas
comentadas justo debajo para que elijas según la historia real de Harold.

### 4. El resto del contenido

Todo el texto visible vive en archivos de datos, fáciles de editar sin tocar la UI:

- [`lib/content.ts`](lib/content.ts) — textos de la interfaz (intro, quiz, lead, resultado, CTA).
- [`lib/questions.ts`](lib/questions.ts) — las 12 preguntas y su puntaje.
- [`lib/stages.ts`](lib/stages.ts) — las 4 etapas, sus descripciones y costos ocultos.

---

## El análisis personalizado (clave de API)

El análisis personalizado lo genera la API de Anthropic a través de una única
route handler en [`app/api/analyze/route.ts`](app/api/analyze/route.ts). La clave
se mantiene segura en el servidor (nunca se expone en el navegador).

### En local

Crea un archivo `.env.local` a partir de `.env.example`:

```bash
ANTHROPIC_API_KEY=tu-clave-aqui
```

Consigue tu clave en [console.anthropic.com](https://console.anthropic.com).

### En Vercel

1. Importa el repositorio en Vercel.
2. En **Settings → Environment Variables**, agrega:
   - `ANTHROPIC_API_KEY` = tu clave de Anthropic
3. Despliega. No hay base de datos ni pasos extra.

El modelo se puede cambiar fácilmente en `app/api/analyze/route.ts`
(por defecto `claude-haiku-4-5-20251001`, por costo y velocidad; para mayor
calidad de redacción, `claude-sonnet-4-6`).

---

## Cómo funciona el diagnóstico

- **Puntaje:** cada pregunta suma sus puntos cuando la respuesta coincide con la
  esperada. El máximo es 20 puntos.
- **Índice de Madurez:** se normaliza a 100 → `Math.round((puntaje / 20) * 100)`.
- **Etapa:** 0–29 = PyME 1.0 · 30–54 = PyME 2.0 · 55–77 = PyME 3.0 · 78–100 = PyME 4.0.
- **Sistemas:** cada uno de los 6 sistemas es fortaleza si obtiene 60% o más de su máximo.

La lógica completa está en [`lib/scoring.ts`](lib/scoring.ts).

---

## Estructura

```
app/
  layout.tsx           Fuentes (Fraunces + Inter) y metadatos
  page.tsx             Monta la app dentro de la card central
  globals.css          Estilos base, fondo y tokens
  api/analyze/route.ts Route handler segura del análisis (Anthropic)
components/
  DiagnosticApp.tsx    Orquesta los pasos del flujo
  steps/               Intro, Quiz, Lead, Result
  result/              Subcomponentes del resultado
  ui/                  Botón e iconos
lib/                   Contenido, preguntas, etapas, scoring, fallback, WhatsApp
public/                Aquí va harold.webp
```
