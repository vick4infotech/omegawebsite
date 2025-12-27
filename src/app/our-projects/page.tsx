import type { Metadata } from "next";

import { ProjectsDirectory } from "@/components/sections/projects-directory";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Our Projects",
  description: `Explore ${site.acronym} initiatives across Africa—education, health, leadership, livelihoods, and relief.`
};

export default function OurProjectsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const initiativeParam = typeof searchParams?.initiative === "string" ? searchParams?.initiative : undefined;
  return <ProjectsDirectory initialInitiative={(initiativeParam as any) ?? "all"} />;
}
