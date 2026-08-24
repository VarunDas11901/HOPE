"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Profile = {
  gamerName: string;
  game: string;
  skillLevel: string;
  region: string;
  rating: number;
  matchesPlayed: number;
  wins: number;
};

type Tournament = {
  id: number;
  name: string;
  game: string;
  entryFee: number;
  prizePool: number;
  maxPlayers: number;
  startTime: string;
  status: string;
};

type Participation = {
  id: number;
  joinedAt: string;
  tournament: Tournament;
};

type DashboardData = {
  profile: Profile | null;
  participations: Participation[];
  upcomingTournaments: Tournament[];
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const response = await fetch("/api/dashboard");

        if (response.status === 401) {
          window.location.href = "/auth";
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to load dashboard.");
        }

        const dashboard = await response.json();

        setData(dashboard);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#08090d] text-white">
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-gray-400">
            Loading your competitive dashboard...
          </p>
        </div>
      </main>
    );
  }

  if (!data?.profile) {
    return (
      <main className="min-h-screen bg-[#08090d] px-6 py-20 text-white">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-400">
            HOPE
          </p>

          <h1 className="mt-4 text-4xl font-bold">
            Complete your gamer profile
          </h1>

          <p className="mt-4 text-gray-400">
            Create your HOPE profile before entering the competitive arena.
          </p>

          <Link
            href="/profile"
            className="mt-8 inline-block rounded-xl bg-purple-600 px-6 py-3 font-semibold transition hover:bg-purple-500"
          >
            Create Profile
          </Link>
        </div>
      </main>
    );
  }

  const { profile, participations, upcomingTournaments } = data;

  const winRate =
  profile.matchesPlayed > 0
    ? Math.round(
        (profile.wins / profile.matchesPlayed) * 100
      )
    : 0;

