"use client";

import { Star, MoreHorizontal } from "lucide-react";
import { Task } from "@/types/task";
import { useState } from "react";
import Modal from "./Modal";
import TaskForm from "./TaskForm";

export default function TaskCard({ task, onTaskUpdate, onTaskDelete }: { task: Task; onTaskUpdate: (task:Task) => void; onTaskDelete: (taskId: number) => void; }) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    const handleFavorite = async () => {
        const response = await fetch(`/api/tasks/${task.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                favorite: !task.favorite,
            }),
        });

        const updatedTask = await response.json();

        onTaskUpdate(updatedTask);
    }

    const formattedDate = task.dueDate
        ? new Date(task.dueDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
        : "No due date";


    return(
        <>
            <div className="flex w-full flex-wrap items-center gap-3 rounded-lg border border-[#E2E8F0] p-3 transition hover:bg-[#F8FAFC]">
                <h2 className={`m-1 min-w-0 flex-1 ${
                    task.completed
                        ? "text-[#7E8B9E] line-through"
                        : "text-black"
                }`}
                >
                    <input
                        type="checkbox"
                        className="mr-2 h-4 w-4"
                        checked={task.completed}
                        onChange={handleComplete}    
                    />
                    {task.title}
                </h2>
                <h2 className ="ml-auto flex items-center gap-3">
                    <span className="text-[#7E8B9E]">
                        {task.category}
                    </span>

                    <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                            task.priority === "high"
                            ? "bg-red-100 text-red-600"
                            : task.priority === "mid"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                    >
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                </h2>
                <h2 className ="ml-8 text-[#7E8B9E]">
                    {formattedDate}
                </h2>
                <div className="ml-8 flex items-center gap-2">
                    <button onClick={handleFavorite} aria-label="Favorite task">
                        <Star 
                            className={`h-6 w-6 hover:text-yellow-400 hover:fill-yellow-400 ${
                            task.favorite
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-[#7E8B9E]"
                            }`}
        
                        />
                    </button>
                    <div className="relative">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} >
                            <MoreHorizontal className="h-6 w-6 hover:text-[#7E8B9E]" />
                        </button>

                        {isMenuOpen && (
                            <div className="absolute right-0 z-10 w-24 rounded-lg border bg-white shadow-md">
                                <button
                                    onClick={() => {
                                        setIsEditOpen(true);
                                        setIsMenuOpen(false);
                                }}
                                className="block w-full px-3 py-2 text-left hover:border hover:rounded-lg hover:bg-gray-100"
                            >
                                Edit
                                </button>
                                
                                <button
                                    onClick={() => {
                                        handleDelete();
                                        setIsMenuOpen(false);
                                    }}
                                    className="block w-full px-3 py-2 text-left text-red-500 hover:bg-gray-100"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>    
                </div>
            </div>

            {isEditOpen && (
                <Modal onClose={() => setIsEditOpen(false)}>
                    <TaskForm
                        task = {task}
                        onAddTask={(updatedTask) => {
                            onTaskUpdate(updatedTask);
                            setIsEditOpen(false);
                        }}
                        onClose={() => setIsEditOpen(false)}
                    />
                </Modal>
            )}
        </>
    );
}