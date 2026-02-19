import { notFound } from "next/navigation";
import { searchPsnId } from "@/lib/psn/search";
import ProfilePage from "./ProfilePage";

export default async function Profile({ params }: { params: Promise<{ psnId: string }> }) {
    const { psnId } = await params;
    const exists = await searchPsnId(psnId);

    if (!exists) {
        notFound();
    }

    return <ProfilePage psnId={psnId} />;
}
