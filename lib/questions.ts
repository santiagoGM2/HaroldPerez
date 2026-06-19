import type { Question } from "./types";

// Las 12 preguntas del diagnóstico. El texto y el scoring están curados;
// no modificar sin revisar la lógica de puntaje en lib/scoring.ts.
export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "En mi empresa soy el todero: todo pasa por mí.",
    scoreIf: "no",
    points: 2,
    dimension: "operativo",
  },
  {
    id: 2,
    text: "Puedo sostener mi nómina todo el año, sin importar si las ventas suben o bajan.",
    scoreIf: "yes",
    points: 2,
    dimension: "financiero",
  },
  {
    id: 3,
    text: "Trabajo mucho, pero siento que crezco poco.",
    scoreIf: "no",
    points: 1,
    dimension: "operativo",
  },
  {
    id: 4,
    text: "Pago más impuestos de los que siento que debería pagar.",
    scoreIf: "no",
    points: 1,
    dimension: "financiero",
  },
  {
    id: 5,
    text: "Si me ausento 3 meses, mi negocio sigue funcionando igual que cuando estoy presente.",
    scoreIf: "yes",
    points: 2,
    dimension: "liderazgo",
  },
  {
    id: 6,
    text: "Tengo procesos operativos estandarizados en mi empresa.",
    scoreIf: "yes",
    points: 2,
    dimension: "operativo",
  },
  {
    id: 7,
    text: "Vendo, pero no me alcanza la plata para llegar a fin de mes.",
    scoreIf: "no",
    points: 1,
    dimension: "financiero",
  },
  {
    id: 8,
    text: "Cuento con un sistema de ventas sostenible y predecible.",
    scoreIf: "yes",
    points: 2,
    dimension: "comercial",
  },
  {
    id: 9,
    text: "Al final del mes tengo mis indicadores financieros al día: PyG, balance y flujo de caja.",
    scoreIf: "yes",
    points: 2,
    dimension: "financiero",
  },
  {
    id: 10,
    text: "Hay un propósito real, más allá del dinero, en el desarrollo de mi empresa.",
    scoreIf: "yes",
    points: 1,
    dimension: "liderazgo",
  },
  {
    id: 11,
    text: "Mis clientes me encuentran a mí antes de que yo los busque, a través de mis redes, mi contenido o mi página web.",
    scoreIf: "yes",
    points: 2,
    dimension: "digital",
    tag: "Presencia digital",
  },
  {
    id: 12,
    text: "Tengo al menos un proceso de mi empresa (ventas, atención al cliente o administración) que funciona con inteligencia artificial sin que yo tenga que estar presente.",
    scoreIf: "yes",
    points: 2,
    dimension: "ia",
    tag: "Inteligencia artificial",
  },
];

export const TOTAL_QUESTIONS = QUESTIONS.length;
