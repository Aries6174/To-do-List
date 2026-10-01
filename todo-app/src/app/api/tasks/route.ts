import { db } from "@/prisma/db";
import { taskSchema } from "@/lib/validations/task";
import { verifySession } from "@/lib/session";

export async function GET() {
    const session = await verifySession();
    
    if(!session) {
        return Response.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    const tasks = await db.orm.public.Task
        .where({ userId: session.userId })
        .all();

    return Response.json(tasks);
}

export async function POST(request: Request) {
    const session = await verifySession();

    if (!session) {
        return Response.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

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
        userId: session.userId,
    });

    return Response.json(task, { status: 201 });
}