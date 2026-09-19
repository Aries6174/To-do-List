"use client";

import {Star, MoreHorizontal} from "lucide-react";
import{ Task } from "@/types/task"

export default function TaskCard({ task, onTaskUpdate, onTaskDelete }: { task: Task; onTaskUpdate: (task:Task) => void; onTaskDelete: (taskId: number) => void; }) {
    const handleComplete = async () => {
        const response = await fetch(`/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify({
            completed: !task.completed,
        }),
    });

    const updatedTask = await response.json();

    onTaskUpdate(updatedTask);

    };

    const handleDelete = async () => {
        const response = await fetch(`/api/tasks/${task.id}`, { 
            method: "DELETE",
        });

        if (response.ok){
            onTaskDelete(task.id);
        }
    }

    return(
        <div className="flex w-full items-center p-2">
            <h2 className="m-1">
                <input
                    type="checkbox"
                    className="mr-2 h-4 w-4"
                    checked={task.completed}
                    onChange={handleComplete}    
                />
                {task.title}
            </h2>
            <h2 className ="ml-auto text-[#7E8B9E]">
                {task.category}
            </h2>
            <h2 className ="ml-8 text-[#7E8B9E]">
                {task.dueDate}
            </h2>
            <div className="ml-8 flex items-center gap-2">
                <button>
                    <Star className="h-6 w-6 hover:text-black-400 hover:fill-yellow-400" />
                </button>
                <button onClick={handleDelete} >
                    <MoreHorizontal className="h-6 w-6 hover:text-[#7E8B9E]" />
                </button>
            </div>
        </div>

    );
}