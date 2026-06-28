'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SearchFilter {
  id: string;
  label: string;
  type: 'select' | 'multi-select' | 'text';
  options?: { label: string; value: string }[];
}

interface AdvancedSearchProps {
  placeholder?: string;
  filters?: SearchFilter[];
  onSearch: (query: string, filterValues: Record<string, string | string[]>) => void;
  onReset?: () => void;
}

export function AdvancedSearch({
  placeholder = 'Search...',
  filters = [],
  onSearch,
  onReset,
}: AdvancedSearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filterValues, setFilterValues] = useState<Record<string, string | string[]>>(
    filters.reduce((acc, f) => ({ ...acc, [f.id]: f.type === 'multi-select' ? [] : '' }), {})
  );

  const hasActiveFilters = Object.values(filterValues).some(v => 
    Array.isArray(v) ? v.length > 0 : v !== ''
  );

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value, filterValues);
  };

  const handleFilterChange = (filterId: string, value: string | string[]) => {
    const newFilters = { ...filterValues, [filterId]: value };
    setFilterValues(newFilters);
    onSearch(query, newFilters);
  };

  const handleReset = () => {
    setQuery('');
    setFilterValues(
      filters.reduce((acc, f) => ({ ...acc, [f.id]: f.type === 'multi-select' ? [] : '' }), {})
    );
    onReset?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-4 space-y-4"
    >
      {/* Main search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={placeholder}
          className="pl-10 pr-12 bg-secondary border-border"
        />
        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => handleSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Filters toggle */}
      {filters.length > 0 && (
        <>
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              'flex items-center gap-2 text-sm font-medium transition-colors',
              isOpen || hasActiveFilters ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Filter className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold gradient-green text-black">
                {Object.values(filterValues).reduce((count, v) => 
                  count + (Array.isArray(v) ? v.length : v ? 1 : 0), 0
                )}
              </span>
            )}
          </motion.button>

          {/* Expandable filters */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3 pt-2 border-t border-border/50"
              >
                {filters.map((filter) => (
                  <div key={filter.id} className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground uppercase">
                      {filter.label}
                    </label>
                    {filter.type === 'select' && (
                      <select
                        value={filterValues[filter.id] as string}
                        onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                      >
                        <option value="">All</option>
                        {filter.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    )}
                    {filter.type === 'multi-select' && (
                      <div className="flex flex-wrap gap-2">
                        {filter.options?.map((opt) => {
                          const selected = (filterValues[filter.id] as string[])?.includes(opt.value);
                          return (
                            <button
                              key={opt.value}
                              onClick={() => {
                                const current = filterValues[filter.id] as string[];
                                const updated = selected
                                  ? current.filter(v => v !== opt.value)
                                  : [...current, opt.value];
                                handleFilterChange(filter.id, updated);
                              }}
                              className={cn(
                                'px-3 py-1 rounded-full text-xs font-medium transition-colors border',
                                selected
                                  ? 'gradient-green text-black border-transparent'
                                  : 'glass text-muted-foreground border-border hover:text-foreground'
                              )}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Reset button */}
      {(query || hasActiveFilters) && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleReset}
          className="text-xs text-primary hover:underline font-medium transition-colors"
        >
          Clear all
        </motion.button>
      )}
    </motion.div>
  );
}
