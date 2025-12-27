"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const schema = z.object({
  frequency: z.enum(["one-time", "monthly"]),
  amount: z
    .number({ invalid_type_error: "Enter an amount" })
    .min(1, "Minimum donation is $1")
    .max(100000, "Please enter a smaller amount"),
});

export type DonationModuleValues = z.infer<typeof schema>;

const presets = [5, 10, 25, 50] as const;

export function DonationModule({
  projectSlug,
  compact = false,
}: {
  projectSlug?: string;
  compact?: boolean;
}) {
  const router = useRouter();
  const form = useForm<DonationModuleValues>({
    resolver: zodResolver(schema),
    defaultValues: { frequency: "one-time", amount: 25 },
    mode: "onChange",
  });

  const amount = form.watch("amount");
  const frequency = form.watch("frequency");

  function onSubmit(values: DonationModuleValues) {
    const params = new URLSearchParams();
    params.set("amount", String(values.amount));
    params.set("frequency", values.frequency);
    if (projectSlug) params.set("project", projectSlug);
    router.push(`/donate?${params.toString()}`);
  }

  return (
    <Card className={cn("rounded-3xl border bg-card/80 p-6 shadow-sm backdrop-blur", compact && "p-5")}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold text-muted-foreground">Give today</p>
          <h3 className="mt-1 text-lg font-semibold">Make a donation</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          {frequency === "monthly" ? "Monthly support" : "One-time gift"}
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-5">
        <Tabs value={frequency} onValueChange={(v) => form.setValue("frequency", v as any, { shouldValidate: true })}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="one-time">One-time</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {presets.map((amt) => (
            <button
              type="button"
              key={amt}
              onClick={() => form.setValue("amount", amt, { shouldValidate: true })}
              className={cn(
                "rounded-xl border bg-background px-3 py-3 text-sm font-semibold shadow-sm transition hover:bg-accent",
                amount === amt && "border-primary ring-2 ring-ring",
              )}
            >
              ${amt}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Custom amount</label>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">$</span>
            <Input
              inputMode="numeric"
              aria-label="Custom donation amount"
              value={String(form.getValues("amount") ?? "")}
              onChange={(e) => {
                const raw = e.target.value.trim();
                const n = raw === "" ? NaN : Number(raw);
                form.setValue("amount", Number.isFinite(n) ? n : 0, { shouldValidate: true });
              }}
            />
          </div>
          {form.formState.errors.amount && (
            <p className="text-sm text-destructive">{form.formState.errors.amount.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            No payment is processed here—this is a seamless demo flow.
          </p>
          <Button type="submit" disabled={!form.formState.isValid} className="rounded-xl">
            Continue
          </Button>
        </div>
      </form>
    </Card>
  );
}
