import { createHmac, randomBytes, timingSafeEqual } from "crypto";

import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "rws_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function signPayload(payload: string) {
  const secret = getRequiredEnv("ADMIN_SESSION_SECRET");

  return createHmac("sha256", secret).update(payload).digest("hex");
}

function safeCompare(left: string, right: string) {
  const leftHash = createHmac("sha256", "admin-compare").update(left).digest();
  const rightHash = createHmac("sha256", "admin-compare").update(right).digest();

  return timingSafeEqual(leftHash, rightHash);
}

export function verifyAdminPassword(password: string) {
  const expectedPassword = getRequiredEnv("ADMIN_ACCESS_PASSWORD");

  if (!password) {
    return false;
  }

  return safeCompare(password, expectedPassword);
}

function createSessionToken() {
  const issuedAt = Date.now().toString();
  const nonce = randomBytes(16).toString("hex");
  const payload = `${issuedAt}.${nonce}`;
  const signature = signPayload(payload);

  return `${payload}.${signature}`;
}

function isValidSessionToken(token: string | undefined) {
  if (!token) {
    return false;
  }

  const parts = token.split(".");

  if (parts.length !== 3) {
    return false;
  }

  const [issuedAt, nonce, signature] = parts;
  const payload = `${issuedAt}.${nonce}`;
  const expectedSignature = signPayload(payload);

  if (!safeCompare(signature, expectedSignature)) {
    return false;
  }

  const issuedAtNumber = Number(issuedAt);

  if (!Number.isFinite(issuedAtNumber)) {
    return false;
  }

  const ageMs = Date.now() - issuedAtNumber;
  const maxAgeMs = SESSION_MAX_AGE_SECONDS * 1000;

  return ageMs >= 0 && ageMs <= maxAgeMs;
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  return isValidSessionToken(token);
}

export async function setAdminSession() {
  const cookieStore = await cookies();

  cookieStore.set(ADMIN_COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();

  cookieStore.delete(ADMIN_COOKIE_NAME);
}
