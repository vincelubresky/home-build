// Home Build Dashboard — Data
// Update this file to change what shows on the site.
// Push changes to GitHub and GitHub Pages will auto-deploy.

const PROJECT = {
  address: "Shelby County, Alabama",
  sqft_main: 1114,
  sqft_basement: 1114,
  sqft_total: 2228,
  status: "Planning",
  survey_status: "Submitted to county — awaiting approval",
  loan_status: "Not started — waiting on survey approval",
  build_start: null,
  estimated_completion: null,
};

const SPECS = {
  dimensions: [
    { label: "Main Floor", value: "1,114 sq ft · 9\u2019 ceiling" },
    { label: "Basement", value: "1,114 sq ft · 10\u2019 ceiling · walkout" },
    { label: "Total Living", value: "2,228 sq ft (when finished)" },
    { label: "Footprint", value: "66\u2032 \u00d7 44\u2032 overall" },
    { label: "Main Body", value: "42\u2032 \u00d7 26\u2032" },
    { label: "Carport", value: "24\u2032 \u00d7 26\u2032" },
  ],
  exterior: [
    { label: "Roof", value: "Galvanized metal · 8:12 pitch · 18\u2033 overhang" },
    { label: "Siding", value: "Hardie Board & Batten" },
    { label: "Foundation", value: "12\u2033 concrete wall · 10\u2033 block · 24\u2033\u00d716\u2033 footings" },
    { label: "Porch (front)", value: "Covered · 4 columns" },
    { label: "Deck (rear)", value: "Covered · 497 sq ft" },
  ],
  rooms_main: ["Master Bedroom + Ensuite", "Bedroom", "Kitchen + Island", "Living Room (Vaulted)", "Mudroom", "Full Bath"],
  rooms_basement: ["Bedroom 2", "Bedroom 3", "Living / Rec Room", "Full Bath", "Laundry Room", "Mechanical Room", "Patio Walkout"],
  plans: [
    { label: "Foundation Plan", url: "" },
    { label: "Floor Plan", url: "" },
    { label: "Front & Rear Elevations", url: "" },
    { label: "Side Elevations", url: "" },
  ],
};

const LOW_TOX = [
  { icon: "fa-lightbulb", text: "Incandescent / halogen lighting (no LED)" },
  { icon: "fa-network-wired", text: "Cat6 Ethernet throughout — home run panel" },
  { icon: "fa-bolt", text: "Shielded electrical wiring (MC cable)" },
  { icon: "fa-droplet", text: "Copper + PEX-A plumbing — no PVC" },
  { icon: "fa-wind", text: "Zero-VOC paints throughout" },
  { icon: "fa-cabinet-filing", text: "Formaldehyde-free solid wood cabinets" },
  { icon: "fa-ban", text: "No carpet — hardwood + tile only" },
  { icon: "fa-grip-lines-vertical", text: "Shiplap walls preferred over drywall" },
];

