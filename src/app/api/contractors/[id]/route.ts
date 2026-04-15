import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const contractor = await prisma.contractor.update({
    where: { id: parseInt(id) },
    data: {
      ...(body.name !== undefined && { name: body.name }),
      ...(body.trade !== undefined && { trade: body.trade }),
      ...(body.company !== undefined && { company: body.company || null }),
      ...(body.phone !== undefined && { phone: body.phone || null }),
      ...(body.email !== undefined && { email: body.email || null }),
      ...(body.status !== undefined && { status: body.status }),
    },
  });
  return NextResponse.json(contractor);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.contractor.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ ok: true });
}
