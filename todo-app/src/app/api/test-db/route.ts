import { db } from "@/prisma/db";

export async function GET() {


    const task = await db.orm.public.Task.create({
            title: "Database Test",
            description: "Testing PostgreSQL connection",
            category: "work",
            dueDate: new Date().toISOString(),
            priority: "high",
            favorite: false,
            completed: false,
    });

    return Response.json(task);
}