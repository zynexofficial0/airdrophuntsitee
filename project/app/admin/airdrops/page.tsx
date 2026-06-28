import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, XCircle, Star, Zap } from 'lucide-react';
import { getLatestAirdrops } from '@/lib/queries';
import { AirdropsManagementTable } from '@/components/admin/airdrops-management-table';
import { BulkApproveAirdropsButton } from '@/components/admin/bulk-approve-airdrops-button';

export const metadata: Metadata = {
  title: 'Manage Airdrops — Admin',
  description: 'Review and manage submitted airdrops',
};

export const dynamic = 'force-dynamic';

export default async function ManageAirdropsPage() {
  const airdrops = await getLatestAirdrops(100);

  const byStatus = {
    live: airdrops.filter((a) => a.status === 'live'),
    upcoming: airdrops.filter((a) => a.status === 'upcoming'),
    ended: airdrops.filter((a) => a.status === 'ended'),
    pending: airdrops.filter((a) => a.status === 'pending'),
    featured: airdrops.filter((a) => a.featured),
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight mb-2">
            Manage <span className="gradient-green-text">Airdrops</span>
          </h1>
          <p className="text-muted-foreground">
            Review, approve, feature, and manage airdrop submissions.
          </p>
        </div>
        <BulkApproveAirdropsButton pendingCount={byStatus.pending.length} />
      </div>

      {/* Status Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="glass rounded-xl p-4 border border-border/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Live</span>
            <CheckCircle className="w-4 h-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold">{byStatus.live.length}</p>
        </div>

        <div className="glass rounded-xl p-4 border border-border/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Upcoming</span>
            <Zap className="w-4 h-4 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold">{byStatus.upcoming.length}</p>
        </div>

        <div className="glass rounded-xl p-4 border border-border/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Ended</span>
            <XCircle className="w-4 h-4 text-red-500" />
          </div>
          <p className="text-2xl font-bold">{byStatus.ended.length}</p>
        </div>

        <div className="glass rounded-xl p-4 border border-border/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Pending</span>
            <XCircle className="w-4 h-4 text-orange-500" />
          </div>
          <p className="text-2xl font-bold">{byStatus.pending.length}</p>
        </div>

        <div className="glass rounded-xl p-4 border border-border/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Featured</span>
            <Star className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl font-bold">{byStatus.featured.length}</p>
        </div>
      </div>

      {/* Live Section */}
      {byStatus.live.length > 0 && (
        <div className="mb-12">
          <h2 className="font-display text-2xl font-bold mb-4">
            Live Airdrops ({byStatus.live.length})
          </h2>
          <AirdropsManagementTable airdrops={byStatus.live} />
        </div>
      )}

      {/* Upcoming Section */}
      {byStatus.upcoming.length > 0 && (
        <div className="mb-12">
          <h2 className="font-display text-2xl font-bold mb-4">
            Upcoming Airdrops ({byStatus.upcoming.length})
          </h2>
          <AirdropsManagementTable airdrops={byStatus.upcoming} />
        </div>
      )}

      {/* Ended Section */}
      {byStatus.ended.length > 0 && (
        <div className="mb-12">
          <h2 className="font-display text-2xl font-bold mb-4">
            Ended Airdrops ({byStatus.ended.length})
          </h2>
          <AirdropsManagementTable airdrops={byStatus.ended} />
        </div>
      )}

      {/* Pending Section */}
      {byStatus.pending.length > 0 && (
        <div>
          <h2 className="font-display text-2xl font-bold mb-4">
            Pending Review ({byStatus.pending.length})
          </h2>
          <AirdropsManagementTable airdrops={byStatus.pending} />
        </div>
      )}
    </div>
  );
}
