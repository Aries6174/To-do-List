import { db } from "@/prisma/db";
import { taskSchema } from "@/lib/validations/task"

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id:string}> }
) {
    const { id } = await params;
    const body = await request.json();

    const result = taskSchema.partial().safeParse(body);

    if (!result.success) {
        return Response.json(
            { errors: result.error.flatten().fieldErrors },
            { status: 400 }
        );
    }

    const updateData: Record<string, unknown> = {}

    if (body.title !== undefined) updateData.title = body.title;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.category !== undefined) updateData.category = body.category;
    if (body.dueDate !== undefined) updateData.dueDate = body.dueDate;
    if (body.priority !== undefined) updateData.priority = body.priority;
    if (body.favorite !== undefined) updateData.favorite = body.favorite;
    if (body.completed !== undefined) updateData.completed = body.completed;

    await db.orm.public.Task
        .where({ id: Number(id) })
        .update(updateData);

    const updatedTask = await db.orm.public.Task
        .where({ id: Number(id) })
        .first();

    return Response.json(updatedTask);
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string}>}
){
    const {id} = await params;

    await db.orm.public.Task
        .where({ id: Number(id) })
        .delete();

    return Response.json({ success: true })
}