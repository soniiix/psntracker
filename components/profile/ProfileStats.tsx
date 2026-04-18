import type { ProfileStats } from "@/lib/types/profile-stats";

export default function ProfileStats({ stats }: { stats: ProfileStats }) {
    return (
        <section className="bg-secondary-bg w-full rounded-normal flex items-center justify-between px-10 py-8">
            <div className="flex items-end justify-center gap-2">
                <span className="text-2xl font-medium">{stats.gamesPlayed}</span>
                <span className="text-neutral uppercase text-[15px] font-medium">
                    {stats.gamesPlayed === 1 ? "Game played" : "Games played"}
                </span>
            </div>
            <div className="flex items-end justify-center gap-2">
                <span className="text-2xl font-medium">{stats.completedGames}</span>
                <span className="text-neutral uppercase text-[15px] font-medium">
                    {stats.completedGames === 1 ? "Completed game" : "Completed games"}
                </span>
            </div>
            <div className="flex items-end justify-center gap-2">
                <span className="text-2xl font-medium">{stats.completionRate.toFixed(2)}%</span>
                <span className="text-neutral uppercase text-[15px] font-medium">Completion</span>
            </div>
            <div className="flex items-end justify-center gap-2 ">
                <span className="text-2xl font-medium">{stats.trophiesPerDay.toFixed(2)}</span>
                <span className="text-neutral uppercase text-[15px] font-medium">Trophies per day</span>
            </div>
        </section>
    );
}