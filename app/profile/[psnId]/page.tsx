import { notFound } from "next/navigation";
import { searchPsnId } from "@/lib/psn/search";
import { getProfileFromPsnId } from "@/lib/psn/profile";
import { getProfileGamesFromAccountId } from "@/lib/psn/profile/games";
import { getProfileStatsFromAccountId } from "@/lib/psn/profile/stats";
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
    const [profileGamesPage, profileStats] = await Promise.all([
        getProfileGamesFromAccountId(profile.accountId),
        getProfileStatsFromAccountId(profile.accountId),
    ]);

    return (
        <div className="flex flex-col items-start justify-center max-w-[1000px] mx-auto py-10 gap-5">
            <ProfilePageTop />
            <ProfileHeader profile={profile} firstActivityYear={profileStats.firstActivityYear} />
            <ProfileStats stats={profileStats} />
            <GameList
                accountId={profile.accountId}
                profileGames={profileGamesPage.trophyTitles}
                initialNextOffset={profileGamesPage.nextOffset}
                totalGamesCount={profileGamesPage.totalItemCount}
            />
        </div>
    );
}
