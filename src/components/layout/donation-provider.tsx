"use client";

import * as React from "react";

import { DonationModal } from "@/components/layout/donation-modal";
import { DonateIntent, DonationContext } from "@/components/layout/donation-context";

export function DonationProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [intent, setIntent] = React.useState<DonateIntent | undefined>(undefined);

  const value = React.useMemo(
    () => ({
      open: (i?: DonateIntent) => {
        setIntent(i);
        setOpen(true);
      },
      close: () => setOpen(false),
    }),
    [],
  );

  return (
    <DonationContext.Provider value={value}>
      {children}
      {open ? <DonationModal intent={intent} /> : null}
    </DonationContext.Provider>
  );
}
