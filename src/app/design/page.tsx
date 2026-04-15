"use client";

import { useState } from "react";

// ─── Color Schemes ───────────────────────────────────────────────────────────

interface Scheme {
  name: string;
  tag: string;
  siding1: string;
  siding2: string;
  batten: string;
  trim: string;
  door: string;
  columns: string;
  porchCeiling: string;
  porchShadow: string;
}

const SCHEMES: Scheme[] = [
  {
    name: "Warm Clay & Cream",
    tag: "Classic Southern farmhouse — warm tan Board & Batten, cream trim, galvanized roof",
    siding1: "#CCA870", siding2: "#B89050",
    batten: "#9A7040",
    trim: "#F0E4CC", door: "#7A4018",
    columns: "#F0E4CC", porchCeiling: "#DDD0A8", porchShadow: "#7A5020",
  },
  {
    name: "Sage Green & White",
    tag: "Natural & earthy — muted sage green siding, crisp white trim, galvanized roof",
    siding1: "#8FA87A", siding2: "#789060",
    batten: "#5E7848",
    trim: "#F4F0E8", door: "#4A3020",
    columns: "#F4F0E8", porchCeiling: "#D8DCC8", porchShadow: "#506040",
  },
  {
    name: "Slate Blue & Cream",
    tag: "Cool & calm — dusty slate blue siding, warm cream trim, galvanized roof",
    siding1: "#7A90AA", siding2: "#607888",
    batten: "#506070",
    trim: "#F2ECD8", door: "#3A2E1E",
    columns: "#F2ECD8", porchCeiling: "#C8D0D8", porchShadow: "#405060",
  },
  {
    name: "Deep Brown & Stone",
    tag: "Rich & grounded — chocolate brown siding, stone/cream trim, galvanized roof",
    siding1: "#8A6040", siding2: "#704E30",
    batten: "#583820",
    trim: "#EEE0C4", door: "#2A1E12",
    columns: "#EEE0C4", porchCeiling: "#C8B898", porchShadow: "#4A2E18",
  },
];

// ─── House SVG (parameterized by color scheme) ───────────────────────────────

