export type Tournament = {
  slug: string;
  game: string;
  title: string;
  description: string;
  prizePool: string;
  participants: string;
  starts: string;
  format: string;
  region: string;
  entry: string;
  rules: string;
  accent: "purple" | "blue" | "green";
};

export const tournaments: Tournament[] = [
  {
    slug: "friday-night-arena",
    game: "VALORANT",
    title: "Friday Night Arena",
    description:
      "Compete against other players and fight for your share of the tournament prize pool.",
    prizePool: "₹10,000",
    participants: "32 Teams",
    starts: "Starts in 2h 14m",
    format: "5v5 competitive tournament.",
    region: "India",
    entry: "Paid entry",
    rules: "Standard competitive tournament rules apply.",
    accent: "purple",
  },

  {
    slug: "weekend-rivals",
    game: "FC 26",
    title: "Weekend Rivals",
    description:
      "Compete against players from across the community and battle for your share of the tournament rewards.",
    prizePool: "₹7,500",
    participants: "128 Players",
    starts: "Tomorrow",
    format: "1v1 competitive matches.",
    region: "India",
    entry: "Paid entry",
    rules: "Standard competitive tournament rules apply.",
    accent: "blue",
  },

  {
    slug: "community-clash",
    game: "FREE FIRE",
    title: "Community Clash",
    description:
      "Squad up, compete against the community, and fight for your share of the tournament rewards.",
    prizePool: "₹25,000",
    participants: "64 Squads",
    starts: "Saturday",
    format: "Squad-based competitive tournament.",
    region: "India",
    entry: "Free to enter",
    rules:
      "Tournament rules and match instructions will be provided before the competition begins.",
    accent: "green",
  },
];