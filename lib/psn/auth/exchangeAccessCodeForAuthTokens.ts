import { AuthTokens } from "../../types/auth";

/**
 * 
 * @param accessCode An access code retrieved from `exchangeNpssoForAccessCode`.
 * @returns An object containing the access token, refresh token, and their respective expiration times. The access token can be used to authenticate requests to the Sony PlayStation API, while the refresh token can be used to obtain a new access token when the current one expires.
 */
export async function exchangeAccessCodeForAuthTokens(accessCode: string): Promise<AuthTokens> {
    const response = await fetch(
        "https://ca.account.sony.com/api/authz/v3/oauth/token",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Basic MDk1MTUxNTktNzIzNy00MzcwLTliNDAtMzgwNmU2N2MwODkxOnVjUGprYTV0bnRCMktxc1A=",
            },
            body: new URLSearchParams({
                code: accessCode,
                redirect_uri: "com.scee.psxandroid.scecompcall://redirect",
                grant_type: "authorization_code",
                token_format: "jwt",
            }),
        }
    );

    if (!response.ok) {
        throw new Error(`Failed to exchange access code for auth tokens: ${response.statusText} (${response.status})`);
    }

    const data = await response.json();

    return {
        accessToken: data.access_token,
        accessTokenExpiresIn: data.expires_in,
        refreshToken: data.refresh_token,
        refreshTokenExpiresIn: data.refresh_token_expires_in
    }
}