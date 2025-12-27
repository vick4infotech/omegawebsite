"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { site } from "@/config/site";
import type { DonationFrequency, DonateIntent } from "./donation-context";
import { useDonate } from "./donation-context";

const schema = z.object({
  frequency: z.enum(["one-time", "monthly"]),
  amount: z
    .number({ invalid_type_error: "Enter an amount" })
    .min(1, "Minimum donation is $1")
    .max(100000, "Please enter a smaller amount"),
});

type FormValues = z.infer<typeof schema>;

const presets = [5, 10, 25, 50] as const;

export default function DonationModal({
  open,
  onOpenChange,
  intent,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  intent?: DonateIntent;
}) {
  const router = useRouter();
  const { close } = useDonate();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      frequency: intent?.frequency ?? "one-time",
      amount: intent?.amount ?? 25,
    },
    mode: "onChange",
  });

  React.useEffect(() => {
    form.reset({
      frequency: intent?.frequency ?? "one-time",
      amount: intent?.amount ?? 25,
    });
  }, [intent, form]);

  const selectedAmount = form.watch("amount");
  const selectedFrequency = form.watch("frequency");

  function onSubmit(values: FormValues) {
    const params = new URLSearchParams();
    params.set("amount", String(values.amount));
    params.set("frequency", values.frequency);
    if (intent?.projectSlug) params.set("project", intent.projectSlug);

    close();
    router.push(`/donate?${params.toString()}`);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Donate to {site.name}</DialogTitle>
          <DialogDescription>
            Choose an amount and frequency. You’ll review the donation on the donate page.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <Tabs
            value={selectedFrequency}
            onValueChange={(v) =>
              form.setValue("frequency", v as DonationFrequency, { shouldValidate: true })
            }
          >
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
                  selectedAmount === amt && "border-primary ring-2 ring-ring",
                )}
              >
                ${amt}
              </button>
            ))}
          </div>

          <Card className="p-4">
            <label className="text-sm font-medium">Custom amount</label>
            <div className="mt-2 flex items-center gap-2">
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
              <p className="mt-2 text-sm text-destructive">
                {form.formState.errors.amount.message}
              </p>
            )}
          </Card>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Payment integration placeholder. You’ll also get an external donate link.
            </p>
            <Button type="submit" disabled={!form.formState.isValid} className="rounded-xl">
              Continue
            </Button>
          </div>

          <div className="text-xs text-muted-foreground">
            Prefer the external form?{" "}
            <a className="underline" href={site.donateExternalUrl} target="_blank" rel="noreferrer">
              Open external donate page
            </a>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
