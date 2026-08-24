"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateTournamentPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [game, setGame] = useState("VALORANT");
  const [entryFee, setEntryFee] = useState("");
  const [prizePool, setPrizePool] = useState("");
  const [maxPlayers, setMaxPlayers] = useState("16");
  const [startTime, setStartTime] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/tournaments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          game,
          entryFee,
          prizePool,
          maxPlayers,
          startTime,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Failed to create tournament.");
        setLoading(false);
        return;
      }

      router.push("/tournaments");
      router.refresh();
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#08080b",
        color: "white",
        padding: "70px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "650px",
          margin: "0 auto",
        }}
      >
        <p
          style={{
            color: "#c084fc",
            fontWeight: 600,
            letterSpacing: "3px",
            marginBottom: "10px",
          }}
        >
          HOPE TOURNAMENTS
        </p>

        <h1
          style={{
            fontSize: "42px",
            marginBottom: "10px",
          }}
        >
          Create Tournament
        </h1>

        <p
          style={{
            color: "#a1a1aa",
            marginBottom: "35px",
          }}
        >
          Set up your tournament and invite other gamers to compete.
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gap: "20px",
            padding: "30px",
            border: "1px solid #27272a",
            borderRadius: "16px",
            background: "#111114",
          }}
        >
          <div>
            <label htmlFor="name">Tournament Name</label>

            <input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              placeholder="e.g. HOPE Valorant Cup"
              style={inputStyle}
            />
          </div>

          <div>
            <label htmlFor="game">Game</label>

            <select
              id="game"
              value={game}
              onChange={(event) => setGame(event.target.value)}
              style={inputStyle}
            >
              <option value="VALORANT">VALORANT</option>
              <option value="CS2">CS2</option>
              <option value="BGMI">BGMI</option>
              <option value="FREE FIRE">FREE FIRE</option>
            </select>
          </div>

          <div>
            <label htmlFor="entryFee">Entry Fee (₹)</label>

            <input
              id="entryFee"
              type="number"
              min="0"
              value={entryFee}
              onChange={(event) => setEntryFee(event.target.value)}
              required
              placeholder="100"
              style={inputStyle}
            />
          </div>

          <div>
            <label htmlFor="prizePool">Prize Pool (₹)</label>

            <input
              id="prizePool"
              type="number"
              min="0"
              value={prizePool}
              onChange={(event) => setPrizePool(event.target.value)}
              required
              placeholder="1000"
              style={inputStyle}
            />
          </div>

          <div>
            <label htmlFor="maxPlayers">Maximum Players</label>

            <input
              id="maxPlayers"
              type="number"
              min="2"
              value={maxPlayers}
              onChange={(event) => setMaxPlayers(event.target.value)}
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label htmlFor="startTime">Start Time</label>

            <input
              id="startTime"
              type="datetime-local"
              value={startTime}
              onChange={(event) => setStartTime(event.target.value)}
              required
              style={inputStyle}
            />
          </div>

          {message && (
            <p
              style={{
                color: "#c4b5fd",
                lineHeight: 1.5,
              }}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "8px",
              border: "none",
              background: "#a100ff",
              color: "white",
              fontWeight: 600,
              fontSize: "16px",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Creating..." : "Create Tournament"}
          </button>
        </form>
      </div>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  borderRadius: "8px",
  border: "1px solid #3f3f46",
  background: "#18181b",
  color: "white",
  boxSizing: "border-box" as const,
};