// ─────────────────────────────────────────────
// MATERIALS
// status options: "needed" | "ordered" | "delivered" | "installed"
// Update status and qty as the build progresses.
// ─────────────────────────────────────────────
let MATERIALS = [

  // ── ALABAMA CLIMATE & CODE ───────────────────
  // Zone 3A (hot-humid). High termite pressure. Tornado zone.
  // Heavy clay soil. ~54" annual rainfall. Cooling-dominated.
  {
    category: "Alabama Climate & Code",
    icon: "fa-triangle-exclamation",
    items: [
      {
        name: "BoraCare — Borate Termite Treatment (Framing)",
        spec: "Concentrate, dilute 1:1 with water, spray/brush all framing",
        qty: "2–3 gallons concentrate (covers ~1,114 sq ft framing)",
        cost: 280,
        status: "needed",
        brands: [
          { name: "BoraCare by Nisus Corp", url: "https://www.nisuscorp.com" },
          { name: "Timbor (less penetrating, budget option)", url: "https://www.nisuscorp.com" }
        ],
        notes: "CRITICAL for central Alabama — one of the highest termite pressure states in the US (Formosan + Eastern subterranean both present). Apply BoraCare to ALL framing lumber, OSB, and wood trim before drywall or sheathing closes in. BoraCare penetrates deep into the wood; Timbor is surface-only and cheaper. A licensed pest control company can apply during framing phase — get this scheduled early."
      },
      {
        name: "Termite Soil Pre-Treatment",
        spec: "Liquid termiticide soil treatment, perimeter + under slab",
        qty: "Per licensed pest control contractor",
        cost: 800,
        status: "needed",
        brands: [
          { name: "Termidor (fipronil) — industry standard", url: "https://www.termidor.com" },
          { name: "Altriset (chlorantraniliprole) — lower toxicity", url: "" }
        ],
        notes: "Apply before concrete pour and after backfill. Required by most Alabama building codes for new construction. Termidor is the most effective and long-lasting; Altriset is a lower-mammalian-toxicity alternative. Your builder's pest control sub should handle this — confirm it's in the contract."
      },
      {
        name: "Radiant Barrier — Foil-Faced Roof Deck",
        spec: "Foil-faced OSB roof deck, or staple-up radiant barrier foil in attic",
        qty: "~1,350 sq ft (roof area)",
        cost: 1200,
        status: "needed",
        brands: [
          { name: "LP TechShield (foil-faced OSB)", url: "https://www.lpcorp.com" },
          { name: "Reflectix (staple-up foil)", url: "https://www.reflectixinc.com" }
        ],
        notes: "Alabama summers are brutal — a radiant barrier under the roof deck can reduce attic temperatures by 20–30°F and cut cooling costs 10–15%. LP TechShield is foil-laminated OSB — you use it instead of standard roof sheathing, no extra step. Reflectix is installed in the attic after the fact but works. Given the standing seam metal roof (already reflective), add LP TechShield for the inside benefit."
      },
      {
        name: "Hurricane/Tornado Roof Connectors",
        spec: "Rafter-to-top-plate and rafter-to-ridge connectors, galvanized",
        qty: "Per truss/rafter count — every connection",
        cost: 450,
        status: "needed",
        brands: [
          { name: "Simpson Strong-Tie H2.5A (rafter tie)", url: "https://www.strongtie.com" },
          { name: "Simpson Strong-Tie LSTA strap ties", url: "https://www.strongtie.com" }
        ],
        notes: "Alabama sits in Dixie Alley — tornado risk is real and serious. Simpson Strong-Tie hurricane ties at EVERY rafter-to-top-plate connection are cheap insurance ($1–2/connector) and required by IRC in high-wind zones. Specify to builder that all roof framing connections get Simpson ties. Also use continuous load path (anchor bolts → sill plate → studs → top plate → rafter ties)."
      },
      {
        name: "Basement / Lower Level Dehumidifier",
        spec: "Whole-basement unit, 70+ pint/day capacity, auto-drain",
        qty: "1",
        cost: 850,
        status: "needed",
        brands: [
          { name: "Santa Fe Compact70", url: "https://www.santa-fe-products.com" },
          { name: "Aprilaire E100 (100 pint)", url: "https://www.aprilaire.com" }
        ],
        notes: "Alabama humidity + walkout basement = guaranteed moisture issues without active dehumidification. A Santa Fe or Aprilaire unit designed for below-grade spaces (handles cold air better than box-store units) is worth every penny. Plumb the drain line directly to a floor drain or sump — no emptying buckets. Run continuously during warm/humid months."
      },
      {
        name: "Pressure-Treated Lumber — Exterior & Ground Contact",
        spec: "ACQ or CA-C treated, Ground Contact rated (UC4A/UC4B), .40 or .60 retention",
        qty: "All sill plates, porch posts, deck framing, any wood near grade",
        cost: 900,
        status: "needed",
        brands: [],
        notes: "All sill plates on concrete (basement and main floor perimeter) must be pressure-treated regardless of termite treatment above. Porch columns/posts: use PT post with PVC or Fypon sleeve on top. Rear deck framing: all PT. Any wood within 6\" of grade: PT. In Alabama, use .40 retention minimum for above-ground, .60 for ground contact. Specify lumber yard includes this — don't assume."
      },
      {
        name: "Low-E Window Glass — Low SHGC Specification",
        spec: "Solar Heat Gain Coefficient (SHGC) ≤ 0.25 for all windows",
        qty: "All 15 windows",
        cost: 0,
        status: "needed",
        brands: [
          { name: "Cardinal LoĒ-366 glass coating", url: "https://www.cardinalcorp.com" }
        ],
        notes: "Alabama is Zone 3A — COOLING dominated. Low SHGC (≤0.25) is more important than U-factor here. Standard Low-E glass sold at big box stores often has SHGC of 0.30–0.40 which lets in significant heat gain. Specify Cardinal LoĒ-366 or equivalent triple-silver Low-E coating: U-factor ~0.27, SHGC ~0.20. This spec can cut summer cooling loads significantly. Tell your window supplier 'Zone 3 Low-E, low SHGC' — they'll know what you mean."
      }
    ]
  },

  // ── FOUNDATION & STRUCTURE ──────────────────
  {
    category: "Foundation & Structure",
    icon: "fa-layer-group",
    items: [
      {
        name: "AdvanTech / DuraStrand Subfloor Panels",
        spec: "23/32\" T&G, 4×8. OM quotes Huber Blue ($17.53/sheet); BFS quotes DuraStrand PointSix ($19.71/sheet)",
        qty: "37 sheets (per OM); 41 per BFS",
        cost: 649,
        status: "needed",
        brands: [
          { name: "Huber Blue (OM)", url: "https://www.huberwood.com" },
          { name: "Norbord DuraStrand (BFS)", url: "" }
        ],
        notes: "QUOTED: OM Huber Blue $648.61 (37 sheets × $17.53). OM is 11% cheaper than BFS on T&G — keep this with OM. Folded into framing package on each quote."
      },
      {
        name: "Engineered Wood Products (EWP) — BFS Quote (benchmark)",
        spec: "6× LSL rim 1-1/8×16 (TimberStrand), 49× TJI-360 I-joists (3×10', 1×18', 45×26'), 2× 1¾×9¼ LVL 18' (2.0E Microlam), 3× 24\" LVL @ 24' (Boise special order)",
        qty: "Full floor system EWP",
        cost: 8826,
        status: "needed",
        brands: [
          { name: "BFS Quote 87546716 (4/23/26) — $8,825.99", url: "" }
        ],
        notes: "QUOTED: BFS EWP $8,023.63 + 10% tax = $8,825.99. Oak Mountain ZIP quote #23356 has EWP as a single 'SO60016' line at $2,571 — UNCLEAR if full scope. KEY NEGOTIATION POINT: ask OM owner what their EWP line covers. If only TJI joists and not the LSL rim or 24\" LVLs, the $5,455 gap will need to close."
      },
      {
        name: "ZIP System — Wall + Roof Sheathing (PREFERRED)",
        spec: "78× 7/16\" ZIP Wall 4×8 sheets (walls) + 116× 1/2\" ZIP Roof 4×8 sheets (roof deck) + 36× ZIP Tape rolls. Integrated structural sheathing + WRB.",
        qty: "Full wall + roof sheathing",
        cost: 6173,
        status: "needed",
        brands: [
          { name: "Huber ZIP System", url: "https://www.zipsystem.com" },
          { name: "Bundled in OM Quote 23356 (4/28/26)", url: "" }
        ],
        notes: "USER CHOICE: ZIP over OSB+housewrap+felt. Eliminates separate WRB layer, fewer leak paths at penetrations, faster install. Net upgrade ~$3,514 over OSB+housewrap+felt version (#23351). Tape ALL panel seams + window/door rough openings. Inside the OM #23356 framing pkg total — no separate line item to order."
      },
      {
        name: "Roof Trusses — BFS Shelby Quote",
        spec: "63 wood roof trusses, 8/12 pitch, 18\" overhang, 2×4 SP No.2 chord, KD untreated SYP. Mix: 1×A01 + 11×A02 (26' span main), 2×B01 + 9×B02 + 1×B03 + 9×B04 + 1×B05 (38' span), 1×C01 + 2×C02 (17'-8\" span carport), 20×P01 + 2×PC01 (porch), 4 valley trusses",
        qty: "63 trusses, total weight 8,146 lb",
        cost: 7195,
        status: "needed",
        brands: [
          { name: "BFS Shelby Quote 5403492 (4/29/26) — $7,195", url: "" }
        ],
        notes: "QUOTED: BFS Shelby $7,195 ex tax. Wind 115 MPH design, 20-10-0-10 PSF loading, 2'-0\" spacing. EXCLUDES: hurricane clips (use Simpson H2.5A separately), beams, blocking, dormers, structural fascia, bracing material. Quote good if accepted by 5/29/26, delivery by 6/13/26. ASK Oak Mountain to beat $7,195 to consolidate the order."
      },
      {
        name: "Concrete Block — Basement Walls",
        spec: "8\"×8\"×16\" CMU block",
        qty: "~3,600 block (~134 lin ft × 9 ft wall)",
        cost: 6300,
        status: "needed",
        brands: [],
        notes: "Standard 8-inch CMU from local masonry supplier. Get quotes from 2–3 local suppliers — block pricing varies by region. Could also pour concrete walls; builder will advise."
      },
      {
        name: "Concrete — Footings",
        spec: "3,000 PSI mix, 24\"×16\" continuous",
        qty: "Per pour schedule",
        cost: 3500,
        status: "needed",
        brands: [],
        notes: "Ready-mix from local batch plant. Confirm continuous footing dimensions with engineer — plan shows 24\"×16\"."
      },
      {
        name: "Foundation Waterproofing Membrane",
        spec: "Self-adhering rubberized asphalt or spray-applied",
        qty: "~1,200 sq ft",
        cost: 1800,
        status: "needed",
        brands: [
          { name: "GRACE Bituthene", url: "https://www.grace.com" },
          { name: "Henry BlueMax", url: "https://www.henry.com" }
        ],
        notes: "Applied to exterior face of basement walls before backfill. Critical to get this right — do not skip or cut corners here."
      },
      {
        name: "Drainage Board + Filter Fabric",
        spec: "Dimple mat drainage board with geotextile",
        qty: "~1,200 sq ft",
        cost: 900,
        status: "needed",
        brands: [
          { name: "DELTA-MS (Cosella-Dörken)", url: "https://www.cosella-dorken.com" }
        ],
        notes: "Goes over waterproofing membrane — protects it from backfill and directs water down to drain tile."
      },
      {
        name: "Perforated Drain Tile (French Drain)",
        spec: "4\" perforated pipe with sock",
        qty: "~140 lin ft",
        cost: 280,
        status: "needed",
        brands: [],
        notes: "Runs at base of footing around full perimeter, directs groundwater to sump pit. Wrap with filter fabric sock to keep sediment out."
      },
      {
        name: "Sump Pit Liner",
        spec: "18\"×24\" plastic sump basin with lid",
        qty: "1",
        cost: 150,
        status: "needed",
        brands: [
          { name: "Zoeller", url: "https://www.zoeller.com" }
        ],
        notes: "Set in gravel at lowest point of drain tile run. Sump pump installed later during mechanical phase."
      }
    ]
  },

  // ── FRAMING ─────────────────────────────────
  {
    category: "Framing Lumber",
    icon: "fa-grip-lines-vertical",
    items: [
      {
        name: "2×6 Dimensional Lumber — Exterior Walls",
        spec: "2×6×9' or 2×6×8', SPF or Southern Yellow Pine",
        qty: "Per framing takeoff",
        cost: 5200,
        status: "needed",
        brands: [],
        notes: "2×6 exterior walls allow R-23 Rockwool cavity insulation. Builder's lumber package takeoff will provide exact count. Get quotes from local yards and big box."
      },
      {
        name: "2×4 Dimensional Lumber — Interior Walls",
        spec: "2×4×8' precut studs",
        qty: "Per framing takeoff",
        cost: 2100,
        status: "needed",
        brands: [],
        notes: "Standard interior partition walls. Precut 92-5/8\" studs are faster to frame than full-length."
      },
      {
        name: "Wall + Roof Sheathing — DECISION: ZIP vs OSB+wrap",
        spec: "OPTION A (PREFERRED): ZIP wall + ZIP roof + ZIP tape (OM #23356) = +$3,514 over OSB. OPTION B: 7/16 OSB walls + 7/16 OSB roof + Tyvek wrap + #15 felt (OM #23351). Both Oak Mountain quotes available — see Vendor Brief tab.",
        qty: "78 wall sheets + 116 roof sheets",
        cost: 6173,
        status: "needed",
        brands: [
          { name: "Huber ZIP System (chosen)", url: "https://www.zipsystem.com" },
          { name: "OM Quote 23356 — ZIP version", url: "" },
          { name: "OM Quote 23351 — OSB+Tyvek alt", url: "" }
        ],
        notes: "USER CHOICE: ZIP for integrated WRB, faster install, better air sealing in Zone 3A humid climate. Budgeted at OM ZIP pricing: 78× ZIP wall @ $24.60 + 116× 1/2 ZIP roof @ $26.60 + 36× ZIP tape @ $32.44 = $6,173. OSB+wrap path would be ~$2,659 cheaper — see Vendor Brief 'ZIP vs OSB' section for full pros/cons."
      },
      {
        name: "Roof Sheathing — OSB or CDX Plywood",
        spec: "7/16\" OSB or 1/2\" CDX, 4×8",
        qty: "~170 sheets (~1,350 sq ft roof area)",
        cost: 3060,
        status: "needed",
        brands: [],
        notes: "Roof deck over rafters/trusses. CDX plywood preferred if using Rockwool ComfortBoard 110 under-deck since it holds fasteners better."
      }
    ]
  },

  // ── ROOFING ──────────────────────────────────
  {
    category: "Roofing",
    icon: "fa-house-chimney",
    items: [
      {
        name: "Galvanized Standing Seam Metal Roofing",
        spec: "24-gauge, 16\" panels, standing seam, Galvalume or true galvanized",
        qty: "~1,350 sq ft + 15% waste = ~1,550 sq ft",
        cost: 7750,
        status: "needed",
        brands: [
          { name: "McElroy Metal", url: "https://www.mcelroymetal.com" },
          { name: "Sheffield Metals", url: "https://www.sheffieldmetals.com" },
          { name: "Metal Sales Manufacturing", url: "https://www.metalsales.us.com" }
        ],
        notes: "True galvanized (G90 or G115) for the classic raw zinc look. Galvalume is more corrosion-resistant but more silvery. McElroy Metal is AL/Southeast-based — check for local rep. Specify concealed fastener standing seam, not exposed fastener corrugated."
      },
      {
        name: "Synthetic Roofing Underlayment",
        spec: "Self-adhering or mechanically fastened synthetic WRB",
        qty: "~1,550 sq ft",
        cost: 600,
        status: "needed",
        brands: [
          { name: "GAF WeatherWatch (self-adhering)", url: "https://www.gaf.com" },
          { name: "VaproShield SlopeShield", url: "https://www.vaproshield.com" }
        ],
        notes: "Goes under metal panels on roof deck. Use self-adhering ice & water shield at eaves (2 rows) and valleys. Synthetic felt on field."
      },
      {
        name: "Ridge Cap Flashing",
        spec: "Matching galvanized metal, field-formed or pre-made",
        qty: "~46 lin ft (42' + 4' overhang each side)",
        cost: 300,
        status: "needed",
        brands: [],
        notes: "Should match roof panel material and supplier. Order at same time as panels."
      },
      {
        name: "Drip Edge Flashing",
        spec: "Galvanized or painted steel",
        qty: "~180 lin ft perimeter",
        cost: 200,
        status: "needed",
        brands: [],
        notes: "Eaves and rakes. Install before underlayment at eaves, after underlayment at rakes."
      },
      {
        name: "Rockwool ComfortBoard 110 (Under-Roof Deck)",
        spec: "1\" rigid, 2×4 ft boards, R-4",
        qty: "~1,350 sq ft = ~170 boards",
        cost: 2040,
        status: "needed",
        brands: [
          { name: "Rockwool ComfortBoard 110", url: "https://www.rockwool.com" }
        ],
        notes: "High-density (110 kg/m³) — rated for under-roof-deck use unlike standard ComfortBoard 80. Goes between rafters/trusses and sheathing. Adds R-4 continuous and acts as thermal break and sound barrier. Fire-resistant."
      }
    ]
  },

  // ── INSULATION ───────────────────────────────
  {
    category: "Insulation — Rock Wool",
    icon: "fa-temperature-low",
    items: [
      {
        name: "Rockwool Comfortbatt — Exterior Wall Cavities",
        spec: "R-23, 2×6 width (5.5\"), 47\"×15\" batts",
        qty: "~900 sq ft = ~11–12 bags",
        cost: 650,
        status: "needed",
        brands: [
          { name: "Rockwool Comfortbatt", url: "https://www.rockwool.com" }
        ],
        notes: "Fills 2×6 exterior wall cavities. Fire-resistant, mold-resistant, no VOC, no itch. Does not need a vapor barrier in most AL climates — confirm with building official."
      },
      {
        name: "Rockwool Comfortbatt — Ceiling",
        spec: "R-30 or R-38 batts to fit joist spacing",
        qty: "~1,114 sq ft = ~14 bags",
        cost: 920,
        status: "needed",
        brands: [
          { name: "Rockwool Comfortbatt", url: "https://www.rockwool.com" }
        ],
        notes: "Ceiling/attic floor insulation. If using vaulted ceiling in living room, use batt between rafters + ComfortBoard 110 above deck."
      },
      {
        name: "Rockwool ComfortBoard 80 — Exterior Continuous",
        spec: "1.5\" thick, R-6, 2×4 ft boards",
        qty: "~900 sq ft = ~113 boards",
        cost: 1050,
        status: "needed",
        brands: [
          { name: "Rockwool ComfortBoard 80", url: "https://www.rockwool.com" }
        ],
        notes: "Continuous exterior insulation — goes over OSB sheathing or ZIP, under Hardie siding. Eliminates thermal bridging at studs. Fire-rated (no face exposure limit). ComfortBoard 80 = standard density for walls."
      },
      {
        name: "Rockwool Safe'n'Sound — Interior Partitions",
        spec: "3.5\" (2×4 cavity), 47\"×15\" batts",
        qty: "~600 sq ft = ~8 bags",
        cost: 370,
        status: "needed",
        brands: [
          { name: "Rockwool Safe'n'Sound", url: "https://www.rockwool.com" }
        ],
        notes: "Sound insulation (STC 45+) for master bedroom, bathrooms, laundry room interior walls. Not R-value rated — purely acoustic and fire separation. The single best upgrade for bedroom privacy."
      }
    ]
  },

  // ── EXTERIOR ─────────────────────────────────
  {
    category: "Exterior — Siding & Trim",
    icon: "fa-house",
    items: [
      {
        name: "James Hardie HardiePanel (Board & Batten)",
        spec: "HardiePanel Vertical Siding, smooth or cedarmill texture",
        qty: "~900 sq ft + 10% waste = ~990 sq ft",
        cost: 850,
        status: "needed",
        brands: [
          { name: "James Hardie HardiePanel", url: "https://www.jameshardie.com" }
        ],
        notes: "The 'board' in Board & Batten. Order smooth or CedarMill texture. Comes primed — needs top coat with Sherwin-Williams Duration or similar. Available in ColorPlus if you want factory-painted (costs more, lasts longer, better warranty)."
      },
      {
        name: "James Hardie HardieTrim Boards (Battens)",
        spec: "5/4×2\" or 5/4×4\" HardieTrim, smooth",
        qty: "Per linear footage of batten spacing (~1 batten per 8–12\")",
        cost: 800,
        status: "needed",
        brands: [
          { name: "James Hardie HardieTrim", url: "https://www.jameshardie.com" }
        ],
        notes: "The 'batten' in Board & Batten — vertical trim strips applied over HardiePanel joints. Spacing is typically 8–12\" on center. Confirm with builder what spacing looks best on your elevation."
      },
      {
        name: "Exterior Trim — Corner Boards, Fascia, Soffits",
        spec: "HardieTrim or PVC trim",
        qty: "Per lineal footage — builder to quantify",
        cost: 1200,
        status: "needed",
        brands: [
          { name: "James Hardie HardieTrim", url: "https://www.jameshardie.com" },
          { name: "AZEK PVC Trim (for soffits)", url: "https://www.azek.com" }
        ],
        notes: "Corners, fascia board, soffits. PVC soffit panels at carport and porch eaves are low-maintenance and don't rot. Hardie for vertical trim, PVC for soffits is a common combo."
      },
      {
        name: "Exterior Paint — Zero-VOC, Earth Tone",
        spec: "100% Acrylic exterior, zero-VOC",
        qty: "~2 gallons per 100 sq ft = ~18 gallons (body + primer)",
        cost: 1170,
        status: "needed",
        brands: [
          { name: "Sherwin-Williams Emerald Exterior", url: "https://www.sherwin-williams.com" },
          { name: "Benjamin Moore Aura Exterior", url: "https://www.benjaminmoore.com" }
        ],
        notes: "SW Emerald and BM Aura are top-tier zero-VOC exterior lines. Warm Clay or Sage Green palette discussed — SW 'Whole Wheat', 'Birdseye Maple', or 'Sage' are good starting points. Prime bare Hardie with SW Extreme Bond Primer first."
      },
      {
        name: "Porch Columns",
        spec: "6×6 wrapped fiberglass or smooth cellular PVC columns, tapered",
        qty: "4 (front porch per plans)",
        cost: 1400,
        status: "needed",
        brands: [
          { name: "Fypon Urethane Columns", url: "https://www.fypon.com" },
          { name: "Turncraft Poly-Classic", url: "https://www.turncraft.com" }
        ],
        notes: "Plans show 4 covered front porch columns. PVC/fiberglass wrap over structural post won't rot or need paint touch-ups. Confirm column height with builder based on porch roof pitch."
      }
    ]
  },

  // ── WINDOWS & DOORS ──────────────────────────
  {
    category: "Windows & Doors",
    icon: "fa-door-open",
    items: [
      {
        name: "Comfort View Windows — BFS Quote",
        spec: "Comfort View white, Lowe 366 glass, 4/1 grids, 7/8 GBG, no jambs/screens. Sizes: 5×2030 SH, 4×2860 SH, 1×2050 Twin SH (tempered), 4×3060 SH, 2×3060 Twin SH",
        qty: "16 units (15 openings — twin units share opening)",
        cost: 3655,
        status: "needed",
        brands: [
          { name: "BFS Quote 87515008 (4/22/26) — $3,655.33", url: "" }
        ],
        notes: "QUOTED: BFS Comfort View 16 units — $3,323.03 + tax = $3,655.33. Lowe 366 triple-silver is the Zone 3 spec we want (low SHGC). Down ~$1,600 from prior estimate. Compare-shop to Andersen 400 / Pella 250 if you want fiberglass-clad wood interior."
      },
      {
        name: "Front Entry Double Door — BFS Quote",
        spec: "Fiberglass smooth direct-glaze (Nova45) fullview Lowe, 5/0×8/0, 1-lite, T-astragal w/ head & foot bolts, 6-9/16\" primed jambs, primed 180 brick mold, black hinges/sill, RH active, dbl bore, inswing",
        qty: "1 unit",
        cost: 2196,
        status: "needed",
        brands: [
          { name: "BFS Quote 87489258 (4/21/26) — $2,195.80", url: "" }
        ],
        notes: "QUOTED: Fiberglass double door 5/0×8/0 fullview Lowe, $2,195.80 ea. Quote is on Phoenix line. Quote total for all 4 ext doors = $3,743.23 incl. tax."
      },
      {
        name: "Rear & Side Exterior Doors — BFS Quote",
        spec: "1× steel 6-panel 3/0×6/8 RH ($335.71), 1× steel fullview 1-lite Lowe LH ($478.57), 1× fiberglass mahogany 6-panel 3/0×6/8 LH ($392.86) — all 4-9/16\" primed jambs, black hinges/sill, dbl bore, inswing",
        qty: "3 units",
        cost: 1207,
        status: "needed",
        brands: [
          { name: "BFS Quote 87489258 (4/21/26)", url: "" }
        ],
        notes: "QUOTED: 3 single-leaf doors @ BFS = $1,207.14. Combined w/ front double door = $3,743.23 incl. tax. Phoenix line."
      },
      {
        name: "Interior Prehung Doors",
        spec: "Prehung, 1-3/8\" solid or hollow core, 6-panel or flat",
        qty: "12 units",
        cost: 1800,
        status: "needed",
        brands: [
          { name: "Masonite (big box)", url: "https://www.masonite.com" },
          { name: "Steves & Sons (solid wood upgrade)", url: "https://www.stevedoor.com" }
        ],
        notes: "Standard hollow-core for closets/utility. Consider solid-core for bedrooms (much better sound isolation — pairs well with the Safe'n'Sound insulation). Steves & Sons offers solid wood prehung if upgrading."
      }
    ]
  },

  // ── ELECTRICAL ───────────────────────────────
  {
    category: "Electrical",
    icon: "fa-bolt",
    items: [
      {
        name: "MC Cable (Metal-Clad Shielded Wiring)",
        spec: "12/2 and 14/2 MC aluminum-sheathed cable",
        qty: "Per electrical plan (builder/electrician to quantify)",
        cost: 3000,
        status: "needed",
        brands: [
          { name: "Southwire MC Cable", url: "https://www.southwire.com" },
          { name: "AFC Cable Systems", url: "https://www.afcwire.com" }
        ],
        notes: "MC cable (metal clad) is the low-tox choice — aluminum sheath acts as both ground and EMF shield vs standard NM-B (Romex). Costs more but this is a core low-tox spec. Southwire and AFC are the two main suppliers. Your electrician should be familiar with it."
      },
      {
        name: "200A Main Electrical Panel",
        spec: "200A, 40-space or 60-space load center",
        qty: "1",
        cost: 300,
        status: "needed",
        brands: [
          { name: "Square D QO Series", url: "https://www.se.com" },
          { name: "Siemens PL Series", url: "https://www.siemens.com" }
        ],
        notes: "Square D QO is the go-to quality panel — copper bus bars, solid breakers. Avoid Eaton CH if possible. Get at least 40 spaces; 60-space is worth the small upcharge for future circuits."
      },
      {
        name: "Cat6 Ethernet Cable",
        spec: "Cat6 CMR (riser-rated) or CMP (plenum) solid copper",
        qty: "~2,000 ft (all rooms, home run to panel location)",
        cost: 600,
        status: "needed",
        brands: [
          { name: "Belden DataTwist 350", url: "https://www.belden.com" },
          { name: "Monoprice Cat6 (budget)", url: "https://www.monoprice.com" }
        ],
        notes: "Run to every room, both floors, plus exterior camera/access points. All home-run to a central patch panel in the mechanical/utility room. Belden is spec-grade; Monoprice is fine for residential budget. Pull while walls are open — cost to add later is 10× more."
      },
      {
        name: "Structured Media Center / Patch Panel",
        spec: "16-port or 24-port patch panel + enclosure",
        qty: "1",
        cost: 200,
        status: "needed",
        brands: [
          { name: "Leviton Structured Media Center", url: "https://www.leviton.com" },
          { name: "Monoprice Patch Panel", url: "https://www.monoprice.com" }
        ],
        notes: "Central termination point for all Cat6 runs. Install in mechanical room or dedicated closet. Add a small UPS to keep network up during brief power outages."
      },
      {
        name: "Electrical Boxes & Devices",
        spec: "Metal boxes (not plastic) for MC cable",
        qty: "Per electrical plan",
        cost: 500,
        status: "needed",
        brands: [
          { name: "Raco / Hubbell", url: "https://www.hubbell.com" }
        ],
        notes: "MC cable requires metal boxes (no plastic cut-in boxes). Specify to electrician upfront."
      }
    ]
  },

  // ── PLUMBING ─────────────────────────────────
  {
    category: "Plumbing",
    icon: "fa-droplet",
    items: [
      {
        name: "PEX-A Tubing — Supply Lines",
        spec: "1/2\" and 3/4\" PEX-A, white or red/blue (not PEX-B or PEX-C)",
        qty: "Per plumbing plan",
        cost: 1500,
        status: "needed",
        brands: [
          { name: "Uponor AquaPEX (PEX-A)", url: "https://www.uponor.com" },
          { name: "Watts PEX-A", url: "https://www.watts.com" }
        ],
        notes: "PEX-A specifically — not PEX-B (SharkBite), not PEX-C. PEX-A uses expansion fittings (not crimp), is more flexible, self-heals kinks, and has fewer fittings = fewer leak points. Uponor (Wirsbo) is the gold standard for PEX-A. Use Uponor ProPEX fittings only."
      },
      {
        name: "Copper Pipe — Supply (if choosing copper over PEX-A)",
        spec: "Type L copper, 1/2\" and 3/4\"",
        qty: "Per plumbing plan",
        cost: 2800,
        status: "needed",
        brands: [],
        notes: "Copper is the other low-tox choice for supply. Type L (medium wall) is standard for residential. More expensive and requires soldering skill. PEX-A is easier to install and equally inert — builder will have a preference."
      },
      {
        name: "Tankless Propane Water Heater",
        spec: "Whole-house, min 8.0 GPM at 35°F rise",
        qty: "1",
        cost: 1400,
        status: "needed",
        brands: [
          { name: "Rinnai RU Series", url: "https://www.rinnai.us" },
          { name: "Navien NPE-A2 Series", url: "https://www.navieninc.com" }
        ],
        notes: "Size for 2 simultaneous fixtures (shower + sink). Rinnai RU199 or Navien NPE-240A are solid whole-house units. Rinnai has better AL service network. Mount on interior wall, vent through exterior (not in unconditioned attic). Gas line must be 3/4\" minimum."
      },
      {
        name: "Well Pressure Tank",
        spec: "Bladder-type, 44-gallon minimum",
        qty: "1",
        cost: 350,
        status: "needed",
        brands: [
          { name: "Amtrol Well-X-Trol", url: "https://www.amtrol.com" },
          { name: "Pentair Sta-Rite", url: "https://www.pentair.com" }
        ],
        notes: "Amtrol Well-X-Trol WX-250 (44 gal) is the standard recommendation. Larger tank = fewer pump cycles = longer pump life. Install near pressure switch in mechanical room."
      },
      {
        name: "Whole-House Water Filtration",
        spec: "Sediment + iron/manganese filter + carbon + UV sterilizer",
        qty: "1 system",
        cost: 2500,
        status: "needed",
        brands: [
          { name: "US Water Systems", url: "https://www.uswatersystems.com" },
          { name: "Aquasana Whole House", url: "https://www.aquasana.com" },
          { name: "Pelican Water", url: "https://www.pelicanwater.com" }
        ],
        notes: "AL rural well water often has iron, sediment, and bacteria. Start with a water test BEFORE ordering a system — test for iron, manganese, hardness, pH, and coliform. US Water Systems will build a custom system around your test results. Budget ~$1,500–$3,500 depending on results."
      },
      {
        name: "ABS or PVC Drain-Waste-Vent (DWV) Pipe",
        spec: "3\" and 4\" ABS or Schedule 40 PVC",
        qty: "Per plumbing plan",
        cost: 800,
        status: "needed",
        brands: [],
        notes: "DWV plastic is fine from a health standpoint since it's drain-only (no drinking water contact). ABS is common in the Southeast. Install in walls before framing closes up."
      }
    ]
  },

  // ── HVAC & MECHANICAL ────────────────────────
  {
    category: "HVAC & Mechanical",
    icon: "fa-wind",
    items: [
      {
        name: "Central AC — 3-Ton Condenser + Coil",
        spec: "14+ SEER2, R-410A or R-32, 36,000 BTU, sized for 1,114 sq ft Zone 3A",
        qty: "1 system",
        cost: 3200,
        status: "needed",
        brands: [
          { name: "Carrier Performance Series", url: "https://www.carrier.com" },
          { name: "Lennox ML14XC1", url: "https://www.lennox.com" },
          { name: "Trane XR14", url: "https://www.trane.com" }
        ],
        notes: "For Zone 3A (hot-humid, cooling-dominated), AC is the primary load. 3-ton is right for 1,114 sq ft with good insulation. Pair with high-efficiency air handler/coil. Carrier, Lennox, and Trane all have strong Alabama dealer networks. Contractor pricing typically includes air handler coil."
      },
      {
        name: "Propane Gas Furnace — 80,000 BTU",
        spec: "80% AFUE minimum, two-stage preferred, LP/propane",
        qty: "1",
        cost: 900,
        status: "needed",
        brands: [
          { name: "Carrier 59SC5 (two-stage)", url: "https://www.carrier.com" },
          { name: "Lennox ML193 (LP)", url: "https://www.lennox.com" },
          { name: "Rheem Classic Plus", url: "https://www.rheem.com" }
        ],
        notes: "Propane furnace pairs with the AC unit (split system). 80,000 BTU is sufficient for 1,114 sq ft in Alabama — winters are mild. Two-stage is more efficient and quieter than single-stage. Confirm LP conversion kit included. Match brand to the AC unit for warranty coverage."
      },
      {
        name: "Air Handler + Evaporator Coil",
        spec: "Matching air handler for split system, MERV-8 filter rack",
        qty: "1",
        cost: 1100,
        status: "needed",
        brands: [
          { name: "Match to condenser brand (Carrier/Lennox/Trane)", url: "" }
        ],
        notes: "Must match condenser brand and tonnage for warranty and efficiency ratings. Install in mechanical room or interior closet — never in unconditioned attic space (AL summers will destroy efficiency). Include a 4\" MERV-8 or MERV-11 filter rack."
      },
      {
        name: "Ductwork — Supply + Return (Sheet Metal)",
        spec: "Galvanized sheet metal trunk + flex duct branches, mastic-sealed",
        qty: "1,114 sq ft main floor",
        cost: 2200,
        status: "needed",
        brands: [],
        notes: "Sheet metal trunk lines with flex duct to registers. Mastic-seal all joints — duct tape is not code-compliant and fails over time. Right-size supply registers for each room (Manual J or D calculation). Run during framing before insulation. Seal and insulate any duct in unconditioned space with R-8 duct wrap."
      },
      {
        name: "Supply Registers + Return Grilles",
        spec: "White steel registers, floor or ceiling, sized by CFM",
        qty: "~15 supply + 3 returns",
        cost: 350,
        status: "needed",
        brands: [
          { name: "Hart & Cooley (standard)", url: "https://www.hartandcooley.com" },
          { name: "Accord (budget)", url: "" }
        ],
        notes: "One return per zone minimum; ideally one per bedroom (keeps doors from pressurizing). Size supply registers at 100 CFM per 100 sq ft as starting point."
      },
      {
        name: "EPA-Certified Wood Burning Stove",
        spec: "EPA Step 2 certified, 2.0 g/hr or less, 60,000–80,000 BTU",
        qty: "1",
        cost: 1500,
        status: "needed",
        brands: [
          { name: "Blaze King Ashford 25.4", url: "https://www.blazeking.com" },
          { name: "Hearthstone Heritage", url: "https://www.hearthstonestoves.com" },
          { name: "Quadra-Fire Discovery III", url: "https://www.quadrafire.com" }
        ],
        notes: "Backup heat and ambiance. Blaze King has the longest burn times (catalytic combustor). Install on a code-compliant hearth pad; stovepipe through ceiling with double-wall insulated Class A flue."
      },
      {
        name: "Double-Wall Insulated Chimney Flue (Class A)",
        spec: "6\" or 8\" diameter, Class A rated, 15–20 ft",
        qty: "1 run",
        cost: 1200,
        status: "needed",
        brands: [
          { name: "DuraVent DuraPlus", url: "https://www.duravent.com" },
          { name: "Simpson Dura-Tech", url: "https://www.metalbestos.com" }
        ],
        notes: "Double-wall insulated (not single-wall black stovepipe) for ceiling/roof penetration. 2\" clearance from combustibles. Rain cap + spark arrestor required."
      }
    ]
  },

  // ── INTERIOR FINISHES ────────────────────────
  {
    category: "Interior Finishes",
    icon: "fa-paintbrush",
    items: [
      {
        name: "Shiplap — Solid Wood (Living Areas & Hallways)",
        spec: "1×6 or 1×8 tongue & groove shiplap, poplar or pine, primed",
        qty: "~2,000 sq ft of wall area",
        cost: 7000,
        status: "needed",
        brands: [
          { name: "Eucaboard / local mill (solid wood)", url: "" },
          { name: "Metrie Shiplap Profile", url: "https://www.metrie.com" }
        ],
        notes: "Solid wood shiplap (no MDF or composite — those off-gas formaldehyde). Poplar is excellent — stable, tight grain, takes paint well, low VOC by nature. Pine is cheaper but knottier. Avoid 'shiplap-style' MDF paneling sold at big box stores. Ask local lumber yard for primed poplar boards."
      },
      {
        name: "Solid Wood Cabinets — Kitchen",
        spec: "Solid wood box and door faces, formaldehyde-free, low-VOC finish",
        qty: "Per kitchen layout (builder to specify)",
        cost: 8000,
        status: "needed",
        brands: [
          { name: "Wellborn Cabinet (SE-based)", url: "https://www.wellborncabinet.com" },
          { name: "Fabuwood (all-wood, semi-custom)", url: "https://www.fabuwood.com" },
          { name: "Local cabinet shop (ideal)", url: "" }
        ],
        notes: "AVOID IKEA and Home Depot stock cabinets — particleboard and formaldehyde-based glues. Wellborn is Alabama-based and builds solid wood boxes. Fabuwood 'Nexus' line is all-wood (no particleboard) at a reasonable price. Best option: local custom cabinet shop — you control the materials and finish."
      },
      {
        name: "Solid Wood Cabinets — Bathrooms (×3)",
        spec: "Solid wood vanity base, 30\" or 36\" wide per bath",
        qty: "3 vanity bases",
        cost: 2400,
        status: "needed",
        brands: [
          { name: "Wellborn Cabinet", url: "https://www.wellborncabinet.com" },
          { name: "Strasser Woodenworks", url: "https://www.strasserwood.com" }
        ],
        notes: "Strasser makes solid wood bath vanities specifically — good option if going semi-custom. Match finish to kitchen for continuity."
      },
      {
        name: "Quartz Countertops — Kitchen & Baths",
        spec: "Engineered quartz, 3cm thick",
        qty: "~90 sq ft total (kitchen + 3 baths)",
        cost: 5850,
        status: "needed",
        brands: [
          { name: "Silestone by Cosentino", url: "https://www.silestone.com" },
          { name: "Caesarstone", url: "https://www.caesarstone.com" },
          { name: "MSI Q Premium Quartz", url: "https://www.msisurfaces.com" }
        ],
        notes: "Quartz is non-porous, no sealing needed, very low VOC vs natural stone. Silestone is well-regarded; MSI is good value. Get samples to compare in the actual light conditions of your kitchen."
      },
      {
        name: "Solid Hardwood Flooring",
        spec: "3/4\" solid hardwood, 3.25\" or 5\" wide plank, site-finished",
        qty: "~700 sq ft (living, dining, bedrooms)",
        cost: 3850,
        status: "needed",
        brands: [
          { name: "Mullican Hardwoods", url: "https://www.mullicanflooring.com" },
          { name: "Bruce Hardwood (Puregrade)", url: "https://www.bruce.com" },
          { name: "Local mill / unfinished select oak", url: "" }
        ],
        notes: "Site-finished solid hardwood is the best low-tox option — you control the finish (use zero-VOC finish like Rubio Monocoat or Bona Traffic HD). White oak or red oak are durable and widely available. Mullican makes quality domestic hardwood; unfinished oak from a local mill is cost-effective."
      },
      {
        name: "Zero-VOC Floor Finish (for site-finished hardwood)",
        spec: "Water-based or natural oil, zero-VOC, matte or satin",
        qty: "~3 gallons (3 coats on 700 sq ft)",
        cost: 450,
        status: "needed",
        brands: [
          { name: "Rubio Monocoat Oil Plus 2C", url: "https://www.rubiomonocoat.com" },
          { name: "Bona Traffic HD", url: "https://www.bona.com" }
        ],
        notes: "Rubio Monocoat is a plant-based single-coat penetrating oil — zero VOC, minimal odor, no offgassing after cure. Bona Traffic HD is a waterborne urethane — zero VOC certified, very durable. Both are significantly better than oil-based polyurethane (high VOC, offgasses for weeks)."
      },
      {
        name: "Porcelain or Ceramic Tile — Bathrooms & Laundry",
        spec: "Porcelain floor tile, rectified edges, 12×24\" or 18×18\"",
        qty: "~250 sq ft",
        cost: 875,
        status: "needed",
        brands: [
          { name: "MSI Stone (wide selection)", url: "https://www.msisurfaces.com" },
          { name: "Dal-Tile", url: "https://www.daltile.com" }
        ],
        notes: "Porcelain is non-porous and no-VOC — ideal for bathrooms. Rectified tiles (machine-cut edges) allow tighter grout lines. Use unsanded grout for tight joints. Low-VOC tile adhesive/mortar: Laticrete PERMACOLOR Select."
      },
      {
        name: "Zero-VOC Interior Paint",
        spec: "100% acrylic latex, zero-VOC (0 g/L), flat and eggshell sheens",
        qty: "~12–15 gallons depending on shiplap coverage",
        cost: 1050,
        status: "needed",
        brands: [
          { name: "Sherwin-Williams Harmony (zero-VOC)", url: "https://www.sherwin-williams.com" },
          { name: "Benjamin Moore Natura", url: "https://www.benjaminmoore.com" },
          { name: "AFM Safecoat (strictest low-tox line)", url: "https://www.afmsafecoat.com" }
        ],
        notes: "SW Harmony and BM Natura are zero-VOC certified and widely available. AFM Safecoat is the strictest option — made specifically for chemically sensitive individuals. Specify zero-VOC tints as well (many tints add VOCs even to a zero-VOC base)."
      },
      {
        name: "Incandescent / Halogen Light Fixtures",
        spec: "A-19 incandescent or halogen, standard E26 base",
        qty: "Per room count (main floor + basement)",
        cost: 2000,
        status: "needed",
        brands: [
          { name: "Westinghouse Lighting (incandescent-compatible)", url: "https://www.westinghouselighting.com" },
          { name: "Satco Products", url: "https://www.satco.com" }
        ],
        notes: "Specify fixtures with E26 standard base (not GU10 or LED-only) so you can use incandescent or halogen bulbs. Full-spectrum incandescent bulbs (3,000K color temp, high CRI) produce the warmest light with zero flicker. Stock up on bulbs — standard incandescents are being phased out of retail. Bulbrite and GE still sell them."
      },
      {
        name: "Magnesium Oxide (MgO) Board — Drywall Alternative",
        spec: "1/2\" or 5/8\" MgO board, fire-rated, mold-resistant",
        qty: "~4,500 sq ft (walls + ceilings, main floor + basement)",
        cost: 9000,
        status: "needed",
        brands: [
          { name: "Falcon Board (MgO)", url: "https://www.falconpanel.com" },
          { name: "MagMatrix Structural MgO", url: "https://www.magmatrix.com" },
          { name: "Magnastruct by Elemag", url: "https://www.elemagbuilding.com" }
        ],
        notes: "MgO board is a near drop-in drywall replacement — same installation (screws, tape, mud), similar weight. Key advantages for Alabama: completely mold-resistant, termite-resistant, fireproof, no VOCs, no formaldehyde. Roughly $1.50–2.50/sq ft vs $0.50–0.80 for standard drywall, but eliminates mold risk in high-humidity environment. Especially good for basement walls. Cuts with standard drywall tools. Available through specialty distributors — call Falcon Board for nearest stocking dealer in Alabama."
      },
      {
        name: "Pine Shiplap — Budget Natural Wood (Accent Walls)",
        spec: "1×6 or 1×8 pine, shiplap or T&G profile, kiln-dried, unfinished",
        qty: "~500–800 sq ft (accent walls, mudroom, specific rooms)",
        cost: 1300,
        status: "needed",
        brands: [
          { name: "84 Lumber (AL locations)", url: "https://www.84lumber.com" },
          { name: "Builders FirstSource (local)", url: "https://www.buildersfirstsource.com" },
          { name: "Local Alabama lumber yard / sawmill", url: "" }
        ],
        notes: "Budget-friendly natural wood shiplap — doesn't need to be expensive, just real wood. Kiln-dried #2 pine shiplap runs ~$1.50–2.50/sq ft at 84 Lumber or local yards. Far cheaper than poplar ($3–5/sq ft) with the same look once painted or stained. Local sawmills in central Alabama often sell t&g pine boards cheaper than big box. Seal with zero-VOC primer before painting. Avoid 'shiplap-look' MDF paneling — it off-gasses formaldehyde."
      },
      {
        name: "PureBond Hardwood Plywood — Cabinets, Shelving & Built-ins",
        spec: "3/4\" PureBond hardwood plywood, soy-based NAF adhesive",
        qty: "~30–40 sheets (cabinet boxes, shelving, built-ins)",
        cost: 2275,
        status: "needed",
        brands: [
          { name: "Columbia Forest Products PureBond", url: "https://www.columbiaforestproducts.com" },
          { name: "Available at Home Depot (stocked)", url: "https://www.homedepot.com" }
        ],
        notes: "PureBond by Columbia Forest Products uses a soy-based adhesive — no added formaldehyde (NAF certified). This is a direct drop-in for standard plywood for cabinet boxes, closet shelving, and built-ins, at a comparable price (~$55–70/sheet at Home Depot). Standard plywood uses urea-formaldehyde glue which off-gasses for years. PureBond is stocked in most Home Depot stores in Alabama — no special order required. Use for anything you'd normally use 3/4\" plywood for inside the house."
      }
    ]
  },

  // ── APPLIANCES ───────────────────────────────
  {
    category: "Appliances",
    icon: "fa-utensils",
    items: [
      {
        name: "Propane Freestanding Range (5-Burner)",
        spec: "36\" or 30\" propane, cast iron grates, convection oven optional",
        qty: "1",
        cost: 1800,
        status: "needed",
        brands: [
          { name: "Thor Kitchen (36\", budget pro-style)", url: "https://www.thorkitchen.com" },
          { name: "Cosmo Commercial-Style", url: "https://www.cosmoappliances.com" },
          { name: "Zline Ranges", url: "https://www.zlinekitchen.com" }
        ],
        notes: "Propane conversion kits come with most ranges — confirm propane-ready out of box. Thor Kitchen and Zline are popular pro-style ranges at a fraction of Wolf/Viking prices. Cast iron grates and sealed burners are easier to clean."
      },
      {
        name: "Range Hood (Vented to Exterior)",
        spec: "600 CFM minimum, exterior-vented only",
        qty: "1",
        cost: 600,
        status: "needed",
        brands: [
          { name: "Zline Wall Mount Hood", url: "https://www.zlinekitchen.com" },
          { name: "Cosmo Island Hood", url: "https://www.cosmoappliances.com" }
        ],
        notes: "MUST vent to exterior — not recirculating. Recirculating hoods just redistribute cooking fumes. Minimum 600 CFM for a gas range. Size hood to be 3\" wider than range on each side if possible. Run ductwork before drywall."
      },
      {
        name: "Refrigerator",
        spec: "Counter-depth, 30\" wide, bottom-freezer or French door",
        qty: "1",
        cost: 1500,
        status: "needed",
        brands: [
          { name: "LG LRMVS3006S (stainless)", url: "https://www.lg.com" },
          { name: "GE Profile Series", url: "https://www.geappliances.com" }
        ],
        notes: "Counter-depth (24\" deep) keeps the kitchen from feeling cramped. Bottom-freezer puts fresh food at eye level. Avoid models with too many 'smart' features — more components = more to break."
      },
      {
        name: "Dishwasher",
        spec: "24\" standard width, stainless tub",
        qty: "1",
        cost: 700,
        status: "needed",
        brands: [
          { name: "Bosch 500 Series", url: "https://www.bosch-home.com" },
          { name: "Miele G 5000 Series", url: "https://www.mieleusa.com" }
        ],
        notes: "Bosch is the reliability standard for dishwashers. The 500 series is the sweet spot — quiet (44 dBA), stainless tub, no plastic components touching food. Miele is premium (quietest, longest-lasting) if budget allows."
      }
    ]
  }

];

