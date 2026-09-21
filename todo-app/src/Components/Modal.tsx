"use client";

import {X} from "lucide-react"

export default function Modal({
    children,
    onClose,
}: {
    children: React.ReactNode;
    onClose:() => void;
}) {
    return(
        <div className="fixed inset-0 z-50 flex item-center justify-center bg-black/40">
            <div
                role="dialog"
                className="max-h-[100vh] w-full max-w-lg overflow-y-auto rounded-xl border bg-white p-6 shadow-xl"
                >
                <div className="flex justify-end">
                    <button onClick={onClose} className="text-gray-500 hover:text-[#1E293B]">
                        <X></X>
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}