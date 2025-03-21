// src/app/api/lineups/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import getLineupsByFixtureId from "@/app/services/getLineupsByFixtureId";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const fixtureId = parseInt((await params).id);
    const lineups = await getLineupsByFixtureId(fixtureId);

    return NextResponse.json(lineups || []);
  } catch (error) {
    console.error("Error fetching lineups:", error);
    return NextResponse.json(
      { error: "Failed to fetch lineups" },
      { status: 500 }
    );
  }
}
