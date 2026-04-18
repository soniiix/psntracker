"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ProfileGames } from "@/lib/types/profile-games";
import { ArrowsDownUpIcon, GameControllerIcon } from "@phosphor-icons/react";
import GameCard from "./GameCard";

interface GameListProps {
    accountId: string;
    profileGames: ProfileGames;
    initialNextOffset: number | null;
    totalGamesCount: number;
}

interface ProfileGamesApiResponse {
    trophyTitles: ProfileGames;
    nextOffset: number | null;
    totalItemCount: number;
}

export default function GameList({
    accountId,
    profileGames,
    initialNextOffset,
    totalGamesCount,
}: GameListProps) {
    const [games, setGames] = useState<ProfileGames>(profileGames);
    const [nextOffset, setNextOffset] = useState<number | null>(initialNextOffset);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    const loadMoreGames = useCallback(async () => {
        if (isLoading || nextOffset === null) {
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/psn/profile-games/${accountId}?offset=${nextOffset}&limit=100`);

            if (!response.ok) {
                throw new Error(`Failed to fetch more games (${response.status})`);
            }

            const page: ProfileGamesApiResponse = await response.json();
            setGames((prevGames) => {
                const prevIds = new Set(prevGames.map((game) => game.gameId));
                const newUniqueGames = page.trophyTitles.filter((game) => !prevIds.has(game.gameId));
                return [...prevGames, ...newUniqueGames];
            });
            setNextOffset(page.nextOffset);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unable to load more games");
        } finally {
            setIsLoading(false);
        }
    }, [accountId, isLoading, nextOffset]);

    useEffect(() => {
        const sentinel = loadMoreRef.current;

        if (!sentinel) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    loadMoreGames();
                }
            },
            { root: null, rootMargin: "200px 0px", threshold: 0 }
        );

        observer.observe(sentinel);

        return () => {
            observer.disconnect();
        };
    }, [loadMoreGames]);

    return (
        <section className="bg-secondary-bg w-full rounded-normal flex flex-col overflow-hidden">
            {/* SECTION HEADER: total games displayed, and filters buttons */}
            <div className="bg-alternate-bg rounded-t-normal flex items-center justify-between px-6 py-3.5">
                <h2 className="text-[20px]">{games.length}/{totalGamesCount} games displayed</h2>
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
                {games.length === 0 ? (
                    <div className="p-6 text-center text-lg">No games found.</div>
                ) : (
                    games.map((game) => (
                        <GameCard key={game.gameId} game={game} />
                    ))
                )}

                {error && <div className="px-6 py-4 text-center text-red-300">{error}</div>}
                {isLoading && <div className="px-6 py-4 text-center text-neutral">Loading more games...</div>}
            </div>

            {nextOffset !== null && <div ref={loadMoreRef} className="h-1" />}
        </section>
    );
}