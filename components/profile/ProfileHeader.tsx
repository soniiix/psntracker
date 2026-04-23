import type { Profile } from "@/lib/types/profile";
import { getTrophyLevelImage } from "@/lib/utils/getTrophyLevelImage";
import { trimString } from "@/lib/utils/trimString";

export default function ProfileHeader({ profile, firstActivityYear }: { profile: Profile; firstActivityYear: number | null }) {
    const level = profile.trophySummary?.level ?? 0;
    const trophyLevelImage = getTrophyLevelImage(level);
    const earnedTrophies = profile.trophySummary?.earnedTrophies;
    const totalTrophies =
        (earnedTrophies?.platinum ?? 0) +
        (earnedTrophies?.gold ?? 0) +
        (earnedTrophies?.silver ?? 0) +
        (earnedTrophies?.bronze ?? 0);

    return (
        <section className="bg-secondary-bg w-full rounded-normal h-[350px] flex flex-col justify-between items-center border-l-gradient-rounded overflow-hidden">
            <div className="w-full h-[187px] flex items-center justify-center gap-[164px] pl-3.5">
                {/* Profile info */}
                <div className="flex items-center justify-center gap-5">
                    <img 
                        src={profile.avatarUrl ?? "/images/avatar-placeholder.jpg"} 
                        alt={`${profile.onlineId}'s avatar`} 
                        className="w-34 h-34 rounded-full border border-divider"
                    />
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-start gap-2.5">
                            <span className="text-3xl font-bold">{profile.onlineId}</span>
                            {profile.isPsPlus && (
                                <img src="/images/ps-plus-logo.png" alt="PlayStation Plus logo" className="h-7 mt-0.5" />
                            )}
                        </div>
                        <span className={`text-xl text-neutral ${!profile.aboutMe ? 'italic' : ''}`}>
                            {trimString(profile.aboutMe) ?? "No about me."}
                        </span>
                        <div className="flex items-center justify-start gap-2.5">
                            <img src="/images/ps-logo.png" alt="PlayStation logo" className="h-4 mt-0.5" />
                            <span className="text-xl">
                                Joined PSN in {firstActivityYear ?? "unknown"}
                            </span>
                        </div>
                    </div>
                </div>
                {/* Trophy level */}
                <div className="flex gap-5">
                    <img src={trophyLevelImage} alt="Trophy level icon" className="w-22 h-22 rounded-full" />
                    <div className="flex flex-col">
                        <span className="text-neutral -mb-1 text-[17px]">Level</span>
                        <div className="flex w-full items-end justify-between">
                            <span className="text-[28px] font-medium -mb-0.75">{profile.trophySummary?.level ?? 0}</span>
                            <span className="text-[18px]">
                                {profile.trophySummary?.level === 999
                                    ? 100
                                    : (profile.trophySummary?.progress ?? 0)}
                                %
                            </span>
                        </div>
                        <div className="bg-progress-bar mt-2 w-48 h-2.5 rounded-full overflow-hidden">
                            <div 
                                className="bg-ps-plus h-full w-0" 
                                style={{ width: `${profile.trophySummary?.level === 999 ? 100 : (profile.trophySummary?.progress ?? 0)}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full h-[1px] bg-divider"></div>

            {/* Trophy summary */}
            <div className="flex items-center justify-center w-full h-[162px] text-center pl-3.5">
                <div className="flex items-center justify-between w-[778px] h-full">
                    {/* Platinum trophies */}
                    <div className="flex items-end mb-2 justify-start gap-2">
                        <div className="w-14.5 h-17 flex items-end justify-center shrink-0">
                            <img src="/images/platinum-trophy.png" alt="Platinum trophy icon" className="block w-full h-full object-contain mb-0.25" />
                        </div>
                        <span className="text-[22px] leading-none">{earnedTrophies?.platinum ?? 0}</span>
                    </div>
                    {/* Gold trophies */}
                    <div className="flex items-end justify-center gap-2">
                        <div className="w-14.5 h-14.5 flex items-end justify-center shrink-0">
                            <img src="/images/gold-trophy.png" alt="Gold trophy icon" className="block w-full h-full object-contain" />
                        </div>
                        <span className="text-[22px] leading-none">{earnedTrophies?.gold ?? 0}</span>
                    </div>
                    {/* Silver trophies */}
                    <div className="flex items-end justify-center gap-2">
                        <div className="w-14.5 h-14.5 flex items-end justify-center shrink-0">
                            <img src="/images/silver-trophy.png" alt="Silver trophy icon" className="block w-full h-full object-contain" />
                        </div>
                        <span className="text-[22px] leading-none">{earnedTrophies?.silver ?? 0}</span>
                    </div>
                    {/* Bronze trophies */}
                    <div className="flex items-end justify-center gap-2">
                        <div className="w-14.5 h-14.5 flex items-end justify-center shrink-0">
                            <img src="/images/bronze-trophy.png" alt="Bronze trophy icon" className="block w-full h-full object-contain" />
                        </div>
                        <span className="text-[22px] leading-none">{earnedTrophies?.bronze ?? 0}</span>
                    </div>
                    
                    <div className="h-17.5 w-[1px] bg-divider"></div>

                    {/* Total trophies */}
                    <div className="flex flex-col items-start justify-end gap-2">
                        <span className="text-neutral text-[22px] leading-none">Total</span>
                        <span className="text-[30px] font-medium leading-none">{totalTrophies}</span>
                    </div>
                </div>
            </div>
        </section>
    )
}