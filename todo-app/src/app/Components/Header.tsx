import {Search, Sun} from "lucide-react"
import Image from "next/image"

export default function Header(){
    return(
        <header className="flex items-center justify-between border-b p-6">
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