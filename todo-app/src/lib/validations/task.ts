import { z } from "zod";

export const taskSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string(),
    category: z.string().min(1, "Category is required"),
    dueDate: z.string().min(1, "Due date is required"),
    priority: z.enum(["low", "mid", "high"]),
    favorite: z.boolean()
});