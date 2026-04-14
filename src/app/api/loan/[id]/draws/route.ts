import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const draw = await prisma.draw.create({
    data: {
      loanId: parseInt(id),
      drawNumber: body.drawNumber,
      amount: body.amount,
      requestDate: body.requestDate ? new Date(body.requestDate) : null,
      approvedDate: body.approvedDate ? new Date(body.approvedDate) : null,
      fundedDate: body.fundedDate ? new Date(body.fundedDate) : null,
      status: body.status ?? "pending",
      notes: body.notes || null,
    },
  });
  return NextResponse.json(draw);
}
