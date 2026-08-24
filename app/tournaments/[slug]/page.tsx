import { notFound } from "next/navigation";
import { prisma } from "../../lib/prisma";
import { createClient } from "../../lib/supabase/server";
import JoinTournamentButton from "./JoinTournamentButton";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function TournamentPage({ params }: PageProps) {
  const { slug } = await params;

  const tournament = await prisma.tournament.findUnique({
  where: {
    id: Number(slug),
  },
  include: {
    participants: {
      include: {
        profile: true,
      },
    },
  },
});

  if (!tournament) {
    notFound();
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isJoined = user
    ? tournament.participants.some(
        (participant) => participant.userId === user.id
      )
    : false;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#08080b",
        color: "white",
        padding: "80px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <p
          style={{
            color: "#c084fc",
            fontWeight: 600,
            letterSpacing: "3px",
          }}
        >
          {tournament.game}
        </p>

        <h1
          style={{
            fontSize: "48px",
            marginTop: "12px",
            marginBottom: "30px",
          }}
        >
          {tournament.name}
        </h1>

        {/* Tournament information */}
        <div
          style={{
            display: "grid",
            gap: "16px",
            padding: "24px",
            border: "1px solid #27272a",
            borderRadius: "16px",
            background: "#111114",
          }}
        >
          <p>Entry Fee: ₹{tournament.entryFee}</p>

          <p>Prize Pool: ₹{tournament.prizePool}</p>

          <p>
            Players: {tournament.participants.length} /{" "}
            {tournament.maxPlayers}
          </p>

          <p>
            Starts:{" "}
            {new Date(tournament.startTime).toLocaleString()}
          </p>

          <p>Status: {tournament.status}</p>

          <JoinTournamentButton
            tournamentId={slug}
            joined={isJoined}
          />
        </div>

        {/* Participants */}
        <div
          style={{
            marginTop: "32px",
            padding: "24px",
            border: "1px solid #27272a",
            borderRadius: "16px",
            background: "#111114",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              marginBottom: "20px",
            }}
          >
            Participants
          </h2>

          {tournament.participants.length === 0 ? (
            <p style={{ color: "#a1a1aa" }}>
              No players have joined yet.
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gap: "12px",
              }}
            >
              {tournament.participants.map(
                (participant, index) => (
                  <div
                    key={participant.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "14px 16px",
                      border: "1px solid #27272a",
                      borderRadius: "10px",
                      background: "#18181b",
                    }}
                  >
                    <span
                      style={{
                        color: "#a1a1aa",
                        minWidth: "30px",
                      }}
                    >
                      #{index + 1}
                    </span>

                    <span>
                      {participant.profile.gamerName}
                    </span>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}