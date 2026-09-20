import {Sun, FilterIcon} from "lucide-react"
import Image from "next/image"
import SearchBar from "./SearchBar"
import FilterButton from "./FilterButton"


export default function Header({
    onSearch,
    onFilterChange,
}: {
    onSearch: (search: string) => void;
    onFilterChange: (filter: string) => void;
}){
    return(
        <header className="flex items-center justify-between border-b p-6">
            <div className="flex max-w-0 items-center gap-3">
                <SearchBar onSearch={onSearch} />
                <FilterButton onFilterChange={onFilterChange} />
            </div>

            <div className="flex">
                {/*Dark Mode*/}
                <div className="rounded-full border border-[#7E8B9E] p-2 ml-3 hover:text-white hover:bg-[#7E8B9E] shadow-xl">
                    <Sun />
                </div>
                    <Image
                        src="/images/pfp_placeholder.jpg"
                        alt="PFP"
                        width={40}
                        height={40}
                        className="rounded-full border border-[#7E8B9E] outline hover:outline-1 mx-3 shadow-xl hover:border-black"/>
                        

            </div>
        </header>
    );
}