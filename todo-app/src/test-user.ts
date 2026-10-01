import { db } from "@/prisma/db";

const users = await db.orm.public.User.all();
const tasks = await db.orm.public.Task.all();

console.log("Users:", users);
console.log("Tasks:", tasks);

process.exit(0);