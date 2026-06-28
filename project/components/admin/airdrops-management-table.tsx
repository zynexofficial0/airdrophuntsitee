'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Check, X, Star, Eye } from 'lucide-react';
import { toast } from 'sonner';
import type { Airdrop } from '@/types';
import { cn } from '@/lib/utils';

export function AirdropsManagementTable({ airdrops }: { airdrops: Airdrop[] }) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [busyId, setBusyId] = useState<string | null>(null);
  const router = useRouter();

  const handleStatusChange = async (id: string, status: 'live' | 'upcoming' | 'ended' | 'pending') => {
    setBusyId(id);
    try {
      const response = await fetch('/api/admin/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemType: 'airdrop', id, status }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error?.error || 'Failed to update airdrop status');
      }

      toast.success('Airdrop status updated successfully.');
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to update airdrop');
    } finally {
      setBusyId(null);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === airdrops.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(airdrops.map((a) => a.id)));
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
                  checked={selectedIds.size === airdrops.length && airdrops.length > 0}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-border"
                />
              </th>
              <th className="px-4 py-3 text-left font-semibold">Project</th>
              <th className="px-4 py-3 text-left font-semibold">Chain</th>
              <th className="px-4 py-3 text-left font-semibold">Category</th>
              <th className="px-4 py-3 text-left font-semibold">Status</th>
              <th className="px-4 py-3 text-left font-semibold">Reward Info</th>
              <th className="px-4 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {airdrops.map((airdrop) => (
              <tr key={airdrop.id} className="border-b border-border/40 hover:bg-secondary/20 transition-colors">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(airdrop.id)}
                    onChange={() => toggleSelect(airdrop.id)}
                    className="w-4 h-4 rounded border-border"
                  />
                </td>
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium text-foreground line-clamp-1">{airdrop.project_name}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{airdrop.short_description}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-md text-xs font-medium bg-secondary text-muted-foreground border border-border/40">
                    {airdrop.chain}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground text-xs">{airdrop.category}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {airdrop.featured && (
                      <span className="flex items-center gap-1 text-xs font-medium text-primary">
                        <Star className="w-3.5 h-3.5" /> Featured
                      </span>
                    )}
                    <span
                      className={cn(
                        'px-2 py-1 rounded-md text-xs font-medium',
                        airdrop.status === 'live'
                          ? 'bg-green-500/20 text-green-300 border border-green-500/40'
                          : airdrop.status === 'upcoming'
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                            : airdrop.status === 'pending'
                              ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40'
                              : 'bg-red-500/20 text-red-300 border border-red-500/40'
                      )}
                    >
                      {airdrop.status}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground text-xs">
                  {airdrop.reward_info ? airdrop.reward_info : '—'}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/airdrops/${airdrop.slug}`}
                      className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    {airdrop.status === 'pending' && (
                      <>
                        <button
                          type="button"
                          className="p-1.5 rounded-md hover:bg-green-500/20 text-muted-foreground hover:text-green-400 transition-colors"
                          title="Approve"
                          onClick={() => handleStatusChange(airdrop.id, 'live')}
                          disabled={busyId === airdrop.id}
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          className="p-1.5 rounded-md hover:bg-red-500/20 text-muted-foreground hover:text-red-400 transition-colors"
                          title="Reject"
                          onClick={() => handleStatusChange(airdrop.id, 'ended')}
                          disabled={busyId === airdrop.id}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    {airdrop.status === 'live' && (
                      <button
                        className={cn(
                          'p-1.5 rounded-md transition-colors',
                          airdrop.featured
                            ? 'hover:bg-primary/20 text-primary'
                            : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
                        )}
                        title={airdrop.featured ? 'Remove from featured' : 'Add to featured'}
                      >
                        <Star className="w-4 h-4" fill={airdrop.featured ? 'currentColor' : 'none'} />
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