// ── FRAMING TAKEOFF ──────────────────────────────────────────────────────────
// Quantities based on: 42'×26' main body, 9' ceilings, 2×6 ext / 2×4 int walls,
// 8:12 pitch roof, 18" overhang. Basement = concrete shell only, unfinished.
// Includes standard waste factors. Verify with builder before ordering.
const TAKEOFF = [
  {
    trade: "Foundation & Concrete",
    icon: "fa-layer-group",
    note: "Unfinished basement shell — poured concrete walls + slab",
    items: [
      { desc: "Ready-mix — Continuous Footings", spec: "3,000 PSI, 24\"×16\", 136 LF perimeter", qty: "14 cu yd", cost: 2100 },
      { desc: "Ready-mix — Basement Walls", spec: "3,000 PSI, 12\" thick × 10' high × 136 LF", qty: "51 cu yd", cost: 7650 },
      { desc: "Ready-mix — Basement Floor Slab", spec: "4\" slab, 1,114 sq ft, unfinished", qty: "14 cu yd", cost: 2100 },
      { desc: "CMU Block — Alternate Bid", spec: "8\"×8\"×16\" standard CMU, 136 LF × 15 courses", qty: "1,530 block", cost: 2754 },
      { desc: "Mortar, Block Fill, #4 Rebar at Corners", spec: "If CMU block option chosen", qty: "1 lot", cost: 800 },
      { desc: "Anchor Bolts — J-Bolts 1/2\"×10\"", spec: "Every 6' around perimeter + breaks", qty: "80 each", cost: 80 },
    ]
  },
  {
    trade: "Floor System",
    icon: "fa-table-cells-large",
    note: "Main floor deck over basement — I-joists on center beam",
    items: [
      { desc: "AdvanTech Subfloor — 23/32\" T&G", spec: "4×8 sheets, tongue & groove edges", qty: "39 sheets", cost: 1560 },
      { desc: "LVL Rim Board — 1.75\"×11.25\"", spec: "Full perimeter rim board", qty: "136 LF", cost: 1088 },
      { desc: "Engineered I-Joists — 11-7/8\" BCI 60", spec: "16\" OC, main floor span, avg 14' length", qty: "45 each", cost: 1733 },
      { desc: "LVL Center Beam — 3.5\"×11.25\"", spec: "Center bearing beam, 42' total run", qty: "42 LF", cost: 504 },
      { desc: "PT Sill Plates — 2×6", spec: "UC4A treated, .40 retention", qty: "136 LF", cost: 245 },
      { desc: "Sill Seal Foam Tape — 3.5\"", spec: "Between sill plate and concrete", qty: "136 LF", cost: 55 },
    ]
  },
  {
    trade: "Exterior Wall Framing — 2×6",
    icon: "fa-grip-lines-vertical",
    note: "9' ceiling height, 2×6 walls, 16\" OC — main floor only",
    items: [
      { desc: "2×6×10' Studs — Exterior Walls", spec: "SPF #2, field studs + corners + opening studs", qty: "230 pcs", cost: 1840 },
      { desc: "2×6×8' Bottom Plates", spec: "SPF #2, 136 LF perimeter + waste", qty: "18 pcs", cost: 99 },
      { desc: "2×6×8' Double Top Plates", spec: "SPF #2, 272 LF total (2 layers)", qty: "38 pcs", cost: 209 },
      { desc: "2×6×8' Blocking / Fire Stops", spec: "SPF #2, mid-height in all exterior bays", qty: "20 pcs", cost: 110 },
      { desc: "LVL Headers — 1.75\"×9.25\" Doubled", spec: "15 window openings + 3 exterior doors", qty: "~174 LF", cost: 1740 },
    ]
  },
  {
    trade: "Interior Wall Framing — 2×4",
    icon: "fa-bars",
    note: "Main floor only — basement left open, no interior framing",
    items: [
      { desc: "2×4×9' Studs — Interior (104-5/8\" precut)", spec: "SPF #2, ~170 LF of interior partitions", qty: "250 pcs", cost: 1250 },
      { desc: "2×4×8' Plates — Interior", spec: "SPF #2, bottom + double top = 510 LF", qty: "65 pcs", cost: 293 },
      { desc: "2×4×8' Backing & Blocking", spec: "Cabinet backing, grab bars, misc", qty: "20 pcs", cost: 90 },
      { desc: "Interior Door Headers — Doubled 2×6", spec: "12 interior door openings, misc pass-throughs", qty: "10 pcs", cost: 150 },
    ]
  },
  {
    trade: "Roof System — Pre-Engineered Trusses",
    icon: "fa-house-chimney",
    note: "8:12 pitch, 18\" overhang — trusses ordered from manufacturer",
    items: [
      { desc: "Roof Trusses — Main Body (26' span)", spec: "8:12 pitch, gable ends, 24\" OC, engineered", qty: "23 trusses", cost: 5750 },
      { desc: "Roof Trusses — Carport (26' span)", spec: "8:12 pitch to match main, 24\" OC", qty: "14 trusses", cost: 3500 },
      { desc: "Gable End Framing — 2×4 Studs", spec: "Fill gable triangle at each gable end", qty: "24 pcs", cost: 108 },
      { desc: "2×8 Fascia / Rake Boards", spec: "S4S, eaves + rake boards all four sides", qty: "200 LF", cost: 400 },
      { desc: "Continuous Ridge Vent", spec: "Both ridges — main body + carport", qty: "70 LF", cost: 210 },
      { desc: "AccuVent Soffit Baffles", spec: "Between truss bays at eaves, ensure airflow", qty: "50 each", cost: 100 },
    ]
  },
  {
    trade: "Sheathing — Walls & Roof Deck",
    icon: "fa-table-cells",
    note: "ZIP System recommended for walls — eliminates separate house wrap",
    items: [
      { desc: "ZIP System Wall Panels — 7/16\"", spec: "4×8, integrated WRB (recommended)", qty: "35 sheets", cost: 1225 },
      { desc: "OSB Wall Sheathing — 7/16\" (alt to ZIP)", spec: "4×8 standard structural OSB", qty: "35 sheets", cost: 630 },
      { desc: "Tyvek HomeWrap (only if OSB)", spec: "9' roll — skip if using ZIP System", qty: "2 rolls", cost: 180 },
      { desc: "LP TechShield Roof Deck — 7/16\"", spec: "Foil-faced OSB, radiant barrier, all roof areas", qty: "88 sheets", cost: 3696 },
      { desc: "ZIP Tape 3.75\" (for ZIP wall seams)", spec: "Roll, if using ZIP System panels", qty: "6 rolls", cost: 120 },
    ]
  },
  {
    trade: "Rear Deck — 497 sq ft",
    icon: "fa-sun",
    note: "Covered rear deck per plans, walkout from basement level",
    items: [
      { desc: "PT Deck Joists + Rim — 2×10", spec: "Ground Contact .40, 16\" OC", qty: "280 LF", cost: 980 },
      { desc: "PT 6×6 Posts — Ground Contact", spec: ".60 retention UC4B, 10' length", qty: "8 each", cost: 480 },
      { desc: "5/4×6 PT Deck Boards", spec: "Pressure-treated pine deck boards", qty: "572 sq ft", cost: 1716 },
      { desc: "PT Ledger Board — 2×10", spec: "Lag-bolted to house rim board", qty: "26 LF", cost: 91 },
      { desc: "Deck Hardware Kit", spec: "LUS28 hangers, ABA66 post bases, carriage bolts", qty: "1 lot", cost: 350 },
      { desc: "Deck Stairs + Code Railing", spec: "PT stringers, 4×4 posts, top/bottom rail", qty: "1 lot", cost: 1200 },
    ]
  },
  {
    trade: "Hardware & Fasteners",
    icon: "fa-screwdriver-wrench",
    note: "Rough framing fasteners",
    items: [
      { desc: "Framing Nails — 16d Sinker 3.25\"", spec: "30 lb box, main framing", qty: "5 boxes", cost: 225 },
      { desc: "Framing Nails — 10d Sinker 3\"", spec: "30 lb box, toenailing + cripples", qty: "3 boxes", cost: 135 },
      { desc: "Simpson H2.5A Hurricane Ties", spec: "Every truss-to-top-plate connection", qty: "50 each", cost: 100 },
      { desc: "Simpson LUS28 I-Joist Hangers", spec: "Both ends of each floor joist", qty: "90 each", cost: 135 },
      { desc: "Subfloor Adhesive — PL Premium", spec: "28 oz tubes, T&G subfloor glue", qty: "20 tubes", cost: 160 },
      { desc: "LedgerLOK + Structural Screws", spec: "Deck ledger attachment + misc structural", qty: "1 lot", cost: 120 },
    ]
  }
];

