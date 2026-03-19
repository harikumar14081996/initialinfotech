import { NextResponse } from "next/server";
import { getSession, hashPassword, verifyPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: "No database configured." }, { status: 500 });

  const { currentPassword, newPassword } = (await request.json()) as {
    currentPassword: string;
    newPassword: string;
  };

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: "Both currentPassword and newPassword are required." }, { status: 400 });
  }
  if (newPassword.length < 8) {
    return NextResponse.json({ error: "New password must be at least 8 characters." }, { status: 400 });
  }

  const user = await prisma.adminUser.findUnique({ where: { email: session.email } });
  if (!user) {
    return NextResponse.json({ error: "User not found in database. Please create a DB user first." }, { status: 404 });
  }

  const valid = await verifyPassword(currentPassword, user.passwordHash);
  if (!valid) {
    return NextResponse.json({ error: "Current password is incorrect." }, { status: 401 });
  }

  const passwordHash = await hashPassword(newPassword);
  await prisma.adminUser.update({ where: { email: session.email }, data: { passwordHash } });

  return NextResponse.json({ message: "Password changed successfully." });
}
