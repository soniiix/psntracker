import { getAuthenticationToken } from "@/lib/psn/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    /* CURRENTLY USED END POINTS */
    // search psn id: https://m.np.playstation.com/api/search/v1/universalSearch
    // oauth: https://ca.account.sony.com/api/authz/v3/oauth/token
    // oauth 2: https://ca.account.sony.com/api/authz/v3/oauth/authorize?
    // get user trophies: https://m.np.playstation.com/api/trophy/v1/users/${accountId}/trophyTitles
    // profile data: https://us-prof.np.community.playstation.net/userProfile/v1/users/${psnId})}/profile2?fields=${encodeURIComponent(fieldsToRetrieve)}
    
    const accessToken = await getAuthenticationToken();

    const url1 = "https://m.np.playstation.com/api/gamelist/v2/users/me/titles";

    const url2 = "https://m.np.playstation.com/api/trophy/v1/npCommunicationIds/???/trophyGroups/all/trophies";

    const url3 = "https://m.np.playstation.net/api/gamelist/v2/users/me/titles?categories=ps4_game,ps5_native_game&limit=250&offset=0";

    const response = await fetch(url3, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Error during test: ${response.statusText} (${response.status})`);
    }

    const data = await response.json();

    try {
        return NextResponse.json(data);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
