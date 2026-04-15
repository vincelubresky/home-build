import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: Promise<{ drawId: string }> }) {
  const { drawId } = await params;
  const body = await req.json();
  const draw = await prisma.draw.update({
    where: { id: parseInt(drawId) },
    data: {
      ...(body.drawNumber !== undefined && { drawNumber: body.drawNumber }),
      ...(body.amount !== undefined && { amount: body.amount }),
      ...(body.status !== undefined && { status: body.status }),
      ...(body.requestDate !== undefined && { requestDate: body.requestDate ? new Date(body.requestDate) : null }),
      ...(body.approvedDate !== undefined && { approvedDate: body.approvedDate ? new Date(body.approvedDate) : null }),
      ...(body.fundedDate !== undefined && { fundedDate: body.fundedDate ? new Date(body.fundedDate) : null }),
      ...(body.notes !== undefined && { notes: body.notes || null }),
    },
  });
  return NextResponse.json(draw);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ drawId: string }> }) {
  const { drawId } = await params;
  await prisma.draw.delete({ where: { id: parseInt(drawId) } });
  return NextResponse.json({ ok: true });
}
