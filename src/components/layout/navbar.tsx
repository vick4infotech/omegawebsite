"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { site } from "@/config/site";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "./mode-toggle";
import { useDonate } from "./donation-context";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "About Us", href: "/about-us" },
  { label: "Our Teams", href: "/our-teams" },
  { label: "Our Projects", href: "/our-projects" },
];

export function Navbar() {
  const pathname = usePathname();
  const { open } = useDonate();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/50">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="relative h-9 w-9 overflow-hidden rounded-xl bg-primary/10 ring-1 ring-primary/20">
            <Image
              src="/assets/logo.svg"
              alt={`${site.name} logo`}
              fill
              sizes="36px"
              className="object-contain p-1"
              priority
            />
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight">{site.name}</div>
            <div className="hidden text-xs text-muted-foreground sm:block">{site.tagline}</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={cn(
                "rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-accent hover:text-foreground",
                active && "bg-accent text-foreground",
              )}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />

          <Button
            onClick={() => open()}
            className="hidden rounded-xl md:inline-flex"
          >
            Donate
          </Button>

          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-xl" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                {navItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem onSelect={() => open()}>
                  <span className="font-semibold text-primary">Donate</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
