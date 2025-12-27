"use client";

import { Button } from "@/components/ui/button";
import { useDonate } from "@/components/layout/donation-context";

export function DonateToProject({
  projectSlug,
}: {
  projectSlug: string;
}) {
  const { open } = useDonate();

  return (
    <Button
      type="button"
      className="rounded-2xl"
      onClick={() => open({ projectSlug, amount: 25, frequency: "one-time" })}
    >
      Donate to this initiative
    </Button>
  );
}
