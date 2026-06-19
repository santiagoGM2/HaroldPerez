import type { StageKey } from "./types";

export interface StageInfo {
  key: StageKey;
  name: string; // "PyME 1.0"
  title: string; // título de la etapa
  description: string;
  hiddenCosts: string[]; // costos ocultos (etapas 1.0 a 3.0)
  achievements?: string[]; // lo que se logra (etapa 4.0)
}

// Las cuatro etapas con su contenido curado.
export const STAGES: Record<StageKey, StageInfo> = {
  "1.0": {
    key: "1.0",
    name: "PyME 1.0",
    title: "La empresa dependiente del dueño",
    description:
      "Todo pasa por ti. Eres el vendedor, el operativo y el que apaga todos los incendios. Sin ti, el negocio se detiene.",
    hiddenCosts: [
      "Cada semana se pierden oportunidades porque nadie más sabe vender.",
      "Los errores se repiten porque no existen procesos.",
      "El crecimiento se detiene: tú eres el cuello de botella.",
      "La empresa no puede crecer más rápido que tu propia capacidad de trabajo.",
    ],
  },
  "2.0": {
    key: "2.0",
    name: "PyME 2.0",
    title: "La empresa organizada",
    description:
      "Ya tienes algo de orden y responsables, pero sigues apagando incendios. Las ventas y la rentabilidad todavía son impredecibles.",
    hiddenCosts: [
      "Las ventas dependen demasiado de personas específicas.",
      "La rentabilidad no está del todo bajo control.",
      "Cada vez que creces, aparece más trabajo y más complejidad.",
      "Los problemas se resuelven, pero vuelven a aparecer.",
    ],
  },
  "3.0": {
    key: "3.0",
    name: "PyME 3.0",
    title: "La empresa sistematizada",
    description:
      "Tienes procesos, indicadores y liderazgo. El negocio funciona mejor, pero la competencia digital ya avanza más rápido que tú.",
    hiddenCosts: [
      "La competencia digital avanza más rápido que tú.",
      "Nuevos jugadores capturan tu mercado con tecnología e IA.",
      "Tus costos operativos siguen siendo altos.",
      "Tu productividad podría ser mucho mayor.",
    ],
  },
  "4.0": {
    key: "4.0",
    name: "PyME 4.0",
    title: "La empresa moderna y escalable",
    description:
      "Tienes los seis sistemas funcionando: comercial, financiero, operativo, liderazgo, digital e IA. Creces con estructura, no con improvisación.",
    hiddenCosts: [],
    achievements: [
      "Más ventas predecibles y sostenibles.",
      "Más rentabilidad y mejores márgenes.",
      "Más productividad con menos esfuerzo.",
      "Menos dependencia del dueño y un equipo autónomo.",
      "Mejor experiencia para el cliente.",
      "Mayor capacidad de crecer con estructura.",
    ],
  },
};

// Orden de las etapas para el mapa de evolución del resultado.
export const STAGE_ORDER: StageKey[] = ["1.0", "2.0", "3.0", "4.0"];
