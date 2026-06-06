import { getMaterial } from "@/data/calculator-tables";

export type StressInput = { materialId: string; tempC: number };
export type StressResult = {
  S: number;
  group: string;
  inRange: boolean;
  minTemp: number;
  maxTemp: number;
};

export function calcStressAllowable(input: StressInput): StressResult | null {
  const mat = getMaterial(input.materialId);
  if (!mat) return null;
  const pts = mat.allowable;
  const minTemp = pts[0].temp;
  const maxTemp = pts[pts.length - 1].temp;
  let S: number;
  if (input.tempC <= minTemp) S = pts[0].S;
  else if (input.tempC >= maxTemp) S = pts[pts.length - 1].S;
  else {
    S = pts[pts.length - 1].S;
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i];
      const b = pts[i + 1];
      if (input.tempC >= a.temp && input.tempC <= b.temp) {
        const f = (input.tempC - a.temp) / (b.temp - a.temp);
        S = a.S + f * (b.S - a.S);
        break;
      }
    }
  }
  return {
    S,
    group: mat.group,
    inRange: input.tempC >= minTemp && input.tempC <= maxTemp,
    minTemp,
    maxTemp,
  };
}
