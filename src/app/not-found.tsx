import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="container py-16">
      <div className="mx-auto max-w-xl rounded-3xl border bg-card/70 p-10 text-center shadow-sm backdrop-blur">
        <p className="text-xs font-semibold text-muted-foreground">404</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight">Page not found</h1>
        <p className="mt-3 text-muted-foreground">
          The page you’re looking for doesn’t exist (or was moved).
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild className="rounded-2xl">
            <Link href="/">Go home</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-2xl">
            <Link href="/our-projects">Browse projects</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
