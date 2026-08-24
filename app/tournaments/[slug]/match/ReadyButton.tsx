"use client";

import { useState } from "react";

type ReadyButtonProps = {
  playerName: string;
};

export default function ReadyButton({
  playerName,
}: ReadyButtonProps) {
  const [ready, setReady] = useState(false);

  return (
    <button
      onClick={() => setReady(!ready)}
      style={{
        marginTop: "18px",
        width: "100%",
        padding: "12px",
        borderRadius: "10px",
        border: ready
          ? "1px solid rgba(34,197,94,.5)"
          : "1px solid #3f3f46",
        background: ready
          ? "rgba(34,197,94,.1)"
          : "#18181b",
        color: ready ? "#4ade80" : "#a1a1aa",
        fontWeight: 800,
        cursor: "pointer",
      }}
    >
      {ready ? "✓ READY" : "READY UP"}
    </button>
  );
}