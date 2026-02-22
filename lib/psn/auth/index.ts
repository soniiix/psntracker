import { supabase } from "@/lib/db/supabase";
import { exchangeNpssoForAccessCode } from "@/lib/psn/auth/exchangeNpssoForAccessCode";
import { exchangeAccessCodeForAuthTokens } from "@/lib/psn/auth/exchangeAccessCodeForAuthTokens";
import { exchangeRefreshTokenForAuthTokens } from "@/lib/psn/auth/exchangeRefreshTokenForAuthTokens";

export async function getAuthenticationToken(): Promise<string> {
    // Check if a valid refresh token exists in the database
    const { data, error } = await supabase
        .from("psn_auth_tokens")
        .select("*")
        .order("refresh_token_expires_at", { ascending: false })
        .limit(1)
        .single();

    let authTokens;

    // If a valid refresh token exists, use it to get new auth tokens
    if (data && new Date(data.refresh_token_expires_at) > new Date()) {
        authTokens = await exchangeRefreshTokenForAuthTokens(data.refresh_token);
    } else {
        // Otherwise, exchange NPSSO for access code, then for auth tokens
        const npsso = process.env.PSN_NPSSO;
        if (!npsso) throw new Error("Missing NPSSO.");

        const accessCode = await exchangeNpssoForAccessCode(npsso);
        authTokens = await exchangeAccessCodeForAuthTokens(accessCode);

        console.log("New auth tokens obtained:", authTokens);

        // Store new refresh token in Supabase DB
        const { error } = await supabase.from("psn_auth_tokens").insert({
            refresh_token: authTokens.refreshToken,
            refresh_token_expires_at: new Date(Date.now() + authTokens.refreshTokenExpiresIn * 1000)
        });

        if (error) {
            throw new Error(`Failed to store new auth tokens in DB: ${error.message}`);
        }
    }

    return authTokens.accessToken;
}