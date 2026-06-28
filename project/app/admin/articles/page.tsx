import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, XCircle, Star } from 'lucide-react';
import { getLatestArticles } from '@/lib/queries';
import { ArticlesManagementTable } from '@/components/admin/articles-management-table';

export const metadata: Metadata = {
  title: 'Manage Articles — Admin',
  description: 'Review and manage submitted articles',
};

export const dynamic = 'force-dynamic';

export default async function ManageArticlesPage() {
  const articles = await getLatestArticles(100);

  const byStatus = {
    approved: articles.filter((a) => a.status === 'approved'),
    pending: articles.filter((a) => a.status === 'pending'),
    rejected: articles.filter((a) => a.status === 'rejected'),
    featured: articles.filter((a) => a.featured),
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold tracking-tight mb-2">
          Manage <span className="gradient-green-text">Articles</span>
        </h1>
        <p className="text-muted-foreground">
          Review, approve, feature, and manage article submissions.
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="glass rounded-xl p-4 border border-border/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Approved</span>
            <CheckCircle className="w-4 h-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold">{byStatus.approved.length}</p>
        </div>

        <div className="glass rounded-xl p-4 border border-border/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Pending</span>
            <XCircle className="w-4 h-4 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold">{byStatus.pending.length}</p>
        </div>

        <div className="glass rounded-xl p-4 border border-border/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Rejected</span>
            <XCircle className="w-4 h-4 text-red-500" />
          </div>
          <p className="text-2xl font-bold">{byStatus.rejected.length}</p>
        </div>

        <div className="glass rounded-xl p-4 border border-border/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Featured</span>
            <Star className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl font-bold">{byStatus.featured.length}</p>
        </div>
      </div>

      {/* Pending Section */}
      {byStatus.pending.length > 0 && (
        <div className="mb-12">
          <h2 className="font-display text-2xl font-bold mb-4">
            Pending Review ({byStatus.pending.length})
          </h2>
          <ArticlesManagementTable articles={byStatus.pending} />
        </div>
      )}

      {/* Approved Section */}
      {byStatus.approved.length > 0 && (
        <div className="mb-12">
          <h2 className="font-display text-2xl font-bold mb-4">
            Approved Articles ({byStatus.approved.length})
          </h2>
          <ArticlesManagementTable articles={byStatus.approved} />
        </div>
      )}

      {/* Rejected Section */}
      {byStatus.rejected.length > 0 && (
        <div>
          <h2 className="font-display text-2xl font-bold mb-4">
            Rejected Articles ({byStatus.rejected.length})
          </h2>
          <ArticlesManagementTable articles={byStatus.rejected} />
        </div>
      )}
    </div>
  );
}
