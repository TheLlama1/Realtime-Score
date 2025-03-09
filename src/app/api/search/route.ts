import { NextRequest, NextResponse } from "next/server";
import getTeamsBySearchQuery from "@/app/services/getTeamsBySearchQuery";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ results: [] }, { status: 200 });
  }

  try {
    // Извикваме функцията, която търси в API-Football
    let results = await getTeamsBySearchQuery(query);

    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}
