import {Star, MoreHorizontal} from "lucide-react";

export default function TaskCard(){
    return(
        <div className="flex w-full items-center p-2">
            <h2 className="m-1">
                <input type="checkbox" className="mr-2 h-4 w-4"></input>
                Task Name TBD
            </h2>
            <h2 className ="ml-auto text-[#7E8B9E]">
                Tag
            </h2>
            <h2 className ="ml-8 text-[#7E8B9E]">
                11:11 AM
            </h2>
            <div className="ml-8 flex flex items-center gap-2">
                <button>
                    <Star className="h-6 w-6 hover:text-black-400 hover:fill-yellow-400" />
                </button>
                <button>
                    <MoreHorizontal className="h-6 w-6 hover:text-[#7E8B9E]-400" />
                </button>
            </div>
        </div>

    );
}