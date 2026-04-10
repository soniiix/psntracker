import { getAuthenticationToken } from "@/lib/psn/auth/index";
import { ProfileGames } from "../types/profile-games";

export async function getProfileGamesFromAccountId(accountId: string): Promise<ProfileGames> {
    const accessToken = await getAuthenticationToken();

    const url = `https://m.np.playstation.com/api/trophy/v1/users/${accountId}/trophyTitles`;

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        const errorText = await response.text();

        throw new Error(`Failed to fetch profile games (${response.status}): ${errorText}`);
    }

    const data = await response.json(); // contains trophyTitles[], nextOffset, totalItemCount
    const trophyTitles = data.trophyTitles ?? [];

    // TODO: Handle pagination

    return trophyTitles.map((title: any) => ({
        gameId: title.npCommunicationId,
        name: title.trophyTitleName,
        platform: title.trophyTitlePlatform,
        iconUrl: title.trophyTitleIconUrl,
        definedTrophies: title.definedTrophies,
        earnedTrophies: title.earnedTrophies,
        progress: title.progress,
        lastUpdatedDateTime: title.lastUpdatedDateTime,
    }));
}