export async function getAuthenticationToken(): Promise<string> {
    const npsso = process.env.PSN_NPSSO;

    if (!npsso) {
        throw new Error("Missing NPSSO.");
    }

    const authUrl =
        "https://ca.account.sony.com/api/authz/v3/oauth/authorize?" +
        "access_type=offline&client_id=09515159-7237-4370-9b40-3806e67c0891&" +
        "response_type=code&scope=psn:mobile.v2.core psn:clientapp&" +
        "redirect_uri=com.scee.psxandroid.scecompcall://redirect";

    const response = await fetch(authUrl, {
        headers: {
            Cookie: `npsso=${npsso}`,
        },
        redirect: "manual",
    });

    const locationHeader = response.headers.get("location");

    if (!locationHeader) {
        throw new Error("Invalid NPSSO or unexpected response.");
    }

    const code = new URLSearchParams(
        locationHeader.split("?")[1]
    ).get("code");

    const tokenResponse = await fetch(
        "https://ca.account.sony.com/api/authz/v3/oauth/token",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization:
                    "Basic MDk1MTUxNTktNzIzNy00MzcwLTliNDAtMzgwNmU2N2MwODkxOnVjUGprYTV0bnRCMktxc1A=",
            },
            body: new URLSearchParams({
                code: code!,
                redirect_uri:
                    "com.scee.psxandroid.scecompcall://redirect",
                grant_type: "authorization_code",
                token_format: "jwt",
            }),
        }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
        throw new Error("Failed to retrieve access token from Sony.");
    }

    return tokenData.access_token;
}
