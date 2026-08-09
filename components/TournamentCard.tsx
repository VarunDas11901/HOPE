type TournamentCardProps = {
  game: string;
  title: string;
  prizePool: string;
  players: string;
  starts: string;
  accent: "purple" | "blue" | "green";
  href: string;
};

export default function TournamentCard({
  game,
  title,
  prizePool,
  players,
  starts,
  accent,
  href,
}: TournamentCardProps) {
  const accentStyles = {
    purple: "from-purple-950 via-purple-900/40",
    blue: "from-blue-950 via-blue-900/40",
    green: "from-emerald-950 via-emerald-900/30",
  };

  const textStyles = {
    purple: "text-purple-300",
    blue: "text-blue-300",
    green: "text-emerald-300",
  };

  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-[#101218] transition hover:-translate-y-1 hover:border-purple-500/40">

      <div
        className={`flex h-40 items-end bg-gradient-to-br ${accentStyles[accent]} to-[#101218] p-6`}
      >
        <div>
          <p
            className={`text-xs font-semibold uppercase tracking-wider ${textStyles[accent]}`}
          >
            {game}
          </p>

          <h3 className="mt-2 text-xl font-bold">
            {title}
          </h3>
        </div>
      </div>

      <div className="p-6">

        <div className="grid grid-cols-2 gap-4 text-sm">

          <div>
            <p className="text-gray-500">
              Prize Pool
            </p>

            <p className="mt-1 font-semibold">
              {prizePool}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Players
            </p>

            <p className="mt-1 font-semibold">
              {players}
            </p>
          </div>

        </div>

        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">

          <span className="text-sm text-gray-400">
            {starts}
          </span>

          <a
            href={href}
            className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold transition hover:bg-purple-500"
            >
            View
          </a>

        </div>

      </div>
    </div>
  );
}