export type ClassValue = string | number | null | false | undefined;

/** Minimal className joiner - filters falsy values. */
export function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(" ");
}
