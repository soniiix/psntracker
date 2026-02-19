import { NextResponse } from "next/server";
import { searchAccountId } from "@/lib/psn/search";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ psnId: string }> }
) {
    const { psnId } = await params;

    try {
        const result = await searchAccountId(psnId);

        if (!result.found) {
            return NextResponse.json(
                { error: "PSN ID not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(result.accountId);
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message },
            { status: 500 }
        );
    }
}