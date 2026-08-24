"use client";

import { useState } from "react";

type MatchScoreboardProps = {
  tournamentId: number;
  player1Id: string;
  player2Id: string;
  player1Name: string;
  player2Name: string;
};

export default function MatchScoreboard({
  tournamentId,
  player1Id,
  player2Id,
  player1Name,
  player2Name,
}: MatchScoreboardProps) {
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [finishing, setFinishing] = useState(false);
  const [finished, setFinished] = useState(false);

  const winner =
  player1Score > player2Score
    ? player1Name
    : player2Score > player1Score
    ? player2Name
    : null;

const finishMatch = async () => {
  if (player1Score === player2Score) {
    alert("The match cannot finish as a tie.");
    return;
  }

  setFinishing(true);

  try {
    const response = await fetch("/api/matches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tournamentId,
        player1Id,
        player2Id,
        player1Score,
        player2Score,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || "Failed to finish match."
      );
    }

    setFinished(true);
  } catch (error) {
    console.error(error);

    alert(
      error instanceof Error
        ? error.message
        : "Failed to finish match."
    );
  } finally {
    setFinishing(false);
  }
};

return (
    <div style={{ marginTop: "45px" }}>
      {/* SCORE */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "35px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            minWidth: "150px",
          }}
        >
          <div
            style={{
              color: "#a1a1aa",
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: "2px",
              marginBottom: "8px",
            }}
          >
            {player1Name}
          </div>

          <div
            style={{
              fontSize: "64px",
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            {player1Score}
          </div>

          <button
            onClick={() =>
              setPlayer1Score((score) => score + 1)
            }
            style={{
              marginTop: "18px",
              padding: "12px 28px",
              borderRadius: "10px",
              border: "1px solid #a855f7",
              background: "rgba(168,85,247,.12)",
              color: "#c084fc",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            +1 POINT
          </button>
        </div>

        <div
          style={{
            color: "#52525b",
            fontSize: "20px",
            fontWeight: 700,
          }}
        >
          —
        </div>

        <div
          style={{
            textAlign: "center",
            minWidth: "150px",
          }}
        >
          <div
            style={{
              color: "#a1a1aa",
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: "2px",
              marginBottom: "8px",
            }}
          >
            {player2Name}
          </div>

          <div
            style={{
              fontSize: "64px",
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            {player2Score}
          </div>

          <button
            onClick={() =>
              setPlayer2Score((score) => score + 1)
            }
            style={{
              marginTop: "18px",
              padding: "12px 28px",
              borderRadius: "10px",
              border: "1px solid #a855f7",
              background: "rgba(168,85,247,.12)",
              color: "#c084fc",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            +1 POINT
          </button>
        </div>
      </div>

      {/* RESULT */}
      <div
        style={{
          marginTop: "35px",
          textAlign: "center",
          padding: "22px",
          borderRadius: "14px",
          background: winner
            ? "rgba(34,197,94,.08)"
            : "rgba(168,85,247,.06)",
          border: winner
            ? "1px solid rgba(34,197,94,.3)"
            : "1px solid rgba(168,85,247,.2)",
        }}
      >
        <div
          style={{
            color: "#71717a",
            fontSize: "11px",
            fontWeight: 800,
            letterSpacing: "3px",
          }}
        >
          CURRENT RESULT
        </div>

        <div
          style={{
            marginTop: "8px",
            fontSize: "20px",
            fontWeight: 900,
          }}
        >
          {winner ? `${winner} is leading` : "MATCH TIED"}
        </div>
      </div>
    {!finished ? (
        <button
          onClick={finishMatch}
          disabled={finishing || player1Score === player2Score}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "16px",
            borderRadius: "12px",
            border: "none",
            background:
              finishing || player1Score === player2Score
                ? "#27272a"
                : "linear-gradient(135deg, #a855f7, #7c3aed)",
            color: "white",
            fontSize: "15px",
            fontWeight: 900,
            letterSpacing: "1px",
            cursor:
              finishing || player1Score === player2Score
                ? "not-allowed"
                : "pointer",
          }}
        >
          {finishing ? "SAVING RESULT..." : "FINISH MATCH"}
        </button>
      ) : (
        <div
          style={{
            marginTop: "20px",
            padding: "16px",
            borderRadius: "12px",
            textAlign: "center",
            background: "rgba(34,197,94,.08)",
            border: "1px solid rgba(34,197,94,.3)",
            color: "#4ade80",
            fontWeight: 900,
            letterSpacing: "1px",
          }}
        >
          ✓ MATCH COMPLETED
        </div>
      )}
    </div>
  );
}