import type { Dimension, StageKey } from "./types";

// ============================================================================
// ANÁLISIS POR PLANTILLAS (FALLBACK)
// Si la API de Anthropic falla o no hay key configurada, generamos el análisis
// localmente combinando etapa, fortalezas, brechas y el dolor del empresario.
// Usa el lenguaje de la marca para que se lea natural y personalizado.
// ============================================================================

export interface FallbackInput {
  name: string;
  stageKey: StageKey;
  strengths: Dimension[];
  gaps: Dimension[];
  mainPain?: string;
}

// Cómo describir cada sistema cuando es una fortaleza.
const STRENGTH_PHRASE: Record<Dimension, string> = {
  comercial:
    "ya tienes una forma de vender más predecible y no dependes solo de la suerte para que lleguen clientes",
  financiero:
    "manejas tus números con claridad, y esa es una base sólida para decidir con cabeza fría",
  operativo:
    "has empezado a ordenar tu operación con procesos, y eso le quita peso a tu día a día",
  liderazgo:
    "tu equipo ya sostiene parte del negocio sin que tengas que estar encima de todo",
  digital:
    "tu presencia digital ya empieza a trabajar para ti y a atraer clientes",
  ia: "ya estás dando pasos hacia la automatización con inteligencia artificial, algo que muchos todavía ni miran",
};

// Cómo describir cada sistema cuando es una brecha.
const GAP_PHRASE: Record<Dimension, string> = {
  comercial:
    "tus ventas todavía dependen del empuje del día a día más que de un sistema",
  financiero:
    "aún no tienes del todo claros tus números, tu rentabilidad y tu flujo de caja",
  operativo:
    "el negocio todavía depende demasiado de ti y de que estés encima de cada cosa",
  liderazgo: "tu equipo aún no opera con autonomía cuando tú no estás",
  digital:
    "tus clientes todavía no te encuentran solos a través de tu contenido o tu página web",
  ia: "todavía no tienes procesos funcionando con inteligencia artificial",
};

// Consecuencia concreta de cada brecha (sin repetir los costos ocultos).
const GAP_CONSEQUENCE: Record<Dimension, string> = {
  comercial:
    "y por eso tus ingresos se vuelven impredecibles y difíciles de planear mes a mes",
  financiero:
    "y sin esa claridad las decisiones se toman a ciegas y la plata se escapa sin que sepas bien a dónde",
  operativo:
    "y eso te convierte en el cuello de botella que frena el crecimiento de toda la empresa",
  liderazgo:
    "y eso te mantiene atado a la operación, sin tiempo para trabajar en hacer crecer el negocio",
  digital:
    "y te obliga a salir a buscar clientes uno por uno en lugar de que ellos lleguen a ti",
  ia: "y mientras tanto la competencia que sí la usa avanza más rápido y con costos más bajos",
};

// Prioridad para escoger la fortaleza a destacar (positivos primero).
const STRENGTH_PRIORITY: Dimension[] = [
  "comercial",
  "financiero",
  "operativo",
  "liderazgo",
  "digital",
  "ia",
];

// Prioridad para escoger la brecha más crítica (lo que más frena el crecimiento).
const GAP_PRIORITY: Dimension[] = [
  "operativo",
  "liderazgo",
  "comercial",
  "financiero",
  "digital",
  "ia",
];

function pickByPriority(
  items: Dimension[],
  priority: Dimension[],
): Dimension | null {
  for (const dim of priority) {
    if (items.includes(dim)) return dim;
  }
  return items[0] ?? null;
}

export function buildFallbackAnalysis(input: FallbackInput): string {
  const name = input.name.trim() || "Empresario";
  const firstName = name.split(" ")[0];

  // Párrafo 1: reconocimiento de una fortaleza concreta.
  const strengthDim = pickByPriority(input.strengths, STRENGTH_PRIORITY);
  const paragraph1 = strengthDim
    ? `${firstName}, lo primero que quiero reconocerte es que ${STRENGTH_PHRASE[strengthDim]}. Eso no es poca cosa y dice mucho de cómo estás llevando tu empresa.`
    : `${firstName}, diste un paso que muchos empresarios posponen: detenerte a mirar tu empresa con honestidad. Esa sola decisión ya te separa de quien sigue apagando incendios sin levantar la cabeza.`;

  // Párrafo 2: brecha más crítica y su consecuencia.
  const gapDim = pickByPriority(input.gaps, GAP_PRIORITY);
  let paragraph2: string;
  if (gapDim) {
    // Si el empresario marcó varios dolores, citamos el primero.
    const firstPain = input.mainPain
      ? input.mainPain.split(",")[0].trim()
      : "";
    const painTie = firstPain
      ? ` Encaja con lo que me cuentas: "${firstPain}".`
      : "";
    paragraph2 = `Al mismo tiempo, la brecha más importante que veo es que ${GAP_PHRASE[gapDim]}, ${GAP_CONSEQUENCE[gapDim]}.${painTie}`;
  } else {
    paragraph2 =
      "Tienes los seis sistemas funcionando bien, así que tu reto ya no es ordenar el caos, sino afinar la máquina y ganar velocidad antes de que la competencia te alcance.";
  }

  // Párrafo 3: cierre con esperanza, dirección y el regalo del mapa.
  const paragraph3 = `La buena noticia, ${firstName}, es que nada de esto se resuelve trabajando más horas. Se resuelve con estructura, sistemas y liderazgo, que es justo lo que convierte a una PyME ${input.stageKey} en una PyME 4.0. El siguiente paso es que tengas tu mapa para hacer ese cambio en 90 días con la metodología PYMES 4.0, la misma con la que muchas empresas ya lo lograron. Ese mapa es tuyo, decidas trabajar conmigo o no.`;

  return [paragraph1, paragraph2, paragraph3].join("\n\n");
}
