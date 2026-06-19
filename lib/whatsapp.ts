import type { StageKey } from "./types";

// ============================================================================
// NÚMERO DE WHATSAPP DE HAROLD
// Reemplaza este valor por el número real, en formato internacional sin signos
// (código de país + número). Ejemplo Colombia: "573001234567".
// ============================================================================
export const WHATSAPP_NUMBER = "573137935099";

// Arma el enlace de WhatsApp con un mensaje prellenado que incluye
// el nombre del usuario y la etapa de su empresa.
export function buildWhatsappLink(name: string, stageKey: StageKey): string {
  const cleanName = name.trim() || "un empresario";
  const message = `Hola, soy ${cleanName}. Acabo de hacer el Diagnóstico PYMES 4.0 y mi empresa es una PyME ${stageKey}. Quiero mi asesoría gratuita y mi mapa para convertirla en una PyME 4.0.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
