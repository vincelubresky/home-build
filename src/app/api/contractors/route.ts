import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const contractors = await prisma.contractor.findMany({
    include: { notes: { orderBy: { date: "desc" } } },
    orderBy: { name: "asc" },
  });
  return NextResponse.json(contractors);
}

export async function POST(req: Request) {
  const body = await req.json();
  const contractor = await prisma.contractor.create({
    data: {
      name: body.name,
      trade: body.trade,
      company: body.company || null,
      phone: body.phone || null,
      email: body.email || null,
      status: body.status ?? "active",
    },
  });
  return NextResponse.json(contractor);
}
