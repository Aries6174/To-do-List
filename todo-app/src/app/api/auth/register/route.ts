import { db } from '@/prisma/db';
import bcrypt from "bcryptjs";

export async function POST(request: Request){
    const body = await request.json();

    const { name, email, password } = body;

    if(!name || !email || !password) {
        return Response.json(
            { error: "Name, email, and password are required" },
            { status: 400 }
        );
    }

    const existingUser = await db.orm.public.User
        .where({ email })
        .first();

    if (existingUser)  {
        return Response.json(
            { error: "Email is already registered" },
            { status: 409 }
        );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await db.orm.public.User.create({
        name,
        email,
        passwordHash
    });

    return Response.json(
        {
            id: user.id,
            name: user.name,
            email: user.email,
        },
        { status: 201 }
    );

}