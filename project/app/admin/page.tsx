import type { Metadata } from 'next';
import { BarChart3, FileText, Zap } from 'lucide-react';
import { getStats } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'Admin Dashboard — Airdrop Hunt',
  description: 'Manage articles and airdrops',
};

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold tracking-tight mb-2">
          Admin <span className="gradient-green-text">Dashboard</span>
        </h1>
        <p className="text-muted-foreground">
          Manage content and track platform statistics.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="glass rounded-xl p-6 border border-border/60">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Articles</p>
              <p className="text-3xl font-bold text-foreground">{stats.articles}</p>
            </div>
            <FileText className="w-8 h-8 text-primary opacity-60" />
          </div>
        </div>

        <div className="glass rounded-xl p-6 border border-border/60">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Airdrops</p>
              <p className="text-3xl font-bold text-foreground">{stats.airdrops}</p>
            </div>
            <Zap className="w-8 h-8 text-primary opacity-60" />
          </div>
        </div>

        <div className="glass rounded-xl p-6 border border-border/60">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Active</p>
              <p className="text-3xl font-bold text-foreground">{stats.active}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-primary opacity-60" />
          </div>
        </div>
      </div>

      {/* Management Sections */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass rounded-xl p-8 border border-border/60">
          <h2 className="font-display text-2xl font-bold mb-4">Manage Articles</h2>
          <p className="text-muted-foreground mb-6">
            Review, approve, feature, and manage submitted articles. Coming soon: inline editing and batch operations.
          </p>
          <a href="/admin/articles" className="inline-flex px-4 py-2 rounded-lg bg-primary text-black font-medium hover:bg-primary/90 transition-colors">
            Go to Articles
          </a>
        </div>

        <div className="glass rounded-xl p-8 border border-border/60">
          <h2 className="font-display text-2xl font-bold mb-4">Manage Airdrops</h2>
          <p className="text-muted-foreground mb-6">
            Review, approve, feature, and manage submitted airdrops. Coming soon: inline editing and batch operations.
          </p>
          <a href="/admin/airdrops" className="inline-flex px-4 py-2 rounded-lg bg-primary text-black font-medium hover:bg-primary/90 transition-colors">
            Go to Airdrops
          </a>
        </div>
      </div>
    </div>
  );
}
