import { AuthTokens } from "../../types/auth";

/**
 * 
 * @param refreshToken A refresh token previously obtained from `exchangeAccessCodeForAuthTokens`. This token is used to request new authentication tokens without requiring the user to re-authenticate with their credentials.
 * @returns An object containing the access token, refresh token, and their respective expiration times. The access token can be used to authenticate requests to the Sony PlayStation API, while the refresh token can be used to obtain a new access token when the current one expires.
 */
export async function exchangeRefreshTokenForAuthTokens(refreshToken: string): Promise<AuthTokens> {
    const response = await fetch(
        "https://ca.account.sony.com/api/authz/v3/oauth/token",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Basic MDk1MTUxNTktNzIzNy00MzcwLTliNDAtMzgwNmU2N2MwODkxOnVjUGprYTV0bnRCMktxc1A=",
            },
            body: new URLSearchParams({
                refresh_token: refreshToken,
                grant_type: "refresh_token",
                token_format: "jwt",
                scope: "psn:mobile.v2.core psn:clientapp"
            })
        }
    );

    if (!response.ok) {
        throw new Error(`Failed to exchange refresh token for auth tokens: ${response.statusText} (${response.status})`);
    }

    const data = await response.json();

    return {
        accessToken: data.access_token,
        accessTokenExpiresIn: data.expires_in,
        refreshToken: data.refresh_token,
        refreshTokenExpiresIn: data.refresh_token_expires_in
    }
}