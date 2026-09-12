"use client";

import{
    Star,
    Calendar,
    File,
    FileText,
    Tag,
    Flag
} from "lucide-react"


export default function TaskForm(){
    return(
        <div>
            {/*Name of Form*/}
            <h1 className="mb-5 text-4xl font-bold">Add Task</h1>

            {/*TASK NAME*/}
            <label className="flex mb-2 block text-m font-medium">
                <File className="h-5 w-5 mr-2" />Task Name
            </label>

            <input
                type="text"
                placeholder="Enter task name"
                className="mb-4 w-full rounded-lg border border-gray-300 p-2"
            />

            
            {/*DESCRIPTION*/}
            <label className="flex mb-2 block text-m font-medium">
                <FileText className="h-5 w-5 mr-2" />Description
            </label>

            <textarea
                placeholder="Enter description"
                className="mb-4 w-full rounded-lg border border-gray-300 p-2"
            />


            {/*CATEGORY*/}
            <label className="flex mb-2 block text-m font-medium">
                <Tag className="h-5 w-5 mr-2" />Category
            </label>

            <select
                className="mb-4 w-full rounded-lg border border-[#E2E8F0] bg-white px-4 py-2.5 text-[#1E293B] outline-none focus:border-[#3B82F6]"
                defaultValue=""
            >
                <option value="" disabled>Select a Category</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="school">School</option>
                <option value="health">Health</option>
            </select>


            {/*DUE DATE*/}
            <label className="flex mb-2 block text-m font-medium">
                <Calendar className="h-5 w-5 mr-2" />Due Date
            </label>
                
            <input 
                type="date"
                className="mb-4 w-full rounded-lg border border-[#E2E8F0] bg-white px-4 py-2 text-[#1E293B] outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]"
            />

            {/*PRIORITY*/}


            <label className="flex mb-1 block text-m font-medium">
                <Flag className="h-5 w-5 mr-2" />Priority
            </label>

            <div className="flex mb-2">
                {/* LOW */}
                <label className="group border border-[#3B82F6] rounded-lg flex p-1 w-1/3 m-1 hover:bg-[#3B82F6]/20 has-[:checked]:bg-[#3B82F6]/20">
                    <input
                        type="radio"
                        name="priority"
                        value="low"
                        className="peer hidden"
                    />

                    <div className="m-2 h-2 w-2 rounded-full border border-[#3B82F6] group-hover:bg-[#3B82F6] peer-checked:bg-[#3B82F6]"></div>
                    <p className="text-[#64748B] group-hover:text-black peer-checked:text-black">
                        Low
                    </p>
                </label>

                {/* MID */}
                <label className="group border border-[#F59E0B] rounded-lg flex p-1 w-1/3 m-1 hover:bg-[#F59E0B]/20 has-[:checked]:bg-[#F59E0B]/20">
                    <input
                        type="radio"
                        name="priority"
                        value="mid"
                        className="peer hidden"
                    />

                    <div className="m-2 h-2 w-2 rounded-full border border-[#F59E0B] group-hover:bg-[#F59E0B] peer-checked:bg-[#F59E0B] peer-checked:bg-[#F59E0B]"></div>
                    <p className="text-[#64748B] group-hover:text-black peer-checked:text-black">
                        Mid
                    </p>
                </label>

                {/* High */}
                <label className="group border border-[#EF4444] rounded-lg flex p-1 w-1/3 m-1 hover:bg-[#EF4444]/20 has-[:checked]:bg-[#EF4444]/20">
                    <input
                        type="radio"
                        name="priority"
                        value="high"
                        className="peer hidden"
                    />

                    <div className="m-2 h-2 w-2 rounded-full border border-[#EF4444] group-hover:bg-[#EF4444] peer-checked:bg-[#EF4444]" ></div>
                    <p className="text-[#64748B] group-hover:text-black peer-checked:text-black">
                        High
                    </p>
                </label>


            </div>

            {/*FAVORITES?*/}
            <label className="flex cursor-pointer">
                <input type="checkbox" className="peer hidden" />

                <Star className="h-5 w-5 m-1 text-[#64748B] peer-checked:fill-[#F59E0B] peer-checked:text-[#F59E0B]" /><p className="m-1" >Add to Favorites</p>
            </label>

            {/*END BUTTONS*/}
            <div className="flex justify-end gap-2">
                <button className="rounded-lg border px-4 py-2">
                    Cancel
                </button>

                <button className="rounded-lg bg-[#3b82f6] px-4 py-2 text-white">
                    Add Task
                </button>
            </div>

        </div>
    );
}