const BUDGET_CATEGORIES = [
  {
    id: 1,
    name: "Site & Permits",
    allocated: 5500,
    notes: "Health dept, county permit, engineering, survey, house plans",
    items: [
      { name: "Building permit fee", cost: 800, notes: "Shelby County estimate" },
      { name: "Health department approval", cost: 400, notes: "Required for septic/well on rural lot" },
      { name: "Engineering stamp / structural review", cost: 1200, notes: "Required for permit submission" },
      { name: "Boundary + topographic survey", cost: 900, notes: "Needed before permit and loan" },
      { name: "House plan set (drafting/purchase)", cost: 1000, notes: "If buying stock plans; higher for custom" },
      { name: "Miscellaneous permit fees", cost: 200, notes: "Zoning, impact, inspection scheduling" },
    ]
  },
  {
    id: 2,
    name: "Site Prep",
    allocated: 6900,
    notes: "Clearing, silt fence, equipment, final grade, seed/hay, porta-potty",
    items: [
      { name: "Land clearing — trees and brush", cost: 3000, notes: "Varies widely by lot density" },
      { name: "Silt fence installation", cost: 600, notes: "Erosion control, typically required by county" },
      { name: "Equipment delivery / mobilization", cost: 800, notes: "" },
      { name: "Final grade and smooth site", cost: 1500, notes: "After construction complete" },
      { name: "Seeding + hay (erosion control)", cost: 600, notes: "Post-grade to prevent runoff" },
      { name: "Porta-potty rental (6 months)", cost: 400, notes: "" },
    ]
  },
  {
    id: 3,
    name: "Foundation & Basement Structure",
    allocated: 45000,
    notes: "Excavation, footings, poured/block basement walls, main floor deck, waterproofing, drain tile, sump. Owner-rented excavator ($2,500 self-completed). Concrete labor quoted by Jemison.",
    items: [
      { name: "Excavation — 1,114 sq ft footprint, ~9 ft deep", cost: 2500, notes: "Owner-rented excavator — self-completed" },
      { name: "Concrete labor — Jemison Quote 1110 (4/19/26)", cost: 21631, notes: "QUOTED: footing labor $2,601 + walls $6,825 + waterproofing $4,875 + drain pipe $250 + slab labor $3,330 + slab materials $3,750. EXCLUDES concrete itself, concrete pump (×3), gravel for drain & slab. Based on 10 ft tall wall." },
      { name: "Concrete material — 3,000 PSI ready-mix (footing+wall+slab)", cost: 12000, notes: "~80 cu yd × $150/yd. NOT in Jemison quote — get separate ready-mix quote." },
      { name: "Concrete pump (×3 setups per Jemison)", cost: 3000, notes: "NOT in Jemison quote — typically ~$1,000/pour" },
      { name: "Gravel for drain pipe + slab base", cost: 1500, notes: "NOT in Jemison quote" },
      { name: "Interior footings — posts and column pads", cost: 1800, notes: "Support for main floor beam system" },
      { name: "Main floor beam + post system", cost: 2500, notes: "LVL or steel beam spanning basement, with lally columns" },
      { name: "Sump pit + sleeve + pump", cost: 800, notes: "Required in most full basement builds" },
    ]
  },
  {
    id: 4,
    name: "Framing & Structure",
    allocated: 60930,
    notes: "Vendor-quoted April 2026. PREFERRED: Oak Mountain #23356 (ZIP wall + ZIP roof + ZIP tape). User chose ZIP system over OSB for integrated WRB. Includes lumber+ZIP+Hardie+deck pkg, EWP, roof trusses, framing labor, porch, dumpster.",
    items: [
      { name: "Framing material pkg — Oak Mountain Quote 23356 (PREFERRED, ZIP system)", cost: 45205, notes: "QUOTED 4/28/26 incl 5% tax. Lumber + 78× 7/16 ZIP Wall sheets + 116× 1/2 ZIP Roof + 36× ZIP Tape + 3/4 T&G Huber Blue + Hardie panel/trim/soffit + deck materials + EWP $2,571 line + hardware. ZIP eliminates housewrap and synthetic felt entirely. NEGOTIATION TARGETS — see Vendor Brief tab." },
      { name: "Framing material pkg — Oak Mountain Quote 23351 (OSB alternate)", cost: 0, notes: "ALTERNATE: OSB + housewrap version $41,692. ZIP upgrade = +$3,514. Going with ZIP for the WRB integration and faster install." },
      { name: "Framing material pkg — BFS Quote 87577907 (alternate, OSB)", cost: 0, notes: "ALTERNATE: BFS framing $35,322 incl tax (OSB only — no ZIP option quoted). Add BFS EWP $8,826 = $44,148 all-in. To match ZIP scope, BFS would need ~+$3,400 in ZIP materials → ~$47,548. OM ZIP at $45,205 is cheaper for equivalent scope." },
      { name: "EWP line in OM #23356 — verify scope", cost: 0, notes: "OM's $2,571 EWP line vs BFS standalone EWP $8,826. KEY QUESTION FOR OWNER. If OM is missing items, expect $5–6K add. See Vendor Brief tab." },
      { name: "Roof trusses — BFS Shelby Quote 5403492", cost: 7195, notes: "QUOTED 4/29/26 ex tax. 63 trusses, 8/12 pitch, 18\" OH. Ask OM to beat to consolidate." },
      { name: "Framing labor — walls, floor", cost: 7798, notes: "$7/sq ft × 1,114 sq ft — confirmed rate" },
      { name: "Porch framing — materials + labor", cost: 2500, notes: "Covered front/back porch included in plans" },
      { name: "Dumpster rental (framing phase)", cost: 1000, notes: "Two hauls typical for framing debris" },
      { name: "Roof framing labor (truss install)", cost: 1800, notes: "Crane setting + crew time for 63 trusses" },
    ]
  },
  {
    id: 5,
    name: "Exterior — Siding & Roof",
    allocated: 19831,
    notes: "Hardie B&B (folded into framing pkg), 16 BFS Comfort View windows, 4 BFS exterior doors, 12 interior doors, exterior paint, galvanized metal roof. Vendor quotes locked in April 2026.",
    items: [
      { name: "Hardie Board & Batten — materials", cost: 0, notes: "Now bundled inside Oak Mountain framing pkg ($23,351) — see Framing & Structure category" },
      { name: "Siding installation labor", cost: 3000, notes: "" },
      { name: "Windows — 16 units (BFS Comfort View Quote 87515008)", cost: 3655, notes: "QUOTED 4/22/26. Saved ~$1,595 vs initial estimate. Lowe 366 4/1 grids." },
      { name: "Exterior doors — 4 units (BFS Quote 87489258)", cost: 3743, notes: "QUOTED 4/21/26. 1× fiberglass dbl front (5/0×8/0 Nova45 fullview Lowe), 3× single (steel 6-panel + steel fullview + fiberglass mahogany)." },
      { name: "Interior doors — 12 units (prehung)", cost: 1800, notes: "$150 avg hollow-core; solid wood is higher. Not yet quoted." },
      { name: "Exterior paint — low-VOC, earth tones", cost: 1738, notes: "Materials + labor for Hardie" },
      { name: "Galvanized metal roof — materials + labor (~1,350 sq ft)", cost: 4000, notes: "Standing seam galvanized; ~$3/sq ft installed. Not yet quoted." },
    ]
  },
  {
    id: 6,
    name: "Insulation — Rock Wool",
    allocated: 7720,
    notes: "Comfortbatt walls + ceiling, ComfortBoard 80 exterior + 110 under roof, Safe'n'Sound interior, labor — contractor pricing",
    items: [
      { name: "Comfortbatt R-23 — 2×6 exterior wall cavities (~900 sq ft)", cost: 650, notes: "Contractor pricing ~$0.72/sq ft material" },
      { name: "Comfortbatt R-38 — ceiling cavities (1,114 sq ft)", cost: 900, notes: "Contractor pricing ~$0.81/sq ft material" },
      { name: "ComfortBoard 80 — exterior continuous (900 sq ft)", cost: 1050, notes: "1.5\" = R-6; contractor ~$9.30/board through distributor" },
      { name: "ComfortBoard 110 — under roof deck (1,350 sq ft)", cost: 2300, notes: "1\" = R-4; high-density; contractor ~$13.50/board" },
      { name: "Safe'n'Sound — interior partition walls (600 sq ft)", cost: 520, notes: "Acoustic + fire; contractor ~$0.87/sq ft" },
      { name: "Installation labor", cost: 2300, notes: "Insulation sub; rock wool at ~$0.45–0.50/sq ft installed" },
    ]
  },
  {
    id: 7,
    name: "Utilities — Rough In",
    allocated: 52126,
    notes: "Temp power, well + filtration, septic, propane tank, electrical, plumbing, Cat6 Ethernet, gravel driveway. Alabama Power hookup is FREE.",
    items: [
      { name: "Temporary power — construction service + meter base", cost: 1500, notes: "Alabama Power hookup itself is FREE" },
      { name: "Well drilling — approx 250 ft depth (rural AL typical)", cost: 8500, notes: "Depth varies; driller quotes by the foot" },
      { name: "Well pump, pressure tank, and wiring", cost: 2200, notes: "" },
      { name: "Water filtration system (sediment + carbon + UV)", cost: 3500, notes: "AL well water often needs iron/sediment filtration" },
      { name: "Septic system — conventional 3-bedroom", cost: 8000, notes: "Shelby County; perc test required first" },
      { name: "Propane tank — 500 gal, set, and first fill", cost: 2426, notes: "Tank can be rented or purchased" },
      { name: "Electrical rough-in — panel, service entrance, circuits", cost: 10000, notes: "200A panel; all rough wiring, boxes, grounding" },
      { name: "Plumbing rough-in — supply + drain + vent (14 fixture count)", cost: 8500, notes: "All in-wall piping only; fixtures are separate" },
      { name: "Cat6 Ethernet — structured wiring throughout", cost: 2500, notes: "Home run to central panel; all rooms + exterior" },
      { name: "Gravel driveway — approx 200 ft", cost: 5000, notes: "Crushed stone; adjust for actual length" },
    ]
  },
  {
    id: 8,
    name: "HVAC & Mechanical",
    allocated: 10450,
    notes: "Central AC + propane furnace (split system), ductwork, wood burning stove + chimney",
    items: [
      { name: "Central AC — 3-ton condenser + coil (14+ SEER2)", cost: 3200, notes: "Carrier/Lennox/Trane; sized for 1,114 sq ft Zone 3A" },
      { name: "Propane gas furnace — 80,000 BTU, LP", cost: 900, notes: "Two-stage preferred; match brand to AC unit" },
      { name: "Air handler + evaporator coil", cost: 1100, notes: "Must match condenser brand/tonnage" },
      { name: "Ductwork — sheet metal trunk + flex branches", cost: 2200, notes: "Main floor only; mastic-sealed all joints" },
      { name: "Supply registers + return grilles", cost: 350, notes: "~15 supply + 3 returns" },
      { name: "Wood burning stove (EPA Step 2)", cost: 1500, notes: "Backup heat + ambiance; EPA-certified" },
      { name: "Stove chimney flue (Class A, double-wall)", cost: 1200, notes: "15–20 ft run; rain cap + spark arrestor" },
    ]
  },
  {
    id: 9,
    name: "Plumbing Fixtures",
    allocated: 8850,
    notes: "Tankless propane water heater, 3 toilets, 60in master tub, 2 tub/shower combos, tiled master shower, 3 vanities, faucets",
    items: [
      { name: "Tankless propane water heater", cost: 1400, notes: "Rinnai or Navien; sized for 2+ simultaneous fixtures" },
      { name: "Toilets — 3 units (elongated, 1.28 GPF)", cost: 900, notes: "" },
      { name: "60-inch master soaking tub", cost: 1000, notes: "" },
      { name: "Tub/shower combo units — 2 (fiberglass or acrylic)", cost: 900, notes: "" },
      { name: "Master tiled shower — pan + wall tile + niche + glass door", cost: 2000, notes: "Materials only; labor in Interior Finishes" },
      { name: "Vanities — 3 units (solid wood, low-VOC finish)", cost: 1200, notes: "" },
      { name: "Faucets + shower valves + hardware — all baths", cost: 1000, notes: "" },
      { name: "Misc — supply lines, shut-offs, drain assemblies", cost: 450, notes: "" },
    ]
  },
  {
    id: 10,
    name: "Interior Finishes",
    allocated: 33906,
    notes: "Shiplap walls, solid wood cabinets, quartz counters, hardwood + tile floors, trim, zero-VOC paint, lighting",
    items: [
      { name: "Shiplap — main living areas + hallways (~2,000 sq ft of wall)", cost: 5000, notes: "Solid wood shiplap preferred; primed poplar or pine" },
      { name: "Solid wood cabinets — kitchen", cost: 6000, notes: "Formaldehyde-free; semi-custom. No particle board." },
      { name: "Solid wood cabinets — 3 bathrooms", cost: 2500, notes: "" },
      { name: "Quartz countertops — kitchen + 3 baths", cost: 5800, notes: "~$65/sq ft installed; includes sink cutout" },
      { name: "Hardwood flooring — living, dining, bedrooms (~700 sq ft)", cost: 5600, notes: "Solid hardwood, site-finished. No carpet." },
      { name: "Tile flooring — baths + laundry (~250 sq ft)", cost: 1500, notes: "Materials only" },
      { name: "Tile installation labor (baths + laundry)", cost: 1750, notes: "" },
      { name: "Trim — baseboards, door/window casing, crown", cost: 2800, notes: "Solid wood preferred; paint-grade poplar" },
      { name: "Zero-VOC interior paint — all rooms (materials + labor)", cost: 2056, notes: "Sherwin-Williams Harmony or similar" },
      { name: "Lighting fixtures (incandescent/halogen, all rooms)", cost: 900, notes: "Per low-tox preference; avoid LED where possible" },
    ]
  },
  {
    id: 11,
    name: "Appliances",
    allocated: 3000,
    notes: "Propane range, refrigerator, range hood, dishwasher",
    items: [
      { name: "Propane freestanding range (5-burner)", cost: 900, notes: "" },
      { name: "Refrigerator (counter-depth, 30in)", cost: 900, notes: "" },
      { name: "Range hood (vented to exterior)", cost: 350, notes: "Exterior venting is critical" },
      { name: "Dishwasher", cost: 550, notes: "" },
      { name: "Microwave (over-range or built-in)", cost: 300, notes: "" },
    ]
  },
  {
    id: 12,
    name: "Specialty",
    allocated: 5300,
    notes: "Utility vehicle, post-construction deep clean",
    items: [
      { name: "Bobcat / Side-by-Side utility vehicle (Yanmar Diesel)", cost: 4800, notes: "Used for site work and hauling during build" },
      { name: "Post-construction deep clean", cost: 500, notes: "" },
    ]
  },
  {
    id: 13,
    name: "Contingency (10%)",
    allocated: 25865,
    notes: "10% buffer on base cost — strongly recommended for new build",
    items: []
  },
  {
    id: 14,
    name: "Basement — Phase 2 (TBD)",
    allocated: 0,
    notes: "Basement structure included in Foundation above. Phase 2 = interior finishing (insulation, flooring, drywall, HVAC extension, plumbing, lighting). Est $40k–$60k if finished. Decision TBD.",
    items: []
  },
];

