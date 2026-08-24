import "dotenv/config";
import { NextResponse } from "next/server";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";
import { createClient } from "../../lib/supabase/server";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });


// ============================
// GET PROFILE
// ============================

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

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Profile loading error:", error);

    return NextResponse.json(
      { error: "Failed to load profile." },
      { status: 500 }
    );
  }
}


// ============================
// POST / CREATE OR UPDATE
// ============================

export async function POST(request: Request) {
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

    const body = await request.json();

    const {
      gamerName,
      game,
      skillLevel,
      region,
    } = body;

    if (!gamerName || !game || !skillLevel || !region) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const existingProfile = await prisma.profile.findUnique({
      where: {
        userId: user.id,
      },
    });

    let profile;

    if (existingProfile) {
      profile = await prisma.profile.update({
        where: {
          userId: user.id,
        },
        data: {
          gamerName,
          game,
          skillLevel,
          region,
        },
      });
    } else {
      profile = await prisma.profile.create({
        data: {
          userId: user.id,
          gamerName,
          email: user.email ?? "",
          game,
          skillLevel,
          region,
        },
      });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Profile save error:", error);

    return NextResponse.json(
      { error: "Failed to save profile." },
      { status: 500 }
    );
  }
}