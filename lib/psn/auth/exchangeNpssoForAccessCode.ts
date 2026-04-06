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

    const redirectUrl = new URL(locationHeader);
    const searchParams = redirectUrl.searchParams;

    const accessCode = searchParams.get("code");

    if (!accessCode) {
        const sonyError = searchParams.get("error");
        const errorDescription = searchParams.get("error_description");

        if (sonyError === "login_required" || errorDescription === "User is not authenticated") {
            throw new Error(
                "Sony authentication failed: the stored NPSSO is no longer authenticated. Reconnect your PlayStation account and try again."
            );
        }

        throw new Error(
            `Failed to extract access code from Sony response.${sonyError ? ` error=${sonyError}.` : ""}${errorDescription ? ` description=${errorDescription}.` : ""}`
        );
    }

    return accessCode;
}