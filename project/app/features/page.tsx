import type { Metadata } from 'next';
import { CheckCircle2, Zap, Shield, TrendingUp, Users, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Features — Airdrop Hunt',
  description: 'Explore all the features that make Airdrop Hunt your ultimate Web3 discovery platform.',
};

const features = [
  {
    title: 'Advanced Airdrop Discovery',
    description: 'Filter airdrops by blockchain, category, and status. Find your next opportunity instantly.',
    icon: Zap,
    color: 'text-primary',
  },
  {
    title: 'Expert-Written Guides',
    description: 'Learn from comprehensive guides on DeFi, trading, security, and Web3 fundamentals.',
    icon: BookOpen,
    color: 'text-blue-400',
  },
  {
    title: 'Community-Powered',
    description: 'Submit airdrops and articles. Share your knowledge with the Web3 community.',
    icon: Users,
    color: 'text-green-400',
  },
  {
    title: 'Security First',
    description: 'All submissions are reviewed. Trust our curated collection of safe opportunities.',
    icon: Shield,
    color: 'text-yellow-400',
  },
  {
    title: 'Real-Time Updates',
    description: 'Status updates, deadline tracking, and instant notifications for new airdrops.',
    icon: TrendingUp,
    color: 'text-purple-400',
  },
  {
    title: 'Verified Content',
    description: 'Admin-verified submissions ensure quality and accuracy across the platform.',
    icon: CheckCircle2,
    color: 'text-emerald-400',
  },
];

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Powerful Features for Web3 Success
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover why thousands of Web3 enthusiasts trust Airdrop Hunt for their blockchain opportunities.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <div key={i} className="glass rounded-xl p-6 border border-border/60 hover:border-primary/40 transition-colors group">
              <div className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors`}>
                <Icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          );
        })}
      </div>

      <div className="glass rounded-xl p-8 md:p-12 border border-border/60 max-w-3xl mx-auto">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-center">
          Start Your Web3 Journey Today
        </h2>
        <p className="text-muted-foreground text-center mb-8">
          Whether you&apos;re looking for your next airdrop opportunity or want to learn about DeFi and blockchain technology, Airdrop Hunt has everything you need to succeed in Web3.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="/airdrops"
            className="px-6 py-3 rounded-lg bg-primary text-black font-semibold hover:bg-primary/90 transition-colors"
          >
            Explore Airdrops
          </a>
          <a
            href="/articles"
            className="px-6 py-3 rounded-lg border border-primary/40 text-primary font-semibold hover:bg-primary/10 transition-colors"
          >
            Read Guides
          </a>
        </div>
      </div>
    </div>
  );
}
