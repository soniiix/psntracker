/**
 * Returns the image path for the trophy level icon based on the given playstation trophy level. It uses this calculation structure: https://blog.playstation.com/2020/10/07/upcoming-trophy-levelling-changes-detailed/
 * @param level The playstation trophy level (0-999)
 * @returns The image path for the trophy level icon
 */
export function getTrophyLevelImage(level: number): string {
    if (level >= 999) return "/images/trophy-levels/level-platinum.webp";
    if (level >= 800) return "/images/trophy-levels/level-gold-3.webp";
    if (level >= 700) return "/images/trophy-levels/level-gold-2.webp";
    if (level >= 600) return "/images/trophy-levels/level-gold-1.webp";
    if (level >= 500) return "/images/trophy-levels/level-silver-3.webp";
    if (level >= 400) return "/images/trophy-levels/level-silver-2.webp";
    if (level >= 300) return "/images/trophy-levels/level-silver-1.webp";
    if (level >= 200) return "/images/trophy-levels/level-bronze-3.webp";
    if (level >= 100) return "/images/trophy-levels/level-bronze-2.webp";
    return "/images/trophy-levels/level-bronze-1.webp";
}