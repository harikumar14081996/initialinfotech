import { NextResponse } from "next/server";
import { createSession, resolveCredentials, verifyPassword } from "@/lib/auth";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    email?: string;
    password?: string;
    next?: string;
  };
  const { email, password, next } = body;

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const creds = await resolveCredentials();

  if (!creds.envFallback && creds.dbUsers) {
    // DB-backed auth
    const user = creds.dbUsers.find((u: { email: string }) => u.email === email);
    if (!user) return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    const valid = await verifyPassword(password, (user as { passwordHash: string }).passwordHash);
    if (!valid) return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    await createSession(
      (user as { email: string }).email,
      (user as { role: string }).role as "admin" | "editor",
    );
  } else {
    // Env-var fallback
    const entries = [
      { role: "admin" as const, email: creds.admin!.email, password: creds.admin!.password },
      { role: "editor" as const, email: creds.editor!.email, password: creds.editor!.password },
    ];
    const match = entries.find((e) => e.email === email && e.password === password);
    if (!match) return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    await createSession(match.email, match.role);
  }

  return NextResponse.json({ message: "Signed in successfully.", redirectTo: next || "/admin" });
}
