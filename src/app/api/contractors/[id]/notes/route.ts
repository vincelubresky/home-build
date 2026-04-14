import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const note = await prisma.note.create({
    data: { contractorId: parseInt(id), content: body.content },
  });
  return NextResponse.json(note);
}
