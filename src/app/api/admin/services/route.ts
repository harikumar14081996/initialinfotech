import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { serviceSchema } from "@/lib/validations";

async function assertAdmin() {
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
  return session;
}

export async function POST(request: Request) {
  const auth = await assertAdmin();
  if (auth instanceof NextResponse) {
    return auth;
  }

  try {
    const payload = serviceSchema.parse(await request.json());
    await prisma.service.create({
      data: {
        ...payload,
        slug: slugify(payload.title),
      },
    });
    revalidatePath("/");
    revalidatePath("/admin");
    return NextResponse.json({ message: "Service created." });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create service." },
      { status: 400 },
    );
  }
}

export async function PATCH(request: Request) {
  const auth = await assertAdmin();
  if (auth instanceof NextResponse) {
    return auth;
  }

  try {
    const payload = serviceSchema.parse(await request.json());
    if (!payload.id) {
      return NextResponse.json({ error: "Service id is required." }, { status: 400 });
    }

    await prisma.service.update({
      where: { id: payload.id },
      data: {
        title: payload.title,
        slug: slugify(payload.title),
        description: payload.description,
        iconName: payload.iconName,
        order: payload.order,
      },
    });
    revalidatePath("/");
    revalidatePath("/admin");
    return NextResponse.json({ message: "Service updated." });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to update service." },
      { status: 400 },
    );
  }
}

export async function DELETE(request: Request) {
  const auth = await assertAdmin();
  if (auth instanceof NextResponse) {
    return auth;
  }

  const { id } = (await request.json()) as { id?: string };
  if (!id) {
    return NextResponse.json({ error: "Service id is required." }, { status: 400 });
  }

  await prisma.service.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
  return NextResponse.json({ message: "Service deleted." });
}
