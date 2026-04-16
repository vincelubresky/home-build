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
    allocated: 33338,
    notes: "Stick-built materials, framing labor, roofing labor, porch framing, dumpster",
    items: [
      { name: "Framing lumber package — walls, plates, blocking", cost: 8500, notes: "2×6 exterior walls for R-23 cavity insulation; 2×4 interior" },
      { name: "LVL beams + ridge + headers", cost: 2800, notes: "Required over all openings and long spans" },
      { name: "OSB wall sheathing (all walls)", cost: 1800, notes: "" },
      { name: "Weather-resistant barrier (house wrap)", cost: 600, notes: "" },
      { name: "Framing labor — walls, floor", cost: 10500, notes: "Stick-built labor rate in AL; varies by contractor" },
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
    allocated: 17544,
    notes: "Comfortbatt walls + ceiling, ComfortBoard 80 exterior + 110 under roof, Safe'n'Sound interior, labor",
    items: [
      { name: "Comfortbatt — 2×6 exterior wall cavities (~900 sq ft)", cost: 1800, notes: "R-23; ~$2.00/sq ft material" },
      { name: "Comfortbatt — ceiling cavities (1,114 sq ft)", cost: 2500, notes: "R-30; installed between ceiling joists" },
      { name: "ComfortBoard 80 — exterior continuous (900 sq ft wall area)", cost: 3200, notes: "1.5in = R-6; goes over sheathing under siding. Fire-rated" },
      { name: "ComfortBoard 110 — under roof deck (1,350 sq ft)", cost: 4100, notes: "1in = R-4; high-density board rated for under-roof use" },
      { name: "Safe'n'Sound — interior partition walls (600 sq ft)", cost: 1500, notes: "Sound + fire separation; master bedroom, bathrooms, laundry" },
      { name: "Installation labor", cost: 4444, notes: "Rock wool is heavier than fiberglass; specialized installer preferred" },
    ]
  },
  {
    id: 7,
    name: "Utilities — Rough In",
    allocated: 59126,
    notes: "Temp power, well + filtration, septic, propane tank, electrical, plumbing, Cat6 Ethernet, gravel driveway. Alabama Power hookup is FREE.",
    items: [
      { name: "Temporary power — construction service + meter base", cost: 2500, notes: "Alabama Power hookup itself is FREE" },
      { name: "Well drilling — approx 250 ft depth (rural AL typical)", cost: 8500, notes: "Depth varies; driller quotes by the foot" },
      { name: "Well pump, pressure tank, and wiring", cost: 2200, notes: "" },
      { name: "Water filtration system (sediment + carbon + UV)", cost: 3500, notes: "AL well water often needs iron/sediment filtration" },
      { name: "Septic system — conventional 3-bedroom", cost: 14000, notes: "Shelby County; perc test required first" },
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
    allocated: 11100,
    notes: "2-zone ductless mini split, HRV/ERV fresh air unit, wood burning stove",
    items: [
      { name: "2-zone ductless mini split — 2 heads + outdoor unit", cost: 5500, notes: "e.g. Mitsubishi or Daikin 2×12,000 BTU; sized for tight rock wool envelope" },
      { name: "Mini split installation labor", cost: 1200, notes: "" },
      { name: "HRV/ERV fresh air ventilation unit", cost: 2500, notes: "Required with tight rock wool envelope; HEPA filtration model preferred" },
      { name: "HRV/ERV ducting and installation", cost: 600, notes: "" },
      { name: "Wood burning stove", cost: 1000, notes: "Backup heat + ambiance; EPA-certified model" },
      { name: "Stove chimney liner, cap, and installation", cost: 300, notes: "" },
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
