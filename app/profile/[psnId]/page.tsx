"use client";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProfileHeader from "@/components/profile/ProfileHeader";

export default async function Default({ params }: {
    params: Promise<{ psnId: string }>
}) {
    const router = useRouter();
    const { psnId } = await params

    const redirectToSearch = () => {
        router.push(`/?focus=true`);
    }

    return (
        <div className="flex flex-col items-start justify-center max-w-[1000px] mx-auto pt-10 gap-5">
            {/* SITE TITLE */}
            <Link href="/" className="flex flex-row items-center gap-2.5">
                <img src="/ps-logo.png" alt="PlayStation logo" className="h-6 mb-0.5"/>
                <h1 className="text-3xl font-bold font-mont">PSN TRACKER</h1>
            </Link>

            {/* SEARCH BAR */}
            <div 
                className="bg-secondary-bg pl-4 pr-1.5 py-1.5 rounded-normal text-neutral w-full text-lg flex flex-row items-center justify-between gap-2 hover:cursor-pointer"
                onClick={redirectToSearch}
            >
                <div className="flex items-center gap-3 flex-1">
                    <MagnifyingGlassIcon size={26} className="mt-0.5"/>
                    <div 
                        className="flex-1 min-w-0 w-full text-neutral hover:cursor-pointer"
                    >
                        Enter a PSN ID
                    </div>
                </div>
                <div className="bg-blue-gradient px-5 py-2 rounded-[10px] text-white cursor-pointer shrink-0 w-auto">
                    Search
                </div>
            </div>

            <ProfileHeader/>
        </div>
    )
}