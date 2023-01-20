import React from "react";
import Candidate from "~/types/Candidate";
import Contest, { CONTEST_DISPLAY } from "~/types/Contest";
import User from "~/types/User";
import LeaderboardGrid from "./LeaderboardGrid";
import LeaderboardList from "./LeaderboardList";

export default function Leaderboard({
  type,
  ...leaderboardProps
}: {
  type: CONTEST_DISPLAY;
  contest: Contest;
  candidates: Candidate[];
  votingPower?: number;
  user: User | null;
}) {
  switch (type) {
    case CONTEST_DISPLAY.LIST:
      return <LeaderboardList {...leaderboardProps} />;
    case CONTEST_DISPLAY.GRID:
      return <LeaderboardGrid {...leaderboardProps} />;
    default:
      return null;
  }
}
