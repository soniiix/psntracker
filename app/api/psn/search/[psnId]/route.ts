import { NextResponse } from "next/server";
import { searchPsnId } from "@/lib/psn/search";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ psnId: string }> }
) {
    const { psnId } = await params;

    try {
        const result = await searchPsnId(psnId);

        return NextResponse.json(result);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
