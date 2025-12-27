"use client";

import { Button } from "@/components/ui/button";
import { useDonate, type DonationFrequency } from "@/components/layout/donation-context";

export function DonateReviewActions({
  amount,
  frequency,
  projectSlug,
}: {
  amount: number;
  frequency: DonationFrequency;
  projectSlug?: string;
}) {
  const { open } = useDonate();

  return (
    <Button
      type="button"
      variant="outline"
      className="rounded-2xl"
      onClick={() => open({ amount, frequency, projectSlug })}
    >
      Edit donation
    </Button>
  );
}
