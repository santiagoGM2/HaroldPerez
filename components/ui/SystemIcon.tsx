import {
  TrendingUp,
  Wallet,
  Workflow,
  Users,
  Globe,
  BrainCircuit,
  type LucideIcon,
} from "lucide-react";

// Mapea el nombre del icono (definido en lib/content) al componente de lucide.
const ICONS: Record<string, LucideIcon> = {
  TrendingUp,
  Wallet,
  Workflow,
  Users,
  Globe,
  BrainCircuit,
};

export function SystemIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICONS[name] ?? TrendingUp;
  return <Icon className={className} strokeWidth={1.6} aria-hidden="true" />;
}
