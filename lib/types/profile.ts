import type { TrophyCounts } from "@/lib/types/trophy-counts";

export interface TrophySummary {
    level: number;
    progress: number;
    earnedTrophies: TrophyCounts;
}

export interface Profile {
    accountId: string;
    onlineId: string;
    avatarUrl: string | null;
    isPsPlus: boolean;
    aboutMe: string;
    trophySummary: TrophySummary | null;
    firstActivityYear: number | null;
}