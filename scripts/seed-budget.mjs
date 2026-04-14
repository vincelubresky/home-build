import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  host: "dpg-d7f67of41pts73cb8vqg-a.oregon-postgres.render.com",
  port: 5432,
  database: "homebuild",
  user: "homebuild",
  password: "cezjKf8dl2AvtnbVUo5SHWAVXLF7Tjjy",
  ssl: { rejectUnauthorized: false },
});
const prisma = new PrismaClient({ adapter });

const categories = [
  { name: "Site & Permits",            allocated: 5500,  notes: "Health dept, county permit, engineering, survey, house plans" },
  { name: "Site Prep",                 allocated: 6900,  notes: "Clearing, silt fence, equipment, final grade, seed/hay, porta-potty" },
  { name: "Foundation",                allocated: 12535, notes: "Slab prep, footings, stem walls, concrete slab (1,114 sq ft), labor, pump, waterproofing" },
  { name: "Framing & Structure",       allocated: 33338, notes: "Stick-built materials, framing labor, roofing labor, porch framing, dumpster" },
  { name: "Exterior — Siding & Roof",  allocated: 22088, notes: "Hardie Board & Batten (recommended), 15 windows, 15 doors, exterior paint, standing seam metal roof" },
  { name: "Insulation — Rock Wool",    allocated: 17544, notes: "Comfortbatt walls + ceiling, ComfortBoard 80 exterior + 110 under roof, Safe'n'Sound interior, labor" },
  { name: "Utilities — Rough In",      allocated: 62626, notes: "Temp power, well+filtration, septic, propane tank, plumbing 14 fixtures, electrical, Cat6 Ethernet, driveway" },
  { name: "HVAC & Mechanical",         allocated: 11100, notes: "2-zone ductless mini split, HRV/ERV fresh air unit, wood burning stove/fireplace kit" },
  { name: "Plumbing Fixtures",         allocated: 8850,  notes: "Tankless propane WH, 3 toilets, 60in master tub, 2 tub/shower combos, master tiled shower, 3 vanities, faucets" },
  { name: "Interior Finishes",         allocated: 33906, notes: "Shiplap (low-tox), solid wood cabinets, quartz counters, hardwood/tile flooring, tile labor, trim, zero-VOC paint, lighting" },
  { name: "Appliances",                allocated: 3000,  notes: "Propane range + separate oven, refrigerator, range hood, dishwasher" },
  { name: "Specialty",                 allocated: 5300,  notes: "Bobcat Side-by-Side Yanmar Diesel, deep clean" },
  { name: "Contingency (10%)",         allocated: 22379, notes: "10% buffer — strongly recommended for new build" },
  { name: "Basement — Phase 2 (TBD)", allocated: 0,     notes: "Not budgeted. Est $60k-$80k if finished. Decision TBD after main floor complete." },
];

async function seed() {
  console.log("Clearing existing budget data...");
  await prisma.expense.deleteMany();
  await prisma.budgetCategory.deleteMany();

  console.log("Seeding budget categories...");
  for (const cat of categories) {
    const c = await prisma.budgetCategory.create({ data: cat });
    console.log(`  ✓  $${c.allocated.toLocaleString().padStart(7)}  ${c.name}`);
  }

  const total = categories.reduce((s, c) => s + c.allocated, 0);
  console.log(`\n  Total allocated:  $${total.toLocaleString()}`);
  await prisma.$disconnect();
}

seed().catch(e => { console.error(e); process.exit(1); });
