import { SessionPayload } from "@/lib/definitions";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.AUTH_SECRET;
export const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 week")
    .sign(key);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload }: { payload: SessionPayload } = await jwtVerify(
      session,
      key,
      {
        algorithms: ["HS256"],
      }
    );
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
    return null;
  }
}

export async function createSession(id: number | string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId: id, expiresAt });

  (await cookies()).delete("session");
  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function verifySession(): Promise<{
  isAuth: boolean;
  session?: SessionPayload;
}> {
  const cookie = (await cookies()).get("session")?.value;
  if (!cookie) {
    console.log("Session cookie not found");
    return { isAuth: false };
  }
  const session: SessionPayload | null = await decrypt(cookie);

  if (!session?.userId) {
    return { isAuth: false };
  }
  return { isAuth: true, session };
}
