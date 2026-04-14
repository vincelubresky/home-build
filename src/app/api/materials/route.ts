import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const materials = await prisma.material.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json(materials);
}

export async function POST(req: Request) {
  const body = await req.json();
  const material = await prisma.material.create({
    data: {
      name: body.name,
      category: body.category,
      quantity: body.quantity,
      unit: body.unit,
      unitCost: body.unitCost ?? null,
      totalCost: body.totalCost ?? null,
      status: body.status ?? "needed",
      vendor: body.vendor || null,
      orderDate: body.orderDate ? new Date(body.orderDate) : null,
      deliveryDate: body.deliveryDate ? new Date(body.deliveryDate) : null,
      notes: body.notes || null,
    },
  });
  return NextResponse.json(material);
}
