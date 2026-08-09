"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [gamerName, setGamerName] = useState("");
  const [email, setEmail] = useState("");
  const [game, setGame] = useState("VALORANT");
  const [skillLevel, setSkillLevel] = useState("Beginner");
  const [region, setRegion] = useState("India");

  useEffect(() => {
  const savedProfile = localStorage.getItem("hopeProfile");

  if (savedProfile) {
    const profile = JSON.parse(savedProfile);

    setGamerName(profile.gamerName);
    setEmail(profile.email);
    setGame(profile.game);
    setSkillLevel(profile.skillLevel);
    setRegion(profile.region);
  }
}, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const profile = {
    gamerName,
    email,
    game,
    skillLevel,
    region,
  };

  try {
    const response = await fetch("/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Failed to create profile.");
      return;
    }

    alert(`Welcome to HOPE, ${gamerName}! Your profile has been saved.`);
  } catch (error) {
    console.error(error);
    alert("Something went wrong while saving your profile.");
  }
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
            Create your profile
          </h1>

          <p className="mt-4 text-gray-400">
            Build your gaming identity and start competing in the HOPE
            community.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Gamer Name
              </label>

              <input
                type="text"
                value={gamerName}
                onChange={(event) => setGamerName(event.target.value)}
                placeholder="Enter your gamer name"
                required
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Main Game
              </label>

              <select
                value={game}
                onChange={(event) => setGame(event.target.value)}
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

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Skill Level
              </label>

              <select
                value={skillLevel}
                onChange={(event) => setSkillLevel(event.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#15171e] px-4 py-3 text-white outline-none focus:border-purple-500"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>Competitive</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Region
              </label>

              <select
                value={region}
                onChange={(event) => setRegion(event.target.value)}
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

            <button
              type="submit"
              className="w-full rounded-xl bg-purple-600 px-5 py-3 font-semibold transition hover:bg-purple-500"
            >
              Create HOPE Profile
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}