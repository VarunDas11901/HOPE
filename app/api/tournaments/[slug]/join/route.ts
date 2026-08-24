import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { createClient } from "../../../../lib/supabase/server";

type RouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function POST(
  _request: Request,
  { params }: RouteProps
) {
  try {
    const { slug } = await params;
    const tournamentId = Number(slug);

    if (Number.isNaN(tournamentId)) {
      return NextResponse.json(
        { error: "Invalid tournament." },
        { status: 400 }
      );
    }

    // Get the currently logged-in Supabase user
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in to join a tournament." },
        { status: 401 }
      );
    }

    // Find tournament
    const tournament = await prisma.tournament.findUnique({
      where: {
        id: tournamentId,
      },
    });

    if (!tournament) {
      return NextResponse.json(
        { error: "Tournament not found." },
        { status: 404 }
      );
    }

    // Check if tournament is already full
    const participantCount =
      await prisma.tournamentParticipant.count({
        where: {
          tournamentId,
        },
      });

    if (participantCount >= tournament.maxPlayers) {
      return NextResponse.json(
        { error: "This tournament is already full." },
        { status: 400 }
      );
    }

    // Check if this user already joined
    const existingParticipant =
      await prisma.tournamentParticipant.findUnique({
        where: {
          tournamentId_userId: {
            tournamentId,
            userId: user.id,
          },
        },
      });

    if (existingParticipant) {
      return NextResponse.json(
        { error: "You have already joined this tournament." },
        { status: 400 }
      );
    }

    // Join tournament
    const participant =
      await prisma.tournamentParticipant.create({
        data: {
          tournamentId,
          userId: user.id,
        },
      });

    return NextResponse.json(
      {
        message: "Successfully joined the tournament!",
        participant,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Tournament join error:", error);

    return NextResponse.json(
      { error: "Failed to join tournament." },
      { status: 500 }
    );
  }
}