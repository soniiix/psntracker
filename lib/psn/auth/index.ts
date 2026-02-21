import { exchangeNpssoForAccessCode } from "./exchangeNpssoForAccessCode";
import { exchangeAccessCodeForAuthTokens } from "./exchangeAccessCodeForAuthTokens";
import { exchangeRefreshTokenForAuthTokens } from "./exchangeRefreshTokenForAuthTokens";

export async function getAuthenticationToken(): Promise<string> {
    const npsso = process.env.PSN_NPSSO;

    if (!npsso) {
        throw new Error("Missing NPSSO.");
    }

    // TODO: Determine when to use the refresh token instead of the access code flow. Maybe DB integration needed.

    const accessCode = await exchangeNpssoForAccessCode(npsso);
    const authTokens = await exchangeAccessCodeForAuthTokens(accessCode);

    return authTokens.accessToken;
}