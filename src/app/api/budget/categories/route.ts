import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = await prisma.budgetCategory.findMany({
    include: { expenses: true, lineItems: { orderBy: { createdAt: "asc" } } },
    orderBy: { name: "asc" },
  });
  const enriched = categories.map((c) => ({
    ...c,
    spent: c.expenses.reduce((s, e) => s + e.amount, 0),
  }));
  return NextResponse.json(enriched);
}

export async function POST(req: Request) {
  const body = await req.json();
  const category = await prisma.budgetCategory.create({
    data: { name: body.name, allocated: body.allocated, notes: body.notes || null },
  });
  return NextResponse.json(category);
}
