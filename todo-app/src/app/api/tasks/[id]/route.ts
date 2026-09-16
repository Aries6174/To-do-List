import { db } from "@/prisma/db";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id:string}> }
) {
    const { id } = await params;
    const body = await request.json();

    console.log("PATCH received:", id, body);

    const task = await db.orm.public.Task
        .where({ id: Number(id) })
        .update({
            completed: body.completed,
        });

    console.log("Updated Task:", body);

    return Response.json(task);
}