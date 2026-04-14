import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const expenses = await prisma.expense.findMany({
    orderBy: { date: "desc" },
  });
  return NextResponse.json(expenses);
}

export async function POST(req: Request) {
  const body = await req.json();
  const expense = await prisma.expense.create({
    data: {
      description: body.description,
      amount: body.amount,
      date: new Date(body.date),
      vendor: body.vendor || null,
      categoryId: body.categoryId,
    },
  });
  return NextResponse.json(expense);
}
