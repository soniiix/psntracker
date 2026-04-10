import type { TrophyCounts } from "@/lib/types/trophy-counts";

export type ProfileGames = Game[];

export interface Game {
    gameId: string;
    name: string;
    platform: string;
    iconUrl: string;
    definedTrophies: TrophyCounts;
    earnedTrophies: TrophyCounts;
    progress: number;
    lastUpdatedDateTime: string;
}