"use client";

import { useEffect, useRef, useState } from "react";

// Foto de Harold (public/harold.webp) en círculo con anillo dorado, halo blanco
// y sombra suave que la separa del fondo. Si el archivo faltara, se ve un
// placeholder "HP" y la foto solo se revela cuando carga de verdad.
export function HaroldAvatar({
  size = 96,
  ring = true,
}: {
  size?: number;
  ring?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Si la imagen ya estaba cacheada antes de hidratar, onLoad no se dispara:
  // comprobamos el estado al montar para revelarla igual.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative shrink-0 rounded-full ${
        ring
          ? "bg-gradient-to-br from-gold-soft via-gold to-gold-deep p-[3px] shadow-avatar"
          : ""
      }`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-full bg-gradient-to-br from-navy to-navy-deep">
        {/* Placeholder con iniciales, siempre presente debajo de la foto */}
        <span
          className="absolute inset-0 flex items-center justify-center font-display font-medium text-white/90"
          style={{ fontSize: size * 0.32 }}
        >
          HP
        </span>

        {/* La foto real va en public/harold.webp */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src="/harold.webp"
          alt="Harold Pérez"
          onLoad={() => setLoaded(true)}
          className={`relative h-full w-full object-cover object-top transition-opacity duration-700 ease-out-quint ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
}
