import { notFound } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import MatchCountdown from "./MatchCountdown";
import ReadyButton from "./ReadyButton";
import MatchScoreboard from "./MatchScoreboard";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function MatchPage({ params }: PageProps) {
  const { slug } = await params;

  const tournamentId = Number(slug);

  if (Number.isNaN(tournamentId)) {
    notFound();
  }

  const tournament = await prisma.tournament.findUnique({
    where: {
      id: tournamentId,
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

  const players = tournament.participants;

  const player1 = players[0];
  const player2 = players[1];

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 50% 0%, #241044 0%, #09090d 42%, #050507 100%)",
        color: "white",
        padding: "40px 24px 80px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* HEADER */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "24px",
            borderBottom: "1px solid #27272a",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: 900,
                letterSpacing: "-1px",
              }}
            >
              HOPE<span style={{ color: "#a855f7" }}>.</span>
            </div>

            <div
              style={{
                marginTop: "6px",
                color: "#71717a",
                fontSize: "13px",
              }}
            >
              COMPETITIVE MATCH ARENA
            </div>
          </div>

          <div
            style={{
              textAlign: "right",
              color: "#a1a1aa",
              fontSize: "13px",
            }}
          >
            <div>{tournament.game}</div>
            <div>Tournament #{tournament.id}</div>
          </div>
        </header>

        {/* TITLE */}
        <section
          style={{
            textAlign: "center",
            padding: "55px 0 35px",
          }}
        >
          <div
            style={{
              color: "#c084fc",
              fontSize: "13px",
              fontWeight: 800,
              letterSpacing: "4px",
            }}
          >
            ROUND 1
          </div>

          <h1
            style={{
              fontSize: "48px",
              margin: "12px 0",
              fontWeight: 900,
              letterSpacing: "-2px",
            }}
          >
            {tournament.name}
          </h1>

          <p
            style={{
              color: "#71717a",
              margin: 0,
            }}
          >
            Match Arena
          </p>
        </section>

        {/* VS CARD */}
        <section
          style={{
            border: "1px solid #3f3f46",
            borderRadius: "24px",
            background:
              "linear-gradient(145deg, rgba(24,24,27,.96), rgba(13,13,17,.96))",
            padding: "40px",
            boxShadow: "0 0 60px rgba(168,85,247,.12)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 120px 1fr",
              alignItems: "center",
              gap: "20px",
            }}
          >
            {/* PLAYER 1 */}
            <div
              style={{
                textAlign: "center",
                padding: "30px",
                borderRadius: "18px",
                border: "1px solid #27272a",
                background: "#111114",
              }}
            >
              <div
                style={{
                  color: "#71717a",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "2px",
                }}
              >
                PLAYER 1
              </div>

              <div
                style={{
                  fontSize: "30px",
                  fontWeight: 900,
                  marginTop: "12px",
                }}
              >
                {player1?.profile.gamerName ?? "Waiting..."}
              </div>

              <div
                style={{
                  marginTop: "10px",
                  color: "#a855f7",
                  fontWeight: 700,
                }}
              >
                Rating {player1?.profile.rating ?? 1000}
              </div>
              {player1 && (
                <ReadyButton
                  playerName={player1.profile.gamerName}
                />
              )}
            </div>

            {/* VS */}
            <div
              style={{
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "34px",
                  fontWeight: 1000,
                  color: "#c084fc",
                }}
              >
                VS
              </div>

              <div
                style={{
                  marginTop: "8px",
                  fontSize: "11px",
                  color: "#71717a",
                  letterSpacing: "2px",
                }}
              >
                MATCH
              </div>
            </div>

            {/* PLAYER 2 */}
            <div
              style={{
                textAlign: "center",
                padding: "30px",
                borderRadius: "18px",
                border: "1px solid #27272a",
                background: "#111114",
              }}
            >
              <div
                style={{
                  color: "#71717a",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "2px",
                }}
              >
                PLAYER 2
              </div>

              <div
                style={{
                  fontSize: "30px",
                  fontWeight: 900,
                  marginTop: "12px",
                }}
              >
                {player2?.profile.gamerName ?? "Waiting..."}
              </div>

              <div
                style={{
                  marginTop: "10px",
                  color: "#a855f7",
                  fontWeight: 700,
                }}
              >
                Rating {player2?.profile.rating ?? 1000}
              </div>
              {player2 && (
                <ReadyButton
                  playerName={player2.profile.gamerName}
                />
              )}
            </div>
          </div>

          {/* SCORE */}
          {player1 && player2 && (
            <MatchScoreboard
              tournamentId={tournament.id}
              player1Id={player1.userId}
              player2Id={player2.userId}
              player1Name={player1.profile.gamerName}
              player2Name={player2.profile.gamerName}
            />
          )}

          <MatchCountdown
            startTime={tournament.startTime.toISOString()}
            hasPlayers={players.length >= 2}
          />
        </section>

        {/* MATCH INFORMATION */}
        <section
          style={{
            marginTop: "25px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <div
            style={{
              padding: "28px",
              borderRadius: "18px",
              border: "1px solid #27272a",
              background: "#101014",
            }}
          >
            <div
              style={{
                color: "#71717a",
                fontSize: "12px",
                letterSpacing: "2px",
                fontWeight: 800,
              }}
            >
              TOURNAMENT
            </div>

            <h2 style={{ margin: "10px 0" }}>
              {tournament.name}
            </h2>

            <p style={{ color: "#a1a1aa" }}>
              {tournament.game}
            </p>

            <p style={{ color: "#a1a1aa" }}>
              Prize Pool: ₹{tournament.prizePool}
            </p>
          </div>

          <div
            style={{
              padding: "28px",
              borderRadius: "18px",
              border: "1px solid #27272a",
              background: "#101014",
            }}
          >
            <div
              style={{
                color: "#71717a",
                fontSize: "12px",
                letterSpacing: "2px",
                fontWeight: 800,
              }}
            >
              MATCH DETAILS
            </div>

            <h2 style={{ margin: "10px 0" }}>
              {players.length} / {tournament.maxPlayers} Players
            </h2>

            <p style={{ color: "#a1a1aa" }}>
              Status: {tournament.status}
            </p>

            <p style={{ color: "#a1a1aa" }}>
              Starts:{" "}
              {new Date(tournament.startTime).toLocaleString()}
            </p>
          </div>
        </section>

        {/* PLAYERS */}
        <section
          style={{
            marginTop: "25px",
            padding: "28px",
            borderRadius: "18px",
            border: "1px solid #27272a",
            background: "#101014",
          }}
        >
          <div
            style={{
              color: "#71717a",
              fontSize: "12px",
              letterSpacing: "2px",
              fontWeight: 800,
            }}
          >
            PARTICIPANTS
          </div>

          <h2 style={{ marginTop: "10px" }}>
            Match Players
          </h2>

          <div
            style={{
              display: "grid",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            {tournament.participants.map((participant, index) => (
              <div
                key={participant.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px 18px",
                  borderRadius: "12px",
                  background: "#18181b",
                  border: "1px solid #27272a",
                }}
              >
                <div>
                  <span
                    style={{
                      color: "#71717a",
                      marginRight: "14px",
                    }}
                  >
                    #{index + 1}
                  </span>

                  <strong>
                    {participant.profile.gamerName}
                  </strong>
                </div>

                <span
                  style={{
                    color: "#c084fc",
                    fontWeight: 700,
                  }}
                >
                  {participant.profile.rating}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}