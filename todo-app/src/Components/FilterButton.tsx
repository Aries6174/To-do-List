"use client";

import { ListFilter } from "lucide-react";
import { useState } from "react";

export default function FilterButton({
    onFilterChange,
}: {
    onFilterChange: (filter: string) => void;
}){
    const [isOpen, setIsOpen] = useState(false);

    return(
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-lg border border-[#7E8B9E] px-4 py-2 hover:bg-[#E2E8F0]">
                    <ListFilter size={20} />
                    Filter
            </button>
            {isOpen &&(
                <div className="absolute right-0 z-10 mt-2 w-40 rounded-lg border border-[#e2e8F0] bg-white p-2 shadow-lg">
                    <button
                        onClick={() => {
                            onFilterChange("all");
                            setIsOpen(false);
                        }}
                        className="w-full rounded-md px-3 py-2 text-left hover:bg-[#e2e8F0]"
                    >
                        All
                    </button>

                    <button
                        onClick={() => {
                            onFilterChange("active");
                            setIsOpen(false);
                        }}
                        className="w-full rounded-md px-3 py-2 text-left hover:bg-[#e2e8F0]"
                    >
                        Active
                    </button>
            
                    <button
                        onClick={() => {
                            onFilterChange("completed");
                            setIsOpen(false);
                        }}
                        className="w-full rounded-md px-3 py-2 text-left hover:bg-[#e2e8f0]"
                    >
                        Completed
                    </button>

                    <button
                        onClick={() => {
                            onFilterChange("favorites");
                            setIsOpen(false);
                        }}
                        className="w-full rounded-md px-3 py-2 text-left hover:bg-[#e2e8f0]"
                    >
                        Favorites
                    </button>
                </div>
            )}
        </div>
    );
}