import { getAuthenticationToken } from "./auth";

export async function searchAccountId(psnId: string): Promise<{ found: boolean; accountId?: string }> {
    const accessToken = await getAuthenticationToken();

    // Dev env case
    if (psnId.toLowerCase() === process.env.PSN_ID) {
        return {
            found: true,
            accountId: "me"
        };
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

    if (!exactMatch) return { found: false };

    return {
        found: true,
        accountId: exactMatch.socialMetadata.accountId,
    };

}