// ─────────────────────────────────────────────
// VENDOR QUOTES (April 2026)
// All quotes from PDFs — verified prices, dates, totals.
// ─────────────────────────────────────────────
const VENDOR_QUOTES = [
  {
    vendor: "BFS",
    location: "Chelsea, AL Millwork",
    quoteNum: "87515008",
    scope: "Comfort View Windows",
    detail: "16 units: 5×2030 SH, 4×2860 SH, 1×2050 Twin SH (tempered), 4×3060 SH, 2×3060 Twin SH. White, Lowe 366, 4/1 grids, 7/8 GBG, no jambs, no screens. Plus 3 rolls Protecto SS tape, 1 box galv roofing nails.",
    date: "2026-04-22",
    expires: "2026-04-30",
    subtotal: 3323.03,
    tax: 332.30,
    total: 3655.33,
    selected: true,
  },
  {
    vendor: "BFS",
    location: "Chelsea, AL Millwork",
    quoteNum: "87489258",
    scope: "Exterior Doors (Phoenix line)",
    detail: "1× fiberglass double 5/0×8/0 fullview Lowe (Nova45) RH active T-astragal — $2,196. 1× steel 6-panel 3/0×6/8 RH — $336. 1× steel fullview 3/0×6/8 1-lite Lowe LH — $479. 1× fiberglass mahogany 6-panel 3/0×6/8 LH — $393. All primed jambs, black hinges/sill, dbl bore, inswing.",
    date: "2026-04-21",
    expires: "2026-04-30",
    subtotal: 3402.94,
    tax: 340.29,
    total: 3743.23,
    selected: true,
  },
  {
    vendor: "BFS",
    location: "Pelham, AL Yard",
    quoteNum: "87546716",
    scope: "Engineered Wood Products (EWP)",
    detail: "First Floor: 6× LSL rim 1-1/8×16 (TimberStrand) — $331. 3× TJI-360 10' — $151. 1× TJI-360 18' — $90. 45× TJI-360 26' — $5,845. Second Floor: 2× 1¾×9¼ LVL 18' (2.0E Microlam) — $217. Special Order/Boise: 3× 24\" LVL @ 24' — $1,390.",
    date: "2026-04-23",
    expires: "2026-04-30",
    subtotal: 8023.63,
    tax: 802.36,
    total: 8825.99,
    selected: true,
  },
  {
    vendor: "BFS",
    location: "Pelham, AL Yard",
    quoteNum: "87577907",
    scope: "Framing Package — alternate to Oak Mountain",
    detail: "Lumber (2×4/2×6/2×10/2×12 SPF/SYP), 7/16 OSB, 23/32 T&G DuraStrand, Tyvek/Barricade housewrap+tape, ice & water shield, Hardie panel/trim/soffit/batten, deck materials (5/4×6 PT, PT 2×10/12, 6×6 posts), Simpson hangers, Hitachi nails. NO EWP, NO trusses.",
    date: "2026-04-27",
    expires: "2026-04-30",
    subtotal: 32111.32,
    tax: 3211.13,
    total: 35322.45,
    selected: false,
  },
  {
    vendor: "BFS Shelby",
    location: "Shelby, AL",
    quoteNum: "5403492",
    scope: "Roof Trusses",
    detail: "63 trusses, 8/12 pitch, 18\" overhang, 2×4 SP No.2 chord, KD untreated SYP. 1× A01 + 11× A02 (26' span, 170/138 lb), 22× B01–B05 (38' span, 235–296 lb), 3× C01–C02 (17'-8\" span carport), 22× P01/PC01 (porch), 4 valleys V01–V04. Total weight 8,146 lb. EXCLUDES: hurricane clips, beams, blocking, dormers, structural fascia, bracing.",
    date: "2026-04-29",
    expires: "2026-05-29",
    delivery: "2026-06-13",
    subtotal: 7195.00,
    tax: null,
    total: 7195.00,
    selected: true,
  },
  {
    vendor: "Oak Mountain Building Supply",
    location: "Sterrett, AL",
    quoteNum: "23351",
    scope: "Framing Package — OSB + housewrap version (alternate)",
    detail: "ALTERNATE TO ZIP. 1ST DROP: borate 2×6, PT lumber, 360+ SPF studs, 80+ YP joists, OSB, EWP $2,571 line, hangers. 2ND DROP: 37× T&G Huber Blue subfloor, 280 precut studs, more YP joists, pocket door kits. 3RD DROP: 116 OSB roof deck, synthetic felt, plastic cap nails. SIDING/CORNICE: full Hardie pkg (66× 4×10 panels, batten strip, trim, soffits, V-joint), 8×8 posts. DECK: PT 2×12, 5/4×6, hangers, Hitachi nails.",
    date: "2026-04-27",
    subtotal: 39706.43,
    tax: 1985.32,
    total: 41691.75,
    selected: false,
  },
  {
    vendor: "Oak Mountain Building Supply",
    location: "Sterrett, AL",
    quoteNum: "23356",
    scope: "Framing Package — PREFERRED (ZIP system, relationship + proximity)",
    detail: "PREFERRED. Same lumber/EWP/Hardie/deck scope as #23351 but ZIP system: 78× 7/16 ZIP Wall sheets ($1,919), 116× 1/2 ZIP Roof sheets ($3,086), 36× ZIP Tape rolls ($1,168) — replaces all OSB wall/roof sheathing + housewrap + synthetic felt. Net upgrade ~$3,514 over OSB version. ZIP integrates structural sheathing + WRB in one product, faster install, fewer leak paths.",
    date: "2026-04-28",
    subtotal: 43052.79,
    tax: 2152.64,
    total: 45205.43,
    selected: true,
  },
  {
    vendor: "Five Star Lumber",
    location: "Pelham, AL",
    quoteNum: "2604-146766",
    scope: "Framing Package — alternate",
    detail: "PT and SPF dim lumber (2×4/2×6/2×8/2×10/2×12), 70× 7/16 OSB, 110× 5/8 CDX plywood, 40× 3/4 T&G Blue Plus, Hardie soffit/panel/trim, 3,040 LF 1×6 TGVJ #2, 60 LF 18\" LVL R/L, deck PT (5/4×6, 2×10/12, 6×6), housewrap, synthetic underlayment, hook flashing, FRH nails, Simpson hangers, deck tension ties. NO TJI joists, NO trusses.",
    date: "2026-04-29",
    expires: "2026-05-07",
    subtotal: 40831.69,
    tax: 0.00,
    total: 40831.69,
    selected: false,
  },
  {
    vendor: "Jemison Concrete LLC",
    location: "Jemison, AL",
    quoteNum: "1110",
    scope: "Concrete Labor — Foundation",
    detail: "Footing labor $2,601 + Wall $6,825 + Waterproofing $4,875 + Drain pipe install $250 + Slab labor $3,330 + Slab materials $3,750. Based on 10 ft wall (price flexes if stepped). EXCLUDES: concrete itself, concrete pump (used 3×), gravel for drain pipe and slab.",
    date: "2026-04-19",
    subtotal: 21631.00,
    tax: null,
    total: 21631.00,
    selected: true,
  },
];

