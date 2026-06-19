// Tipos compartidos del diagnóstico PYMES 4.0

export type Answer = "yes" | "no";

// Los seis sistemas empresariales que componen el modelo
export type Dimension =
  | "comercial"
  | "financiero"
  | "operativo"
  | "liderazgo"
  | "digital"
  | "ia";

// Las cuatro etapas de evolución de la empresa
export type StageKey = "1.0" | "2.0" | "3.0" | "4.0";

export interface Question {
  id: number;
  text: string;
  // Respuesta que suma puntos
  scoreIf: Answer;
  points: number;
  dimension: Dimension;
  // Etiqueta opcional para enmarcar la pregunta (P11 y P12)
  tag?: string;
}

// Mapa de respuestas: id de pregunta -> respuesta del usuario
export type Answers = Record<number, Answer>;

export interface LeadData {
  name: string;
  company: string;
  email: string;
  whatsapp: string;
  companySize: string;
  mainPain: string;
  painDetail: string;
}

// Estado de un sistema en el resultado (fortaleza o brecha)
export interface SystemStatus {
  dimension: Dimension;
  label: string;
  obtained: number;
  max: number;
  isStrength: boolean;
}

export interface DiagnosticResult {
  rawScore: number;
  maxScore: number;
  maturityIndex: number;
  stageKey: StageKey;
  systems: SystemStatus[];
  strengths: SystemStatus[];
  gaps: SystemStatus[];
}

// Cuerpo que se envía a la route handler del análisis
export interface AnalyzePayload {
  name: string;
  company: string;
  companySize: string;
  stageKey: StageKey;
  stageTitle: string;
  maturityIndex: number;
  mainPain: string;
  painDetail: string;
  strengths: string[];
  gaps: string[];
}
