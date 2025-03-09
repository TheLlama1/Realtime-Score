// src/app/api/teamInfo/route.ts
import { NextRequest, NextResponse } from "next/server";
import getTeamInfoByTeamId from "@/app/services/getTeamInfoByTeamId";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const teamId = searchParams.get("id");

  if (!teamId) {
    return NextResponse.json({ error: "Team ID is required" }, { status: 400 });
  }

  try {
    const teamInfo = await getTeamInfoByTeamId(parseInt(teamId));
    return NextResponse.json(teamInfo);
  } catch (error) {
    console.error("Error fetching team info:", error);
    return NextResponse.json(
      { error: "Failed to fetch team information" },
      { status: 500 }
    );
  }
}
