import { notFound } from "next/navigation";
import { searchPsnId } from "@/lib/psn/search";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfilePageTop from "@/components/profile/ProfilePageTop";

export default async function Profile({ params }: { params: Promise<{ psnId: string }> }) {
    const { psnId } = await params;
    const exists = await searchPsnId(psnId);

    if (!exists) {
        notFound();
    }

    return (
        <div className="flex flex-col items-start justify-center max-w-[1000px] mx-auto pt-10 gap-5">
            <ProfilePageTop />
            <ProfileHeader />
        </div>
    );
}
