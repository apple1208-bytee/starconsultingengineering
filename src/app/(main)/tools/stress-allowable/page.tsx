"use client";

import { useState } from "react";
import { CalculatorShell, Field, ResultRow, fieldCls } from "@/components/tools/CalculatorShell";
import { calcStressAllowable } from "@/lib/calculators/stressAllowable";
import { materials } from "@/data/calculator-tables";

export default function StressAllowablePage() {
  const [materialId, setMaterialId] = useState(materials[0].id);
  const [tempC, setTempC] = useState(150);

  const r = calcStressAllowable({ materialId, tempC });

  return (
    <CalculatorShell
      title="Stress Allowable Checker"
      intro="Approximate allowable stress at design temperature, interpolated from indicative ASME B31.3 Table A-1 values."
      clause="Values are indicative subsets of ASME B31.3 Table A-1."
      inputs={
        <>
          <Field label="Material">
            <select value={materialId} onChange={(e) => setMaterialId(e.target.value)} className={fieldCls}>
              {materials.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
            </select>
          </Field>
          <Field label="Design temperature (°C)">
            <input type="number" value={tempC} onChange={(e) => setTempC(+e.target.value)} className={fieldCls} />
          </Field>
        </>
      }
      results={
        r ? (
          <div>
            <ResultRow label="Allowable stress S" value={`${r.S.toFixed(1)} MPa`} accent />
            <ResultRow label="Material group" value={r.group} />
            <ResultRow label="Table range" value={`${r.minTemp}–${r.maxTemp} °C`} />
            {!r.inRange && (
              <p className="mt-3 rounded-md bg-amber-100 px-3 py-2 text-xs text-amber-700">
                Temperature is outside the tabulated range - value is extrapolated, verify against the code.
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm text-steel-600">Select a material.</p>
        )
      }
    />
  );
}