// ─────────────────────────────────────────────
// NEGOTIATION TARGETS — items where Oak Mountain
// (the user's preferred vendor) is priced higher
// than at least one competitor. Use these to
// negotiate a better deal.
// ─────────────────────────────────────────────
const NEGOTIATION_TARGETS = [
  // Format: { item, omPrice, bestPrice, bestVendor, omQty, lineSavings }
  {
    item: "2×4-104⅝\" precut SPF stud",
    omCode: "249PC", omPrice: 4.64, omQty: 280, omTotal: 1299.20,
    bestPrice: 4.48, bestVendor: "BFS", category: "lumber",
    pctOver: 3.6, lineSavings: 45,
    note: "BFS code 2410458S. Match $4.48."
  },
  {
    item: "2×4-116⅝\" precut SPF stud",
    omCode: "2410PC", omPrice: 5.15, omQty: 245, omTotal: 1261.75,
    bestPrice: 4.77, bestVendor: "BFS", category: "lumber",
    pctOver: 8.0, lineSavings: 93,
    note: "BFS code 2411658S. Match $4.77."
  },
  {
    item: "2×4-14' SPF (1st drop)",
    omCode: "2414S", omPrice: 8.55, omQty: 115, omTotal: 983.25,
    bestPrice: 6.35, bestVendor: "Oak Mountain own 2nd drop", category: "anomaly",
    pctOver: 34.6, lineSavings: 253,
    note: "ANOMALY: same code 2414S quoted at $6.35 in 2nd drop (215 pcs). Apply $6.35 to 1st drop too."
  },
  {
    item: "2×10-14' YP #2",
    omCode: "21014YP", omPrice: 15.09, omQty: 8, omTotal: 120.72,
    bestPrice: 13.11, bestVendor: "BFS", category: "lumber",
    pctOver: 15.1, lineSavings: 16,
    note: "BFS code 21014SYP2. Match $13.11."
  },
  {
    item: "2×12-14' YP #2",
    omCode: "21214YP", omPrice: 18.87, omQty: 42, omTotal: 792.54,
    bestPrice: 15.54, bestVendor: "BFS", category: "lumber",
    pctOver: 21.4, lineSavings: 140,
    note: "BFS code 21214SYP2. Match $15.54. (36+6 pcs across drops)"
  },
  {
    item: "2×10-12' PT #2",
    omCode: "21012PT", omPrice: 17.91, omQty: 31, omTotal: 555.21,
    bestPrice: 16.62, bestVendor: "BFS", category: "lumber-pt",
    pctOver: 7.8, lineSavings: 40,
    note: "BFS code 21012T. Match $16.62."
  },
  {
    item: "2×4-16' PT prime ground contact",
    omCode: "2416PT", omPrice: 12.14, omQty: 91, omTotal: 1104.74,
    bestPrice: 10.90, bestVendor: "BFS (borate)", category: "lumber-pt",
    pctOver: 11.4, lineSavings: 113,
    note: "BFS 2416T-B is borate-treated equivalent. Match $10.90."
  },
  {
    item: "Subfloor adhesive 28oz",
    omCode: "SFG", omPrice: 6.79, omQty: 11, omTotal: 74.69,
    bestPrice: 5.69, bestVendor: "BFS", category: "consumables",
    pctOver: 19.3, lineSavings: 12,
    note: "Match BFS private-label SFG at $5.69."
  },
  {
    item: "1\" plastic cap roofing nails (box)",
    omCode: "1PCN", omPrice: 23.00, omQty: 4, omTotal: 92.00,
    bestPrice: 12.00, bestVendor: "Five Star", category: "consumables",
    pctOver: 91.7, lineSavings: 44,
    note: "Five Star at $12, BFS at $17.39. OM is highest by far — biggest %-margin gap."
  },
  {
    item: "3\" galv Hitachi nail (5,000 ct box)",
    omCode: "3GALVHITACHI", omPrice: 90.00, omQty: 1, omTotal: 90.00,
    bestPrice: 59.99, bestVendor: "BFS", category: "consumables",
    pctOver: 50.0, lineSavings: 30,
    note: "BFS code GR014L. Match $59.99."
  },
  {
    item: "2-3/8\" galv Hitachi nail",
    omCode: "2-3/8 GALV HI", omPrice: 90.00, omQty: 1, omTotal: 90.00,
    bestPrice: 76.99, bestVendor: "BFS", category: "consumables",
    pctOver: 16.9, lineSavings: 13,
    note: "BFS code GR08R. Match $76.99."
  },
  {
    item: "3/8\" Z-flashing",
    omCode: "38ZF", omPrice: 11.14, omQty: 6, omTotal: 66.84,
    bestPrice: 8.99, bestVendor: "Five Star", category: "flashing",
    pctOver: 23.9, lineSavings: 13,
    note: "Five Star code 38Z. Match $8.99."
  },
  {
    item: "Sill seal 5.5\" × 50'",
    omCode: "512SS", omPrice: 9.64, omQty: 1, omTotal: 9.64,
    bestPrice: 7.09, bestVendor: "BFS", category: "consumables",
    pctOver: 36.0, lineSavings: 3,
    note: "BFS code SS550. Match $7.09."
  },
  {
    item: "LUS210 Z-Max 2×10 single hanger",
    omCode: "LUS210ZMAX", omPrice: 2.98, omQty: 86, omTotal: 256.28,
    bestPrice: 2.79, bestVendor: "BFS", category: "hardware",
    pctOver: 6.8, lineSavings: 16,
    note: "BFS code LUS210Z (50/PK). Match $2.79."
  },
];

