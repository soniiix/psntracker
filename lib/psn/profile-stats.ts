import { getAllProfileGamesFromAccountId } from "@/lib/psn/profile-games";
import { ProfileStats } from "@/lib/types/profile-stats";

export async function getProfileStatsFromAccountId(accountId: string): Promise<ProfileStats> {
    const allGames = await getAllProfileGamesFromAccountId(accountId);
    const gamesPlayed = allGames.length;

    if (gamesPlayed === 0) {
        return {
            gamesPlayed: 0,
            completedGames: 0,
            completionRate: 0,
            trophiesPerDay: 0,
        };
    }

    const completedGames = allGames.filter((game) => (game.progress ?? 0) >= 100).length;
    const completionRate = (completedGames / gamesPlayed) * 100;

    const totalEarnedTrophies = allGames.reduce((acc, game) => {
        const earned = game.earnedTrophies ?? {};
        return acc + (earned.platinum ?? 0) + (earned.gold ?? 0) + (earned.silver ?? 0) + (earned.bronze ?? 0);
    }, 0);

    const timestamps = allGames
        .map((game) => new Date(game.lastUpdatedDateTime).getTime())
        .filter((time) => Number.isFinite(time));
    const firstActivity = timestamps.length > 0 ? Math.min(...timestamps) : Date.now();
    const daysActive = Math.max(1, Math.ceil((Date.now() - firstActivity) / (1000 * 60 * 60 * 24)));
    const trophiesPerDay = totalEarnedTrophies / daysActive;

    return {
        gamesPlayed,
        completedGames,
        completionRate,
        trophiesPerDay,
    };
}
