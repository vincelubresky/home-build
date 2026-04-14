"use client";

import { useState } from "react";

const specs = [
  { label: "Main Floor", value: "1,114 sq ft (conditioned)" },
  { label: "Basement", value: "1,114 sq ft footprint (unfinished — Phase 2 TBD)" },
  { label: "Total Footprint", value: "~1,114 sq ft" },
  { label: "Stories", value: "1 main floor + full basement below" },
  { label: "Construction", value: "Stick-built" },
  { label: "Foundation", value: "Full basement — poured/block walls, slab floor" },
];

const exterior = [
  { label: "Roof", value: "Galvanized metal", status: "confirmed" },
  { label: "Siding", value: "Board & Batten — Hardie or vinyl (decision pending)", status: "pending" },
  { label: "Exterior Paint", value: "Earth tones — warm brown / tan / sage green", status: "confirmed" },
  { label: "Windows", value: "15 windows", status: "confirmed" },
  { label: "Doors", value: "15 doors (incl. exterior entries)", status: "confirmed" },
  { label: "Porch", value: "Covered front/back porch (in framing budget)", status: "confirmed" },
];

const interior = [
  { label: "Flooring", value: "Solid hardwood + tile (no carpet, low-tox)", status: "confirmed" },
  { label: "Walls", value: "Shiplap (solid wood preferred over drywall)", status: "confirmed" },
  { label: "Cabinets", value: "Solid wood, formaldehyde-free", status: "confirmed" },
  { label: "Counters", value: "Quartz", status: "confirmed" },
  { label: "Paint", value: "Zero-VOC throughout", status: "confirmed" },
  { label: "Lighting", value: "Incandescent / halogen preferred (low EMF/flicker)", status: "confirmed" },
];

const systems = [
  { label: "HVAC", value: "2-zone ductless mini split (decision pending: ducted alt)", status: "pending" },
  { label: "Fresh Air", value: "HRV or ERV with HEPA filtration", status: "confirmed" },
  { label: "Insulation", value: "Full rock wool envelope — Comfortbatt + ComfortBoard", status: "confirmed" },
  { label: "Water Heater", value: "Tankless propane", status: "confirmed" },
  { label: "Water Source", value: "Well + filtration system", status: "confirmed" },
  { label: "Waste", value: "Septic system", status: "confirmed" },
  { label: "Heat backup", value: "Wood burning stove / fireplace", status: "confirmed" },
  { label: "Energy", value: "Alabama Power (utility hookup free)", status: "confirmed" },
  { label: "Internet", value: "Cat6 Ethernet hardwired throughout (no WiFi reliance)", status: "confirmed" },
];

const STATUS_BADGE: Record<string, string> = {
  confirmed: "bg-green-100 text-green-700",
  pending: "bg-amber-100 text-amber-700",
};

type PlanLink = { label: string; url: string };