const competitiveRank =
  profile.rating >= 1800
    ? "ELITE"
    : profile.rating >= 1500
    ? "MASTER"
    : profile.rating >= 1300
    ? "DIAMOND"
    : profile.rating >= 1100
    ? "ADVANCED"
    : "ROOKIE";

  return (
    <main className="min-h-screen bg-[#08090d] text-white">
      {/* Top bar */}
      <header className="border-b border-white/10 bg-[#0b0c11]/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-2xl font-black tracking-tight"
          >
            HOPE<span className="text-purple-500">.</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/tournaments"
              className="text-sm text-gray-400 transition hover:text-white"
            >
              Tournaments
            </Link>

            <Link
              href="/profile"
              className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/[0.05]"
            >
              Profile
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#171020] via-[#101218] to-[#0d0e13] p-8 sm:p-10">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-600/10 blur-3xl" />

          <div className="relative">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-400">
              COMPETITIVE COMMAND CENTER
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Welcome back,{" "}
              <span className="text-purple-400">
                {profile.gamerName}
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-gray-400">
              Your competitive journey starts here. Track your tournaments,
              discover new competitions, and keep pushing your limits.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/tournaments"
                className="rounded-xl bg-purple-600 px-6 py-3 font-semibold transition hover:bg-purple-500"
              >
                Find Tournaments
              </Link>

              <Link
                href="/profile"
                className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 font-semibold transition hover:bg-white/[0.07]"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Tournaments Joined"
            value={participations.length.toString()}
          />

          <StatCard
            label="Upcoming"
            value={participations
              .filter(
                (item) => item.tournament.status === "UPCOMING"
              )
              .length.toString()}
          />

          <StatCard
            label="Main Game"
            value={profile.game}
          />

          <StatCard
            label="Region"
            value={profile.region}
          />
        </section>

        {/* Profile identity */}
        <section className="mt-10">
          <div className="rounded-3xl border border-white/10 bg-[#101218] p-7">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
                  Gamer Identity
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {profile.gamerName}
                </h2>

                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge>{profile.game}</Badge>
                  <Badge>{profile.skillLevel}</Badge>
                  <Badge>{profile.region}</Badge>
                </div>
              </div>

              <Link
                href="/profile"
                className="rounded-xl border border-purple-500/30 px-5 py-3 text-sm font-semibold text-purple-300 transition hover:bg-purple-500/10"
              >
                Manage Profile →
              </Link>
            </div>
          </div>
        </section>

        {/* Competitive record */}
        <section className="mt-6">
        <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-br from-[#15101d] to-[#101218] p-7">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-400">
                Competitive Record
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                Your competitive standing
                </h2>
            </div>

            <div className="rounded-xl border border-purple-500/20 bg-purple-500/10 px-5 py-3 text-center">
                <p className="text-xs uppercase tracking-wider text-purple-300">
                Rank
                </p>

                <p className="mt-1 text-xl font-black text-white">
                {competitiveRank}
                </p>
            </div>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <CompetitiveStat
                label="HOPE Rating"
                value={profile.rating.toString()}
            />

            <CompetitiveStat
                label="Matches"
                value={profile.matchesPlayed.toString()}
            />

            <CompetitiveStat
                label="Wins"
                value={profile.wins.toString()}
            />

            <CompetitiveStat
                label="Win Rate"
                value={`${winRate}%`}
            />
            </div>
        </div>
        </section>

        {/* Upcoming tournaments */}
        <section className="mt-12">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">
                COMPETE
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Upcoming Tournaments
              </h2>
            </div>

            <Link
              href="/tournaments"
              className="text-sm font-semibold text-gray-400 transition hover:text-white"
            >
              View all →
            </Link>
          </div>

          {upcomingTournaments.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-white/10 bg-[#101218] p-8 text-center text-gray-400">
              No upcoming tournaments yet.
            </div>
          ) : (
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {upcomingTournaments.map((tournament) => (
                <Link
                  key={tournament.id}
                  href={`/tournaments/${tournament.id}`}
                  className="group rounded-2xl border border-white/10 bg-[#101218] p-6 transition hover:-translate-y-1 hover:border-purple-500/40"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                        {tournament.game}
                      </p>

                      <h3 className="mt-2 text-xl font-bold group-hover:text-purple-300">
                        {tournament.name}
                      </h3>
                    </div>

                    <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-300">
                      {tournament.status}
                    </span>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">
                        Prize Pool
                      </p>
                      <p className="mt-1 font-semibold">
                        ₹{tournament.prizePool}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500">
                        Entry
                      </p>
                      <p className="mt-1 font-semibold">
                        ₹{tournament.entryFee}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500">
                        Players
                      </p>
                      <p className="mt-1 font-semibold">
                        {tournament.maxPlayers}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500">
                        Starts
                      </p>
                      <p className="mt-1 font-semibold">
                        {new Date(
                          tournament.startTime
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-white/10 pt-4 text-sm font-semibold text-purple-300">
                    View Tournament →
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* My tournaments */}
        <section className="mt-12 pb-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">
              YOUR COMPETITION
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              My Tournaments
            </h2>
          </div>

          {participations.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-white/10 bg-[#101218] p-8">
              <p className="text-gray-400">
                You haven't joined a tournament yet.
              </p>

              <Link
                href="/tournaments"
                className="mt-5 inline-block rounded-xl bg-purple-600 px-5 py-3 font-semibold hover:bg-purple-500"
              >
                Find a Tournament
              </Link>
            </div>
          ) : (
            <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#101218]">
              {participations.map((participation) => (
                <Link
                  key={participation.id}
                  href={`/tournaments/${participation.tournament.id}`}
                  className="flex flex-col gap-3 border-b border-white/10 p-5 transition last:border-b-0 hover:bg-white/[0.03] sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-semibold">
                      {participation.tournament.name}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {participation.tournament.game}
                    </p>
                  </div>

                  <div className="flex items-center gap-5">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        Prize
                      </p>

                      <p className="font-semibold">
                        ₹{participation.tournament.prizePool}
                      </p>
                    </div>

                    <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-300">
                      {participation.tournament.status}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#101218] p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
        {label}
      </p>

      <p className="mt-3 text-2xl font-black">
        {value}
      </p>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-gray-300">
      {children}
    </span>
  );
}

function CompetitiveStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
        {label}
      </p>

      <p className="mt-3 text-3xl font-black tracking-tight">
        {value}
      </p>
    </div>
  );
}