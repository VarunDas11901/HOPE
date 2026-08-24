"use client";

import { useState } from "react";

type Props = {
  tournamentId: string;
  joined: boolean;
};

export default function JoinTournamentButton({
  tournamentId,
  joined,
}: Props) {
  const [isJoined, setIsJoined] = useState(joined);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleJoin() {
    if (isJoined || loading) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `/api/tournaments/${tournamentId}/join`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Failed to join tournament.");
        setLoading(false);
        return;
      }

      setIsJoined(true);
      setMessage("Successfully joined the tournament!");
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ marginTop: "24px" }}>
      <button
        type="button"
        onClick={handleJoin}
        disabled={isJoined || loading}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "10px",
          border: "none",
          background: isJoined ? "#27272a" : "#a100ff",
          color: "white",
          fontSize: "16px",
          fontWeight: 600,
          cursor:
            isJoined || loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading
          ? "Joining..."
          : isJoined
            ? "✓ Joined Tournament"
            : "Join Tournament"}
      </button>

      {message && (
        <p
          style={{
            marginTop: "14px",
            color: "#c4b5fd",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}