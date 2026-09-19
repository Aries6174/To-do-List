import { db } from "@/prisma/db";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id:string}> }
) {
    const { id } = await params;
    const body = await request.json();

    await db.orm.public.Task
        .where({ id: Number(id) })
        .update({
            completed: body.completed,
        });

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