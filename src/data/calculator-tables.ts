// Approximate reference data for engineering calculators.
// Values are indicative for educational use only - always verify against the
// current edition of the governing code (ASME B31.3 etc.) for formal design.

export type Material = {
  id: string;
  label: string;
  // Allowable stress S (MPa) at temperature points (degrees C)
  allowable: { temp: number; S: number }[];
  // Thermal expansion coefficient (mm/mm/degC)
  alpha: number;
  group: string;
};

export const materials: Material[] = [
  {
    id: "a106-b",
    label: "Carbon Steel A106 Gr.B",
    group: "Carbon Steel",
    alpha: 11.7e-6,
    allowable: [
      { temp: 38, S: 138 },
      { temp: 200, S: 130 },
      { temp: 300, S: 118 },
      { temp: 400, S: 100 },
      { temp: 450, S: 86 },
    ],
  },
  {
    id: "ss-316l",
    label: "Stainless Steel A312 TP316L",
    group: "Austenitic SS",
    alpha: 16.5e-6,
    allowable: [
      { temp: 38, S: 115 },
      { temp: 200, S: 100 },
      { temp: 300, S: 92 },
      { temp: 400, S: 86 },
      { temp: 500, S: 80 },
    ],
  },
  {
    id: "duplex-2205",
    label: "Duplex 2205",
    group: "Duplex SS",
    alpha: 13.0e-6,
    allowable: [
      { temp: 38, S: 256 },
      { temp: 100, S: 230 },
      { temp: 200, S: 210 },
      { temp: 300, S: 196 },
    ],
  },
  {
    id: "p91",
    label: "Alloy Steel A335 P91",
    group: "Cr-Mo Alloy",
    alpha: 12.5e-6,
    allowable: [
      { temp: 38, S: 137 },
      { temp: 300, S: 134 },
      { temp: 450, S: 126 },
      { temp: 550, S: 100 },
      { temp: 600, S: 76 },
    ],
  },
];

export const getMaterial = (id: string) => materials.find((m) => m.id === id);

// Weld joint quality factor E (ASME B31.3 Table A-1B, indicative)
export const weldFactors = [
  { id: "seamless", label: "Seamless", E: 1.0 },
  { id: "erw", label: "ERW", E: 0.85 },
  { id: "furnace-butt", label: "Furnace Butt Weld", E: 0.6 },
];

// Coefficient Y per ASME B31.3 Table 304.1.1 (ferritic, t < D/6)
export const Y_COEFFICIENT = 0.4;

// Common standard pipe schedules - outside diameter & wall thickness (mm)
// for a representative NPS range. Indicative values.
export const pipeSchedules = [
  { nps: '2"', od: 60.3, sch40: 3.91, sch80: 5.54, sch160: 8.74 },
  { nps: '4"', od: 114.3, sch40: 6.02, sch80: 8.56, sch160: 13.49 },
  { nps: '6"', od: 168.3, sch40: 7.11, sch80: 10.97, sch160: 18.26 },
  { nps: '8"', od: 219.1, sch40: 8.18, sch80: 12.7, sch160: 23.01 },
  { nps: '10"', od: 273.0, sch40: 9.27, sch80: 15.09, sch160: 28.58 },
  { nps: '12"', od: 323.8, sch40: 10.31, sch80: 17.48, sch160: 33.32 },
];

// Fluid properties for pressure-drop calc (at ~ambient/typical service)
export const fluids = [
  { id: "water", label: "Water", density: 998, viscosity: 1.0 },
  { id: "steam", label: "Steam (LP)", density: 0.6, viscosity: 0.013 },
  { id: "natural-gas", label: "Natural Gas", density: 0.8, viscosity: 0.011 },
  { id: "lpg", label: "LPG (liquid)", density: 540, viscosity: 0.15 },
  { id: "crude-oil", label: "Crude Oil", density: 870, viscosity: 10 },
];

export const roughness = [
  { id: "smooth", label: "Smooth / Drawn", value: 0.0015 },
  { id: "commercial-steel", label: "Commercial Steel", value: 0.045 },
  { id: "galvanized", label: "Galvanized Iron", value: 0.15 },
  { id: "cast-iron", label: "Cast Iron", value: 0.26 },
];
