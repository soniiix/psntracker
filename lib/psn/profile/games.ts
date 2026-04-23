import { getAuthenticationToken } from "@/lib/psn/auth/index";
import { ProfileGamesResponse } from "@/lib/types/profile-games";

const PAGE_SIZE = 100;

export async function getProfileGamesFromAccountId(
    accountId: string,
    offset = 0,
    limit = PAGE_SIZE,
): Promise<ProfileGamesResponse> {
    const accessToken = await getAuthenticationToken();

    const url = new URL(`https://m.np.playstation.com/api/trophy/v1/users/${accountId}/trophyTitles`);
    url.searchParams.set("offset", String(offset));
    url.searchParams.set("limit", String(limit));

    const response = await fetch(url.toString(), {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        const errorText = await response.text();

        throw new Error(`Failed to fetch profile games (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    const trophyTitles = data.trophyTitles ?? [];

    return {
        trophyTitles: trophyTitles.map((title: any) => ({
            gameId: title.npCommunicationId,
            name: title.trophyTitleName,
            platform: title.trophyTitlePlatform,
            iconUrl: title.trophyTitleIconUrl,
            definedTrophies: title.definedTrophies,
            earnedTrophies: title.earnedTrophies,
            progress: title.progress,
            lastUpdatedDateTime: title.lastUpdatedDateTime,
        })),
        nextOffset: data.nextOffset ?? null,
        totalItemCount: data.totalItemCount ?? trophyTitles.length,
    };
}

/**
 * Retrieves all profile games for a given account ID by paginating through results. This is useful for calculating aggregate stats across all games.
 * @param accountId 
 * @returns
 */
export async function getAllProfileGamesFromAccountId(accountId: string) {
    const allGames = [];
    let offset: number | null = 0;

    while (offset !== null) {
        const page = await getProfileGamesFromAccountId(accountId, offset, PAGE_SIZE);
        allGames.push(...page.trophyTitles);
        offset = page.nextOffset;
    }

    return allGames;
}