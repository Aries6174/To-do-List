"use client";

import { useState } from "react";
import Modal from "./Modal";
import TaskForm from "./TaskForm";
import { Task } from "@/types/task";

import {Plus} from "lucide-react"



export default function AddTaskButton({ onAddTask }: {onAddTask: (task: Task) => void}){
    const[isOpen, setIsOpen] = useState(false);

    return(
        <>
            <button 
            onClick={() => setIsOpen(true)}
            className="flex self-start rounded-lg bg-[#3B82F6] px-2 py-2 text-white hover:bg-blue-600"
            >
                <Plus className="pr-2" />Add Task
            </button>

            {isOpen && (
                <Modal onClose={() => setIsOpen(false)}>
                    <TaskForm onAddTask={onAddTask} />
                </Modal>
            )}
        </>
    );
}