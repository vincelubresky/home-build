import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const docs = await prisma.document.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(docs);
}

export async function POST(req: Request) {
  const body = await req.json();
  const doc = await prisma.document.create({
    data: {
      type: body.type,
      title: body.title,
      description: body.description || null,
      fileUrl: body.fileUrl || null,
      status: body.status ?? "pending",
      submittedDate: body.submittedDate ? new Date(body.submittedDate) : null,
      approvedDate: body.approvedDate ? new Date(body.approvedDate) : null,
      expiryDate: body.expiryDate ? new Date(body.expiryDate) : null,
      notes: body.notes || null,
    },
  });
  return NextResponse.json(doc);
}
