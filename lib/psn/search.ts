import { getAuthenticationToken } from "./auth";

/**
 * Searches for the given PSN ID using the Sony PlayStation API. 
 * It checks if the PSN ID exists by making a POST request to the universal search endpoint. 
 * If an exact match is found, it returns true, otherwise it returns false.
 * @param psnId
 * @returns boolean indicating if the PSN ID was found or not.
 */
export async function searchPsnId(psnId: string): Promise<boolean> {
    const accessToken = await getAuthenticationToken();

    // Dev env case
    if (psnId.toLowerCase() === process.env.PSN_ID) {
        return true;
    }

    const res = await fetch(
        "https://m.np.playstation.com/api/search/v1/universalSearch",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                searchTerm: psnId,
                domainRequests: [{ domain: "SocialAllAccounts" }],
            }),
        }
    );

    const data = await res.json();

    const results = data.domainResponses?.[0]?.results ?? []; // Get all search results

    const exactMatch = results.find(
        (r: any) =>
            r.socialMetadata?.onlineId?.toLowerCase() === psnId.toLowerCase() // Find the exact match for the PSN ID
    );

    return !!exactMatch;
}
