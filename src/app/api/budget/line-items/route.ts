import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const item = await prisma.budgetLineItem.create({
    data: {
      categoryId: body.categoryId,
      description: body.description,
      amount: body.amount,
      notes: body.notes ?? null,
    },
  });
  return NextResponse.json(item);
}
