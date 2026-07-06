import { getMaterial } from "@/data/calculator-tables";

export type ThermalInput = {
  materialId: string;
  installTempC: number;
  operatingTempC: number;
  lengthM: number;
};

export type ThermalResult = {
  deltaLmm: number;
  perMeter: number;
  loopAdvised: boolean;
};

export function calcThermalExpansion(input: ThermalInput): ThermalResult {
  const mat = getMaterial(input.materialId);
  const alpha = mat?.alpha ?? 11.7e-6;
  const dT = input.operatingTempC - input.installTempC;
  const deltaLmm = alpha * (input.lengthM * 1000) * dT;
  const perMeter = input.lengthM !== 0 ? deltaLmm / input.lengthM : 0;
  return {
    deltaLmm,
    perMeter,
    loopAdvised: Math.abs(deltaLmm) > 50,
  };
}
