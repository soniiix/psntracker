"use client";
import { ArrowRightIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";

export default function Home() {
    return (
        <div className="text-3xl text-center font-normal h-screen flex flex-col items-center justify-between pt-46 pb-6 px-6">
            <div className="flex flex-col items-center gap-3">
                <img src="/ps-logo.png" alt="PlayStation logo" className="h-8" />
                <h1 className="font-mont text-4xl sm:text-5xl mb-2">PSN TRACKER</h1>
                <span className="text-2xl sm:text-3xl font-light">Track and analyze your PlayStation trophy progress.</span>

                <form className="bg-secondary-bg focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-blue mt-6 pl-4 pr-2 py-2 rounded-normal text-neutral w-full max-w-[530px] text-lg flex flex-row items-center justify-between gap-2">
                    <div className="flex items-center gap-3 flex-1">
                        <MagnifyingGlassIcon size={26} className=" mt-0.5"/>
                        <input 
                            type="text" 
                            placeholder="Enter a PSN ID" 
                            className="flex-1 min-w-0 w-full focus:outline-none placeholder:text-neutral text-white"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="bg-blue-gradient px-5 py-1.5 rounded-xl text-white cursor-pointer shrink-0 w-auto"
                    >
                        Search
                    </button>
                </form>
                
            </div>
            <div className="text-sm flex flex-row items-center justify-center gap-1.5 border px-3 py-1 rounded-[10px] border-neutral">
                <span className="text-neutral">You're viewing the beta version.</span>
                <a 
                    href="https://github.com/soniiix/psntracker" 
                    className="flex flex-row items-center gap-1" 
                    target="_blank" rel="noopener noreferrer"
                >
                    Read more
                    <ArrowRightIcon className="mt-0.5" size={14} />
                </a>
            </div>
        </div>
    );
}
