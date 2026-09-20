"use client"

import { useEffect, useState } from "react"
import { Task } from "@/types/task"

import Sidebar from "@/Components/Sidebar";
import Header from "@/Components/Header";
import AddTaskButton from "@/Components/AddTaskButton"
import TaskList from "@/Components/TaskList"

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);


  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = 
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      (task.description ?? "").toLowerCase().includes(search.toLowerCase()) ||
      task.category.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "active" && !task.completed) ||
      (filter === "completed" && task.completed)||
      (filter === "favorites" && task.favorite);

      return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    const getTasks = async () => {
      try{
        const response = await fetch("/api/tasks");

        if (!response.ok){
          throw new Error("Failed to fetch task");
        }
        const tasks = await response.json();
        
        setTasks(tasks);
        setLoading(false);
      } catch (error) {
        setError(true);
      } finally{
        setLoading(false);
      }
    };

    getTasks();
  }, []);

  const addTask = (newTask:Task) => {
    setTasks((currentTasks) => [...currentTasks, newTask]);
  };


  return (
    <main className="flex min-h-screen bg-white text-black">
      <Sidebar />

      <div className="flex flex-1 flex-col">  {/*With Header*/}
        <Header 
          onSearch={setSearch}
          onFilterChange={setFilter}   
        />

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
          {loading ? (
            <div className="py-10 text-center text-[#7e8b9e]">
              Loading tasks...
              </div>
              ) : error ? (
                <div className="py-10 text-center text-red-500">
                  Failed to load tasks.
                </div>
              ) : filteredTasks.length === 0 ? (
                <div className="py-10 text-center text-[#7e8b9e]">
                  No tasks found.
                  </div>
              ) : (
              <TaskList
                tasks={filteredTasks} 
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
          )}
        </div>
      </div>
    </main>
  );
}
