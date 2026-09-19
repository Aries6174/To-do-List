import { db } from "@/prisma/db";
import { taskSchema } from "@/lib/validations/task"

export async function GET() {
    const tasks = await db.orm.public.Task.all();
    return Response.json(tasks);
}

export async function POST(request: Request) {
    const body = await request.json();

    const result = taskSchema.safeParse(body);

    if (!result.success){
        return Response.json(
            { errors: result.error.flatten().fieldErrors },
            { status: 400 }
        );
    }

    const task = await db.orm.public.Task.create({
        title: result.data.title,
        description: result.data.description,
        category: result.data.category,
        dueDate: result.data.dueDate,
        priority: result.data.priority,
        favorite: result.data.favorite,
        completed: false,
    });

    return Response.json(task);
}