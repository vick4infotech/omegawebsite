"use client";

import * as React from "react";

export type DonationFrequency = "one-time" | "monthly";

export type DonateIntent = {
  amount?: number;
  frequency?: DonationFrequency;
  projectSlug?: string;
};

type DonationContextValue = {
  open: (intent?: DonateIntent) => void;
  close: () => void;
};

const DonationContext = React.createContext<DonationContextValue | null>(null);

export function DonationProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [intent, setIntent] = React.useState<DonateIntent>({});

  const open = React.useCallback((next?: DonateIntent) => {
    setIntent(next ?? {});
    setIsOpen(true);
  }, []);

  const close = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <DonationContext.Provider value={{ open, close }}>
      {children}
      {/* Lazy import keeps initial bundle lean */}
      {isOpen ? (
        <React.Suspense fallback={null}>
          <DonationModal open={isOpen} onOpenChange={setIsOpen} intent={intent} />
        </React.Suspense>
      ) : null}
    </DonationContext.Provider>
  );
}

export function useDonate() {
  const ctx = React.useContext(DonationContext);
  if (!ctx) throw new Error("useDonate must be used within DonationProvider");
  return ctx;
}

const DonationModal = React.lazy(() => import("@/components/layout/donation-modal"));
