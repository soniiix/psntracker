import { getAuthenticationToken } from "@/lib/psn/auth/index";
import type { Profile } from "@/lib/types/profile";

/**
 *
 * @param psnId 
 * @returns The profile information for the specified PSN ID. This includes the online ID, avatar URL, PS Plus status, about me section, and trophy summary. If the profile cannot be retrieved, an error is thrown with details about the failure.
 */
export async function getProfileFromPsnId(psnId: string): Promise<Profile> {
    const accessToken = await getAuthenticationToken();

    const fieldsToRetrieve =
        "onlineId,accountId,npId,avatarUrls,plus,aboutMe,languagesUsed,trophySummary(@default,level,progress,earnedTrophies)";

    const url = `https://us-prof.np.community.playstation.net/userProfile/v1/users/${encodeURIComponent(
        psnId
    )}/profile2?fields=${encodeURIComponent(fieldsToRetrieve)}`;

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        const errorText = await response.text();

        throw new Error(`PSN profile fetch failed (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    const profile = data.profile ?? {};

    return {
        onlineId: profile.onlineId ?? psnId,
        avatarUrl: profile.avatarUrls?.[0]?.avatarUrl ?? null,
        isPsPlus: profile.plus === 1,
        aboutMe: profile.aboutMe ?? "",
        trophySummary: profile.trophySummary
            ? {
                level: profile.trophySummary.level,
                progress: profile.trophySummary.progress,
                earnedTrophies: profile.trophySummary.earnedTrophies,
            }
            : null,
    };
}