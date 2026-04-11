import { CalendarBlankIcon, ClockIcon } from "@phosphor-icons/react";

export default function GameCard({ game }: { game: any }) {
    console.log(game);
    return (
        <div className="flex w-full">
            <div className="w-30 h-30 bg-alternate-bg/50 flex items-center justify-center flex-shrink-0">
                <img
                    src={game.iconUrl}
                    alt={`${game.name} cover`}
                />
            </div>

            <div className="flex justify-between px-5 flex-1">
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
                            <CalendarBlankIcon size={19} className="-mb-0.5"/>
                            <span className="text-[17px]">
                                Last played on {new Date(game.lastUpdatedDateTime).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>

                {/* TROPHIES */}
                <div className="flex items-center gap-6">
                    fdz
                </div>
            </div>   
        </div>
    );
}