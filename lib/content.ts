import type { Dimension } from "./types";

// ============================================================================
// CONTENIDO EDITABLE DE LA INTERFAZ
// Todo el texto visible vive aquí para que sea fácil de ajustar sin tocar la UI.
// ============================================================================

// --- Presentación de Harold ---
export const HAROLD = {
  name: "Harold Pérez",
  // Gancho por defecto (seguro y alineado al posicionamiento).
  hook: "Experto en educación financiera y liderazgo empresarial",
  role: "Mentor de transformación empresarial",
  // Alternativas de gancho según la historia real de Harold:
  // hook: "De la quiebra al éxito: mi historia te muestra el camino",
  // hook: "Te ayudo a convertir tu empresa en una compañía moderna, rentable y escalable",
};

// --- ¿Qué es una PyME 4.0? ---
export const DEFINITION = {
  title: "¿Sabes qué es una PyME 4.0?",
  body: "Una PyME 4.0 es una empresa que crece de forma sostenible gracias a sistemas comerciales, financieros, operativos, digitales y de inteligencia artificial. No depende del dueño: depende de sistemas. No decide por intuición: decide con datos. No trabaja más: trabaja de forma más inteligente.",
};

// --- Beneficios (los 6 sistemas) ---
export interface Benefit {
  dimension: Dimension;
  iconName: string; // nombre del icono de lucide-react
  title: string;
  line: string;
}

export const BENEFITS: Benefit[] = [
  {
    dimension: "comercial",
    iconName: "TrendingUp",
    title: "Sistema comercial",
    line: "Ventas predecibles y sostenibles, no por suerte.",
  },
  {
    dimension: "financiero",
    iconName: "Wallet",
    title: "Sistema financiero",
    line: "Claridad de tus números para decidir con datos.",
  },
  {
    dimension: "operativo",
    iconName: "Workflow",
    title: "Sistema operativo",
    line: "Procesos que funcionan sin que tú estés encima.",
  },
  {
    dimension: "liderazgo",
    iconName: "Users",
    title: "Sistema de liderazgo",
    line: "Un equipo que opera sin depender de ti.",
  },
  {
    dimension: "digital",
    iconName: "Globe",
    title: "Sistema digital",
    line: "Presencia que atrae clientes por sí sola.",
  },
  {
    dimension: "ia",
    iconName: "BrainCircuit",
    title: "Sistema de inteligencia artificial",
    line: "Automatización que multiplica tu productividad.",
  },
];

// Frase conceptual más fuerte de la marca.
export const CONCEPT_PHRASE =
  "La mayoría de las empresas no dejan de crecer porque les falten clientes. Dejan de crecer porque siguen operando como una PyME 1.0 en un mundo que exige empresas 4.0.";

// --- Intro ---
export const INTRO = {
  eyebrow: "Diagnóstico PYMES 4.0",
  systemsTitle: "Los 6 sistemas de una empresa 4.0",
  stagesTitle: "Las 4 etapas de una empresa",
  stagesSubtitle:
    "Toda empresa evoluciona por etapas. El destino siempre es la misma: convertirse en una PyME 4.0.",
  gift: "Te regalamos la metodología para convertir tu empresa en una PyME 4.0.",
  startButton: "Lo tengo claro, empezar mi diagnóstico",
  // Puntos de confianza como lista (se separan con líneas finas, no con "·").
  startPoints: ["12 preguntas", "3 minutos", "gratis"],
};

// --- Quiz ---
export const QUIZ = {
  progressLabel: (current: number, total: number) =>
    `Pregunta ${current} de ${total}`,
  yes: "Sí",
  no: "No",
  back: "Atrás",
  next: "Siguiente",
  seeResult: "Ver mi diagnóstico",
};

// --- Captura del lead ---
export const COMPANY_SIZES = [
  "Solo yo (sin empleados aún)",
  "2 a 5 empleados",
  "6 a 15 empleados",
  "16 a 50 empleados",
  "Más de 50 empleados",
];

