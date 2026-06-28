'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export function BulkApproveAirdropsButton({ pendingCount }: { pendingCount: number }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleApproveAll = async () => {
    if (pendingCount === 0) return;

    setLoading(true);
    try {
      const response = await fetch('/api/admin/approve-pending-airdrops', {
        method: 'POST',
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.error || 'Failed to approve pending airdrops');
      }

      toast.success('All pending airdrops have been approved.');
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to approve pending airdrops');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="secondary"
      onClick={handleApproveAll}
      disabled={loading || pendingCount === 0}
      className="ml-auto"
    >
      {loading ? 'Approving...' : `Approve all ${pendingCount} pending airdrop${pendingCount > 1 ? 's' : ''}`}
    </Button>
  );
}
