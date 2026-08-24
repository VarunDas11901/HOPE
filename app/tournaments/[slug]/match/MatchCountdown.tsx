"use client";

import { useEffect, useState } from "react";

type MatchCountdownProps = {
  startTime: string;
  hasPlayers: boolean;
};

export default function MatchCountdown({
  startTime,
  hasPlayers,
}: MatchCountdownProps) {
  const calculateTimeLeft = () => {
    const difference = new Date(startTime).getTime() - Date.now();

    if (difference <= 0) {
      return 0;
    }

    return difference;
  };

  const [timeLeft, setTimeLeft] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
  setMounted(true);

  const updateCountdown = () => {
    setTimeLeft(calculateTimeLeft());
  };

  updateCountdown();

  const timer = setInterval(updateCountdown, 1000);

  return () => clearInterval(timer);
}, [startTime]);

if (!mounted) {
  return null;
}

  const totalSeconds = Math.floor(timeLeft / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (!hasPlayers) {
    return (
      <div
        style={{
          marginTop: "35px",
          textAlign: "center",
          padding: "20px",
          borderRadius: "14px",
          background: "rgba(245,158,11,.08)",
          border: "1px solid rgba(245,158,11,.25)",
        }}
      >
        <div
          style={{
            color: "#fbbf24",
            fontSize: "11px",
            fontWeight: 800,
            letterSpacing: "3px",
          }}
        >
          MATCH STATUS
        </div>

        <div
          style={{
            marginTop: "8px",
            fontSize: "18px",
            fontWeight: 900,
          }}
        >
          WAITING FOR PLAYERS
        </div>
      </div>
    );
  }

  if (timeLeft <= 0) {
    return (
      <div
        style={{
          marginTop: "35px",
          textAlign: "center",
          padding: "20px",
          borderRadius: "14px",
          background: "rgba(34,197,94,.08)",
          border: "1px solid rgba(34,197,94,.3)",
        }}
      >
        <div
          style={{
            color: "#4ade80",
            fontSize: "11px",
            fontWeight: 800,
            letterSpacing: "3px",
          }}
        >
          MATCH STATUS
        </div>

        <div
          style={{
            marginTop: "8px",
            fontSize: "20px",
            fontWeight: 900,
            letterSpacing: "1px",
          }}
        >
          ● LIVE
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        marginTop: "35px",
        textAlign: "center",
        padding: "22px",
        borderRadius: "14px",
        background:
          "linear-gradient(135deg, rgba(168,85,247,.12), rgba(124,58,237,.05))",
        border: "1px solid rgba(168,85,247,.3)",
      }}
    >
      <div
        style={{
          color: "#c084fc",
          fontSize: "11px",
          fontWeight: 800,
          letterSpacing: "3px",
        }}
      >
        MATCH STARTS IN
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          marginTop: "16px",
          flexWrap: "wrap",
        }}
      >
        {days > 0 && (
          <TimeBox value={days} label="DAYS" />
        )}

        <TimeBox value={hours} label="HRS" />
        <TimeBox value={minutes} label="MIN" />
        <TimeBox value={seconds} label="SEC" />
      </div>

      <div
        style={{
          marginTop: "16px",
          color: "#71717a",
          fontSize: "12px",
        }}
      >
        Both players are ready. Get prepared.
      </div>
    </div>
  );
}

function TimeBox({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div
      style={{
        minWidth: "72px",
        padding: "12px 10px",
        borderRadius: "10px",
        background: "#111114",
        border: "1px solid #27272a",
      }}
    >
      <div
        style={{
          fontSize: "28px",
          fontWeight: 900,
          color: "white",
          lineHeight: 1,
        }}
      >
        {String(value).padStart(2, "0")}
      </div>

      <div
        style={{
          marginTop: "7px",
          fontSize: "9px",
          color: "#71717a",
          fontWeight: 800,
          letterSpacing: "2px",
        }}
      >
        {label}
      </div>
    </div>
  );
}