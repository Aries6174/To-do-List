import {Calendar, Clock, CircleCheck} from "lucide-react"
import TaskCard from "@/Components/TaskCard"
import { Task } from "@/types/task"

export default function TaskList({ tasks }: { tasks: Task[] }){
    return(
        <div className="w-full rounded-lg border border-[#E2E8F0] p-4">
            <p>Tasks: {tasks.length}</p>

            {/*Task Information (TODAY) */}
            <h1 className="flex text-lg font-bold "><Calendar className="mr-2" />Today</h1>
            
            <hr className="border-gray-300 m-2" />
            <div className="flex m-1">
                {tasks
                    .filter((task) => !task.completed)
                    .map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}
            </div>

            {/*Task Information (LATER) */}
            <h1 className="flex text-lg font-bold mt-5"><Clock className="mr-2" />Later</h1>
            
            <hr className="border-gray-300 m-2" />
            <div className="flex m-1">
                {/*<TaskCard />*/}
            </div>


            {/*Task Information (COMPLETED) */}
            <h1 className="flex text-lg font-bold mt-5"><CircleCheck className="mr-2" />Completed</h1>
            
            <hr className="border-gray-300 m-2" />
            <div className="flex m-1">
                {tasks
                    .filter((task) => task.completed)
                    .map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}
            </div>

        </div>
    );
}