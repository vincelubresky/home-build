"use client";

import { useState } from "react";

// ─── SVG Rendering ──────────────────────────────────────────────────────────

function HouseRendering() {
  // Board & Batten vertical batten lines across wall
  const battens: React.ReactElement[] = [];
  for (let x = 272; x <= 626; x += 13) {
    battens.push(
      <line key={`bt${x}`} x1={x} y1={315} x2={x} y2={415} stroke="#9A7040" strokeWidth="1.5" opacity="0.45" />
    );
  }

  // Standing seam lines radiating from ridge on left slope
  const leftSeams: React.ReactElement[] = [];
  for (let i = 1; i <= 11; i++) {
    const t = i / 12;
    const x2 = Math.round(242 + t * (444 - 242));
    const y2 = Math.round(315 + t * 0); // eave is flat
    leftSeams.push(
      <line key={`ls${i}`} x1={444} y1={174} x2={x2} y2={315} stroke="#7A9298" strokeWidth="0.8" opacity="0.55" />
    );
  }

  // Standing seam lines on right slope
  const rightSeams: React.ReactElement[] = [];
  for (let i = 1; i <= 11; i++) {
    const t = i / 12;
    const x2 = Math.round(444 + t * (646 - 444));
    rightSeams.push(
      <line key={`rs${i}`} x1={444} y1={174} x2={x2} y2={315} stroke="#5A7278" strokeWidth="0.8" opacity="0.55" />
    );
  }

  return (
    <svg viewBox="0 0 900 500" className="w-full block rounded-b-xl" style={{ display: "block" }}>
      <defs>
        <linearGradient id="r_sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3A72B8" />
          <stop offset="65%" stopColor="#88C0E0" />
          <stop offset="100%" stopColor="#C4DCF0" />
        </linearGradient>
        <linearGradient id="r_ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6A9A3C" />
          <stop offset="100%" stopColor="#48701E" />
        </linearGradient>
        <linearGradient id="r_wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D0AA72" />
          <stop offset="100%" stopColor="#B89050" />
        </linearGradient>
        <linearGradient id="r_roofL" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#B0C8D0" />
          <stop offset="100%" stopColor="#8AAAB0" />
        </linearGradient>
        <linearGradient id="r_roofR" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6A8A90" />
          <stop offset="100%" stopColor="#587880" />
        </linearGradient>
        <linearGradient id="r_porch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C8A870" />
          <stop offset="100%" stopColor="#A88848" />
        </linearGradient>
        <linearGradient id="r_carport" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#90A8B0" />
          <stop offset="100%" stopColor="#8AAAB0" />
        </linearGradient>
      </defs>

      {/* SKY */}
      <rect x="0" y="0" width="900" height="500" fill="url(#r_sky)" />

      {/* CLOUDS */}
      <ellipse cx="155" cy="62" rx="78" ry="22" fill="white" opacity="0.80" />
      <ellipse cx="205" cy="50" rx="54" ry="18" fill="white" opacity="0.85" />
      <ellipse cx="125" cy="70" rx="42" ry="14" fill="white" opacity="0.65" />
      <ellipse cx="730" cy="75" rx="85" ry="26" fill="white" opacity="0.75" />
      <ellipse cx="785" cy="62" rx="52" ry="19" fill="white" opacity="0.82" />
      <ellipse cx="700" cy="85" rx="38" ry="13" fill="white" opacity="0.55" />

      {/* DISTANT TREELINE */}
      <path d="M0,365 C60,345 120,355 180,338 C240,320 300,342 360,330 C420,318 480,340 540,326 C600,312 660,335 720,322 C780,308 840,330 900,318 L900,390 L0,390 Z" fill="#365820" opacity="0.55" />

      {/* GROUND */}
      <rect x="0" y="388" width="900" height="112" fill="url(#r_ground)" />
      {/* Ground shadow under house */}
      <ellipse cx="444" cy="440" rx="300" ry="12" fill="#2A4A10" opacity="0.35" />

      {/* DRIVEWAY (gravel) */}
      <polygon points="340,500 560,500 535,400 365,400" fill="#C0A880" opacity="0.60" />
      <polygon points="344,500 556,500 532,403 368,403" fill="#B89868" opacity="0.25" />

      {/* ─── LEFT PINE TREES ─── */}
      <polygon points="112,150 125,275 99,275" fill="#1E4A10" />
      <polygon points="106,195 128,310 84,310" fill="#245818" />
      <polygon points="100,240 130,350 70,350" fill="#2A6020" />
      <polygon points="96,280 132,390 60,390" fill="#306828" />
      <rect x="110" y="385" width="7" height="30" fill="#5C3010" />

      <polygon points="175,200 186,305 164,305" fill="#1E4A10" />
      <polygon points="170,245 188,345 152,345" fill="#245818" />
      <polygon points="166,290 190,390 142,390" fill="#2A6020" />
      <rect x="173" y="386" width="6" height="22" fill="#5C3010" />

      {/* ─── RIGHT PINE TREES ─── */}
      <polygon points="782,170 795,285 769,285" fill="#1E4A10" />
      <polygon points="776,215 798,320 754,320" fill="#245818" />
      <polygon points="770,258 800,365 740,365" fill="#2A6020" />
      <polygon points="766,298 800,395 732,395" fill="#306828" />
      <rect x="780" y="390" width="7" height="28" fill="#5C3010" />

      <polygon points="843,225 853,318 833,318" fill="#1E4A10" />
      <polygon points="838,268 855,362 821,362" fill="#245818" />
      <polygon points="834,308 857,400 811,400" fill="#2A6020" />
      <rect x="841" y="396" width="5" height="18" fill="#5C3010" />

      {/* ─── CARPORT (left, attached) ─── */}
      {/* Shed roof */}
      <polygon points="52,378 260,350 260,360 52,388" fill="url(#r_carport)" />
      {/* Carport eave trim */}
      <line x1="52" y1="378" x2="260" y2="350" stroke="#EEE4D0" strokeWidth="2.5" />
      {/* Seam lines on carport */}
      {[80, 110, 140, 170, 200, 230].map((x) => (
        <line key={`cs${x}`} x1={260} y1={350} x2={x} y2={378 + ((x - 52) / (260 - 52)) * 10} stroke="#7A9298" strokeWidth="0.7" opacity="0.5" />
      ))}
      {/* Carport posts */}
      <rect x="58" y="378" width="10" height="60" fill="#8A6040" />
      <rect x="155" y="370" width="10" height="68" fill="#8A6040" />
      <rect x="245" y="360" width="10" height="78" fill="#8A6040" />
      {/* Carport top beam */}
      <rect x="52" y="374" width="210" height="6" fill="#7A5030" />
      {/* Carport floor slab edge */}
      <line x1="55" y1="437" x2="255" y2="437" stroke="#A09070" strokeWidth="2" opacity="0.5" />

      {/* ─── MAIN HOUSE ─── */}

      {/* FOUNDATION / STEM WALL */}
      <rect x="256" y="415" width="376" height="25" fill="#888888" />
      <line x1="256" y1="423" x2="632" y2="423" stroke="#9A9A9A" strokeWidth="0.7" />
      <line x1="256" y1="431" x2="632" y2="431" strokeWidth="0.7" stroke="#9A9A9A" />
      {/* Block joints */}
      {[295, 335, 375, 415, 455, 495, 535, 575, 615].map((x) => (
        <line key={`fj${x}`} x1={x} y1={415} x2={x} y2={423} stroke="#9A9A9A" strokeWidth="0.6" opacity="0.5" />
      ))}
      {/* Foundation shadow */}
      <rect x="256" y="437" width="376" height="4" fill="#505050" opacity="0.35" />

      {/* MAIN WALL — Board & Batten */}
      <rect x="258" y="315" width="372" height="100" fill="url(#r_wall)" />
      {/* Subtle porch shadow on lower wall */}
      <rect x="258" y="355" width="372" height="60" fill="#7A5020" opacity="0.10" />
      {/* Batten lines */}
      {battens}

      {/* ─── WINDOWS ─── */}
      {/* Left bay window (bedroom) */}
      <rect x="295" y="340" width="36" height="66" fill="#7AAEC8" rx="2" />
      <rect x="293" y="338" width="40" height="70" fill="none" stroke="#3A2010" strokeWidth="3" rx="2" />
      <line x1="313" y1="338" x2="313" y2="408" stroke="#3A2010" strokeWidth="1.5" />
      <line x1="293" y1="372" x2="333" y2="372" stroke="#3A2010" strokeWidth="1.5" />
      <rect x="290" y="406" width="46" height="5" fill="#EEE4D0" rx="1" /> {/* sill */}

      {/* Right bay window (master bedroom) */}
      <rect x="557" y="340" width="36" height="66" fill="#7AAEC8" rx="2" />
      <rect x="555" y="338" width="40" height="70" fill="none" stroke="#3A2010" strokeWidth="3" rx="2" />
      <line x1="575" y1="338" x2="575" y2="408" stroke="#3A2010" strokeWidth="1.5" />
      <line x1="555" y1="372" x2="595" y2="372" stroke="#3A2010" strokeWidth="1.5" />
      <rect x="552" y="406" width="46" height="5" fill="#EEE4D0" rx="1" />

      {/* ─── FRENCH DOOR (center, 5'×8') ─── */}
      <rect x="416" y="355" width="56" height="82" fill="#7A4018" rx="2" />
      <rect x="414" y="353" width="60" height="86" fill="none" stroke="#3A2010" strokeWidth="3" rx="2" />
      {/* Glass panels */}
      <rect x="420" y="360" width="22" height="34" fill="#7AAEC8" opacity="0.75" rx="1" />
      <rect x="448" y="360" width="22" height="34" fill="#7AAEC8" opacity="0.75" rx="1" />
      <rect x="420" y="398" width="22" height="34" fill="#7AAEC8" opacity="0.55" rx="1" />
      <rect x="448" y="398" width="22" height="34" fill="#7AAEC8" opacity="0.55" rx="1" />
      {/* Door knob */}
      <circle cx="441" cy="398" r="3.5" fill="#C8A030" />

      {/* ─── GABLE PEAK VENT WINDOW ─── */}
      <rect x="432" y="210" width="24" height="30" fill="#7AAEC8" rx="1" opacity="0.9" />
      <rect x="430" y="208" width="28" height="34" fill="none" stroke="#3A2010" strokeWidth="2" rx="1" />
      <line x1="444" y1="208" x2="444" y2="242" stroke="#3A2010" strokeWidth="1.2" />

      {/* ─── PORCH COLUMNS (4 square, cream) ─── */}
      {[268, 365, 511, 608].map((cx) => (
        <g key={`col${cx}`}>
          <rect x={cx} y={358} width={14} height={79} fill="#F0E4CC" />
          <rect x={cx - 3} y={354} width={20} height={6} fill="#E0D4B8" /> {/* cap */}
          <rect x={cx - 3} y={435} width={20} height={4} fill="#E0D4B8" /> {/* base */}
        </g>
      ))}

      {/* PORCH HEADER BEAM */}
      <rect x="250" y="350" width="388" height="8" fill="#DDD0A8" />
      <rect x="250" y="357" width="388" height="3" fill="#B0A070" opacity="0.45" /> {/* shadow */}

      {/* ─── GABLE ROOF ─── */}
      {/* Left slope */}
      <polygon points="242,315 444,174 444,315" fill="url(#r_roofL)" />
      {/* Right slope */}
      <polygon points="646,315 444,174 444,315" fill="url(#r_roofR)" />
      {/* Standing seam lines */}
      {leftSeams}
      {rightSeams}
      {/* Fascia (eave trim — cream) */}
      <line x1="242" y1="315" x2="646" y2="315" stroke="#F0E4CC" strokeWidth="5" />
      {/* Rake boards */}
      <line x1="242" y1="315" x2="444" y2="174" stroke="#F0E4CC" strokeWidth="2.5" />
      <line x1="646" y1="315" x2="444" y2="174" stroke="#F0E4CC" strokeWidth="2.5" />
      {/* Ridge cap */}
      <line x1="444" y1="174" x2="444" y2="182" stroke="#7A9298" strokeWidth="5" />
      <circle cx="444" cy="172" r="4.5" fill="#8AAAB0" />

      {/* ─── FRONT PORCH STEPS ─── */}
      <rect x="404" y="438" width="80" height="5" fill="#C0A870" rx="1" />
      <rect x="400" y="443" width="88" height="5" fill="#C8B080" rx="1" />
      <rect x="396" y="448" width="96" height="5" fill="#D0B888" rx="1" />

      {/* ─── LANDSCAPING ─── */}
      {/* Foundation shrubs */}
      <ellipse cx="292" cy="418" rx="26" ry="18" fill="#2E6010" opacity="0.9" />
      <ellipse cx="338" cy="416" rx="20" ry="15" fill="#387018" opacity="0.9" />
      <ellipse cx="580" cy="417" rx="22" ry="16" fill="#2E6010" opacity="0.9" />
      <ellipse cx="624" cy="416" rx="18" ry="14" fill="#387018" opacity="0.9" />
      {/* Lawn highlight */}
      <ellipse cx="444" cy="468" rx="200" ry="8" fill="#80B040" opacity="0.2" />

      {/* LABEL */}
      <text x="444" y="490" textAnchor="middle" fontSize="11" fill="#E8D8C0" opacity="0.75" fontFamily="serif" fontStyle="italic">
        Lubresky Residence · Sterrett, AL · Earth Tone Palette · Galvanized Metal Roof
      </text>
    </svg>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────

const specs = [
  { label: "Main Floor", value: "1,114 sq ft · 9' ceiling" },
  { label: "Basement", value: "1,114 sq ft · 10' ceiling (walkout rear)" },
  { label: "Total Finished", value: "2,228 sq ft (when basement complete)" },
  { label: "Footprint", value: "66' × 44' overall (L-shaped)" },
  { label: "Main Body", value: "42' × 26' · Carport 24' × 26'" },
  { label: "Covered Porch/Deck", value: "497 sq ft combined" },
  { label: "Construction", value: "Stick-built · 2×4 stud walls" },
  { label: "Foundation", value: "12\" concrete wall · 10\" concrete block · 24\"×16\" footings" },
  { label: "Roof Pitch", value: "8:12 · 18\" eave overhang" },
  { label: "Drawn by", value: "SLP · 4/9/2026" },
];

const exterior = [
  { label: "Roof", value: "Galvanized metal · 8:12 pitch", status: "confirmed" },
  { label: "Siding", value: "Board & Batten (per elevation drawings)", status: "confirmed" },
  { label: "Exterior Color", value: "Earth tones — warm tan / brown / clay", status: "confirmed" },
  { label: "Trim / Fascia", value: "1\"×6\" fascia · cream/off-white", status: "confirmed" },
  { label: "Windows", value: "15 double-hung (types A–D per schedule)", status: "confirmed" },
  { label: "Doors", value: "15 total · 5'×8' exterior French door entry", status: "confirmed" },
  { label: "Front Porch", value: "Covered · 4 square columns", status: "confirmed" },
  { label: "Rear Deck", value: "Covered · 497 sq ft patio", status: "confirmed" },
];

const interior = [
  { label: "Ceiling Height", value: "9' main floor · 10' basement · Vaulted living/kitchen" },
  { label: "Flooring", value: "Solid hardwood + tile (no carpet)" },
  { label: "Walls", value: "Shiplap (solid wood, low-tox)" },
  { label: "Cabinets", value: "Solid wood, formaldehyde-free" },
  { label: "Counters", value: "Quartz" },
  { label: "Paint", value: "Zero-VOC throughout" },
  { label: "Lighting", value: "Incandescent / halogen (low EMF)" },
];

const systems = [
  { label: "HVAC", value: "2-zone ductless mini split (pending: ducted alt)" },
  { label: "Fresh Air", value: "HRV or ERV with HEPA filtration" },
  { label: "Insulation", value: "Rock wool — Comfortbatt + ComfortBoard" },
  { label: "Water Heater", value: "Tankless propane" },
  { label: "Water Source", value: "Well + filtration system" },
  { label: "Waste", value: "Septic system" },
  { label: "Heat Backup", value: "Wood burning stove / fireplace" },
  { label: "Energy", value: "Alabama Power (hookup free)" },
  { label: "Internet", value: "Cat6 Ethernet hardwired throughout" },
];

const rooms = [
  { name: "Master Bedroom", detail: "~12'4\"×16' · Vault ceiling", floor: "main" },
  { name: "Master Bath", detail: "60\" tub · tiled shower · dual lavs · WC · closet", floor: "main" },
  { name: "Bedroom", detail: "~16'×10'", floor: "main" },
  { name: "Kitchen", detail: "~19'8\"×10' · island · oven/range · hood · DW · fridge", floor: "main" },
  { name: "Living Area", detail: "Vault ceiling · open to kitchen", floor: "main" },
  { name: "Mudroom", detail: "Entry from carport · washer/dryer", floor: "main" },
  { name: "Bath", detail: "32\"×60\" tub/shower · WC · lav", floor: "main" },
  { name: "Covered Porch", detail: "Front · 4 columns · steps", floor: "main" },
  { name: "Covered Deck", detail: "Rear · 497 sq ft", floor: "main" },
  { name: "Carport", detail: "24'×26' · attached left", floor: "main" },
  { name: "Bedroom 1", detail: "~13'8\"×28' zone", floor: "basement" },
  { name: "Bedroom 2", detail: "Right side", floor: "basement" },
  { name: "Living Area", detail: "Open plan", floor: "basement" },
  { name: "Bath", detail: "32\"×60\" tub/shower · WC · lav", floor: "basement" },
  { name: "Laundry", detail: "W/D", floor: "basement" },
  { name: "Mechanical", detail: "HVAC · water heater · electrical panel", floor: "basement" },
  { name: "Patio", detail: "Rear walkout · 497 sq ft", floor: "basement" },
];

const STATUS_BADGE: Record<string, string> = {
  confirmed: "bg-green-100 text-green-700",
  pending: "bg-amber-100 text-amber-700",
};

type PlanLink = { label: string; url: string };

export default function DesignPage() {
  const [planLinks, setPlanLinks] = useState<PlanLink[]>([
    { label: "Foundation Plan", url: "" },
    { label: "Floor Plan (Main + Basement)", url: "" },
    { label: "Front & Rear Elevations", url: "" },
    { label: "Side Elevations", url: "" },
  ]);
  const [editingLinks, setEditingLinks] = useState(false);

  function updateLink(i: number, field: keyof PlanLink, val: string) {
    setPlanLinks(planLinks.map((l, idx) => (idx === i ? { ...l, [field]: val } : l)));
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Home Design & Plans</h2>
        <p className="text-slate-500 text-sm mt-0.5">Lubresky Residence · Sterrett, AL · Drawn 4/9/2026 by SLP</p>
      </div>

      {/* ── RENDERING ── */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-6">
        <div className="px-5 pt-4 pb-3 border-b border-slate-100">
          <h3 className="font-semibold">Exterior Rendering</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Based on SLP elevation drawings · Board &amp; Batten · Galvanized metal roof · Earth tone palette · 8:12 pitch gable
          </p>
        </div>
        <HouseRendering />
      </div>

      {/* ── SPECS + EXTERIOR ── */}
      <div className="grid grid-cols-2 gap-5 mb-5">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold mb-3">House Specs</h3>
          <dl className="space-y-2.5">
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
          <dl className="space-y-2.5">
            {exterior.map((s) => (
              <div key={s.label} className="flex items-start justify-between gap-2">
                <div>
                  <dt className="text-xs text-slate-500 uppercase tracking-wide">{s.label}</dt>
                  <dd className="text-sm font-medium text-slate-800">{s.value}</dd>
                </div>
                {"status" in s && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 mt-0.5 ${STATUS_BADGE[s.status]}`}>
                    {s.status}
                  </span>
                )}
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* ── INTERIOR + SYSTEMS ── */}
      <div className="grid grid-cols-2 gap-5 mb-5">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold mb-3">Interior Finishes</h3>
          <dl className="space-y-2.5">
            {interior.map((s) => (
              <div key={s.label}>
                <dt className="text-xs text-slate-500 uppercase tracking-wide">{s.label}</dt>
                <dd className="text-sm font-medium text-slate-800">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold mb-3">Systems</h3>
          <dl className="space-y-2.5">
            {systems.map((s) => (
              <div key={s.label}>
                <dt className="text-xs text-slate-500 uppercase tracking-wide">{s.label}</dt>
                <dd className="text-sm font-medium text-slate-800">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* ── ROOM LAYOUT ── */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 mb-5">
        <h3 className="font-semibold mb-4">Room Layout</h3>
        <div className="mb-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Main Floor — 1,114 sq ft · 9' ceiling</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {rooms.filter((r) => r.floor === "main").map((r) => (
              <div key={r.name} className="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                <p className="text-sm font-semibold text-slate-800">{r.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{r.detail}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Basement — 1,114 sq ft · 10' ceiling · Walkout rear</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {rooms.filter((r) => r.floor === "basement").map((r) => (
              <div key={r.name} className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                <p className="text-sm font-semibold text-slate-800">{r.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{r.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FLOOR PLAN LINKS ── */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Floor Plan Documents</h3>
          <button onClick={() => setEditingLinks(!editingLinks)} className="text-xs text-slate-500 hover:text-slate-700 underline">
            {editingLinks ? "Done" : "Edit links"}
          </button>
        </div>
        <p className="text-xs text-slate-400 mb-4">Paste Google Drive or PDF links to share plan documents.</p>
        <div className="space-y-3">
          {planLinks.map((pl, i) => (
            <div key={i} className="flex items-center gap-3">
              {editingLinks ? (
                <>
                  <input className="input text-sm w-52" value={pl.label} onChange={(e) => updateLink(i, "label", e.target.value)} />
                  <input className="input text-sm flex-1" value={pl.url} onChange={(e) => updateLink(i, "url", e.target.value)} placeholder="https://..." />
                </>
              ) : (
                <>
                  <span className="text-sm font-medium text-slate-700 w-56">{pl.label}</span>
                  {pl.url ? (
                    <a href={pl.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">View PDF</a>
                  ) : (
                    <span className="text-sm text-slate-300 italic">No link added</span>
                  )}
                </>
              )}
            </div>
          ))}
          {editingLinks && (
            <button onClick={() => setPlanLinks([...planLinks, { label: "New Document", url: "" }])} className="text-xs text-slate-500 hover:text-slate-700 underline">
              + Add row
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
