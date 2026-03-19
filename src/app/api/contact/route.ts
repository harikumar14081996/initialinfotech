import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: "DATABASE_URL is missing. Configure PostgreSQL before submitting inquiries." },
        { status: 500 },
      );
    }

    const payload = contactSchema.parse(await request.json());

    await prisma.contactInquiry.create({ data: payload });
    revalidatePath("/admin");

    return NextResponse.json({ message: "Inquiry submitted successfully." });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to submit inquiry." },
      { status: 400 },
    );
  }
}
