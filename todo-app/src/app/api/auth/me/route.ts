import { db } from "@/prisma/db";
import { verifySession } from "@/lib/session";

export async function GET(){
    const session = await verifySession();

    if (!session) {
        return Response.json(
            { error: "Not authenticated" },
            { status: 401 }
        );
    }

    const user = await db.orm.public.User
    .where({ id: session.userId })
    .first();

    if (!user) {
        return Response.json(
            { error: "User not found" },
            { status: 404}
        )
    };

    return Response.json({
        id: user.id,
        name: user.name,
        email: user.email,
    });
}