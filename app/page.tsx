"use client";
import { ArrowRightIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const inputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (searchParams.get("focus") === "true") {
            inputRef.current?.focus();
        }
    }, [searchParams]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const psnId = formData.get("psn-id") as string;
    
        if (!psnId.trim()) {
            setError("Please enter a PSN ID.");
            return;
        }

        // Validate PSN ID format (alphanumeric, underscores, hyphens, 3-16 characters)
        if (!/^[a-zA-Z0-9_-]{3,16}$/.test(psnId)) {
            setError("Invalid PSN ID format. Please try again.");
            return;
        }

        // TODO: Check if PSN ID exists using the API
        // If it exists, navigate to the profile page
        router.push(`/profile/${psnId}`);
    }

    return (
        <div className="text-3xl text-center font-normal h-screen flex flex-col items-center justify-between pt-46 pb-6 px-6 relative overflow-hidden">
            <div className="flex flex-col items-center gap-3 relative">
                <div className="top-blue-glow"></div>
                <img src="/ps-logo.png" alt="PlayStation logo" className="h-8" />
                <h1 className="font-mont text-4xl sm:text-5xl mb-2">PSN TRACKER</h1>
                <span className="text-2xl sm:text-3xl font-light">Track and analyze your PlayStation trophy progress.</span>

                <form 
                    className={`bg-secondary-bg focus-within:outline-2 focus-within:outline-offset-3 mt-8 pl-4 pr-1.5 py-1.5 rounded-normal text-neutral w-full max-w-[530px] text-lg flex flex-row items-center justify-between gap-2 ${error ? ' focus-within:outline-red-500' : 'focus-within:outline-blue'}`}
                    onSubmit={handleSubmit}
                >
                    <div className="flex items-center gap-3 flex-1">
                        <MagnifyingGlassIcon size={26} className="mt-0.5"/>
                        <input 
                            ref={inputRef}
                            type="text" 
                            name="psn-id"
                            placeholder="Enter a PSN ID" 
                            className="flex-1 min-w-0 w-full focus:outline-none placeholder:text-neutral text-white"
                            autoComplete="off"
                            onInput={() => setError(null)}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="bg-blue-gradient px-5 py-2 rounded-[10px] text-white cursor-pointer shrink-0 w-auto"
                    >
                        Search
                    </button>
                </form>
                {error && <div className="w-full max-w-[530px] text-red-500 text-lg mt-2">
                    <span>Error: {error}</span>
                </div>}
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
                <div className="bottom-blue-glow"></div>
            </div>
        </div>
    );
}
