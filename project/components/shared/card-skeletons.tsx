import { Skeleton } from '@/components/shared/skeleton';
import { cn } from '@/lib/utils';

export function ArticleCardSkeleton() {
  return (
    <div className="glass rounded-xl overflow-hidden h-full flex flex-col">
      <Skeleton className="w-full aspect-[16/9]" />
      <div className="p-5 flex flex-col flex-1 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-5 w-1/2" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex gap-2 mt-auto">
          <Skeleton className="h-3 w-1/4" />
          <Skeleton className="h-3 w-1/4" />
        </div>
      </div>
    </div>
  );
}

export function AirdropCardSkeleton() {
  return (
    <div className="glass rounded-xl p-5 flex flex-col h-full space-y-4">
      <div className="flex gap-3">
        <Skeleton className="w-14 h-14 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-10 w-full mt-auto" />
    </div>
  );
}

export function ArticleGridSkeletons({ count = 6 }: { count?: number }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <ArticleCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function AirdropGridSkeletons({ count = 6 }: { count?: number }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <AirdropCardSkeleton key={i} />
      ))}
    </div>
  );
}