export default function DesignPage() {
  const [planLinks, setPlanLinks] = useState<PlanLink[]>([
    { label: "Floor Plan — Main Floor", url: "" },
    { label: "Floor Plan — Basement", url: "" },
    { label: "Elevations", url: "" },
    { label: "Site Plan", url: "" },
  ]);
  const [renderingUrl, setRenderingUrl] = useState("");
  const [editing, setEditing] = useState(false);

  function updateLink(i: number, field: keyof PlanLink, val: string) {
    const next = planLinks.map((l, idx) => (idx === i ? { ...l, [field]: val } : l));
    setPlanLinks(next);
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Home Design & Plans</h2>
        <p className="text-slate-500 text-sm mt-0.5">Exterior design, floor plans, specs, and material selections</p>
      </div>

      {/* Rendering */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Exterior Rendering</h3>
          <button onClick={() => setEditing(!editing)} className="text-xs text-slate-500 hover:text-slate-700 underline">
            {editing ? "Done" : "Add rendering URL"}
          </button>
        </div>

        {editing && (
          <div className="mb-4">
            <label className="label">Paste a rendering image URL or Google Drive share link</label>
            <input
              className="input"
              placeholder="https://drive.google.com/... or image URL"
              value={renderingUrl}
              onChange={(e) => setRenderingUrl(e.target.value)}
            />
          </div>
        )}

        {renderingUrl ? (
          <img src={renderingUrl} alt="Home rendering" className="w-full rounded-lg border border-slate-200 object-cover max-h-96" />
        ) : (
          <div className="bg-slate-50 rounded-lg border border-dashed border-slate-300 p-10 text-center">
            <p className="text-slate-400 text-sm font-medium">No rendering uploaded yet</p>
            <p className="text-slate-400 text-xs mt-1">
              Exterior: Board &amp; Batten siding · Galvanized metal roof · Earth-tone paint (warm brown / tan / sage)
            </p>
            <p className="text-slate-400 text-xs mt-3">
              To get a rendering: use{" "}
              <span className="font-medium text-slate-500">Cedreo, Chief Architect, or SketchUp</span>
              {" "}with your floor plan PDFs, or ask your builder.
            </p>
          </div>
        )}
      </div>

      {/* House specs + exterior side by side */}
      <div className="grid grid-cols-2 gap-5 mb-5">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold mb-3">House Specs</h3>
          <dl className="space-y-2">
            {specs.map((s) => (
              <div key={s.label}>
                <dt className="text-xs text-slate-500 uppercase tracking-wide">{s.label}</dt>
                <dd className="text-sm font-medium text-slate-800">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold mb-3">Exterior Selections</h3>
          <dl className="space-y-2">
            {exterior.map((s) => (
              <div key={s.label} className="flex items-start justify-between gap-2">
                <div>
                  <dt className="text-xs text-slate-500 uppercase tracking-wide">{s.label}</dt>
                  <dd className="text-sm font-medium text-slate-800">{s.value}</dd>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 mt-0.5 ${STATUS_BADGE[s.status]}`}>
                  {s.status}
                </span>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Interior + Systems */}
      <div className="grid grid-cols-2 gap-5 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold mb-3">Interior Finishes</h3>
          <dl className="space-y-2">
            {interior.map((s) => (
              <div key={s.label} className="flex items-start justify-between gap-2">
                <div>
                  <dt className="text-xs text-slate-500 uppercase tracking-wide">{s.label}</dt>
                  <dd className="text-sm font-medium text-slate-800">{s.value}</dd>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 mt-0.5 ${STATUS_BADGE[s.status]}`}>
                  {s.status}
                </span>
              </div>
            ))}
          </dl>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold mb-3">Systems</h3>
          <dl className="space-y-2">
            {systems.map((s) => (
              <div key={s.label} className="flex items-start justify-between gap-2">
                <div>
                  <dt className="text-xs text-slate-500 uppercase tracking-wide">{s.label}</dt>
                  <dd className="text-sm font-medium text-slate-800">{s.value}</dd>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 mt-0.5 ${STATUS_BADGE[s.status]}`}>
                  {s.status}
                </span>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Floor Plans */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Floor Plans & Drawings</h3>
          <button onClick={() => setEditing(!editing)} className="text-xs text-slate-500 hover:text-slate-700 underline">
            {editing ? "Done editing" : "Edit links"}
          </button>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          Paste Google Drive, Dropbox, or direct PDF links to your plan documents.
        </p>
        <div className="space-y-3">
          {planLinks.map((pl, i) => (
            <div key={i} className="flex items-center gap-3">
              {editing ? (
                <>
                  <input
                    className="input text-sm w-48"
                    value={pl.label}
                    onChange={(e) => updateLink(i, "label", e.target.value)}
                    placeholder="Document label"
                  />
                  <input
                    className="input text-sm flex-1"
                    value={pl.url}
                    onChange={(e) => updateLink(i, "url", e.target.value)}
                    placeholder="https://..."
                  />
                </>
              ) : (
                <>
                  <span className="text-sm font-medium text-slate-700 w-52">{pl.label}</span>
                  {pl.url ? (
                    <a href={pl.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                      View PDF
                    </a>
                  ) : (
                    <span className="text-sm text-slate-300 italic">No link added</span>
                  )}
                </>
              )}
            </div>
          ))}
          {editing && (
            <button
              onClick={() => setPlanLinks([...planLinks, { label: "New Document", url: "" }])}
              className="text-xs text-slate-500 hover:text-slate-700 underline mt-1"
            >
              + Add row
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