// Items where Oak Mountain is already CHEAPEST — don't push, but acknowledge:
const OM_ALREADY_WINNING = [
  { item: "3/4\" T&G Huber Blue subfloor", omPrice: 17.53, vsBfs: 19.71, vsFs: 29.95, advantageDesc: "11% cheaper than BFS, 41% cheaper than Five Star" },
  { item: "1×4×12 Hardie Smooth Trim", omPrice: 15.40, vsBfs: 17.22, vsFs: 17.95, advantageDesc: "11% cheaper than BFS" },
  { item: "1×6×12 Hardie Smooth Trim", omPrice: 23.90, vsBfs: 27.07, vsFs: 26.95, advantageDesc: "12% cheaper than BFS" },
  { item: "1×12×12 Hardie Siding Trim", omPrice: 51.75, vsBfs: 56.96, vsFs: 53.95, advantageDesc: "9% cheaper than BFS" },
  { item: "3\" Hardie Smooth Batten Strip", omPrice: 11.04, vsBfs: 12.66, vsFs: 13.95, advantageDesc: "13% cheaper than BFS" },
  { item: "16\" Hardie Solid Soffit", omPrice: 26.21, vsBfs: 29.12, vsFs: null, advantageDesc: "10% cheaper than BFS" },
  { item: "4×10 Smooth HardiePanel", omPrice: 62.22, vsBfs: 80.62, vsFs: null, advantageDesc: "23% cheaper than BFS — biggest single OM advantage" },
  { item: "2×4-16' SPF #2", omPrice: 8.55, vsBfs: 10.03, vsFs: 8.50, advantageDesc: "15% cheaper than BFS" },
  { item: "2×6-14 borate treated", omPrice: 12.15, vsBfs: 14.98, vsFs: null, advantageDesc: "19% cheaper than BFS" },
  { item: "2×12-20' YP #2 PT (deck)", omPrice: 34.00, vsBfs: null, vsFs: 50.11, advantageDesc: "32% cheaper than Five Star" },
];

