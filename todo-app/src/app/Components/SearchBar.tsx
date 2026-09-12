import {Search} from "lucide-react"

export default function SearchBar(){
    return(
        <div className="relative">
            <Search
                className="absolute left-3 top-1/2 -translate-y-1/2"
                size={20}
            />


            {/*Search Bar*/}
            <input
                type="text"
                placeholder="Search tasks..."
                className="w-80 rounded-[10px] border border-[#7E8B9E] py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
                />
        </div>

    );
}