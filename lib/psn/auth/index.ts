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

    // Fallback flow used when no valid stored refresh token exists,
    // or when refresh token exchange fails (e.g. token revoked/expired server-side).
    const authenticateWithNpsso = async () => {
        const npsso = process.env.PSN_NPSSO;
        if (!npsso) throw new Error("Missing NPSSO.");

        const accessCode = await exchangeNpssoForAccessCode(npsso);
        const tokens = await exchangeAccessCodeForAuthTokens(accessCode);

        // Persist latest refresh token for next calls so we can avoid full NPSSO exchange.
        const { error: insertError } = await supabase.from("psn_auth_tokens").insert({
            refresh_token: tokens.refreshToken,
            refresh_token_expires_at: new Date(Date.now() + tokens.refreshTokenExpiresIn * 1000)
        });

        if (insertError) {
            throw new Error(`Failed to store new auth tokens in DB: ${insertError.message}`);
        }

        return tokens;
    };

    let authTokens;

    // If a valid refresh token exists, try it first. If it fails (e.g. revoked/expired server-side), fall back to full NPSSO exchange.
    if (data && new Date(data.refresh_token_expires_at) > new Date()) {
        try {
            authTokens = await exchangeRefreshTokenForAuthTokens(data.refresh_token);
        } catch {
            authTokens = await authenticateWithNpsso();
        }
    } else {
        authTokens = await authenticateWithNpsso();
    }

    return authTokens.accessToken;
}