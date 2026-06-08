"use client";

import { useState } from "react";
import { CalculatorShell, Field, ResultRow, fieldCls } from "@/components/tools/CalculatorShell";
import { calcThermalExpansion } from "@/lib/calculators/thermalExpansion";
import { materials } from "@/data/calculator-tables";

export default function ThermalExpansionPage() {
  const [materialId, setMaterialId] = useState(materials[0].id);
  const [installTempC, setInstallTempC] = useState(20);
  const [operatingTempC, setOperatingTempC] = useState(250);
  const [lengthM, setLengthM] = useState(30);

  const r = calcThermalExpansion({ materialId, installTempC, operatingTempC, lengthM });

  return (
    <CalculatorShell
      title="Thermal Expansion Calculator"
      intro="Linear thermal expansion of a straight pipe run from installed to operating temperature."
      inputs={
        <>
          <Field label="Material">
            <select value={materialId} onChange={(e) => setMaterialId(e.target.value)} className={fieldCls}>
              {materials.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
            </select>
          </Field>
          <Field label="Installed temperature (°C)">
            <input type="number" value={installTempC} onChange={(e) => setInstallTempC(+e.target.value)} className={fieldCls} />
          </Field>
          <Field label="Operating temperature (°C)">
            <input type="number" value={operatingTempC} onChange={(e) => setOperatingTempC(+e.target.value)} className={fieldCls} />
          </Field>
          <Field label="Pipe length (m)">
            <input type="number" value={lengthM} onChange={(e) => setLengthM(+e.target.value)} className={fieldCls} />
          </Field>
        </>
      }
      results={
        <div>
          <ResultRow label="Total expansion" value={`${r.deltaLmm.toFixed(1)} mm`} accent />
          <ResultRow label="Expansion per metre" value={`${r.perMeter.toFixed(2)} mm/m`} />
          <ResultRow label="Expansion loop / joint" value={r.loopAdvised ? "Likely required (> 50 mm)" : "May not be required"} />
        </div>
      }
    />
  );
}
