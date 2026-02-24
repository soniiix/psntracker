export interface TrophySummary {
    level: number;
    progress: number;
    earnedTrophies: {
        platinum: number;
        gold: number;
        silver: number;
        bronze: number;
    };
}

export interface Profile {
    onlineId: string;
    avatarUrl: string | null;
    isPsPlus: boolean;
    aboutMe: string;
    trophySummary: TrophySummary | null;
}