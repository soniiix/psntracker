import { getAllProfileGamesFromAccountId } from "@/lib/psn/profile/games";

/**
 * Retrieves the first activity year from trophy titles for a user.
 * Priority:
 * 1) earliest game with earned trophies
 * 2) earliest game in list (even at 0%)
 */
export async function getFirstActivityYearFromAccountId(accountId: string): Promise<number | null> {
    try {
        const allGames = await getAllProfileGamesFromAccountId(accountId);
        if (allGames.length === 0) {
            return null;
        }

        // Filter games where at least one trophy has been earned
        const gamesWithTrophies = allGames.filter((game) => {
            const earned = game.earnedTrophies ?? {};
            const totalEarned = (earned.platinum ?? 0) + (earned.gold ?? 0) + (earned.silver ?? 0) + (earned.bronze ?? 0);
            return totalEarned > 0;
        });

        // Prefer oldest game with at least one earned trophy
        const trophyTimestamps = gamesWithTrophies
            .map((game) => new Date(game.lastUpdatedDateTime).getTime())
            .filter((time) => Number.isFinite(time));

        if (trophyTimestamps.length > 0) {
            const firstTrophyTime = Math.min(...trophyTimestamps);
            return new Date(firstTrophyTime).getFullYear();
        }

        // Fallback: oldest game date, even if progress is 0%
        const allGameTimestamps = allGames
            .map((game) => new Date(game.lastUpdatedDateTime).getTime())
            .filter((time) => Number.isFinite(time));

        if (allGameTimestamps.length === 0) {
            return null;
        }

        const firstGameTime = Math.min(...allGameTimestamps);
        return new Date(firstGameTime).getFullYear();
    } catch (error) {
        console.error("Failed to get first trophy year:", error);
        return null;
    }
}