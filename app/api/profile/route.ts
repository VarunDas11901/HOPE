import "dotenv/config";
import { NextResponse } from "next/server";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { gamerName, email, game, skillLevel, region } = body;

    if (!gamerName || !email || !game || !skillLevel || !region) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const profile = await prisma.profile.create({
      data: {
        gamerName,
        email,
        game,
        skillLevel,
        region,
      },
    });

    return NextResponse.json(profile, { status: 201 });
  } catch (error) {
    console.error("Profile creation error:", error);

    return NextResponse.json(
      { error: "Failed to create profile." },
      { status: 500 }
    );
  }
}