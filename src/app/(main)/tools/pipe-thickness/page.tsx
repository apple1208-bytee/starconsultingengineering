"use client";

import { useState } from "react";
import { CalculatorShell, Field, ResultRow, fieldCls } from "@/components/tools/CalculatorShell";
import { calcPipeThickness } from "@/lib/calculators/pipeThickness";
import { materials, weldFactors } from "@/data/calculator-tables";

export default function PipeThicknessPage() {
  const [pressureBar, setPressureBar] = useState(20);
  const [odMm, setOdMm] = useState(168.3);
  const [materialId, setMaterialId] = useState(materials[0].id);
  const [tempC, setTempC] = useState(120);
  const [weldFactorId, setWeldFactorId] = useState(weldFactors[0].id);
  const [corrosionMm, setCorrosionMm] = useState(1.5);

  const r = calcPipeThickness({ pressureBar, odMm, materialId, tempC, weldFactorId, corrosionMm });

  return (
    <CalculatorShell
      title="Pipe Wall Thickness Calculator"
      intro="Minimum required wall thickness per ASME B31.3 (process piping), including corrosion allowance."
      clause="Based on ASME B31.3 para 304.1.2."
      inputs={
        <>
          <Field label="Design pressure (barg)">
            <input type="number" value={pressureBar} onChange={(e) => setPressureBar(+e.target.value)} className={fieldCls} />
          </Field>
          <Field label="Outside diameter (mm)">
            <input type="number" value={odMm} onChange={(e) => setOdMm(+e.target.value)} className={fieldCls} />
          </Field>
          <Field label="Material">
            <select value={materialId} onChange={(e) => setMaterialId(e.target.value)} className={fieldCls}>
              {materials.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
            </select>
          </Field>
          <Field label="Design temperature (°C)">
            <input type="number" value={tempC} onChange={(e) => setTempC(+e.target.value)} className={fieldCls} />
          </Field>
          <Field label="Weld joint quality factor (E)">
            <select value={weldFactorId} onChange={(e) => setWeldFactorId(e.target.value)} className={fieldCls}>
              {weldFactors.map((w) => <option key={w.id} value={w.id}>{w.label} (E={w.E})</option>)}
            </select>
          </Field>
          <Field label="Corrosion allowance (mm)">
            <input type="number" value={corrosionMm} onChange={(e) => setCorrosionMm(+e.target.value)} className={fieldCls} />
          </Field>
        </>
      }
      results={
        <div>
          <ResultRow label="Allowable stress S" value={`${r.S.toFixed(1)} MPa`} />
          <ResultRow label="Design pressure" value={`${r.pressureMpa.toFixed(3)} MPa`} />
          <ResultRow label="Min thickness (incl. CA)" value={`${r.tm.toFixed(2)} mm`} accent />
          <ResultRow label="Recommended schedule" value={r.recommended} />
        </div>
      }
    />
  );
}
