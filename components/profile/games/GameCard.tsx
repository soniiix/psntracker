import { CalendarBlankIcon, CheckIcon, ClockIcon } from "@phosphor-icons/react";

export default function GameCard({ game }: { game: any }) {
    const hasPlatinum = (game?.definedTrophies?.platinum ?? game?.earnedTrophies?.platinum ?? 0) > 0;

    console.log(game);
    return (
        <div className="flex w-full">
            <div className="w-30 h-30 bg-alternate-bg/50 flex items-center justify-center flex-shrink-0">
                <img
                    src={game.iconUrl}
                    alt={`${game.name} cover`}
                />
            </div>

            <div className="flex justify-between px-5 py-4 flex-1">
                {/* GAME INFO */}
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <h3 className="text-[20px] font-medium">{game.name}</h3>
                        <div className="flex items-center gap-3">
                            <span className={`${game.platform === 'PS5' ? 'bg-white text-black' : 'text-white bg-black ring-[0.25px] ring-[#A4A4A4]'} px-2 py-[2.5px] rounded-sm text-[11px] font-rave`}>
                                {game.platform}
                            </span>
                            <div className="flex items-center text-neutral gap-1.5">
                                <ClockIcon size={19} className="-mb-0.5" />
                                <span className="text-[17px]">00h played</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-neutral">
                            <CalendarBlankIcon size={19} className="-mb-0.5" />
                            <span className="text-[17px]">
                                Last played on {new Date(game.lastUpdatedDateTime).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>

                {/* TROPHIES */}
                <div className="flex flex-col h-full w-80 justify-center gap-5.5">
                    {/* TROPHIES EARNED / TOTAL */}
                    <div className="flex items-center justify-between gap-2">
                        {/* Platinum */}
                        <div className="flex items-end justify-start gap-2">
                            {(hasPlatinum) ? (
                            <div
                                className={`h-10 mb-0.5 flex items-end justify-center shrink-0 ${game?.earnedTrophies?.platinum > 0 ? "opacity-100" : "opacity-10"}`}
                            >
                                <img
                                    src="/images/platinum-trophy.png"
                                    alt="Platinum trophy icon"
                                    className="block w-full h-full object-contain"
                                />
                            </div>
                            ) : (
                                <div className="bg-emerald-500/10  p-1.5 rounded-full -mr-1.5 ">
                                    <CheckIcon size={24} weight="bold" className="text-green-400" />
                                </div>
                            )}
                        </div>
                        {/* Gold */}
                        <div className="flex items-end justify-center gap-2">
                            <div className="w-8 h-9 flex items-end justify-center shrink-0">
                                <img src="/images/gold-trophy.png" alt="Gold trophy icon" className="block w-full h-full object-contain" />
                            </div>
                            <div className="leading-none -mb-1">
                                <span className="font-medium text-lg">
                                    {game.earnedTrophies?.gold ?? 0}
                                </span>
                                <span className="text-neutral text-[15px]">/{game.definedTrophies?.gold ?? 0}</span>
                            </div>
                        </div>
                        {/* Silver */}
                        <div className="flex items-end justify-center gap-2">
                            <div className="w-8 h-9 flex items-end justify-center shrink-0">
                                <img src="/images/silver-trophy.png" alt="Silver trophy icon" className="block w-full h-full object-contain" />
                            </div>
                            <div className="leading-none -mb-1">
                                <span className="font-medium text-lg">
                                    {game.earnedTrophies?.silver ?? 0}
                                </span>
                                <span className="text-neutral text-[15px]">/{game.definedTrophies?.silver ?? 0}</span>
                            </div>
                        </div>
                        {/* Bronze */}
                        <div className="flex items-end justify-center gap-2">
                            <div className="w-8 h-9 flex items-end justify-center shrink-0">
                                <img src="/images/bronze-trophy.png" alt="Bronze trophy icon" className="block w-full h-full object-contain" />
                            </div>
                            <div className="leading-none -mb-1">
                                <span className="font-medium text-lg">
                                    {game.earnedTrophies?.bronze ?? 0}
                                </span>
                                <span className="text-neutral text-[15px]">/{game.definedTrophies?.bronze ?? 0}</span>
                            </div>
                        </div>
                    </div>
                    {/* PROGRESS BAR */}
                    <div className="flex items-center gap-3">
                        <div className="bg-progress-bar w-full h-3 rounded-full overflow-hidden">
                            <div className="bg-blue-gradient h-full rounded-full" style={{ width: `${game.progress}%` }} />
                        </div>
                        <span className="leading-none text-[17px] text-neutral">{game.progress}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}