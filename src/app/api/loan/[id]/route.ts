import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const loan = await prisma.loan.update({
    where: { id: parseInt(id) },
    data: {
      ...(body.lender !== undefined && { lender: body.lender }),
      ...(body.loanType !== undefined && { loanType: body.loanType }),
      ...(body.totalAmount !== undefined && { totalAmount: body.totalAmount }),
      ...(body.interestRate !== undefined && { interestRate: body.interestRate }),
      ...(body.closingDate !== undefined && { closingDate: body.closingDate ? new Date(body.closingDate) : null }),
      ...(body.notes !== undefined && { notes: body.notes || null }),
    },
  });
  return NextResponse.json(loan);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.loan.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ ok: true });
}
