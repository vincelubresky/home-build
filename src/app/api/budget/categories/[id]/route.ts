import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const category = await prisma.budgetCategory.update({
    where: { id: parseInt(id) },
    data: {
      ...(body.name !== undefined && { name: body.name }),
      ...(body.allocated !== undefined && { allocated: body.allocated }),
      ...(body.notes !== undefined && { notes: body.notes }),
    },
  });
  return NextResponse.json(category);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.budgetCategory.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ ok: true });
}
