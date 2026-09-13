"use client"

import { useState } from "react"
import { Task } from "@/types/task"

import Sidebar from "@/Components/Sidebar";
import Header from "@/Components/Header";
import AddTaskButton from "@/Components/AddTaskButton"
import TaskList from "@/Components/TaskList"

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Test Task",
      description: "This is a test task!",
      category: "work",
      dueDate: "2026-09-25",
      priority: "high",
      favorite: false,
      completed: false, 
    },
  ]);

  const addTask = (newTask:Task) => {
    setTasks((currentTasks) => [...currentTasks, newTask]);
  };


  return (
    <main className="flex min-h-screen bg-white text-black">
      <Sidebar />

      <div className="flex flex-1 flex-col">  {/*With Header*/}
        <Header />

        <div className="flex p-8 justify-between"> {/*Top Message*/}
          <div className="self-start">
            <h1 className="text-[25px] font-bold">
              Good Afternoon, [Name]!
            </h1>
            <p className="text-[#7E8B9E] pt-2">
              Here's what you need done today.
            </p>
          </div>
          <AddTaskButton onAddTask={addTask} />
        </div>
        <div className="px-8">
          <TaskList tasks={tasks} />
        </div>
      </div>
    </main>
  );
}
