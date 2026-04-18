import type { TrophyCounts } from "@/lib/types/trophy-counts";

export interface ProfileGamesResponse {
    trophyTitles: ProfileGames;
    nextOffset: number | null;
    totalItemCount: number;
}

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