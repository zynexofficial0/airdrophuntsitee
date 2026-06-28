'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, X, Star, Eye } from 'lucide-react';
import type { Article } from '@/types';
import { cn } from '@/lib/utils';

export function ArticlesManagementTable({ articles }: { articles: Article[] }) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === articles.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(articles.map((a) => a.id)));
    }
  };

  return (
    <div className="glass rounded-xl border border-border/60 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-secondary/30">
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedIds.size === articles.length && articles.length > 0}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-border"
                />
              </th>
              <th className="px-4 py-3 text-left font-semibold">Title</th>
              <th className="px-4 py-3 text-left font-semibold">Author</th>
              <th className="px-4 py-3 text-left font-semibold">Category</th>
              <th className="px-4 py-3 text-left font-semibold">Status</th>
              <th className="px-4 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="border-b border-border/40 hover:bg-secondary/20 transition-colors">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(article.id)}
                    onChange={() => toggleSelect(article.id)}
                    className="w-4 h-4 rounded border-border"
                  />
                </td>
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium text-foreground line-clamp-1">{article.article_title}</p>
                    <p className="text-xs text-muted-foreground">{article.slug}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{article.author}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-md text-xs font-medium bg-secondary text-muted-foreground border border-border/40">
                    {article.category}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {article.featured && (
                      <span className="flex items-center gap-1 text-xs font-medium text-primary">
                        <Star className="w-3.5 h-3.5" /> Featured
                      </span>
                    )}
                    <span
                      className={cn(
                        'px-2 py-1 rounded-md text-xs font-medium',
                        article.status === 'approved'
                          ? 'bg-green-500/20 text-green-300 border border-green-500/40'
                          : article.status === 'pending'
                            ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40'
                            : 'bg-red-500/20 text-red-300 border border-red-500/40'
                      )}
                    >
                      {article.status}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/articles/${article.slug}`}
                      className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    {article.status === 'pending' && (
                      <>
                        <button
                          className="p-1.5 rounded-md hover:bg-green-500/20 text-muted-foreground hover:text-green-400 transition-colors"
                          title="Approve"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1.5 rounded-md hover:bg-red-500/20 text-muted-foreground hover:text-red-400 transition-colors"
                          title="Reject"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    {article.status === 'approved' && (
                      <button
                        className={cn(
                          'p-1.5 rounded-md transition-colors',
                          article.featured
                            ? 'hover:bg-primary/20 text-primary'
                            : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
                        )}
                        title={article.featured ? 'Remove from featured' : 'Add to featured'}
                      >
                        <Star className="w-4 h-4" fill={article.featured ? 'currentColor' : 'none'} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
