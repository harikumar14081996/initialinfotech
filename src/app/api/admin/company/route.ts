import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { companyInfoSchema } from "@/lib/validations";

export async function PATCH(request: Request) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  if (session.role !== "admin") {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "DATABASE_URL is not configured." }, { status: 500 });
  }

  try {
    const payload = companyInfoSchema.parse(await request.json());
    await prisma.companyInfo.upsert({
      where: { id: "primary" },
      update: payload,
      create: {
        id: "primary",
        ...payload,
      },
    });

    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/contact");
    revalidatePath("/admin");

    return NextResponse.json({ message: "Company information updated." });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to update company info." },
      { status: 400 },
    );
  }
}
