"use client"

import { useEffect, useState } from "react"
import { Task } from "@/types/task"

import Sidebar from "@/Components/Sidebar";
import Header from "@/Components/Header";
import AddTaskButton from "@/Components/AddTaskButton"
import TaskList from "@/Components/TaskList"

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const getTasks = async () => {
      const response = await fetch("/api/tasks");
      const tasks = await response.json();
      
      setTasks(tasks);
    }

    getTasks();
  }, []);

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
          <TaskList
            tasks={tasks} 
            onTaskUpdate={(updatedTask) => {
              setTasks((currentTask) =>
                currentTask.map((task) =>
                  task.id === updatedTask.id ? updatedTask: task
                ));
            }}
            
            onTaskDelete={(taskId) => {
              setTasks((currentTasks) =>
                currentTasks.filter((task) => task.id !== taskId))
            }}
          />
        </div>
      </div>
    </main>
  );
}
