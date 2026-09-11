import {Calendar, Clock, Star, MoreHorizontal} from "lucide-react"

export default function TaskCard(){
    return(
        <div className="w-full rounded-lg border border-[#E2E8F0] p-4">

            {/*Task Information (TODAY) */}
            <h1 className="flex text-lg font-bold"><Calendar className="mr-2" />Today</h1>
            <hr className="border-gray-300 m-2" />
            
            <div className="flex m-1">
                <div className="flex w-full m-1 items-center p-2">
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
            </div>

            {/*Task Information (LATER) */}
            <h1 className="flex text-lg font-bold"><Clock className="mr-2" />Later</h1>
            <hr className="border-gray-300 m-2" />

            <div className="flex m-1">
                <div className="flex w-full m-1 items-center p-2">
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
            </div>

            {/*Task Information (COMPLETED) */}
            <h1 className="flex text-lg font-bold"><Clock className="mr-2" />Later</h1>
            <hr className="border-gray-300 m-2" />

            <div className="flex m-1">
                <div className="flex w-full m-1 items-center p-2">
                    <h2 className="line-through m-1 text-gray-300">
                        <input type="checkbox" className="mr-2 h-4 w-4" defaultChecked></input>
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
            </div>

        </div>
    );
}