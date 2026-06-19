import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import type { AnalyzePayload } from "@/lib/types";

// La route handler corre en Node (no en edge) para usar el SDK de Anthropic.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Modelo recomendado por costo y velocidad. Para mayor calidad de redacción,
// cámbialo por "claude-sonnet-4-6".
const MODEL = "claude-haiku-4-5-20251001";
const MAX_TOKENS = 1000;

// Instrucciones para el modelo (en español).
const SYSTEM_PROMPT = `Eres Harold Pérez, asesor experto en transformación empresarial con la metodología PYMES 4.0. Le escribes directamente a un empresario que acaba de hacer su autodiagnóstico.

Escribe exactamente tres párrafos cortos de texto fluido, separados por una línea en blanco. Habla en segunda persona, con un tono cercano y profesional, en español de Colombia. Máximo 130 palabras en total. No uses emojis, no uses guiones largos, no uses listas, no uses markdown ni títulos.

Párrafo 1: reconoce una fortaleza concreta del empresario según sus fortalezas.
Párrafo 2: señala la brecha más crítica y su consecuencia concreta para el negocio. No repitas costos ocultos genéricos.
Párrafo 3: cierra con esperanza y dirección. La idea es que esto no se resuelve trabajando más, sino con estructura, sistemas y liderazgo. Ofrece de regalo su mapa para convertir la empresa en una PyME 4.0 en 90 días con la metodología PYMES 4.0, sin compromiso.`;

// Construye el mensaje de usuario con los datos del diagnóstico.
function buildUserMessage(data: AnalyzePayload): string {
  const strengths =
    data.strengths.length > 0 ? data.strengths.join(", ") : "ninguna marcada";
  const gaps = data.gaps.length > 0 ? data.gaps.join(", ") : "ninguna marcada";
  const detail = data.painDetail.trim() || "no especificó";
  const pain = data.mainPain.trim() || "no especificó";

  return `Datos del empresario y su empresa:
- Nombre: ${data.name}
- Empresa: ${data.company || "no especificó"}
- Tamaño: ${data.companySize || "no especificó"}
- Etapa diagnosticada: PyME ${data.stageKey} (${data.stageTitle})
- Índice de Madurez PYMES 4.0: ${data.maturityIndex} de 100
- Sistemas que son fortaleza: ${strengths}
- Sistemas que son brecha: ${gaps}
- Mayor dolor seleccionado: ${pain}
- Lo que escribió con sus palabras: ${detail}

Escribe el análisis personalizado siguiendo las instrucciones del sistema.`;
}

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as AnalyzePayload;
    const apiKey = process.env.ANTHROPIC_API_KEY;

    // Sin key configurada: el cliente usará su análisis por plantillas.
    if (!apiKey) {
      return NextResponse.json({ analysis: null });
    }

    const client = new Anthropic({ apiKey });

    const response = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: buildUserMessage(data) }],
    });

    // Extrae los bloques de texto y los une.
    const analysis = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("")
      .trim();

    return NextResponse.json({ analysis: analysis || null });
  } catch (error) {
    // Nunca exponemos el error al usuario: devolvemos null y el cliente
    // mostrará el análisis por plantillas.
    console.error("Error generando el análisis personalizado:", error);
    return NextResponse.json({ analysis: null });
  }
}
