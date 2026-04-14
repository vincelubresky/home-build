import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const milestones = await prisma.milestone.findMany({ orderBy: [{ phase: "asc" }, { targetDate: "asc" }] });
  return NextResponse.json(milestones);
}

export async function POST(req: Request) {
  const body = await req.json();
  const milestone = await prisma.milestone.create({
    data: {
      phase: body.phase,
      title: body.title,
      description: body.description || null,
      status: body.status ?? "upcoming",
      startDate: body.startDate ? new Date(body.startDate) : null,
      targetDate: body.targetDate ? new Date(body.targetDate) : null,
      completedDate: body.completedDate ? new Date(body.completedDate) : null,
      notes: body.notes || null,
    },
  });
  return NextResponse.json(milestone);
}
