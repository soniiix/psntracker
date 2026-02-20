"use client";

import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import Link from "next/link";

export default function ProfilePageTop() {
    return (
        <>
            <Link href="/" className="flex flex-row items-center gap-2.5">
                <img src="/ps-logo.png" alt="PlayStation logo" className="h-6 mb-0.5" />
                <h1 className="text-3xl font-bold font-mont">PSN TRACKER</h1>
            </Link>

            <Link
                href={"/?focus=true"}
                className="bg-secondary-bg pl-4 pr-1.5 py-1.5 rounded-normal text-neutral w-full text-lg flex flex-row items-center justify-between gap-2 hover:cursor-pointer"
            >
                <div className="flex items-center gap-3 flex-1">
                    <MagnifyingGlassIcon size={26} className="mt-0.5" />
                    <div className="flex-1 min-w-0 w-full text-neutral">
                        Enter a PSN ID
                    </div>
                </div>

                <div className="bg-blue-gradient px-5 py-2 rounded-[10px] text-white shrink-0 w-auto">
                    Search
                </div>
            </Link>
        </>
    )
}