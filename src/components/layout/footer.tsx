"use client";

import * as React from "react";
import Link from "next/link";
import { Facebook, Instagram, Youtube, X } from "lucide-react";

import { site } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const socialIcons: Record<string, React.ReactNode> = {
  facebook: <Facebook className="h-4 w-4" />,
  instagram: <Instagram className="h-4 w-4" />,
  x: <X className="h-4 w-4" />,
  youtube: <Youtube className="h-4 w-4" />,
};

export function Footer() {
  return (
    <footer className="mt-20 border-t bg-background">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold">{site.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{site.tagline}</p>
            <p className="mt-4 text-sm text-muted-foreground whitespace-pre-line">
              <span className="font-medium text-foreground">Contact</span>
              {"\n"}{site.contact.email}
              {"\n"}{site.contact.phone}
              {"\n\n"}<span className="font-medium text-foreground">PO Box</span>
              {"\n"}{site.contact.poBox}
            </p>
            <div className="mt-4 flex items-center gap-2">
              {Object.entries(site.socials).map(([k, v]) => (
                <a
                  key={k}
                  href={v}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-background hover:bg-accent"
                  aria-label={k}
                >
                  {socialIcons[k] ?? null}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Explore</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/about-us" className="text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/our-teams" className="text-muted-foreground hover:text-foreground">
                  Our Teams
                </Link>
              </li>
              <li>
                <Link href="/our-projects" className="text-muted-foreground hover:text-foreground">
                  Our Projects
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-muted-foreground hover:text-foreground">
                  Donate
                </Link>
              </li>
            </ul>
            <p className="mt-6 text-xs text-muted-foreground">
              501(c)(3) nonprofit status (text-only mention; verify details before public use).
            </p>
          </div>

          <div>
            <Card className="p-6">
              <h4 className="text-sm font-semibold">Newsletter</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                Frontend-only signup placeholder. Connect to your email provider when ready.
              </p>
              <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <Input type="email" placeholder="Email address" required />
                <Button type="submit">Sign up</Button>
              </form>
              <p className="mt-3 text-xs text-muted-foreground">
                By signing up you agree to receive occasional updates (placeholder).
              </p>
            </Card>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="opacity-90">Built for performance, accessibility, and smooth storytelling.</p>
        </div>
      </div>
    </footer>
  );
}
