import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const doc = await prisma.document.update({ where: { id: parseInt(id) }, data: body });
  return NextResponse.json(doc);
}
