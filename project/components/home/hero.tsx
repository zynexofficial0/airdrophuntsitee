'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Rocket, Search, Users, Sparkles, Gift, BookOpen, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero({ stats }: { stats: { airdrops: number; articles: number; active: number } }) {
  return (
    <section className="relative isolate overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid-bg opacity-25" />
        <div className="absolute left-[-8%] top-[-12%] h-72 w-72 rounded-full bg-emerald-500/20 blur-[120px]" />
        <div className="absolute bottom-[-2%] right-[-6%] h-96 w-96 rounded-full bg-cyan-500/20 blur-[140px]" />
        <div className="absolute inset-y-0 right-1/2 w-px bg-gradient-to-b from-transparent via-emerald-400/20 to-transparent" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="hud-pill inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-[0.24em] text-emerald-300 mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Community-powered Web3 intelligence
            </div>
            <h1 className="mb-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl">
              Airdrop Hunt —{' '}
              <span className="block bg-gradient-to-r from-emerald-300 via-green-300 to-cyan-300 bg-clip-text text-transparent">
                Discover the best alpha
              </span>
              for airdrops, guides, and builders.
            </h1>
            <p className="mb-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Track promising airdrops, read expert crypto guides, and submit your own articles or airdrop opportunities on Airdrop Hunt — a premium community-powered Web3 discovery platform.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="border-0 bg-gradient-to-r from-emerald-400 via-emerald-300 to-cyan-400 text-[#030909] shadow-[0_0_30px_rgba(0,255,136,0.25)] hover:shadow-[0_0_40px_rgba(0,255,136,0.35)]">
                <Link href="/airdrops">
                  Explore Airdrops <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-emerald-400/30 text-emerald-200 hover:border-emerald-400/60 hover:bg-emerald-400/10">
                <Link href="/articles">Read Articles</Link>
              </Button>
              <Button asChild variant="ghost" className="text-foreground hover:bg-white/8 hover:text-emerald-200">
                <Link href="/submit-airdrop">
                  <Rocket className="mr-2 h-4 w-4" /> Submit Airdrop
                </Link>
              </Button>
              <Button asChild variant="ghost" className="text-foreground hover:bg-white/8 hover:text-cyan-200">
                <Link href="/submit-article">
                  <FileText className="mr-2 h-4 w-4" /> Submit Article
                </Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {['Verified listings', 'Real-time updates', 'Community driven'].map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="panel-shell relative h-[500px] w-full">
              <div className="absolute inset-0 rounded-[2rem] border border-white/10" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,255,136,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.14),transparent_35%)]" />
              <svg viewBox="0 0 460 460" className="absolute inset-0 h-full w-full opacity-70">
                <path d="M80 100H205" stroke="rgba(0,255,136,0.32)" strokeWidth="1.4" strokeLinecap="round" />
                <path d="M205 100V220" stroke="rgba(34,211,238,0.25)" strokeWidth="1.4" strokeLinecap="round" />
                <path d="M205 220H330" stroke="rgba(0,255,136,0.25)" strokeWidth="1.4" strokeLinecap="round" />
                <path d="M330 220V340" stroke="rgba(34,211,238,0.26)" strokeWidth="1.4" strokeLinecap="round" />
                <path d="M120 340H330" stroke="rgba(0,255,136,0.2)" strokeWidth="1.4" strokeLinecap="round" />
                <circle cx="80" cy="100" r="4" fill="#5ef7b2" />
                <circle cx="205" cy="100" r="4" fill="#4ddcff" />
                <circle cx="205" cy="220" r="4" fill="#5ef7b2" />
                <circle cx="330" cy="220" r="4" fill="#4ddcff" />
                <circle cx="330" cy="340" r="4" fill="#5ef7b2" />
                <circle cx="120" cy="340" r="4" fill="#4ddcff" />
              </svg>
              <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/20 animate-spin-slow" />
              <div className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/15" />
              <div className="absolute left-1/2 top-1/2 h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-emerald-400/30 via-emerald-500/10 to-cyan-400/30 blur-2xl animate-pulse-glow" />
              <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-300/30 bg-black/60 shadow-[0_0_80px_rgba(0,255,136,0.2)] backdrop-blur-xl">
                <Rocket className="h-10 w-10 text-emerald-200" />
              </div>

              <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute left-8 top-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-emerald-400/35 bg-black/50 shadow-[0_0_30px_rgba(0,255,136,0.16)] backdrop-blur"
              >
                <Gift className="h-9 w-9 text-emerald-300" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 24, 0], rotate: [0, -8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute right-4 top-10 flex h-24 w-24 items-center justify-center rounded-2xl border border-cyan-400/30 bg-black/50 shadow-[0_0_26px_rgba(34,211,238,0.15)] backdrop-blur"
              >
                <BookOpen className="h-10 w-10 text-cyan-300" />
              </motion.div>

              <motion.div
                animate={{ y: [0, -18, 0], x: [0, 10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute bottom-8 left-12 flex h-20 w-20 items-center justify-center rounded-2xl border border-emerald-400/35 bg-black/50 shadow-[0_0_28px_rgba(0,255,136,0.16)] backdrop-blur"
              >
                <Search className="h-9 w-9 text-emerald-300" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0], rotate: [0, 12, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className="absolute bottom-12 right-10 flex h-20 w-20 items-center justify-center rounded-2xl border border-cyan-400/30 bg-black/50 shadow-[0_0_24px_rgba(34,211,238,0.15)] backdrop-blur"
              >
                <ShieldCheck className="h-9 w-9 text-cyan-300" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            { label: 'Airdrops Tracked', value: stats.airdrops, icon: Gift },
            { label: 'Articles Published', value: stats.articles, icon: BookOpen },
            { label: 'Active Opportunities', value: stats.active, icon: Rocket },
            { label: 'Community Submissions', value: stats.airdrops + stats.articles, icon: Users },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-[1.25rem] p-5 text-center transition-transform duration-300 hover:-translate-y-1">
              <stat.icon className="mx-auto mb-2 h-5 w-5 text-emerald-300" />
              <div className="text-2xl font-bold text-white md:text-3xl">{stat.value}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.24em] text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