function HouseSVG({ s, small = false }: { s: Scheme; small?: boolean }) {
  const battens: React.ReactElement[] = [];
  for (let x = 272; x <= 626; x += 13) {
    battens.push(
      <line key={`bt${x}`} x1={x} y1={315} x2={x} y2={415}
        stroke={s.batten} strokeWidth="1.5" opacity="0.45" />
    );
  }

  const leftSeams: React.ReactElement[] = [];
  for (let i = 1; i <= 11; i++) {
    const x2 = Math.round(242 + (i / 12) * (444 - 242));
    leftSeams.push(
      <line key={`ls${i}`} x1={444} y1={174} x2={x2} y2={315}
        stroke="#7A9298" strokeWidth="0.8" opacity="0.55" />
    );
  }
  const rightSeams: React.ReactElement[] = [];
  for (let i = 1; i <= 11; i++) {
    const x2 = Math.round(444 + (i / 12) * (646 - 444));
    rightSeams.push(
      <line key={`rs${i}`} x1={444} y1={174} x2={x2} y2={315}
        stroke="#5A7278" strokeWidth="0.8" opacity="0.55" />
    );
  }

  const uid = s.name.replace(/\s+/g, "");

  return (
    <svg viewBox="0 0 900 500" className="w-full block" style={{ display: "block" }}>
      <defs>
        <linearGradient id={`sky_${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3A72B8" />
          <stop offset="65%" stopColor="#88C0E0" />
          <stop offset="100%" stopColor="#C4DCF0" />
        </linearGradient>
        <linearGradient id={`gnd_${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6A9A3C" />
          <stop offset="100%" stopColor="#48701E" />
        </linearGradient>
        <linearGradient id={`wall_${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={s.siding1} />
          <stop offset="100%" stopColor={s.siding2} />
        </linearGradient>
        <linearGradient id={`roofL_${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#B0C8D0" />
          <stop offset="100%" stopColor="#8AAAB0" />
        </linearGradient>
        <linearGradient id={`roofR_${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6A8A90" />
          <stop offset="100%" stopColor="#587880" />
        </linearGradient>
        <linearGradient id={`cpt_${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#90A8B0" />
          <stop offset="100%" stopColor="#8AAAB0" />
        </linearGradient>
      </defs>

      {/* SKY */}
      <rect x="0" y="0" width="900" height="500" fill={`url(#sky_${uid})`} />
      <ellipse cx="155" cy="62" rx="78" ry="22" fill="white" opacity="0.80" />
      <ellipse cx="205" cy="50" rx="54" ry="18" fill="white" opacity="0.85" />
      <ellipse cx="730" cy="75" rx="85" ry="26" fill="white" opacity="0.75" />
      <ellipse cx="785" cy="62" rx="52" ry="19" fill="white" opacity="0.82" />

      {/* DISTANT TREELINE */}
      <path d="M0,365 C60,345 120,355 180,338 C240,320 300,342 360,330 C420,318 480,340 540,326 C600,312 660,335 720,322 C780,308 840,330 900,318 L900,390 L0,390 Z" fill="#365820" opacity="0.55" />

      {/* GROUND */}
      <rect x="0" y="388" width="900" height="112" fill={`url(#gnd_${uid})`} />
      <ellipse cx="444" cy="440" rx="300" ry="12" fill="#2A4A10" opacity="0.35" />
      <polygon points="340,500 560,500 535,400 365,400" fill="#C0A880" opacity="0.55" />

      {/* LEFT PINES */}
      <polygon points="112,150 125,275 99,275" fill="#1E4A10" />
      <polygon points="106,195 128,310 84,310" fill="#245818" />
      <polygon points="100,240 130,350 70,350" fill="#2A6020" />
      <polygon points="96,280 132,390 60,390" fill="#306828" />
      <rect x="110" y="385" width="7" height="30" fill="#5C3010" />
      <polygon points="175,200 186,305 164,305" fill="#1E4A10" />
      <polygon points="170,245 188,345 152,345" fill="#245818" />
      <polygon points="166,290 190,390 142,390" fill="#2A6020" />
      <rect x="173" y="386" width="6" height="22" fill="#5C3010" />

      {/* RIGHT PINES */}
      <polygon points="782,170 795,285 769,285" fill="#1E4A10" />
      <polygon points="776,215 798,320 754,320" fill="#245818" />
      <polygon points="770,258 800,365 740,365" fill="#2A6020" />
      <polygon points="766,298 800,395 732,395" fill="#306828" />
      <rect x="780" y="390" width="7" height="28" fill="#5C3010" />
      <polygon points="843,225 853,318 833,318" fill="#1E4A10" />
      <polygon points="838,268 855,362 821,362" fill="#245818" />
      <polygon points="834,308 857,400 811,400" fill="#2A6020" />
      <rect x="841" y="396" width="5" height="18" fill="#5C3010" />

      {/* CARPORT */}
      <polygon points="52,378 260,350 260,360 52,388" fill={`url(#cpt_${uid})`} />
      <line x1="52" y1="378" x2="260" y2="350" stroke={s.trim} strokeWidth="2.5" />
      {[80,110,140,170,200,230].map((x) => (
        <line key={`cs${x}`} x1={260} y1={350} x2={x} y2={378}
          stroke="#7A9298" strokeWidth="0.7" opacity="0.45" />
      ))}
      <rect x="58" y="378" width="10" height="60" fill="#7A5030" />
      <rect x="155" y="370" width="10" height="68" fill="#7A5030" />
      <rect x="245" y="360" width="10" height="78" fill="#7A5030" />
      <rect x="52" y="374" width="210" height="6" fill="#6A4020" />

      {/* FOUNDATION */}
      <rect x="256" y="415" width="376" height="25" fill="#888888" />
      <line x1="256" y1="423" x2="632" y2="423" stroke="#9A9A9A" strokeWidth="0.7" />
      <line x1="256" y1="431" x2="632" y2="431" stroke="#9A9A9A" strokeWidth="0.7" />
      {[295,335,375,415,455,495,535,575,615].map((x) => (
        <line key={`fj${x}`} x1={x} y1={415} x2={x} y2={423}
          stroke="#9A9A9A" strokeWidth="0.6" opacity="0.5" />
      ))}
      <rect x="256" y="437" width="376" height="4" fill="#505050" opacity="0.35" />

      {/* WALL */}
      <rect x="258" y="315" width="372" height="100" fill={`url(#wall_${uid})`} />
      <rect x="258" y="355" width="372" height="60" fill={s.porchShadow} opacity="0.10" />
      {battens}

      {/* LEFT WINDOW */}
      <rect x="295" y="340" width="36" height="66" fill="#7AAEC8" rx="2" />
      <rect x="293" y="338" width="40" height="70" fill="none" stroke="#3A2010" strokeWidth="3" rx="2" />
      <line x1="313" y1="338" x2="313" y2="408" stroke="#3A2010" strokeWidth="1.5" />
      <line x1="293" y1="372" x2="333" y2="372" stroke="#3A2010" strokeWidth="1.5" />
      <rect x="290" y="406" width="46" height="5" fill={s.trim} rx="1" />

      {/* RIGHT WINDOW */}
      <rect x="557" y="340" width="36" height="66" fill="#7AAEC8" rx="2" />
      <rect x="555" y="338" width="40" height="70" fill="none" stroke="#3A2010" strokeWidth="3" rx="2" />
      <line x1="575" y1="338" x2="575" y2="408" stroke="#3A2010" strokeWidth="1.5" />
      <line x1="555" y1="372" x2="595" y2="372" stroke="#3A2010" strokeWidth="1.5" />
      <rect x="552" y="406" width="46" height="5" fill={s.trim} rx="1" />

      {/* FRENCH DOOR */}
      <rect x="416" y="355" width="56" height="82" fill={s.door} rx="2" />
      <rect x="414" y="353" width="60" height="86" fill="none" stroke="#3A2010" strokeWidth="3" rx="2" />
      <rect x="420" y="360" width="22" height="34" fill="#7AAEC8" opacity="0.75" rx="1" />
      <rect x="448" y="360" width="22" height="34" fill="#7AAEC8" opacity="0.75" rx="1" />
      <rect x="420" y="398" width="22" height="34" fill="#7AAEC8" opacity="0.55" rx="1" />
      <rect x="448" y="398" width="22" height="34" fill="#7AAEC8" opacity="0.55" rx="1" />
      <circle cx="441" cy="398" r="3.5" fill="#C8A030" />

      {/* GABLE VENT */}
      <rect x="432" y="210" width="24" height="30" fill="#7AAEC8" rx="1" opacity="0.9" />
      <rect x="430" y="208" width="28" height="34" fill="none" stroke="#3A2010" strokeWidth="2" rx="1" />
      <line x1="444" y1="208" x2="444" y2="242" stroke="#3A2010" strokeWidth="1.2" />

      {/* COLUMNS */}
      {[268,365,511,608].map((cx) => (
        <g key={`col${cx}`}>
          <rect x={cx} y={358} width={14} height={79} fill={s.columns} />
          <rect x={cx - 3} y={354} width={20} height={6} fill={s.porchCeiling} />
          <rect x={cx - 3} y={435} width={20} height={4} fill={s.porchCeiling} />
        </g>
      ))}

      {/* PORCH HEADER */}
      <rect x="250" y="350" width="388" height="8" fill={s.porchCeiling} />
      <rect x="250" y="357" width="388" height="3" fill="#B0A070" opacity="0.35" />

      {/* GABLE ROOF */}
      <polygon points="242,315 444,174 444,315" fill={`url(#roofL_${uid})`} />
      <polygon points="646,315 444,174 444,315" fill={`url(#roofR_${uid})`} />
      {leftSeams}
      {rightSeams}
      <line x1="242" y1="315" x2="646" y2="315" stroke={s.trim} strokeWidth="5" />
      <line x1="242" y1="315" x2="444" y2="174" stroke={s.trim} strokeWidth="2.5" />
      <line x1="646" y1="315" x2="444" y2="174" stroke={s.trim} strokeWidth="2.5" />
      <line x1="444" y1="174" x2="444" y2="182" stroke="#7A9298" strokeWidth="5" />
      <circle cx="444" cy="172" r="4.5" fill="#8AAAB0" />

      {/* STEPS */}
      <rect x="404" y="438" width="80" height="5" fill="#C0A870" rx="1" />
      <rect x="400" y="443" width="88" height="5" fill="#C8B080" rx="1" />
      <rect x="396" y="448" width="96" height="5" fill="#D0B888" rx="1" />

      {/* SHRUBS */}
      <ellipse cx="292" cy="418" rx="26" ry="18" fill="#2E6010" opacity="0.9" />
      <ellipse cx="338" cy="416" rx="20" ry="15" fill="#387018" opacity="0.9" />
      <ellipse cx="580" cy="417" rx="22" ry="16" fill="#2E6010" opacity="0.9" />
      <ellipse cx="624" cy="416" rx="18" ry="14" fill="#387018" opacity="0.9" />
    </svg>
  );
}

// ─── Color swatch helper ──────────────────────────────────────────────────────

function Swatch({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-5 h-5 rounded-sm border border-slate-200 flex-shrink-0" style={{ background: color }} />
      <span className="text-xs text-slate-600">{label}</span>
    </div>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────

const specs = [
  { label: "Main Floor", value: "1,114 sq ft · 9\u2019 ceiling" },
  { label: "Basement", value: "1,114 sq ft · 10\u2019 ceiling (walkout rear)" },
  { label: "Total Finished", value: "2,228 sq ft (when basement complete)" },
  { label: "Footprint", value: "66\u2019 \u00d7 44\u2019 overall (L-shaped)" },
  { label: "Main Body", value: "42\u2019 \u00d7 26\u2019 \u00b7 Carport 24\u2019 \u00d7 26\u2019" },
  { label: "Covered Porch/Deck", value: "497 sq ft combined" },
  { label: "Construction", value: "Stick-built \u00b7 2\u00d74 stud walls" },
  { label: "Foundation", value: "12\u2033 concrete wall \u00b7 10\u2033 block \u00b7 24\u2033\u00d716\u2033 footings" },
  { label: "Roof Pitch", value: "8:12 \u00b7 18\u2033 eave overhang" },
  { label: "Drawn by", value: "SLP \u00b7 4/9/2026" },
];

const exterior = [
  { label: "Roof", value: "Galvanized metal \u00b7 8:12 pitch", status: "confirmed" },
  { label: "Siding", value: "Board & Batten (per elevation drawings)", status: "confirmed" },
  { label: "Exterior Color", value: "Earth tones \u2014 warm tan / brown / clay", status: "confirmed" },
  { label: "Trim / Fascia", value: "1\u2033\u00d76\u2033 fascia \u00b7 cream/off-white", status: "confirmed" },
  { label: "Windows", value: "15 double-hung (types A\u2013D per schedule)", status: "confirmed" },
  { label: "Doors", value: "15 total \u00b7 5\u2019\u00d78\u2019 exterior French door entry", status: "confirmed" },
  { label: "Front Porch", value: "Covered \u00b7 4 square columns", status: "confirmed" },
  { label: "Rear Deck", value: "Covered \u00b7 497 sq ft patio", status: "confirmed" },
];

const interior = [
  { label: "Ceiling Height", value: "9\u2019 main floor \u00b7 10\u2019 basement \u00b7 Vaulted living/kitchen" },
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
  { label: "Insulation", value: "Rock wool \u2014 Comfortbatt + ComfortBoard" },
  { label: "Water Heater", value: "Tankless propane" },
  { label: "Water Source", value: "Well + filtration system" },
  { label: "Waste", value: "Septic system" },
  { label: "Heat Backup", value: "Wood burning stove / fireplace" },
  { label: "Energy", value: "Alabama Power (hookup free)" },
  { label: "Internet", value: "Cat6 Ethernet hardwired throughout" },
];

const rooms = [
  { name: "Master Bedroom", detail: "~12\u20194\u2033\u00d716\u2019 \u00b7 Vault ceiling", floor: "main" },
  { name: "Master Bath", detail: "60\u2033 tub \u00b7 tiled shower \u00b7 dual lavs \u00b7 WC \u00b7 closet", floor: "main" },
  { name: "Bedroom", detail: "~16\u2019\u00d710\u2019", floor: "main" },
  { name: "Kitchen", detail: "~19\u20198\u2033\u00d710\u2019 \u00b7 island \u00b7 oven/range \u00b7 hood \u00b7 DW", floor: "main" },
  { name: "Living Area", detail: "Vault ceiling \u00b7 open to kitchen", floor: "main" },
  { name: "Mudroom", detail: "Entry from carport \u00b7 washer/dryer", floor: "main" },
  { name: "Bath", detail: "32\u2033\u00d760\u2033 tub/shower \u00b7 WC \u00b7 lav", floor: "main" },
  { name: "Covered Porch", detail: "Front \u00b7 4 columns \u00b7 steps", floor: "main" },
  { name: "Covered Deck", detail: "Rear \u00b7 497 sq ft", floor: "main" },
  { name: "Carport", detail: "24\u2019\u00d726\u2019 \u00b7 attached left", floor: "main" },
  { name: "Bedroom 1", detail: "Left side", floor: "basement" },
  { name: "Bedroom 2", detail: "Right side", floor: "basement" },
  { name: "Living Area", detail: "Open plan", floor: "basement" },
  { name: "Bath", detail: "32\u2033\u00d760\u2033 tub/shower \u00b7 WC \u00b7 lav", floor: "basement" },
  { name: "Laundry", detail: "W/D", floor: "basement" },
  { name: "Mechanical", detail: "HVAC \u00b7 water heater \u00b7 electrical panel", floor: "basement" },
  { name: "Patio", detail: "Rear walkout \u00b7 497 sq ft", floor: "basement" },
];

const STATUS_BADGE: Record<string, string> = {
  confirmed: "bg-green-100 text-green-700",
  pending: "bg-amber-100 text-amber-700",
};

type PlanLink = { label: string; url: string };

// ─── Page ────────────────────────────────────────────────────────────────────

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

      {/* ── COLOR OPTIONS ── */}
      <div className="mb-6">
        <div className="mb-4">
          <h3 className="font-semibold text-lg">Exterior Color Options</h3>
          <p className="text-slate-500 text-sm mt-0.5">
            Your house elevation rendered in four earth-tone palettes — all with galvanized metal roof and Hardie Board &amp; Batten siding.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SCHEMES.map((scheme) => (
            <div key={scheme.name} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <HouseSVG s={scheme} />
              <div className="px-4 py-3 border-t border-slate-100">
                <p className="font-semibold text-slate-800 text-sm">{scheme.name}</p>
                <p className="text-xs text-slate-500 mt-0.5 mb-2">{scheme.tag}</p>
                <div className="flex flex-wrap gap-3">
                  <Swatch color={scheme.siding1} label="Siding" />
                  <Swatch color={scheme.trim} label="Trim" />
                  <Swatch color={scheme.door} label="Door" />
                  <Swatch color="#A8B8BC" label="Galvanized roof" />
                </div>
              </div>
            </div>
          ))}
        </div>
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
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 mt-0.5 ${STATUS_BADGE[s.status]}`}>
                  {s.status}
                </span>
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
