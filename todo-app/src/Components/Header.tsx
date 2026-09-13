import {Sun} from "lucide-react"
import Image from "next/image"
import SearchBar from "./SearchBar"


export default function Header(){
    return(
        <header className="flex items-center justify-between border-b p-6">
            <SearchBar />
            
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