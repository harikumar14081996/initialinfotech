import { createHmac, scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const scryptAsync = promisify(scrypt);
const SESSION_COOKIE = "ii_session";

export type UserRole = "admin" | "editor";

type SessionPayload = {
  email: string;
  role: UserRole;
  exp: number;
};

function getSecret() {
  return process.env.AUTH_SECRET || "local-dev-secret-change-me";
}

function signValue(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

function encode(payload: SessionPayload) {
  const json = JSON.stringify(payload);
  const base = Buffer.from(json).toString("base64url");
  const sig = signValue(base);
  return `${base}.${sig}`;
}

function decode(token: string): SessionPayload | null {
  const [base, sig] = token.split(".");
  if (!base || !sig) return null;
  const expected = signValue(base);
  const safe =
    expected.length === sig.length &&
    timingSafeEqual(Buffer.from(expected), Buffer.from(sig));
  if (!safe) return null;
  const payload = JSON.parse(Buffer.from(base, "base64url").toString()) as SessionPayload;
  if (payload.exp < Date.now()) return null;
  return payload;
}

// ── Password hashing ────────────────────────────────────────────────────────

export async function hashPassword(plain: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derived = (await scryptAsync(plain, salt, 64)) as Buffer;
  return `${salt}:${derived.toString("hex")}`;
}

export async function verifyPassword(plain: string, stored: string): Promise<boolean> {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const derived = (await scryptAsync(plain, salt, 64)) as Buffer;
  const storedBuf = Buffer.from(hash, "hex");
  return derived.length === storedBuf.length && timingSafeEqual(derived, storedBuf);
}

// ── Credential resolution (DB first, env fallback) ──────────────────────────

export async function resolveCredentials() {
  if (process.env.DATABASE_URL) {
    try {
      const users = await prisma.adminUser.findMany();
      if (users.length > 0) {
        return { dbUsers: users, envFallback: false };
      }
    } catch {
      // DB not ready yet — fall through to env
    }
  }
  return {
    dbUsers: null,
    envFallback: true,
    admin: {
      email: process.env.ADMIN_EMAIL || "admin@initialinfotech.com",
      password: process.env.ADMIN_PASSWORD || "ChangeMe123!",
    },
    editor: {
      email: process.env.EDITOR_EMAIL || "editor@initialinfotech.com",
      password: process.env.EDITOR_PASSWORD || "ChangeMe123!",
    },
  };
}

// ── Session management ───────────────────────────────────────────────────────

export async function createSession(email: string, role: UserRole) {
  const store = await cookies();
  const token = encode({ email, role, exp: Date.now() + 1000 * 60 * 60 * 24 * 7 });
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSession() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function getSession() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return decode(token);
}
