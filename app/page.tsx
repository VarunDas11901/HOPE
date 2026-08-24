"use client";

import { useEffect, useState } from "react";
import TournamentCard from "../components/TournamentCard";
import Link from "next/link";
import { createClient } from "./lib/supabase/client";

export default function Home() {
  const supabase = createClient();

  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
      setAuthLoading(false);
    }

    loadUser();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();

    setUser(null);
    window.location.href = "/";
  }

  return (
    <main className="min-h-screen bg-[#08090d] text-white">

      {/* Navigation */}
      <nav className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          {/* Logo */}
          <div className="text-2xl font-bold tracking-tight">
            HOPE<span className="text-purple-500">.</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#tournaments"
              className="text-sm text-gray-300 transition hover:text-white"
            >
              Tournaments
            </a>

            <a
              href="#how-it-works"
              className="text-sm text-gray-300 transition hover:text-white"
            >
              How It Works
            </a>

            <a
              href="#earn"
              className="text-sm text-gray-300 transition hover:text-white"
            >
              Earn
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {!authLoading && !user && (
              <>
                <Link
                  href="/auth"
                  className="hidden rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition hover:text-white md:block"
                >
                  Log In
                </Link>

                <Link
                  href="/auth"
                  className="rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-500"
                >
                  Join HOPE
                </Link>
              </>
            )}

            {!authLoading && user && (
              <>
                <Link
                  href="/profile"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition hover:text-white"
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-500"
                >
                  Log Out
                </button>
              </>
            )}
          </div>

        </div>
      </nav>

      {/* Temporary Hero */}
      <section className="flex min-h-[70vh] items-center justify-center px-6 text-center">

        <div className="max-w-4xl">

          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">
            The Competitive Gaming Economy
          </p>

          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
            Your skill has value.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            HOPE gives gamers a place to compete, improve, build their
            reputation, and turn their gaming skills into real opportunities.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/tournaments"
              style={{
                display: "inline-block",
                padding: "16px 30px",
                borderRadius: "8px",
                background: "#a100ff",
                color: "white",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Find Tournaments
            </Link>

            <button className="rounded-lg border border-white/15 bg-white/5 px-7 py-3.5 font-semibold transition hover:bg-white/10">
              How HOPE Works
            </button>
          </div>

        </div>

      </section>

      {/* HOPE Economy */}
      <section className="border-t border-white/10 bg-[#0b0d12] px-6 py-24">
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">
              The HOPE Economy
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Play for more than just the win.
            </h2>

            <p className="mt-4 text-gray-400">
              HOPE connects competition, rewards, and reputation into one
              ecosystem built around gaming skill.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">

            {/* Compete */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition hover:border-purple-500/40">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-2xl">
                🏆
              </div>

              <h3 className="text-xl font-semibold">
                Compete
              </h3>

              <p className="mt-3 leading-7 text-gray-400">
                Discover tournaments that match your game, skill level,
                format, and goals.
              </p>
            </div>

            {/* Earn */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition hover:border-purple-500/40">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-2xl">
                💰
              </div>

              <h3 className="text-xl font-semibold">
                Earn
              </h3>

              <p className="mt-3 leading-7 text-gray-400">
                Turn strong performances into rewards through eligible
                tournaments, sponsored events, and competitions.
              </p>
            </div>

            {/* Grow */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition hover:border-purple-500/40">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-2xl">
                📈
              </div>

              <h3 className="text-xl font-semibold">
                Grow
              </h3>

              <p className="mt-3 leading-7 text-gray-400">
                Build a gaming reputation that can unlock better
                competitions, opportunities, and recognition.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Upcoming Tournaments */}
      <section
        id="tournaments"
        className="border-t border-white/10 bg-[#08090d] px-6 py-24"
      >
        <div className="mx-auto max-w-7xl">

          {/* Section heading */}
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">
                Compete
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Find your next tournament.
              </h2>

              <p className="mt-4 max-w-2xl text-gray-400">
                Discover competitions, challenge other players, and compete
                for rewards.
              </p>
            </div>

            <button className="w-fit rounded-lg border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold transition hover:bg-white/10">
              View All Tournaments
            </button>
          </div>

          {/* Tournament cards */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">

            <TournamentCard
              game="VALORANT"
              title="Friday Night Arena"
              prizePool="₹10,000"
              players="32 Teams"
              starts="Starts in 2h 14m"
              accent="purple"
              href="/tournaments/friday-night-arena"
            />
            <TournamentCard
              game="FC 26"
              title="Weekend Rivals"
              prizePool="₹7,500"
              players="128 Players"
              starts="Tomorrow"
              accent="blue"
              href="/tournaments/weekend-rivals"
            />

            <TournamentCard
              game="FREE FIRE"
              title="Community Clash"
              prizePool="₹25,000"
              players="64 Squads"
              starts="Starts Saturday"
              accent="green"
              href="/tournaments/community-clash"
            />

          </div>
        </div>
      </section>

      {/* How HOPE Works */}
      <section
        id="how-it-works"
        className="border-t border-white/10 bg-[#0b0d12] px-6 py-24"
      >
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">
              How It Works
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              From gamer to opportunity.
            </h2>

            <p className="mt-4 text-gray-400">
              HOPE gives your gaming skills a path forward.
            </p>
          </div>

          <div className="relative mt-16 grid gap-8 md:grid-cols-4">

            {/* Step 1 */}
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-lg font-bold">
                1
              </div>

              <h3 className="mt-6 text-xl font-semibold">
                Build your profile
              </h3>

              <p className="mt-3 leading-7 text-gray-400">
                Create your gaming identity and start building a verified
                record of your competitive journey.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-lg font-bold">
                2
              </div>

              <h3 className="mt-6 text-xl font-semibold">
                Find your competition
              </h3>

              <p className="mt-3 leading-7 text-gray-400">
                Discover tournaments based on your game, skill level,
                format, and interests.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-lg font-bold">
                3
              </div>

              <h3 className="mt-6 text-xl font-semibold">
                Compete
              </h3>

              <p className="mt-3 leading-7 text-gray-400">
                Play against other gamers, prove your ability, and improve
                your competitive rating.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-lg font-bold">
                4
              </div>

              <h3 className="mt-6 text-xl font-semibold">
                Earn & grow
              </h3>

              <p className="mt-3 leading-7 text-gray-400">
                Earn eligible rewards, build your reputation, and unlock
                new opportunities within the gaming ecosystem.
              </p>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}