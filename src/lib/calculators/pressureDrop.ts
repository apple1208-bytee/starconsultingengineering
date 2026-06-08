export type PressureDropInput = {
  flowM3hr: number;
  idMm: number;
  lengthM: number;
  density: number;    // kg/m3
  viscosityCp: number; // cP
  roughnessMm: number;
};

export type PressureDropResult = {
  velocity: number;   // m/s
  reynolds: number;
  regime: string;
  frictionFactor: number;
  dpPa: number;
  dpBar: number;
  velocityWarning: boolean;
};

// Churchill correlation for Darcy friction factor (all flow regimes).
function churchill(Re: number, relRough: number): number {
  const A = Math.pow(2.457 * Math.log(1 / (Math.pow(7 / Re, 0.9) + 0.27 * relRough)), 16);
  const B = Math.pow(37530 / Re, 16);
  return 8 * Math.pow(Math.pow(8 / Re, 12) + 1 / Math.pow(A + B, 1.5), 1 / 12);
}

export function calcPressureDrop(input: PressureDropInput): PressureDropResult {
  const D = input.idMm / 1000;
  const area = Math.PI * Math.pow(D, 2) / 4;
  const q = input.flowM3hr / 3600; // m3/s
  const v = area > 0 ? q / area : 0;
  const mu = input.viscosityCp / 1000; // Pa.s
  const Re = mu > 0 ? (input.density * v * D) / mu : 0;
  const relRough = input.roughnessMm / input.idMm;
  const f = Re > 0 ? churchill(Re, relRough) : 0;
  const dpPa = D > 0 ? f * (input.lengthM / D) * (input.density * v * v) / 2 : 0;
  return {
    velocity: v,
    reynolds: Re,
    regime: Re < 2300 ? "Laminar" : Re < 4000 ? "Transitional" : "Turbulent",
    frictionFactor: f,
    dpPa,
    dpBar: dpPa / 1e5,
    velocityWarning: v > 3,
  };
}
