import { db } from "@/prisma/db";

export async function GET() {
    const tasks = await db.orm.public.Task.all();

    return Response.json(tasks);
}

export async function POST(request: Request) {
    const body = await request.json();

    const task = await db.orm.public.Task.create({
        title: body.title,
        description: body.description,
        category: body.category,
        dueDate: body.dueDate,
        priority: body.priority,
        favorite: body.favorite ?? false,
        completed: false,
    });

    return Response.json(task);
}