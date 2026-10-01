import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;

if (!secretKey) {
    throw new Error("SESSION_SECRET is not configured");
}

const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(userId: number){
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const session = await new SignJWT({ userId })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(expiresAt)
        .sign(encodedKey);

    const cookieStore = await cookies();

    cookieStore.set("session", session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: expiresAt,
    });
}

export async function verifySession(){
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;

    if(!session){
        return null;
    }

    try{
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ["HS256"],
        });

        if(typeof payload.userId !== "number"){
            return null;
        };

        return { userId: payload.userId };
    } catch {
        return null;
    }
}

export async function deleteSession(){
    const cookieStore = await cookies();
    
    cookieStore.delete("session");
}