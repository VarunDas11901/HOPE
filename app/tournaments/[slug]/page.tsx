import { notFound } from "next/navigation";
import { tournaments } from "../../tournaments";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function TournamentPage({ params }: PageProps) {
  const { slug } = await params;

  const tournament = tournaments.find(
    (tournament) => tournament.slug === slug
  );

  if (!tournament) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#08090d] px-6 py-20 text-white">
      <div className="mx-auto max-w-5xl">

        <a
          href="/#tournaments"
          className="text-sm text-gray-400 transition hover:text-white"
        >
          ← Back to tournaments
        </a>

        <div className="mt-10 rounded-3xl border border-white/10 bg-[#101218] p-8 sm:p-12">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">
            {tournament.game}
          </p>

          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
            {tournament.title}
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-400">
            {tournament.description}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm text-gray-500">
                Prize Pool
              </p>

              <p className="mt-2 text-2xl font-bold">
                {tournament.prizePool}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm text-gray-500">
                Participants
              </p>

              <p className="mt-2 text-2xl font-bold">
                {tournament.participants}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm text-gray-500">
                Starts
              </p>

              <p className="mt-2 text-2xl font-bold">
                {tournament.starts}
              </p>
            </div>

          </div>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-3">

          <div className="md:col-span-2 rounded-2xl border border-white/10 bg-[#101218] p-8">

            <h2 className="text-2xl font-bold">
              Tournament Details
            </h2>

            <div className="mt-6 space-y-6 text-gray-400">

              <div>
                <h3 className="font-semibold text-white">
                  Format
                </h3>
                <p className="mt-1">
                  {tournament.format}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  Region
                </h3>
                <p className="mt-1">
                  {tournament.region}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  Entry
                </h3>
                <p className="mt-1">
                  {tournament.entry}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  Rules
                </h3>
                <p className="mt-1">
                  {tournament.rules}
                </p>
              </div>

            </div>
          </div>

          <div className="h-fit rounded-2xl border border-purple-500/30 bg-purple-500/5 p-8">

            <p className="text-sm text-gray-400">
              Ready to compete?
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Join the tournament
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-400">
              Create your HOPE gaming profile to participate in tournaments.
            </p>

            <button className="mt-6 w-full rounded-xl bg-purple-600 px-5 py-3 font-semibold transition hover:bg-purple-500">
              Join Tournament
            </button>

          </div>

        </div>
      </div>
    </main>
  );
}