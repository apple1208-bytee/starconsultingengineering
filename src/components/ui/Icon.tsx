"use client";
import { icons, type LucideProps } from "lucide-react";

// Render a Lucide icon by name. Falls back to a neutral dot if unknown.
export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const LucideIcon = icons[name as keyof typeof icons] ?? icons.Circle;
  return <LucideIcon {...props} />;
}
