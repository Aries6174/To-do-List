import {Calendar, Clock, CircleCheck} from "lucide-react"
import TaskCard from "@/Components/TaskCard"
import { Task } from "@/types/task"

export default function TaskList({
    tasks,
    onTaskUpdate,
    onTaskDelete,
}: {
    tasks: Task[];
    onTaskUpdate: (task: Task) => void;
    onTaskDelete: (taskId: number) => void;
}) {

    const today = new Date().toISOString().split("T")[0];

    const todayTasks = tasks.filter((task) => !task.completed && task.dueDate <= today);

    const laterTasks = tasks.filter((task) => !task.completed && task.dueDate > today);
    
    const completedTask = tasks.filter((task) => task.completed)

    return(
        <div className="w-full rounded-lg border border-[#E2E8F0] p-4">
            {/*Task Information (TODAY) */}
            <h1 className="flex text-lg font-bold "><Calendar className="mr-2" />Today</h1>
            
            <hr className="border-gray-300 m-2" />
            <div className="flex flex-col m-1">
                {todayTasks
                    .map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onTaskUpdate={onTaskUpdate}
                            onTaskDelete={onTaskDelete}
                        />
                    ))}
            </div>

            {/*Task Information (LATER) */}
            <h1 className="flex text-lg font-bold mt-5"><Clock className="mr-2" />Later</h1>
            
            <hr className="border-gray-300 m-2" />
            <div className="flex flex-col m-1">
                {laterTasks.map((task) =>(
                    <TaskCard
                        key={task.id}
                        task={task}
                        onTaskUpdate={onTaskUpdate}
                        onTaskDelete={onTaskDelete}
                    />
                ))}
            </div>


            {/*Task Information (COMPLETED) */}
            <h1 className="flex text-lg font-bold mt-5"><CircleCheck className="mr-2" />Completed</h1>
            
            <hr className="border-gray-300 m-2" />
            <div className="flex flex-col m-1">
                {completedTask
                    .map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onTaskUpdate={onTaskUpdate}
                            onTaskDelete={onTaskDelete}
                        />
                    ))}
            </div>

        </div>
    );
}