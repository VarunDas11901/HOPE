"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTournaments() {
      try {
        const response = await fetch("/api/tournaments");

        if (!response.ok) {
          throw new Error("Failed to load tournaments");
        }

        const data = await response.json();

        setTournaments(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadTournaments();
  }, []);

  return (
    <main className="min-h-screen bg-[#08090d] px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">
              HOPE TOURNAMENTS
            </p>

            <h1 className="mt-3 text-4xl font-bold">
              Tournaments
            </h1>

            <p className="mt-3 text-gray-400">
              Find a tournament and compete with other gamers.
            </p>
          </div>

          <Link
            href="/tournaments/create"
            className="rounded-xl bg-purple-600 px-5 py-3 text-center font-semibold transition hover:bg-purple-500"
          >
            + Create Tournament
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-12 text-center text-gray-400">
            Loading tournaments...
          </div>
        )}

        {/* Empty */}
        {!loading && tournaments.length === 0 && (
          <div className="mt-12 rounded-2xl border border-white/10 bg-[#101218] p-10 text-center">
            <h2 className="text-xl font-semibold">
              No tournaments yet
            </h2>

            <p className="mt-2 text-gray-400">
              Create the first HOPE tournament.
            </p>

            <Link
              href="/tournaments/create"
              className="mt-6 inline-block rounded-xl bg-purple-600 px-5 py-3 font-semibold hover:bg-purple-500"
            >
              Create Tournament
            </Link>
          </div>
        )}

        {/* Tournament Cards */}
        {!loading && tournaments.length > 0 && (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tournaments.map((tournament) => (
              <div
                key={tournament.id}
                className="rounded-2xl border border-white/10 bg-[#101218] p-6 transition hover:border-purple-500/40"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                      {tournament.game}
                    </p>

                    <h2 className="mt-2 text-xl font-bold">
                      {tournament.name}
                    </h2>
                  </div>

                  <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-300">
                    {tournament.status}
                  </span>
                </div>

                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Entry Fee
                    </span>

                    <span className="font-medium">
                      ₹{tournament.entryFee}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Prize Pool
                    </span>

                    <span className="font-medium text-purple-300">
                      ₹{tournament.prizePool}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Players
                    </span>

                    <span className="font-medium">
                      {tournament.maxPlayers}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Starts
                    </span>

                    <span className="text-right font-medium">
                      {new Date(
                        tournament.startTime
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>

                <Link
                href={`/tournaments/${tournament.id}`}
                className="mt-6 block w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center font-semibold transition hover:bg-white/[0.08]"
                >
                View Tournament
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}