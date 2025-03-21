// src/app/api/events/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import getEventsByFixtureId from "@/app/services/getEvents";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const fixtureId = parseInt((await params).id);
    const events = await getEventsByFixtureId(fixtureId);

    return NextResponse.json(events || []);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
