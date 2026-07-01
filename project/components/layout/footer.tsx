import Link from 'next/link';
import { Rocket, Twitter, Send, Github, Mail } from 'lucide-react';

const footerLinks = {
  Explore: [
    { href: '/airdrops', label: 'All Airdrops' },
    { href: '/articles', label: 'All Articles' },
    { href: '/', label: 'Featured' },
  ],
  Submit: [
    { href: '/submit-article', label: 'Submit Article' },
    { href: '/submit-airdrop', label: 'Submit Airdrop' },
  ],
  Company: [
    { href: '/', label: 'About' },
    { href: '/', label: 'Contact' },
    { href: '/', label: 'Privacy' },
  ],
};

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/10 glass-strong">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-5 md:grid-cols-[1.2fr_0.6fr_0.6fr_0.6fr]">
          <div className="md:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-300 to-cyan-400">
                <Rocket className="h-5 w-5 text-black" />
              </div>
              <span className="font-display text-lg font-bold text-white">
                Airdrop<span className="gradient-green-text">Hunt</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground">
              The premium community-powered Web3 discovery platform. Track airdrops, read guides, and submit your own opportunities.
            </p>
            <div className="mt-4 flex items-center gap-3">
              {[Twitter, Send, Github, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:border-emerald-400/40 hover:text-emerald-200"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-3 text-sm font-semibold text-foreground">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-emerald-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Airdrop Hunt. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Not financial advice. Always do your own research.
          </p>
        </div>
      </div>
    </footer>
  );
}
