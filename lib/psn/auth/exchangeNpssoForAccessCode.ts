/**
 * 
 * @param npsso The NPSSO retrieved from https://ca.account.sony.com/api/v1/ssocookie when logged in.
 * @returns An access code, which can be exchanged for an access token using `exchangeAccessCodeForAuthTokens`.
 */
export async function exchangeNpssoForAccessCode(npsso: string): Promise<string> {
    const requestUrl =
        "https://ca.account.sony.com/api/authz/v3/oauth/authorize?" +
        "access_type=offline&client_id=09515159-7237-4370-9b40-3806e67c0891&" +
        "response_type=code&scope=psn:mobile.v2.core psn:clientapp&" +
        "redirect_uri=com.scee.psxandroid.scecompcall://redirect";

    const response = await fetch(requestUrl, {
        headers: {
            Cookie: `npsso=${npsso}`,
        },
        redirect: "manual",
    });

    const locationHeader = response.headers.get("location");

    if (!locationHeader) {
        throw new Error(`Unexpected response from Sony: ${response.statusText} (${response.status})`);
    }

    const accessCode = new URLSearchParams(
        locationHeader.split("?")[1]
    ).get("code");

    if (!accessCode) {
        throw new Error("Failed to extract access code from Sony response.");
    }

    return accessCode;
}