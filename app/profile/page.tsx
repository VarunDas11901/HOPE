"use client";

import { useEffect, useState } from "react";
import { createClient } from "../lib/supabase/client";

export default function ProfilePage() {
  const supabase = createClient();

  const [gamerName, setGamerName] = useState("");
  const [email, setEmail] = useState("");
  const [game, setGame] = useState("VALORANT");
  const [skillLevel, setSkillLevel] = useState("Beginner");
  const [region, setRegion] = useState("India");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        // Get logged-in Supabase user
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          window.location.href = "/auth";
          return;
        }

        setEmail(user.email ?? "");

        // Load existing profile
        const response = await fetch("/api/profile");

        if (!response.ok) {
          setLoading(false);
          return;
        }

        const profile = await response.json();

        if (profile) {
          setGamerName(profile.gamerName ?? "");
          setGame(profile.game ?? "VALORANT");
          setSkillLevel(profile.skillLevel ?? "Beginner");
          setRegion(profile.region ?? "India");

          setHasProfile(true);
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSaving(true);

    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gamerName,
          game,
          skillLevel,
          region,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to save profile.");
        return;
      }

      setHasProfile(true);

      alert(
        hasProfile
          ? "Your HOPE profile has been updated!"
          : `Welcome to HOPE, ${gamerName}! Your profile has been created.`
      );
    } catch (error) {
      console.error(error);
      alert("Something went wrong while saving your profile.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#08090d] text-white">
        <p className="text-gray-400">
          Loading your HOPE profile...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#08090d] px-6 py-20 text-white">
      <div className="mx-auto max-w-2xl">

        <a
          href="/"
          className="text-sm text-gray-400 transition hover:text-white"
        >
          ← Back to HOPE
        </a>

        <div className="mt-10 rounded-3xl border border-white/10 bg-[#101218] p-8 sm:p-10">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">
            HOPE GAMER PROFILE
          </p>

          <h1 className="mt-4 text-4xl font-bold">
            {hasProfile
              ? "Your profile"
              : "Create your profile"}
          </h1>

          <p className="mt-4 text-gray-400">
            {hasProfile
              ? "Update your gaming identity and keep your HOPE profile up to date."
              : "Build your gaming identity and start competing in the HOPE community."}
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-6"
          >

            {/* Gamer Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Gamer Name
              </label>

              <input
                type="text"
                value={gamerName}
                onChange={(event) =>
                  setGamerName(event.target.value)
                }
                placeholder="Enter your gamer name"
                required
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition focus:border-purple-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Email
              </label>

              <input
                type="email"
                value={email}
                readOnly
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-gray-400 outline-none"
              />

              <p className="mt-2 text-xs text-gray-500">
                This is the email connected to your HOPE account.
              </p>
            </div>

            {/* Main Game */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Main Game
              </label>

              <select
                value={game}
                onChange={(event) =>
                  setGame(event.target.value)
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#15171e] px-4 py-3 text-white outline-none focus:border-purple-500"
              >
                <option>VALORANT</option>
                <option>FC 26</option>
                <option>FREE FIRE</option>
                <option>BGMI</option>
                <option>Call of Duty</option>
                <option>Other</option>
              </select>
            </div>

            {/* Skill Level */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Skill Level
              </label>

              <select
                value={skillLevel}
                onChange={(event) =>
                  setSkillLevel(event.target.value)
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#15171e] px-4 py-3 text-white outline-none focus:border-purple-500"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>Competitive</option>
              </select>
            </div>

            {/* Region */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Region
              </label>

              <select
                value={region}
                onChange={(event) =>
                  setRegion(event.target.value)
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#15171e] px-4 py-3 text-white outline-none focus:border-purple-500"
              >
                <option>India</option>
                <option>North America</option>
                <option>Europe</option>
                <option>Asia Pacific</option>
                <option>Middle East</option>
                <option>Other</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-xl bg-purple-600 px-5 py-3 font-semibold transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? "Saving..."
                : hasProfile
                  ? "Save Changes"
                  : "Create HOPE Profile"}
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}