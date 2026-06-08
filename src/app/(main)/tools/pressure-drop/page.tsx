"use client";

import { useState } from "react";
import { CalculatorShell, Field, ResultRow, fieldCls } from "@/components/tools/CalculatorShell";
import { calcPressureDrop } from "@/lib/calculators/pressureDrop";
import { fluids, roughness } from "@/data/calculator-tables";

export default function PressureDropPage() {
  const [flowM3hr, setFlowM3hr] = useState(50);
  const [idMm, setIdMm] = useState(154);
  const [lengthM, setLengthM] = useState(100);
  const [fluidId, setFluidId] = useState(fluids[0].id);
  const [roughId, setRoughId] = useState(roughness[1].id);

  const fluid = fluids.find((f) => f.id === fluidId)!;
  const rough = roughness.find((r) => r.id === roughId)!;

  const [density, setDensity] = useState(fluid.density);
  const [viscosityCp, setViscosityCp] = useState(fluid.viscosity);

  function onFluidChange(id: string) {
    setFluidId(id);
    const f = fluids.find((x) => x.id === id)!;
    setDensity(f.density);
    setViscosityCp(f.viscosity);
  }

  const r = calcPressureDrop({ flowM3hr, idMm, lengthM, density, viscosityCp, roughnessMm: rough.value });

  return (
    <CalculatorShell
      title="Pressure Drop Calculator"
      intro="Frictional pressure drop using the Darcy-Weisbach equation with the Churchill friction factor."
      inputs={
        <>
          <Field label="Volumetric flow (m³/hr)">
            <input type="number" value={flowM3hr} onChange={(e) => setFlowM3hr(+e.target.value)} className={fieldCls} />
          </Field>
          <Field label="Pipe inside diameter (mm)">
            <input type="number" value={idMm} onChange={(e) => setIdMm(+e.target.value)} className={fieldCls} />
          </Field>
          <Field label="Pipe length (m)">
            <input type="number" value={lengthM} onChange={(e) => setLengthM(+e.target.value)} className={fieldCls} />
          </Field>
          <Field label="Fluid">
            <select value={fluidId} onChange={(e) => onFluidChange(e.target.value)} className={fieldCls}>
              {fluids.map((f) => <option key={f.id} value={f.id}>{f.label}</option>)}
            </select>
          </Field>
          <Field label="Density (kg/m³)">
            <input type="number" value={density} onChange={(e) => setDensity(+e.target.value)} className={fieldCls} />
          </Field>
          <Field label="Viscosity (cP)">
            <input type="number" value={viscosityCp} onChange={(e) => setViscosityCp(+e.target.value)} className={fieldCls} />
          </Field>
          <Field label="Pipe roughness">
            <select value={roughId} onChange={(e) => setRoughId(e.target.value)} className={fieldCls}>
              {roughness.map((x) => <option key={x.id} value={x.id}>{x.label}</option>)}
            </select>
          </Field>
        </>
      }
      results={
        <div>
          <ResultRow label="Velocity" value={`${r.velocity.toFixed(2)} m/s`} />
          <ResultRow label="Reynolds number" value={r.reynolds.toFixed(0)} />
          <ResultRow label="Flow regime" value={r.regime} />
          <ResultRow label="Friction factor (Darcy)" value={r.frictionFactor.toFixed(4)} />
          <ResultRow label="Pressure drop" value={`${r.dpBar.toFixed(3)} bar`} accent />
          <ResultRow label="Pressure drop" value={`${r.dpPa.toFixed(0)} Pa`} />
          {r.velocityWarning && (
            <p className="mt-3 rounded-md bg-amber-100 px-3 py-2 text-xs text-amber-700">
              Velocity exceeds 3 m/s - review for erosion / noise on liquid service.
            </p>
          )}
        </div>
      }
    />
  );
}
