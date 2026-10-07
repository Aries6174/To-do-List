"use client";

import {
  House,
  Check,
  Calendar,
  Star,
  CircleCheck,
  Settings,
  LogOut,
} from "lucide-react";

import { useRouter } from "next/navigation";

export default function Sidebar(){
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { 
            method: "POST",
        });

        router.push("/login");
    };
    
    return(
        <aside className="w-64 min-h-screen bg-[#1A2331] p-6 text-white shadow-2xl">
            <h1 className="mb-8 text-2xl font-bold flex">
                <Check className="mr-3 text-[#3B82F6]" />TaskFlow
            </h1>

            <nav className="space-y-2">
                <a
                href="#"
                className="group my-2 flex rounded-lg px-4 py-2 hover:bg-gray-200 hover:text-[#1A2331]"
                >
                <House className="mr-3 text-[#3B82F6] group-hover:text-[#8FB8FF]" /> All Tasks
                </a>

                <a
                href="#"
                className="group block rounded-lg px-4 py-2 hover:bg-gray-200 hover:text-[#1A2331] my-2 flex"
                >
                <Calendar className="mr-3 text-[#3B82F6] group-hover:text-[#8FB8FF]" />Today
                </a>

                <a
                href="#"
                className="group block rounded-lg px-4 py-2 hover:bg-gray-200 hover:text-[#1A2331] my-2 flex"
                >
                <Star className="mr-3 text-[#3B82F6] group-hover:text-[#8FB8FF]" />Important
                </a>

                <a
                href="#"
                className="group block rounded-lg px-4 py-2 hover:bg-gray-200 hover:text-[#1A2331] my-2 flex"
                >
                <CircleCheck className="mr-3 text-[#3B82F6] group-hover:text-[#8FB8FF]" />Completed
                </a>

            </nav>

            <div className="h-px w-full rounded-full bg-[#E2E8F0]" />

            <nav className="space-y-2">
                <a
                href="#"
                className="group block rounded-lg px-4 py-2 hover:bg-gray-200 hover:text-[#1A2331] my-2 flex"
                >
                <Settings className="mr-3 text-[#3B82F6] group-hover:text-[#8FB8FF]" />Settings   
                </a>
            </nav>
            <button
                onClick={handleLogout}
                className="group block w-full rounded-lg px-4 py-2 hover:bg-gray-200 hover:text-[#1A2331] my-2 flex">
                    <LogOut className="mr-3 text-[#3B82F6] group-hover:text-[#8FB8FF]" />
                    Logout
                </button>

        </aside>
    );
}