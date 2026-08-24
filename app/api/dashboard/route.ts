import { NextResponse } from "next/server";
import { createClient } from "../../lib/supabase/server";
import { prisma } from "../../lib/prisma";

export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "You must be logged in." },
        { status: 401 }
      );
    }

    const profile = await prisma.profile.findUnique({
      where: {
        userId: user.id,
      },
    });

    const participations =
      await prisma.tournamentParticipant.findMany({
        where: {
          userId: user.id,
        },
        include: {
          tournament: true,
        },
        orderBy: {
          joinedAt: "desc",
        },
      });

    const upcomingTournaments = await prisma.tournament.findMany({
      where: {
        status: "UPCOMING",
      },
      orderBy: {
        startTime: "asc",
      },
      take: 6,
    });

    return NextResponse.json({
      profile,
      participations,
      upcomingTournaments,
    });
  } catch (error) {
    console.error("Dashboard loading error:", error);

    return NextResponse.json(
      { error: "Failed to load dashboard." },
      { status: 500 }
    );
  }
}