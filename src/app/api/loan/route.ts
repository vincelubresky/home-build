import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const loans = await prisma.loan.findMany({
    include: { drawSchedule: { orderBy: { drawNumber: "asc" } } },
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(loans);
}

export async function POST(req: Request) {
  const body = await req.json();
  const loan = await prisma.loan.create({
    data: {
      lender: body.lender,
      loanType: body.loanType,
      totalAmount: body.totalAmount,
      interestRate: body.interestRate,
      closingDate: body.closingDate ? new Date(body.closingDate) : null,
      notes: body.notes || null,
    },
  });
  return NextResponse.json(loan);
}
