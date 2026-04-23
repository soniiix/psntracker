import { NextResponse } from "next/server";
import { getProfileGamesFromAccountId } from "@/lib/psn/profile/games";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ accountId: string }> }
) {
    const { accountId } = await params;
    const { searchParams } = new URL(request.url);

    const offsetRaw = Number(searchParams.get("offset") ?? "0");
    const limitRaw = Number(searchParams.get("limit") ?? "100");

    const offset = Number.isFinite(offsetRaw) && offsetRaw >= 0 ? offsetRaw : 0;
    const limit = Number.isFinite(limitRaw) && limitRaw > 0 ? limitRaw : 100;

    try {
        const data = await getProfileGamesFromAccountId(accountId, offset, limit);
        return NextResponse.json(data);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