export const PAIN_OPTIONS = [
  "No puedo desconectarme del negocio",
  "Vendo, pero no me alcanza la plata",
  "Mi equipo no funciona sin que yo esté",
  "Trabajo demasiado y crezco muy poco",
  "No entiendo mis números financieros",
  "Mis ventas son inconsistentes",
];

export const LEAD = {
  eyebrow: "Último paso",
  title: "Estás a un paso de tu diagnóstico",
  subtitle:
    "Con estos datos preparamos tu análisis personalizado y tu mapa de evolución.",
  fields: {
    name: { label: "Tu nombre", placeholder: "Ej. Carlos Ramírez" },
    company: { label: "Nombre de tu empresa", placeholder: "Ej. Distribuciones del Valle" },
    email: { label: "Correo electrónico", placeholder: "tucorreo@empresa.com" },
    whatsapp: { label: "WhatsApp", placeholder: "+57 300 123 4567" },
    companySize: { label: "Tamaño de tu empresa", placeholder: "Selecciona una opción" },
  },
  painQuick: {
    label: "¿Qué es lo que más te duele hoy?",
    hint: "Elige todos los que apliquen",
  },
  painDetail: {
    label: "Cuéntame un poco más",
    placeholder:
      "¿Qué es lo que más te frustra hoy en tu empresa? ¿Qué te gustaría mejorar?",
  },
  submit: "Ver mi diagnóstico",
  errors: {
    name: "Cuéntame tu nombre.",
    email: "Necesito un correo válido.",
    whatsapp: "Necesito tu WhatsApp para coordinar la llamada.",
  },
};

// --- Resultado ---
export const RESULT = {
  badgePrefix: "Tu empresa es una",
  maturityTitle: "Tu Índice de Madurez PYMES 4.0",
  maturitySubtitle:
    "La mayoría de las empresas que evaluamos está por debajo de 40 puntos.",
  stageMapTitle: "Dónde estás hoy y hacia dónde vamos",
  stageMapGoalLabel: "La meta",
  systemsTitle: "El estado de tus 6 sistemas empresariales",
  systemsStrength: "Fortaleza",
  systemsGap: "Por mejorar",
  hiddenCostsTitle: "Lo que te está costando hoy quedarte donde estás",
  achievementsTitle: "Lo que ya estás logrando",
  analysisTitle: "Tu análisis personalizado",
  analysisLoading: "Preparando tu análisis personalizado",
};

// Títulos de etapa para badge y tarjeta del resultado.
export const STAGE_TITLES: Record<string, string> = {
  "1.0": "La empresa dependiente del dueño",
  "2.0": "La empresa organizada",
  "3.0": "La empresa sistematizada",
  "4.0": "La empresa moderna y escalable",
};

// --- CTA final hacia WhatsApp ---
export const CTA = {
  eyebrow: "Asesoría gratuita, sin compromiso",
  title: "Convierte tu empresa en una PyME 4.0 en 90 días",
  subtitle:
    "En una sesión virtual de 30 minutos te entregamos el mapa exacto para tu empresa, gratis. Si decides hacerlo con nosotros, perfecto. Si no, te llevas la estrategia igual.",
  promise:
    "Asiste a la llamada virtual y te llevas el mapa para convertir tu empresa en una PyME 4.0: una empresa capaz de soportar más ventas sin perder el control.",
  methodologyName: "Sistema PYMES 4.0™",
  methodologyBody:
    "Nuestra metodología para construir sistemas comerciales, financieros, operativos, digitales y de inteligencia artificial que aumentan tus ventas, mejoran tu rentabilidad y te hacen crecer de forma sostenible.",
  button: "Agendar mi asesoría gratuita",
  pills: ["30 minutos", "100% gratuito", "Sin compromiso"],
  footnote:
    "Te contactaremos por WhatsApp al número que dejaste para coordinar la llamada.",
};