// ─────────────────────────────────────────────
// NEGOTIATION SUMMARY (for printable brief)
// ─────────────────────────────────────────────
const NEGOTIATION_SUMMARY = {
  preferredVendor: "Oak Mountain Building Supply",
  preferredVendorReason: "Relationship + proximity (owner is known to homeowner). ZIP system selected for wall + roof sheathing.",
  bottomLineComparison: {
    omZip:        { label: "Oak Mountain #23356 — ZIP system + EWP line (PREFERRED)", amount: 45205.43 },
    omOsb:        { label: "Oak Mountain #23351 — OSB + housewrap version + EWP line", amount: 41691.75 },
    bfsOsb:       { label: "BFS Framing #87577907 (OSB) + BFS EWP #87546716", amount: 35322.45 + 8825.99 },
    bfsZipEquiv:  { label: "BFS framing + EWP + ZIP upgrade equivalent (~+$3,400 add)", amount: 35322.45 + 8825.99 + 3400 },
    fiveStar:     { label: "Five Star Lumber #2604-146766 (no ZIP, no EWP, no tax shown)", amount: 40831.69 },
  },
  keyQuestion: "Oak Mountain's 'SO60016 EWP' line is $2,571.20 — what exactly is included? BFS quoted full EWP scope (LSL rim + 49 TJI-360 joists + 9¼ LVL + 24\" LVL) at $8,024 subtotal. Need confirmation OM line covers full scope or expect $5–6K add.",
  zipSystemNote: "ZIP wall + ZIP roof + ZIP tape = +$3,514 vs OSB version. Eliminates housewrap and synthetic felt entirely. ZIP wall sheets at $24.60/ea (78 pcs = $1,919); 1/2\" ZIP roof at $26.60/ea (116 pcs = $3,086); ZIP tape at $32.44/ea (36 rolls = $1,168). No competitor quoted ZIP, so no direct unit-price comparator.",
  lineSavingsTotal: 831, // sum of NEGOTIATION_TARGETS lineSavings (after removing OSB/housewrap/felt)
  drop1AnomalySavings: 253,
  totalCleanAsks: 1084,
  outsideQuoteOpportunity: {
    title: "Roof trusses — not yet quoted by Oak Mountain",
    benchmark: 7195,
    benchmarkSource: "BFS Shelby Quote 5403492 (4/29/26): 63 trusses, 8/12 pitch, 18\" OH",
    ask: "Match or beat $7,195 to consolidate the order"
  },
  pitch: `I want to bring this whole job to you. I'm going with ZIP wall + ZIP roof — your #23356 is at $45,205 (incl. tax). For comparison BFS framing + EWP is $44,148 on OSB; to match my ZIP scope they'd be ~$47,548. So you're already ahead. To make this easy, I need three things: (1) confirmation that your $2,571 EWP line covers full scope — LSL rim, all TJI-360 joists in needed lengths, the two 9¼ LVLs, and the three 24" LVLs; (2) the second-drop $6.35 price for 2×4-14 SPF applied to the first drop too (saves $253); (3) match competitor unit prices on the line items in the brief — clean asks ~$830. Also: quote 63 roof trusses (8:12 pitch, 18" OH, 2×4 SP No.2 KD SYP) — BFS Shelby is at $7,195. Hit those and the framing + EWP + trusses are all yours, ~$52,400 total package.`
};

// ─────────────────────────────────────────────
// ZIP vs OSB+WRAP DECISION
// User picked ZIP. This block shows the full
// side-by-side so the choice is documented.
// ─────────────────────────────────────────────
const ZIP_VS_OSB = {
  costA_zip: {
    label: "OPTION A — ZIP Wall + ZIP Roof + ZIP Tape (OM #23356)",
    materialItems: [
      { name: "7/16\" ZIP Wall sheets", qty: 78, unit: 24.60, total: 1918.80 },
      { name: "1/2\" ZIP Roof sheets", qty: 116, unit: 26.60, total: 3085.60 },
      { name: "ZIP Tape rolls", qty: 36, unit: 32.44, total: 1167.84 },
    ],
    materialSubtotal: 6172.24,
    laborImpact: -600, // saves ~$400-800 vs separate housewrap install
    quoteSubtotal: 43052.79,
    quoteTotal: 45205.43,
  },
  costB_osb: {
    label: "OPTION B — 7/16 OSB + Tyvek + #15 Felt (OM #23351)",
    materialItems: [
      { name: "7/16\" OSB walls (78 sheets)", qty: 78, unit: 11.04, total: 861.12 },
      { name: "7/16\" OSB roof deck (116 sheets)", qty: 116, unit: 11.04, total: 1280.64 },
      { name: "10×100 Housewrap rolls", qty: 3, unit: 77.00, total: 231.00 },
      { name: "#15 synthetic felt (1,000 sq ft)", qty: 4, unit: 83.33, total: 333.32 },
    ],
    materialSubtotal: 2706.08,
    laborImpact: 600, // additional housewrap install labor
    quoteSubtotal: 39706.43,
    quoteTotal: 41691.75,
  },
  netDifference: {
    materialDeltaSubtotal: 3466.16,
    materialDeltaWithTax: 3513.68,
    laborSavings: 600,
    netZipPremium: 2913.68, // material + tax delta minus labor saved
  },
  reasonsForZip: [
    { icon: "fa-shield", title: "Integrated WRB — single point of failure becomes single point of integrity", detail: "Green facer IS the water-resistive barrier. Continuous plane vs lapped wrap means fewer leak paths at penetrations (windows, doors, electrical, HVAC)." },
    { icon: "fa-wind", title: "Better air sealing", detail: "Properly taped ZIP shows 30–50% less air infiltration than OSB+Tyvek in blower-door testing. In Zone 3A (Alabama humid), tighter envelope = lower cooling loads, better humidity control." },
    { icon: "fa-clock", title: "Faster construction = less weather exposure", detail: "No separate housewrap step. Walls go up dry-in faster. Tape seams as you go." },
    { icon: "fa-droplet", title: "Better wet-during-construction tolerance", detail: "ZIP rated for 60-day weather exposure; Tyvek rated for 4 months but realistic 30 days before UV degradation. ZIP handles Alabama thunderstorms during framing better." },
    { icon: "fa-house-chimney-crack", title: "Stiffer panel — better racking", detail: "Fewer creaks, slightly stiffer wall under wind load." },
    { icon: "fa-leaf", title: "Fits low-tox build philosophy", detail: "Fewer construction membranes/adhesives in the wall assembly. ZIP facer is dimensionally stable and inert." },
  ],
  reasonsForOsb: [
    { icon: "fa-dollar-sign", title: "Saves ~$2,914 net (after labor offset)", detail: "Material+tax delta is +$3,514 for ZIP, but ZIP saves ~$600 in housewrap install labor. Net premium: ~$2,900." },
    { icon: "fa-hammer", title: "Universal contractor familiarity", detail: "Every framing crew has done OSB+Tyvek. ZIP requires correctly applied tape — done wrong, ZIP underperforms OSB+Tyvek." },
    { icon: "fa-screwdriver-wrench", title: "Easier repairs", detail: "Tyvek tears can be patched. ZIP damage requires sheet replacement or specialized patching." },
    { icon: "fa-layer-group", title: "Decoupled layers — independent failure modes", detail: "If Tyvek degrades, OSB still functions. With ZIP, the WRB and structural sheathing are one product — single failure = both fail." },
  ],
  verdict: {
    chosen: "ZIP",
    reasoning: "Net premium of ~$2,900 is small relative to the project ($277K budget = 1.0%). Air sealing improvement compounds over decades of cooling-dominated Alabama climate. ZIP done right outperforms OSB+wrap done well; OSB+wrap done well outperforms ZIP done poorly. Pin down a GC with ZIP experience — that's the only real risk."
  }
};
