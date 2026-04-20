"use client";

import ProfilePageTop from "@/components/profile/ProfilePageTop";
import Link from "next/link";

export default function ErrorPage({ error }: { error: Error & { digest?: string } }) {
    return (
        <div className="flex flex-col items-start justify-center max-w-[1000px] mx-auto pt-10 gap-5">
            <ProfilePageTop />

            <section className="bg-secondary-bg w-full rounded-normal p-12 border-l-gradient-rounded flex flex-col items-center justify-center gap-6 min-h-[400px]">
                <img src="/images/astro-bot-angry.png" className="h-40 mr-3.5 -mt-1" />
                <h2 className="text-6xl font-bold font-mont text-blue-gradient -my-3">ERROR</h2>
                <div className="text-center">
                    <p className="text-lg text-neutral">Something went wrong: {error.message}</p>
                </div>
                <Link href="/?focus=true" className="px-6 py-3 bg-blue-gradient text-white rounded-[10px] font-medium hover:opacity-90 transition-opacity">
                    Back to search
                </Link>
            </section>
        </div>
    );
}