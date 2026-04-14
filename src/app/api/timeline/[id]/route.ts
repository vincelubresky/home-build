import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const data: Record<string, unknown> = { status: body.status };
  if (body.completedDate !== undefined) {
    data.completedDate = body.completedDate ? new Date(body.completedDate) : null;
  }
  const milestone = await prisma.milestone.update({ where: { id: parseInt(id) }, data });
  return NextResponse.json(milestone);
}
