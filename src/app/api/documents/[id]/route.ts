import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const doc = await prisma.document.update({
    where: { id: parseInt(id) },
    data: {
      ...(body.type !== undefined && { type: body.type }),
      ...(body.title !== undefined && { title: body.title }),
      ...(body.description !== undefined && { description: body.description || null }),
      ...(body.fileUrl !== undefined && { fileUrl: body.fileUrl || null }),
      ...(body.status !== undefined && { status: body.status }),
      ...(body.submittedDate !== undefined && { submittedDate: body.submittedDate ? new Date(body.submittedDate) : null }),
      ...(body.approvedDate !== undefined && { approvedDate: body.approvedDate ? new Date(body.approvedDate) : null }),
      ...(body.expiryDate !== undefined && { expiryDate: body.expiryDate ? new Date(body.expiryDate) : null }),
      ...(body.notes !== undefined && { notes: body.notes || null }),
    },
  });
  return NextResponse.json(doc);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.document.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ ok: true });
}
