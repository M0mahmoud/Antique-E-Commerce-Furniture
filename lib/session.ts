import { SessionPayload } from "@/types/api";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.AUTH_SECRET;
export const key = new TextEncoder().encode(secretKey);

export async function decrypt(session: string | undefined = "") {
    try {
        const { payload }: { payload: SessionPayload } = await jwtVerify(
            session,
            key,
        );
        return payload;
    } catch (error) {
        console.log("Failed to verify session");
        return null;
    }
}

export async function verifySession(): Promise<boolean> {
    const cookie = (await cookies()).get("token")?.value;
    if (!cookie) {
        console.log("token cookie not found");
        return false;
    }
    const session: SessionPayload | null = await decrypt(cookie);

    if (!session?.userID) {
        return false;
    }
    return true;
}
