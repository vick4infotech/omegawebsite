import type { Metadata } from "next";

import { TeamGrid } from "@/components/sections/team-grid";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Our Teams",
  description: `Meet the leadership, board, regional advisors, and operations team advancing ${site.acronym}'s mission.`,
};

export default function OurTeamsPage() {
  return <TeamGrid />;
}
