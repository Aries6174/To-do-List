import { db } from "@/prisma/db";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/session";

export async function POST(request: Request) {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
        return Response.json(
            { error: "Email and password are required" },
            { status: 400 }
        );
    }

    const user = await db.orm.public.User
        .where({ email })
        .first();

    if (!user) {
        return Response.json(
            { error: "invalid email or password" },
            { status: 401 }
        );
    }

    const passwordMatches = await bcrypt.compare(
        password,
        user.passwordHash
    );

    if (!passwordMatches) {
        return Response.json(
            { error: "Invalid email or password" },
            { status: 401 }
        );
    }

    await createSession(user.id);

    return Response.json({
        id: user.id,
        name: user.name,
        email: user.email,
    });
}