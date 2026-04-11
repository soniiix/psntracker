"use client";

import { ProfileGames } from "@/lib/types/profile-games";
import { ArrowsDownUpIcon, GameControllerIcon } from "@phosphor-icons/react";
import GameCard from "./GameCard";

export default function GameList({ profileGames }: { profileGames: ProfileGames }) {

    return (
        <section className="bg-secondary-bg w-full rounded-normal flex flex-col overflow-hidden">
            {/* SECTION HEADER: total games displayed, and filters buttons */}
            <div className="bg-alternate-bg rounded-t-normal flex items-center justify-between px-6 py-3.5">
                <h2 className="text-[20px]">00 games displayed</h2>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-1.5 text-lg bg-[#3E4555] text-white rounded-xl flex items-center justify-center gap-2 cursor-pointer">
                        <ArrowsDownUpIcon size={20} className="-mb-0.5 -ml-0.5" />
                        Sort (last played)
                    </button>
                    <button className="px-4 py-1.5 text-lg bg-[#3E4555] text-white rounded-xl flex items-center justify-center gap-2 cursor-pointer">
                        <GameControllerIcon size={20} className="" />
                        Platform (all)
                    </button>
                </div>
            </div>

            {/* GAME LIST */}
            <div className="flex flex-col divide-y-1 divide-divider h-full">
                {/* TODO: map through games and display them with GameCard component */}
                {profileGames.length === 0 ? (
                    <div className="p-6 text-center text-lg">No games found.</div>
                ) : (
                    profileGames.map((game) => (
                        <GameCard key={game.gameId} game={game} />
                    ))
                )}
            </div>
        </section>
    );
}