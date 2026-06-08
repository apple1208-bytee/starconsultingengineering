import { getMaterial, weldFactors, Y_COEFFICIENT, pipeSchedules } from "@/data/calculator-tables";

export type PipeThicknessInput = {
  pressureBar: number;   // design pressure (barg)
  odMm: number;          // outside diameter (mm)
  materialId: string;
  tempC: number;         // design temperature (degrees C)
  weldFactorId: string;
  corrosionMm: number;   // corrosion allowance (mm)
};

export type PipeThicknessResult = {
  S: number;             // allowable stress (MPa) at temp
  E: number;
  pressureMpa: number;
  tm: number;            // minimum thickness incl. CA (mm)
  recommended: string;   // nearest standard schedule note
};

// Linear interpolation of allowable stress at design temperature.
function allowableAt(materialId: string, tempC: number): number {
  const mat = getMaterial(materialId);
  if (!mat) return 0;
  const pts = mat.allowable;
  if (tempC <= pts[0].temp) return pts[0].S;
  if (tempC >= pts[pts.length - 1].temp) return pts[pts.length - 1].S;
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    if (tempC >= a.temp && tempC <= b.temp) {
      const f = (tempC - a.temp) / (b.temp - a.temp);
      return a.S + f * (b.S - a.S);
    }
  }
  return pts[pts.length - 1].S;
}

export function calcPipeThickness(input: PipeThicknessInput): PipeThicknessResult {
  const S = allowableAt(input.materialId, input.tempC);
  const E = weldFactors.find((w) => w.id === input.weldFactorId)?.E ?? 1.0;
  const P = input.pressureBar * 0.1; // bar -> MPa
  const Y = Y_COEFFICIENT;
  // ASME B31.3 (304.1.2): t = P*D / (2*(S*E + P*Y))
  const t = (P * input.odMm) / (2 * (S * E + P * Y));
  const tm = t + input.corrosionMm;

  // Recommend nearest schedule from the closest OD row.
  const row = pipeSchedules.reduce((best, r) =>
    Math.abs(r.od - input.odMm) < Math.abs(best.od - input.odMm) ? r : best
  );
  let rec = "Below SCH 40";
  if (tm <= row.sch40) rec = `SCH 40 (${row.sch40} mm at ${row.nps})`;
  else if (tm <= row.sch80) rec = `SCH 80 (${row.sch80} mm at ${row.nps})`;
  else if (tm <= row.sch160) rec = `SCH 160 (${row.sch160} mm at ${row.nps})`;
  else rec = "Heavier than SCH 160 - review";

  return { S, E, pressureMpa: P, tm, recommended: rec };
}
