import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const milestone = await prisma.milestone.update({
    where: { id: parseInt(id) },
    data: {
      ...(body.phase !== undefined && { phase: body.phase }),
      ...(body.title !== undefined && { title: body.title }),
      ...(body.description !== undefined && { description: body.description || null }),
      ...(body.status !== undefined && { status: body.status }),
      ...(body.startDate !== undefined && { startDate: body.startDate ? new Date(body.startDate) : null }),
      ...(body.targetDate !== undefined && { targetDate: body.targetDate ? new Date(body.targetDate) : null }),
      ...(body.completedDate !== undefined && { completedDate: body.completedDate ? new Date(body.completedDate) : null }),
      ...(body.notes !== undefined && { notes: body.notes || null }),
    },
  });
  return NextResponse.json(milestone);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.milestone.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ ok: true });
}
