import { notFound } from "next/navigation";
import { searchPsnId } from "@/lib/psn/search";
import { getProfileFromPsnId } from "@/lib/psn/profile";
import { getProfileGamesFromAccountId } from "@/lib/psn/profile-games";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfilePageTop from "@/components/profile/ProfilePageTop";
import ProfileStats from "@/components/profile/ProfileStats";
import GameList from "@/components/profile/games/GameList";


export default async function Profile({ params }: { params: Promise<{ psnId: string }> }) {
    const { psnId } = await params;
    const exists = await searchPsnId(psnId);

    if (!exists) {
        notFound();
    }

    const profile = await getProfileFromPsnId(psnId);
    const profileGames = await getProfileGamesFromAccountId(profile.accountId);

    return (
        <div className="flex flex-col items-start justify-center max-w-[1000px] mx-auto py-10 gap-5">
            <ProfilePageTop />
            <ProfileHeader profile={profile} />
            <ProfileStats />
            <GameList profileGames={profileGames} />
        </div>
    );
}
