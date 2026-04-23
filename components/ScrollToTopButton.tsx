"use client";

import { ArrowUpIcon, CaretUpIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

const SCROLL_THRESHOLD_PX = 500;

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setIsVisible(window.scrollY > SCROLL_THRESHOLD_PX);
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className={`
                fixed right-6 bottom-6 z-50
                h-11 w-11 rounded-full
                bg-blue-gradient text-white
                hover:cursor-pointer hover:brightness-110
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue focus-visible:ring-offset-primary-bg
                transition-all duration-200
                ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"}
            `}
        >
            <span className="sr-only">Back to top</span>
            <CaretUpIcon size={22} weight="bold" className="mx-auto" />
        </button>
    );
}