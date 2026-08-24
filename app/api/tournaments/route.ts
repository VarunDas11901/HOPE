import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function GET() {
  try {
    const tournaments = await prisma.tournament.findMany({
      orderBy: {
        startTime: "asc",
      },
    });

    return NextResponse.json(tournaments);
  } catch (error) {
    console.error("Tournament loading error:", error);

    return NextResponse.json(
      { error: "Failed to load tournaments." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      game,
      entryFee,
      prizePool,
      maxPlayers,
      startTime,
    } = body;

    if (
      !name ||
      !game ||
      entryFee === undefined ||
      prizePool === undefined ||
      !maxPlayers ||
      !startTime
    ) {
      return NextResponse.json(
        { error: "All tournament fields are required." },
        { status: 400 }
      );
    }

    const tournament = await prisma.tournament.create({
      data: {
        name,
        game,
        entryFee: Number(entryFee),
        prizePool: Number(prizePool),
        maxPlayers: Number(maxPlayers),
        startTime: new Date(startTime),
        status: "UPCOMING",
      },
    });

    return NextResponse.json(tournament, { status: 201 });
  } catch (error) {
    console.error("Tournament creation error:", error);

    return NextResponse.json(
      { error: "Failed to create tournament." },
      { status: 500 }
    );
  }
}