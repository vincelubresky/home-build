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
        name: "AdvanTech Subfloor Panels",
        spec: "23/32\" T&G, 4×8 sheets",
        qty: "~35 sheets (1,114 sq ft)",
        cost: 1225,
        status: "needed",
        brands: [
          { name: "Huber AdvanTech", url: "https://www.huberwood.com" }
        ],
        notes: "Moisture-resistant structural subfloor — far superior to standard OSB. T&G edges, no OSB-style swelling. Use on main floor deck over basement."
      },
      {
        name: "LVL Rim Beams & Headers",
        spec: "1.75×9.5\" or 1.75×11.25\" — confirm with engineer",
        qty: "Per structural plan",
        cost: 2500,
        status: "needed",
        brands: [
          { name: "Boise Cascade (BCI Joists)", url: "https://www.bc.com" },
          { name: "Weyerhaeuser (Trus Joist)", url: "https://www.weyerhaeuser.com" }
        ],
        notes: "Engineered for main floor span over basement. Size and species determined by structural engineer. Get local supplier quote — pricing varies."
      },
      {
        name: "Engineered Floor Joists (I-Joists)",
        spec: "11-7/8\" or 14\" depth — confirm with engineer",
        qty: "Per structural plan",
        cost: 3500,
        status: "needed",
        brands: [
          { name: "Boise Cascade (BCI Joists)", url: "https://www.bc.com" },
          { name: "Weyerhaeuser (Trus Joist)", url: "https://www.weyerhaeuser.com" }
        ],
        notes: "Span basement walls to carry main floor. Engineered joists minimize bounce and squeak. Builder's lumber package should include these."
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
        name: "OSB Wall Sheathing",
        spec: "7/16\" OSB, 4×8 sheets",
        qty: "~115 sheets (~900 sq ft of wall area + waste)",
        cost: 2070,
        status: "needed",
        brands: [],
        notes: "Structural sheathing behind house wrap and Rockwool ComfortBoard. Alternative: ZIP System (sheathing + WRB in one — adds cost but eliminates house wrap step)."
      },
      {
        name: "ZIP System Sheathing (alternative to OSB + wrap)",
        spec: "7/16\" ZIP panel, 4×8",
        qty: "~115 sheets",
        cost: 3220,
        status: "needed",
        brands: [
          { name: "Huber ZIP System", url: "https://www.zipsystem.com" }
        ],
        notes: "OPTIONAL: ZIP integrates structural sheathing + water-resistive barrier in one product. Eliminates separate house wrap step. Costs more upfront but saves labor. Tape seams with ZIP tape."
      },
      {
        name: "House Wrap (if using standard OSB)",
        spec: "WRB — vapor permeable",
        qty: "~1,000 sq ft",
        cost: 300,
        status: "needed",
        brands: [
          { name: "DuPont Tyvek HomeWrap", url: "https://www.dupont.com" },
          { name: "Huber ZIP (see above)", url: "https://www.zipsystem.com" }
        ],
        notes: "Skip if using ZIP System. Tyvek is the standard; drape over sheathing before Rockwool ComfortBoard goes on. Lap seams and tape."
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
        name: "Double-Hung Windows",
        spec: "Double-pane, Low-E glass, vinyl or fiberglass frame",
        qty: "15 units (per plans)",
        cost: 5250,
        status: "needed",
        brands: [
          { name: "Andersen 400 Series", url: "https://www.andersenwindows.com" },
          { name: "Pella 250 Series", url: "https://www.pella.com" },
          { name: "Jeld-Wen Premium Vinyl", url: "https://www.jeld-wen.com" }
        ],
        notes: "Andersen 400 is fiberglass-clad wood interior — premium. Pella 250 is solid choice mid-range. Jeld-Wen vinyl if budget-focused. All 3 offer Low-E glass. Get window schedule from plans to confirm exact sizes before ordering."
      },
      {
        name: "Front Entry French Door (Double)",
        spec: "Fiberglass, 36\"+36\" (72\" opening), with sidelites or transom",
        qty: "1 set",
        cost: 1800,
        status: "needed",
        brands: [
          { name: "Therma-Tru Benchmark", url: "https://www.thermatru.com" },
          { name: "Masonite Performance Door", url: "https://www.masonite.com" },
          { name: "ProVia Heritage", url: "https://www.provia.com" }
        ],
        notes: "Fiberglass doors don't rot, dent, or warp — strongly preferred over wood for exterior. Therma-Tru Benchmark is widely available; ProVia Heritage is more custom/premium. Specify with keyed deadbolt prep and multi-point lock if desired."
      },
      {
        name: "Rear & Side Exterior Doors",
        spec: "Fiberglass or steel insulated, 32\" or 36\" wide",
        qty: "2 units",
        cost: 1000,
        status: "needed",
        brands: [
          { name: "Therma-Tru Benchmark", url: "https://www.thermatru.com" },
          { name: "Masonite Performance Door", url: "https://www.masonite.com" }
        ],
        notes: "Steel doors are more budget-friendly for back/side entries. Fiberglass preferred near moisture (rear deck walkout)."
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
    notes: "Excavation, footings, poured/block basement walls, main floor deck, waterproofing, drain tile, sump. Owner-rented excavator ($2,500 self-completed).",
    items: [
      { name: "Excavation — 1,114 sq ft footprint, ~9 ft deep", cost: 2500, notes: "Owner-rented excavator — self-completed" },
      { name: "Perimeter footings — ~134 lin ft × 24in wide", cost: 3200, notes: "Continuous footing at base of basement walls" },
      { name: "Interior footings — posts and column pads", cost: 1800, notes: "Support for main floor beam system" },
      { name: "Basement walls — poured concrete or block (~134 lin ft × 9 ft)", cost: 19500, notes: "Block common in AL; poured is stronger. ~$16/sq ft wall area" },
      { name: "Main floor beam + post system", cost: 2500, notes: "LVL or steel beam spanning basement, with lally columns" },
      { name: "Main floor deck — engineered joists + 3/4in AdvanTech subfloor (1,114 sq ft)", cost: 7200, notes: "Engineered joists span basement walls; AdvanTech is moisture-resistant" },
      { name: "Exterior waterproofing — membrane + damp-proofing", cost: 3200, notes: "Applied to outside of basement walls before backfill" },
      { name: "Drain tile / French drain — perimeter at footing", cost: 2800, notes: "Directs groundwater to sump" },
      { name: "Sump pit + sleeve", cost: 800, notes: "Required in most full basement builds" },
      { name: "Rough basement floor — gravel or thin slab", cost: 1500, notes: "Keeps basement clean and dry; full slab finish is Phase 2" },
    ]
  },
  {
    id: 4,
    name: "Framing & Structure",
    allocated: 30636,
    notes: "Stick-built materials, framing labor ($7/sq ft × 1,114 sq ft), roofing labor, porch framing, dumpster",
    items: [
      { name: "Framing lumber package — walls, plates, blocking", cost: 8500, notes: "2×6 exterior walls for R-23 cavity insulation; 2×4 interior" },
      { name: "LVL beams + ridge + headers", cost: 2800, notes: "Required over all openings and long spans" },
      { name: "OSB wall sheathing (all walls)", cost: 1800, notes: "" },
      { name: "Weather-resistant barrier (house wrap)", cost: 600, notes: "" },
      { name: "Framing labor — walls, floor", cost: 7798, notes: "$7/sq ft × 1,114 sq ft — confirmed rate" },
      { name: "Roof framing — rafters or trusses + sheathing", cost: 5638, notes: "Roof area ~1,300 sq ft with pitch and overhang" },
      { name: "Porch framing — materials + labor", cost: 2500, notes: "Covered front/back porch included in plans" },
      { name: "Dumpster rental (framing phase)", cost: 1000, notes: "Two hauls typical for framing debris" },
    ]
  },
  {
    id: 5,
    name: "Exterior — Siding & Roof",
    allocated: 22088,
    notes: "Hardie Board & Batten, 15 windows, 3 exterior + 12 interior doors, exterior paint (earth tones), galvanized metal roof",
    items: [
      { name: "Hardie Board & Batten — materials (~900 sq ft net wall area)", cost: 4500, notes: "" },
      { name: "Siding installation labor", cost: 3000, notes: "" },
      { name: "Windows — 15 units (double-pane, vinyl frame)", cost: 5250, notes: "$350 avg; Low-E glass preferred" },
      { name: "Exterior doors — 3 units (front, back, garage/side)", cost: 1800, notes: "Fiberglass or steel insulated" },
      { name: "Interior doors — 12 units (prehung)", cost: 1800, notes: "$150 avg hollow-core; solid wood is higher" },
      { name: "Exterior paint — low-VOC, earth tones", cost: 1738, notes: "Materials + labor for Hardie" },
      { name: "Galvanized metal roof — materials + labor (~1,350 sq ft)", cost: 4000, notes: "Standing seam galvanized; ~$3/sq ft installed" },
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
