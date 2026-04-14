import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// One-shot endpoint: corrects budget categories based on updated project info.
// Recalculates Foundation (now includes basement structure), reduces Utilities
// (Alabama Power hookup is free), updates roof/exterior notes.
export async function POST() {
  try {
    const categories = await prisma.budgetCategory.findMany({ orderBy: { name: "asc" } });
    const byName = Object.fromEntries(categories.map((c) => [c.name, c]));

    const updates: Array<{ name: string; allocated?: number; notes?: string; newName?: string }> = [
      {
        name: "Foundation",
        newName: "Foundation & Basement Structure",
        allocated: 52000,
        notes:
          "Excavation (~1,114 sq ft footprint, 8-9 ft deep), perimeter + interior footings, poured/block basement walls, main floor deck (engineered lumber joists), exterior waterproofing, drain tile, sump pit, rough basement floor (gravel/thin slab). Basement structurally complete but unfinished — finishing is Phase 2.",
      },
      {
        name: "Utilities — Rough In",
        allocated: 59126,
        notes:
          "Temp power service ($2,500), well + filtration system ($14,000), septic system ($15,000), propane tank 500gal + set ($2,000), electrical rough-in / panel / service entrance ($10,000), plumbing rough-in 14 fixtures ($8,500), Cat6 Ethernet throughout ($2,500), gravel driveway ($4,626). NOTE: Alabama Power utility hookup is FREE — no service extension fee.",
      },
      {
        name: "Exterior — Siding & Roof",
        notes:
          "Hardie Board & Batten (pending final decision vs vinyl), 15 windows, 15 doors, exterior paint (earth tones — warm brown/tan/sage), galvanized metal roof",
      },
      {
        name: "Basement — Phase 2 (TBD)",
        notes:
          "Basement structure (excavation, walls, waterproofing) is included in Foundation & Basement Structure above. This Phase 2 budget covers interior finishing only: insulation, flooring, drywall, HVAC extension, plumbing extension, lighting. Est $40k–$60k if finished. Decision TBD after main floor complete.",
      },
    ];

    const results = [];

    for (const u of updates) {
      const cat = byName[u.name];
      if (!cat) {
        results.push({ name: u.name, status: "not found — skipped" });
        continue;
      }
      const data: Record<string, unknown> = {};
      if (u.newName) data.name = u.newName;
      if (u.allocated !== undefined) data.allocated = u.allocated;
      if (u.notes !== undefined) data.notes = u.notes;
      await prisma.budgetCategory.update({ where: { id: cat.id }, data });
      results.push({ name: u.name, newName: u.newName, status: "updated" });
    }

    // Recalculate contingency (10% of all other non-contingency/basement categories)
    const updated = await prisma.budgetCategory.findMany();
    const base = updated
      .filter((c) => !c.name.startsWith("Contingency") && !c.name.startsWith("Basement"))
      .reduce((s, c) => s + c.allocated, 0);
    const newContingency = Math.round(base * 0.1);
    const contCat = updated.find((c) => c.name.startsWith("Contingency"));
    if (contCat) {
      await prisma.budgetCategory.update({
        where: { id: contCat.id },
        data: { allocated: newContingency, notes: `10% buffer on $${base.toLocaleString()} base — strongly recommended for new build` },
      });
      results.push({ name: contCat.name, status: `updated contingency to $${newContingency.toLocaleString()}` });
    }

    const finalCats = await prisma.budgetCategory.findMany({ orderBy: { name: "asc" } });
    const total = finalCats.reduce((s, c) => s + c.allocated, 0);
    return NextResponse.json({ success: true, results, newTotal: total });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
