'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error boundary caught:', error);
    }
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <div className="glass rounded-xl p-8 border border-red-500/30 text-center">
          <div className="flex justify-center mb-4">
            <AlertCircle className="w-12 h-12 text-red-400" />
          </div>
          <h1 className="font-display text-2xl font-bold mb-2">Something went wrong</h1>
          <p className="text-muted-foreground mb-2 text-sm">
            {error.message || 'An unexpected error occurred'}
          </p>
          {process.env.NODE_ENV === 'development' && error.digest && (
            <p className="text-xs text-muted-foreground/50 font-mono mb-4 break-all">
              {error.digest}
            </p>
          )}
          <Button
            onClick={reset}
            className="w-full flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}

export function NotFound() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <div className="glass rounded-xl p-8 border border-border/60 text-center">
          <div className="mb-4">
            <p className="text-6xl font-bold gradient-green-text">404</p>
          </div>
          <h1 className="font-display text-2xl font-bold mb-2">Page not found</h1>
          <p className="text-muted-foreground mb-6 text-sm">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <a
            href="/"
            className="inline-flex px-4 py-2 rounded-lg bg-primary text-black font-medium hover:bg-primary/90 transition-colors"
          >
            Go to Home
          </a>
        </div>
      </div>
    </div>
  );
}
