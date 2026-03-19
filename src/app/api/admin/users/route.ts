import { NextResponse } from "next/server";
import { getSession, hashPassword, verifyPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// ── GET: list all admin users (admin only) ───────────────────────────────────
export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  if (session.role !== "admin") return NextResponse.json({ error: "Admin only." }, { status: 403 });
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: "No database." }, { status: 500 });

  const users = await prisma.adminUser.findMany({
    select: { id: true, email: true, role: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(users);
}

// ── POST: create a new admin user (admin only) ───────────────────────────────
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  if (session.role !== "admin") return NextResponse.json({ error: "Admin only." }, { status: 403 });
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: "No database." }, { status: 500 });

  const { email, password, role } = (await request.json()) as {
    email: string;
    password: string;
    role: string;
  };

  if (!email || !password || !["admin", "editor"].includes(role)) {
    return NextResponse.json({ error: "email, password and role (admin|editor) are required." }, { status: 400 });
  }

  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (existing) return NextResponse.json({ error: "A user with that email already exists." }, { status: 409 });

  const passwordHash = await hashPassword(password);
  await prisma.adminUser.create({ data: { email, passwordHash, role } });
  return NextResponse.json({ message: "User created successfully." });
}

// ── PATCH: update a user's email or role (admin only) ────────────────────────
export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  if (session.role !== "admin") return NextResponse.json({ error: "Admin only." }, { status: 403 });
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: "No database." }, { status: 500 });

  const { id, email, role } = (await request.json()) as { id: string; email?: string; role?: string };
  if (!id) return NextResponse.json({ error: "User ID required." }, { status: 400 });

  await prisma.adminUser.update({ where: { id }, data: { email, role } });
  return NextResponse.json({ message: "User updated." });
}

// ── DELETE: remove a user (admin only, cannot delete self) ───────────────────
export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  if (session.role !== "admin") return NextResponse.json({ error: "Admin only." }, { status: 403 });
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: "No database." }, { status: 500 });

  const { id } = (await request.json()) as { id: string };
  const target = await prisma.adminUser.findUnique({ where: { id } });
  if (!target) return NextResponse.json({ error: "User not found." }, { status: 404 });
  if (target.email === session.email) return NextResponse.json({ error: "You cannot delete your own account." }, { status: 400 });

  await prisma.adminUser.delete({ where: { id } });
  return NextResponse.json({ message: "User deleted." });
}
