import { QUESTIONS } from "./questions";
import type {
  Answers,
  Dimension,
  DiagnosticResult,
  StageKey,
  SystemStatus,
} from "./types";

// Composición de cada sistema según las preguntas que lo evalúan.
// Coincide con la lógica de diagnóstico del prompt.
const SYSTEM_QUESTIONS: Record<Dimension, number[]> = {
  comercial: [8],
  financiero: [2, 4, 7, 9],
  operativo: [1, 3, 6],
  liderazgo: [5, 10],
  digital: [11],
  ia: [12],
};

// Etiquetas legibles de cada sistema para el grid del resultado.
export const SYSTEM_LABELS: Record<Dimension, string> = {
  comercial: "Comercial",
  financiero: "Financiero",
  operativo: "Operativo",
  liderazgo: "Liderazgo",
  digital: "Digital",
  ia: "Inteligencia artificial",
};

// Umbral de fortaleza: 60% o más del máximo del sistema.
const STRENGTH_THRESHOLD = 0.6;

// Puntaje máximo posible (debe ser 20 según el modelo).
const MAX_SCORE = QUESTIONS.reduce((sum, q) => sum + q.points, 0);

// Devuelve la etapa según el índice de madurez (0 a 100).
export function stageForIndex(index: number): StageKey {
  if (index <= 29) return "1.0";
  if (index <= 54) return "2.0";
  if (index <= 77) return "3.0";
  return "4.0";
}

// Suma los puntos obtenidos por un conjunto de preguntas según las respuestas.
function obtainedForQuestions(ids: number[], answers: Answers): number {
  return ids.reduce((sum, id) => {
    const q = QUESTIONS.find((item) => item.id === id);
    if (!q) return sum;
    return answers[id] === q.scoreIf ? sum + q.points : sum;
  }, 0);
}

// Calcula el resultado completo del diagnóstico a partir de las respuestas.
export function computeResult(answers: Answers): DiagnosticResult {
  const rawScore = QUESTIONS.reduce(
    (sum, q) => (answers[q.id] === q.scoreIf ? sum + q.points : sum),
    0,
  );

  const maturityIndex = Math.round((rawScore / MAX_SCORE) * 100);
  const stageKey = stageForIndex(maturityIndex);

  const systems: SystemStatus[] = (
    Object.keys(SYSTEM_QUESTIONS) as Dimension[]
  ).map((dimension) => {
    const ids = SYSTEM_QUESTIONS[dimension];
    const max = ids.reduce((sum, id) => {
      const q = QUESTIONS.find((item) => item.id === id);
      return q ? sum + q.points : sum;
    }, 0);
    const obtained = obtainedForQuestions(ids, answers);
    return {
      dimension,
      label: SYSTEM_LABELS[dimension],
      obtained,
      max,
      isStrength: obtained >= max * STRENGTH_THRESHOLD,
    };
  });

  return {
    rawScore,
    maxScore: MAX_SCORE,
    maturityIndex,
    stageKey,
    systems,
    strengths: systems.filter((s) => s.isStrength),
    gaps: systems.filter((s) => !s.isStrength),
  };
}
