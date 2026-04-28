"use client";
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { landAPI } from '@/lib/api';
import LandCard from './LandCard';
import { Search, SlidersHorizontal, X, MapPin, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

const landTypes = ['residential', 'commercial', 'agricultural', 'industrial', 'mixed', 'plot'];
const sortOptions = [
  { value: '-createdAt', label: 'Newest First' },
  { value: 'price', label: 'Price: Low to High' },
  { value: '-price', label: 'Price: High to Low' },
  { value: '-aiAnalysis.overallScore', label: 'AI Score: Best First' },
  { value: '-views', label: 'Most Viewed' },
];

export default function ListingsClient() {
  const searchParams = useSearchParams();

  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    city: searchParams.get('city') || '',
    district: '',
    landType: '',
    minPrice: '',
    maxPrice: '',
    minArea: '',
    maxArea: '',
    sort: '-createdAt',
    verified: '',
    featured: '',
  });

  const queryParams = Object.fromEntries(
    Object.entries({ ...filters, page, limit: 12 }).filter(([, v]) => v !== '')
  );

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['listings', queryParams],
    queryFn: () => landAPI.list(queryParams),
    staleTime: 2 * 60 * 1000,
  });

  const lands = data?.data?.data || [];
  const pagination = data?.data?.pagination;

  const updateFilter = (key: string, value: string) => {
    setFilters(f => ({ ...f, [key]: value }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({ search: '', city: '', district: '', landType: '', minPrice: '', maxPrice: '', minArea: '', maxArea: '', sort: '-createdAt', verified: '', featured: '' });
    setPage(1);
  };

  const activeFilterCount = Object.entries(filters).filter(([k, v]) => v && k !== 'sort').length;

  return (
    <div className="py-8">
      <div className="page-container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl text-white mb-2">Land Listings</h1>
          <p className="text-gray-400">{pagination?.total?.toLocaleString() || '...'} properties across Bangladesh</p>
        </div>

        {/* Search & Filter bar */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <div className="flex items-center gap-3 flex-1 min-w-64 bg-surface-card border border-surface-border rounded-xl px-4 py-2.5">
            <Search className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <input
              value={filters.search}
              onChange={e => updateFilter('search', e.target.value)}
              placeholder="Search city, district, address..."
              className="bg-transparent text-white placeholder-gray-500 outline-none text-sm w-full"
            />
            {filters.search && <button onClick={() => updateFilter('search', '')}><X className="w-4 h-4 text-gray-500 hover:text-white" /></button>}
          </div>
          <button onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
              showFilters || activeFilterCount > 0 ? 'bg-brand-600 border-brand-600 text-white' : 'bg-surface-card border-surface-border text-gray-300 hover:border-brand-700'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
          <select value={filters.sort} onChange={e => updateFilter('sort', e.target.value)}
            className="input py-2.5 text-sm w-auto"
          >
            {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="card p-5 mb-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            <div>
              <label className="label text-xs">City</label>
              <input value={filters.city} onChange={e => updateFilter('city', e.target.value)} placeholder="e.g. Dhaka" className="input py-2 text-sm" />
            </div>
            <div>
              <label className="label text-xs">District</label>
              <input value={filters.district} onChange={e => updateFilter('district', e.target.value)} placeholder="e.g. Gazipur" className="input py-2 text-sm" />
            </div>
            <div>
              <label className="label text-xs">Land Type</label>
              <select value={filters.landType} onChange={e => updateFilter('landType', e.target.value)} className="input py-2 text-sm">
                <option value="">All Types</option>
                {landTypes.map(t => <option key={t} value={t} className="capitalize">{t}</option>)}
              </select>
            </div>
            <div>
              <label className="label text-xs">Min Price (৳)</label>
              <input value={filters.minPrice} onChange={e => updateFilter('minPrice', e.target.value)} placeholder="0" type="number" className="input py-2 text-sm" />
            </div>
            <div>
              <label className="label text-xs">Max Price (৳)</label>
              <input value={filters.maxPrice} onChange={e => updateFilter('maxPrice', e.target.value)} placeholder="Any" type="number" className="input py-2 text-sm" />
            </div>
            <div className="flex flex-col gap-2 justify-end">
              <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                <input type="checkbox" checked={filters.verified === 'true'} onChange={e => updateFilter('verified', e.target.checked ? 'true' : '')} className="rounded" />
                Verified Only
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                <input type="checkbox" checked={filters.featured === 'true'} onChange={e => updateFilter('featured', e.target.checked ? 'true' : '')} className="rounded" />
                Featured Only
              </label>
              {activeFilterCount > 0 && (
                <button onClick={clearFilters} className="text-xs text-red-400 hover:text-red-300 text-left">Clear All</button>
              )}
            </div>
          </motion.div>
        )}

        {/* Results */}
        {isLoading || isFetching ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-brand-400 animate-spin" />
          </div>
        ) : lands.length === 0 ? (
          <div className="text-center py-20">
            <MapPin className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <h3 className="font-semibold text-white text-lg mb-2">No listings found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your filters or search terms.</p>
            <button onClick={clearFilters} className="btn-secondary text-sm">Clear Filters</button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-8">
              {lands.map((land: any, i: number) => (
                <motion.div key={land._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                  <LandCard land={land} />
                </motion.div>
              ))}
            </div>
            {/* Pagination */}
            {pagination && pagination.pages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  className="p-2 rounded-lg border border-surface-border hover:border-brand-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                  const p = i + 1;
                  return (
                    <button key={p} onClick={() => setPage(p)}
                      className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${p === page ? 'bg-brand-600 text-white' : 'border border-surface-border hover:border-brand-700 text-gray-400'}`}>
                      {p}
                    </button>
                  );
                })}
                <button onClick={() => setPage(p => Math.min(pagination.pages, p + 1))} disabled={page === pagination.pages}
                  className="p-2 rounded-lg border border-surface-border hover:border-brand-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
