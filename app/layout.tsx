import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

/**
 * Tipografía estilo Apple: un sans limpio y preciso. Manrope para titulares
 * (carácter geométrico, moderno) e Inter para el cuerpo y la interfaz.
 * Una sola familia visual, cohesiva, sin serifas.
 */
const display = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Diagnóstico PYMES 4.0 | Harold Pérez",
  description:
    "Descubre en qué etapa está tu empresa y recibe un análisis personalizado. Diagnóstico gratuito con la metodología Sistema PYMES 4.0 de Harold Pérez.",
  openGraph: {
    title: "Diagnóstico PYMES 4.0 | Harold Pérez",
    description:
      "Responde 12 preguntas y descubre qué tan moderna, organizada y escalable es tu empresa.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1D3563",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${display.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
