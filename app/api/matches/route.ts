import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      tournamentId,
      player1Id,
      player2Id,
      player1Score,
      player2Score,
    } = body;

    if (
      !tournamentId ||
      !player1Id ||
      !player2Id ||
      typeof player1Score !== "number" ||
      typeof player2Score !== "number"
    ) {
      return NextResponse.json(
        { error: "Invalid match data" },
        { status: 400 }
      );
    }

    if (player1Score === player2Score) {
      return NextResponse.json(
        { error: "A match cannot finish as a tie." },
        { status: 400 }
      );
    }

    const winnerId =
      player1Score > player2Score
        ? player1Id
        : player2Id;

    const result = await prisma.$transaction(async (tx) => {
      const match = await tx.match.create({
        data: {
          tournamentId: Number(tournamentId),
          player1Id,
          player2Id,
          player1Score,
          player2Score,
          winnerId,
          status: "COMPLETED",
          completedAt: new Date(),
        },
      });

      await tx.profile.update({
        where: {
          userId: player1Id,
        },
        data: {
          matchesPlayed: {
            increment: 1,
          },
        },
      });

      await tx.profile.update({
        where: {
          userId: player2Id,
        },
        data: {
          matchesPlayed: {
            increment: 1,
          },
        },
      });

      await tx.profile.update({
        where: {
          userId: winnerId,
        },
        data: {
          wins: {
            increment: 1,
          },
        },
      });

      return match;
    });

    return NextResponse.json({
      success: true,
      match: result,
    });
  } catch (error) {
    console.error("Finish match error:", error);

    return NextResponse.json(
      { error: "Failed to save match." },
      { status: 500 }
    );
  }
}