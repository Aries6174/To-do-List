import { db } from "@/prisma/db";
import { taskSchema } from "@/lib/validations/task"
import { verifySession } from "@/lib/session";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await verifySession();

    if (!session) {
        return Response.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    const { id } = await params;

    const taskId = Number(id);

    if (!Number.isInteger(taskId) || taskId <= 0) {
        return Response.json(
            { error: "Invalid task ID" },
            { status: 400 }
        );
    }

    const existingTask = await db.orm.public.Task
        .where({ id: taskId, userId: session.userId })
        .first();

    if (!existingTask) {
        return Response.json(
            { error: "Task not found" },
            { status: 404 }
        );
    }

    const body = await request.json();

    const result = taskSchema.partial().safeParse(body);

    if (!result.success) {
        return Response.json(
            { errors: result.error.flatten().fieldErrors },
            { status: 400 }
        );
    }

    if (Object.keys(result.data).length === 0 && body.completed === undefined) {
        return Response.json(
            { errors: "No fields to update" },
            { status: 400 }
        );
    }

    const updateData: Record<string, unknown> = {};

    if (result.data.title !== undefined) updateData.title = result.data.title;
    if (result.data.description !== undefined) updateData.description = result.data.description;
    if (result.data.category !== undefined) updateData.category = result.data.category;
    if (result.data.dueDate !== undefined) updateData.dueDate = result.data.dueDate;
    if (result.data.priority !== undefined) updateData.priority = result.data.priority;
    if (result.data.favorite !== undefined) updateData.favorite = result.data.favorite;

    if (body.completed !== undefined) {
        if (typeof body.completed !== "boolean") {
            return Response.json(
                { error: "Completed must be a boolean" },
                { status: 400 }
            );
        }

        updateData.completed = body.completed;
    }

    await db.orm.public.Task
        .where({ id: taskId, userId: session.userId })
        .update(updateData);

    const updatedTask = await db.orm.public.Task
        .where({ id: taskId, userId: session.userId })
        .first();

    return Response.json(updatedTask);
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await verifySession();

    if (!session) {
        return Response.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    const { id } = await params;

    const taskId = Number(id);

    if (!Number.isInteger(taskId) || taskId <= 0) {
        return Response.json(
            { error: "Invalid task ID" },
            { status: 400 }
        );
    }

    const existingTask = await db.orm.public.Task
        .where({ id: taskId, userId: session.userId })
        .first();

    if (!existingTask) {
        return Response.json(
            { error: "Task not found" },
            { status: 404 }
        );
    }

    await db.orm.public.Task
        .where({ id: taskId, userId: session.userId })
        .delete();

    return Response.json({ success: true });
}