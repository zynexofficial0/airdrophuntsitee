'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Rocket, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/airdrops', label: 'Airdrops' },
  { href: '/articles', label: 'Articles' },
  { href: '/submit-article', label: 'Submit Article' },
  { href: '/submit-airdrop', label: 'Submit Airdrop' },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass-strong border-b border-white/10">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="group flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-emerald-300 to-cyan-400 opacity-70 blur-md transition-opacity group-hover:opacity-100" />
              <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-300 to-cyan-400">
                <Rocket className="h-5 w-5 text-black" />
              </div>
            </div>
            <span className="font-display text-lg font-bold tracking-tight text-white">
              Airdrop<span className="gradient-green-text">Hunt</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative rounded-full px-3 py-2 text-sm font-medium transition-all',
                  isActive(link.href)
                    ? 'text-emerald-200'
                    : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Button
              asChild
              className="border-0 bg-gradient-to-r from-emerald-400 via-emerald-300 to-cyan-400 text-[#030909] shadow-[0_0_24px_rgba(0,255,136,0.2)]"
            >
              <Link href="/submit-airdrop">
                Join Community <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <button
            className="rounded-full border border-white/10 bg-white/5 p-2 text-foreground md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-b border-white/10 bg-[#050505]/95 md:hidden">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive(link.href)
                    ? 'bg-emerald-400/10 text-emerald-200'
                    : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              className="mt-2 border-0 bg-gradient-to-r from-emerald-400 via-emerald-300 to-cyan-400 text-[#030909]"
            >
              <Link href="/submit-airdrop" onClick={() => setOpen(false)}>
                Join Community
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
