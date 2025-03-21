// src/app/api/fixture/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import getFixturesByFixtureId from "@/app/services/getFixtureByFixtureId";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const fixtureId = parseInt((await params).id);
    const fixture = await getFixturesByFixtureId(fixtureId);

    if (!fixture) {
      return NextResponse.json({ error: "Fixture not found" }, { status: 404 });
    }

    return NextResponse.json(fixture);
  } catch (error) {
    console.error("Error fetching fixture:", error);
    return NextResponse.json(
      { error: "Failed to fetch fixture" },
      { status: 500 }
    );
  }
}
