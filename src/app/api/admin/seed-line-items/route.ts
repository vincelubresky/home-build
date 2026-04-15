import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Detailed cost breakdown for every budget category.
// Amounts derived from AL regional pricing (2025-2026), 1,114 sq ft main floor,
// full basement foundation, stick-built construction, rural Sterrett AL site.
const breakdowns: Record<string, Array<{ description: string; amount: number; notes?: string }>> = {

  "Site & Permits": [
    { description: "Building permit fee", amount: 800, notes: "Shelby County estimate" },
    { description: "Health department approval", amount: 400, notes: "Required for septic/well on rural lot" },
    { description: "Engineering stamp / structural review", amount: 1200, notes: "Required for permit submission" },
    { description: "Boundary + topographic survey", amount: 900, notes: "Needed before permit and loan" },
    { description: "House plan set (drafting/purchase)", amount: 1000, notes: "If buying stock plans; higher for custom" },
    { description: "Miscellaneous permit fees", amount: 200, notes: "Zoning, impact, inspection scheduling" },
  ],

  "Site Prep": [
    { description: "Land clearing — trees and brush", amount: 3000, notes: "Varies widely by lot density" },
    { description: "Silt fence installation", amount: 600, notes: "Erosion control, typically required by county" },
    { description: "Equipment delivery / mobilization", amount: 800 },
    { description: "Final grade and smooth site", amount: 1500, notes: "After construction complete" },
    { description: "Seeding + hay (erosion control)", amount: 600, notes: "Post-grade to prevent runoff" },
    { description: "Porta-potty rental (6 months)", amount: 400 },
  ],

  "Foundation & Basement Structure": [
    { description: "Excavation — 1,114 sq ft footprint, ~9 ft deep", amount: 9500, notes: "Prices vary with rock/soil conditions in AL" },
    { description: "Perimeter footings — ~134 lin ft × 24in wide", amount: 3200, notes: "Continuous footing at base of basement walls" },
    { description: "Interior footings — posts and column pads", amount: 1800, notes: "Support for main floor beam system" },
    { description: "Basement walls — poured concrete or block (~134 lin ft × 9 ft)", amount: 19500, notes: "Block is common in AL; poured is stronger. ~$16/sq ft wall area" },
    { description: "Main floor beam + post system", amount: 2500, notes: "LVL or steel beam spanning basement, with lally columns" },
    { description: "Main floor deck — engineered joists + 3/4in AdvanTech subfloor (1,114 sq ft)", amount: 7200, notes: "Engineered joists span basement walls; AdvanTech is moisture-resistant" },
    { description: "Exterior waterproofing — membrane + damp-proofing", amount: 3200, notes: "Applied to outside of basement walls before backfill" },
    { description: "Drain tile / French drain — perimeter at footing", amount: 2800, notes: "Directs groundwater to sump" },
    { description: "Sump pit + sleeve", amount: 800, notes: "Required in most full basement builds" },
    { description: "Rough basement floor — gravel or thin slab", amount: 1500, notes: "Keeps basement clean and dry; full slab finish is Phase 2" },
  ],

  "Framing & Structure": [
    { description: "Framing lumber package — walls, plates, blocking", amount: 8500, notes: "2×6 exterior walls for R-23 cavity insulation; 2×4 interior" },
    { description: "LVL beams + ridge + headers", amount: 2800, notes: "Required over all openings and long spans" },
    { description: "OSB wall sheathing (1,114 sq ft footprint, all walls)", amount: 1800 },
    { description: "Weather-resistant barrier (house wrap)", amount: 600 },
    { description: "Framing labor — walls, floor", amount: 10500, notes: "Stick-built labor rate in AL; varies by contractor" },
    { description: "Roof framing — rafters or trusses + sheathing", amount: 5638, notes: "Roof area ~1,300 sq ft with pitch and overhang" },
    { description: "Porch framing — materials + labor", amount: 2500, notes: "Covered front/back porch included in plans" },
    { description: "Dumpster rental (framing phase)", amount: 1000, notes: "Two hauls typical for framing debris" },
  ],

  "Exterior — Siding & Roof": [
    { description: "Hardie Board & Batten — materials (~900 sq ft net wall area)", amount: 4500, notes: "HardiePlank and trim boards; price may shift if vinyl chosen instead" },
    { description: "Siding installation labor", amount: 3000 },
    { description: "Windows — 15 units (double-pane, vinyl frame)", amount: 5250, notes: "$350 avg; upgrade budget if adding Low-E or custom sizes" },
    { description: "Exterior doors — 3 units (front, back, garage/side)", amount: 1800, notes: "Fiberglass or steel insulated; $600 avg" },
    { description: "Interior doors — 12 units (prehung)", amount: 1800, notes: "$150 avg hollow-core; solid wood is higher" },
    { description: "Exterior paint — low-VOC, earth tones", amount: 1738, notes: "Materials + labor for Hardie; not needed if vinyl chosen" },
    { description: "Galvanized metal roof — materials + labor (~1,350 sq ft)", amount: 4000, notes: "Standing seam galvanized; ~$3/sq ft installed at this spec" },
  ],

  "Insulation — Rock Wool": [
    { description: "Comfortbatt — 2×6 exterior wall cavities (~900 sq ft)", amount: 1800, notes: "R-23; ~$2.00/sq ft material" },
    { description: "Comfortbatt — ceiling cavities (1,114 sq ft)", amount: 2500, notes: "R-30; installed between ceiling joists" },
    { description: "ComfortBoard 80 — exterior continuous (900 sq ft wall area)", amount: 3200, notes: "1.5in = R-6; goes over sheathing under siding. Fire-rated, no air gap needed" },
    { description: "ComfortBoard 110 — under roof deck (1,350 sq ft)", amount: 4100, notes: "1in = R-4; high-density board rated for under-roof use" },
    { description: "Safe'n'Sound — interior partition walls (600 sq ft)", amount: 1500, notes: "Sound + fire separation; master bedroom, bathrooms, laundry" },
    { description: "Installation labor", amount: 4444, notes: "Rock wool is heavier than fiberglass; specialized installer preferred" },
  ],

  "Utilities — Rough In": [
    { description: "Temporary power — construction service + meter base", amount: 2500, notes: "Set up before framing; Alabama Power hookup itself is FREE" },
    { description: "Well drilling — approx 250 ft depth (rural AL typical)", amount: 8500, notes: "Depth varies; driller quotes by the foot" },
    { description: "Well pump, pressure tank, and wiring", amount: 2200 },
    { description: "Water filtration system (sediment + carbon + UV)", amount: 3500, notes: "AL well water often needs iron/sediment filtration" },
    { description: "Septic system — conventional 3-bedroom", amount: 14000, notes: "Shelby County; perc test required first. Alternative systems cost more" },
    { description: "Propane tank — 500 gal, set, and first fill", amount: 2426, notes: "Tank can be rented or purchased; rental is more common" },
    { description: "Electrical rough-in — panel, service entrance, circuits", amount: 10000, notes: "200A panel; all rough wiring, boxes, grounding. Does NOT include fixtures" },
    { description: "Plumbing rough-in — supply + drain + vent (14 fixture count)", amount: 8500, notes: "All in-wall piping only; fixtures are separate line" },
    { description: "Cat6 Ethernet — structured wiring throughout", amount: 2500, notes: "Home run to central panel; all rooms + exterior cameras wired" },
    { description: "Gravel driveway — approx 200 ft", amount: 5000, notes: "Crushed stone; adjust for actual driveway length" },
  ],

  "HVAC & Mechanical": [
    { description: "2-zone ductless mini split — 2 heads + outdoor unit", amount: 5500, notes: "e.g. Mitsubishi or Daikin 2×12,000 BTU; sized for tight rock wool envelope" },
    { description: "Mini split installation labor", amount: 1200 },
    { description: "HRV/ERV fresh air ventilation unit", amount: 2500, notes: "Required with tight rock wool envelope; HEPA filtration model preferred" },
    { description: "HRV/ERV ducting and installation", amount: 600 },
    { description: "Wood burning stove", amount: 1000, notes: "Backup heat + ambiance; EPA-certified model" },
    { description: "Stove chimney liner, cap, and installation", amount: 300 },
  ],

  "Plumbing Fixtures": [
    { description: "Tankless propane water heater", amount: 1400, notes: "Rinnai or Navien recommended; sized for 2+ simultaneous fixtures" },
    { description: "Toilets — 3 units (elongated, 1.28 GPF)", amount: 900 },
    { description: "60-inch master soaking tub", amount: 1000 },
    { description: "Tub/shower combo units — 2 (fiberglass or acrylic)", amount: 900 },
    { description: "Master tiled shower — pan + wall tile + niche + glass door", amount: 2000, notes: "Materials only; labor in tile/Interior Finishes line" },
    { description: "Vanities — 3 units (solid wood, low-VOC finish)", amount: 1200 },
    { description: "Faucets + shower valves + hardware — all baths", amount: 1000, notes: "Budget for mid-range; upgrade if desired" },
    { description: "Misc — supply lines, shut-offs, drain assemblies", amount: 450 },
  ],

  "Interior Finishes": [
    { description: "Shiplap — main living areas + hallways (~2,000 sq ft of wall)", amount: 5000, notes: "Solid wood shiplap preferred; primed poplar or pine. Price reflects low-tox preference" },
    { description: "Solid wood cabinets — kitchen", amount: 6000, notes: "Formaldehyde-free; semi-custom. IKEA avoided due to particle board/formaldehyde" },
    { description: "Solid wood cabinets — 3 bathrooms", amount: 2500 },
    { description: "Quartz countertops — kitchen + 3 baths", amount: 5800, notes: "~$65/sq ft installed; includes sink cutout" },
    { description: "Hardwood flooring — living, dining, bedrooms (~700 sq ft)", amount: 5600, notes: "Solid hardwood, site-finished. No carpet per low-tox preference" },
    { description: "Tile flooring — baths + laundry (~250 sq ft)", amount: 1500, notes: "Materials only" },
    { description: "Tile installation labor (baths + laundry)", amount: 1750 },
    { description: "Trim — baseboards, door/window casing, crown", amount: 2800, notes: "Solid wood preferred; paint-grade poplar" },
    { description: "Zero-VOC interior paint — all rooms (materials + labor)", amount: 2056, notes: "Sherwin-Williams Harmony or similar; specify to painter" },
    { description: "Lighting fixtures (incandescent/halogen, all rooms)", amount: 900, notes: "Per low-tox preference; avoid LED where possible" },
  ],

  "Appliances": [
    { description: "Propane freestanding range (5-burner)", amount: 900 },
    { description: "Refrigerator (counter-depth, 30in)", amount: 900 },
    { description: "Range hood (vented to exterior)", amount: 350, notes: "Exterior venting is critical; recirculating hoods are not recommended" },
    { description: "Dishwasher", amount: 550 },
    { description: "Microwave (over-range or built-in)", amount: 300 },
  ],

  "Specialty": [
    { description: "Bobcat / Side-by-Side utility vehicle (Yanmar Diesel)", amount: 4800, notes: "Used for site work, hauling materials during build" },
    { description: "Post-construction deep clean", amount: 500 },
  ],
};

export async function POST() {
  try {
    const existing = await prisma.budgetLineItem.count();
    if (existing > 0) {
      return NextResponse.json({ message: `Already seeded (${existing} line items exist). Delete first to re-seed.` });
    }

    const categories = await prisma.budgetCategory.findMany();
    const byName = Object.fromEntries(categories.map((c) => [c.name, c]));

    let created = 0;
    const skipped: string[] = [];

    for (const [catName, items] of Object.entries(breakdowns)) {
      const cat = byName[catName];
      if (!cat) { skipped.push(catName); continue; }
      for (const item of items) {
        await prisma.budgetLineItem.create({
          data: { categoryId: cat.id, description: item.description, amount: item.amount, notes: item.notes ?? null },
        });
        created++;
      }
    }

    return NextResponse.json({ success: true, lineItemsCreated: created, categoriesSkipped: skipped });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
