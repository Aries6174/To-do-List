import {Plus} from "lucide-react"

export default function AddTaskButton(){
    return(
        <button className="flex self-start rounded-lg bg-[#3B82F6] px-2 py-2 text-white hover:bg-blue-600">
            <Plus className="pr-2" />Add Task
        </button>
    );
}