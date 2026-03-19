import { NextResponse } from "next/server";

import { createSession, resolveCredentials } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password, next } = body as {
    email?: string;
    password?: string;
    next?: string;
  };

  const credentials = resolveCredentials();
  const entries = [
    { role: "admin" as const, ...credentials.admin },
    { role: "editor" as const, ...credentials.editor },
  ];

  const match = entries.find((entry) => entry.email === email && entry.password === password);

  if (!match) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  await createSession(match.email, match.role);

  return NextResponse.json({
    message: "Signed in successfully.",
    redirectTo: next || "/admin",
  });
}
