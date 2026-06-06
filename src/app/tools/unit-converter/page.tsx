"use client";

import { useState } from "react";
import { CalculatorShell, Field, fieldCls } from "@/components/tools/CalculatorShell";

// Conversion factors to a base SI unit per category.
type Unit = { id: string; label: string; toBase: (v: number) => number; fromBase: (v: number) => number };

const linear = (factor: number): Pick<Unit, "toBase" | "fromBase"> => ({
  toBase: (v) => v * factor,
  fromBase: (v) => v / factor,
});

const categories: Record<string, Unit[]> = {
  Pressure: [
    { id: "pa", label: "Pa", ...linear(1) },
    { id: "kpa", label: "kPa", ...linear(1000) },
    { id: "mpa", label: "MPa", ...linear(1e6) },
    { id: "bar", label: "bar", ...linear(1e5) },
    { id: "psi", label: "psi", ...linear(6894.757) },
    { id: "atm", label: "atm", ...linear(101325) },
  ],
  Temperature: [
    { id: "c", label: "°C", toBase: (v) => v + 273.15, fromBase: (v) => v - 273.15 },
    { id: "f", label: "°F", toBase: (v) => (v - 32) * 5 / 9 + 273.15, fromBase: (v) => (v - 273.15) * 9 / 5 + 32 },
    { id: "k", label: "K", toBase: (v) => v, fromBase: (v) => v },
  ],
  Length: [
    { id: "mm", label: "mm", ...linear(0.001) },
    { id: "cm", label: "cm", ...linear(0.01) },
    { id: "m", label: "m", ...linear(1) },
    { id: "in", label: "in", ...linear(0.0254) },
    { id: "ft", label: "ft", ...linear(0.3048) },
  ],
  Force: [
    { id: "n", label: "N", ...linear(1) },
    { id: "kn", label: "kN", ...linear(1000) },
    { id: "lbf", label: "lbf", ...linear(4.448222) },
    { id: "kgf", label: "kgf", ...linear(9.80665) },
  ],
  Stress: [
    { id: "pa", label: "Pa", ...linear(1) },
    { id: "mpa", label: "MPa", ...linear(1e6) },
    { id: "psi", label: "psi", ...linear(6894.757) },
    { id: "ksi", label: "ksi", ...linear(6894757) },
  ],
};

export default function UnitConverterPage() {
  const [category, setCategory] = useState("Pressure");
  const units = categories[category];
  const [fromId, setFromId] = useState(units[0].id);
  const [value, setValue] = useState(1);

  const fromUnit = units.find((u) => u.id === fromId) ?? units[0];
  const base = fromUnit.toBase(value);

  return (
    <CalculatorShell
      title="Unit Converter"
      intro="Convert between common engineering units across pressure, temperature, length, force and stress."
      inputs={
        <>
          <Field label="Category">
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setFromId(categories[e.target.value][0].id);
              }}
              className={fieldCls}
            >
              {Object.keys(categories).map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="From unit">
            <select value={fromId} onChange={(e) => setFromId(e.target.value)} className={fieldCls}>
              {units.map((u) => <option key={u.id} value={u.id}>{u.label}</option>)}
            </select>
          </Field>
          <Field label="Value">
            <input type="number" value={value} onChange={(e) => setValue(+e.target.value)} className={fieldCls} />
          </Field>
        </>
      }
      results={
        <div className="divide-y divide-steel-200">
          {units.map((u) => (
            <div key={u.id} className="flex items-center justify-between py-2.5">
              <span className="text-sm text-steel-600">{u.label}</span>
              <span className="font-mono text-sm font-semibold text-navy-900">
                {u.fromBase(base).toLocaleString(undefined, { maximumFractionDigits: 6 })}
              </span>
            </div>
          ))}
        </div>
      }
    />
  );
}
