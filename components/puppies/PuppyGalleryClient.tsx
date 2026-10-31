'use client';

import React, { useState, useTransition, useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Search, RotateCcw, Filter, Sparkles, Dog } from 'lucide-react';
import { Puppy, PUPPIES } from '@/data/puppies';
import { PuppyCard } from '@/components/puppies/PuppyCard';

const BREEDS = [
  'All Breeds',
  'Maltipoo',
  'Pomeranian',
  'Poodle',
  'Cavapoo',
  'Shih Tzu',
  'Bichon',
  'Frenchie',
  'Yorkie',
];

export function PuppyGalleryClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const selectedBreed = searchParams.get('breed') || 'All Breeds';
  const selectedOrigin = searchParams.get('origin') || 'all';
  const selectedSex = searchParams.get('sex') || 'all';
  const searchQuery = searchParams.get('q') || '';

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all' || value === 'All Breeds' || !value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const clearAllFilters = () => {
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  };

  // Filtered puppies list
  const filteredPuppies = useMemo(() => {
    return PUPPIES.filter((puppy) => {
      // Filter by breed
      if (selectedBreed !== 'All Breeds') {
        const matchesCategory = puppy.breedCategory.toLowerCase() === selectedBreed.toLowerCase();
        const matchesBreedName = puppy.breed.toLowerCase().includes(selectedBreed.toLowerCase());
        if (!matchesCategory && !matchesBreedName) return false;
      }

      // Filter by origin
      if (selectedOrigin !== 'all') {
        if (puppy.origin !== selectedOrigin) return false;
      }

      // Filter by sex
      if (selectedSex !== 'all') {
        if (puppy.sex.toLowerCase() !== selectedSex.toLowerCase()) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matches =
          puppy.name.toLowerCase().includes(query) ||
          puppy.breed.toLowerCase().includes(query) ||
          puppy.description.toLowerCase().includes(query) ||
          puppy.coatColor.toLowerCase().includes(query);
        if (!matches) return false;
      }

      return true;
    });
  }, [selectedBreed, selectedOrigin, selectedSex, searchQuery]);

  const hasActiveFilters =
    selectedBreed !== 'All Breeds' ||
    selectedOrigin !== 'all' ||
    selectedSex !== 'all' ||
    searchQuery.trim() !== '';

  return (
    <div className="w-full">
      {/* Filters Control Bar */}
      <div className="rounded-3xl border-2 border-ink bg-white p-5 sm:p-7 shadow-card mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-ink/10">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
            <input
              type="text"
              placeholder="Search by name, breed, or color..."
              value={searchQuery}
              onChange={(e) => updateFilters('q', e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-full border-2 border-ink bg-cream-50 text-sm font-medium text-ink focus:outline-none focus:border-caramel transition-colors"
            />
          </div>

          {/* Quick Origin & Sex Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Origin Radios */}
            <div className="inline-flex rounded-full border-2 border-ink p-1 bg-cream-50 text-xs font-bold">
              <button
                onClick={() => updateFilters('origin', 'all')}
                className={`px-3 py-1.5 rounded-full transition-all ${
                  selectedOrigin === 'all' ? 'bg-caramel text-white shadow-sm' : 'text-ink'
                }`}
              >
                All Origins
              </button>
              <button
                onClick={() => updateFilters('origin', 'local')}
                className={`px-3 py-1.5 rounded-full transition-all ${
                  selectedOrigin === 'local' ? 'bg-caramel text-white shadow-sm' : 'text-ink'
                }`}
              >
                Showroom
              </button>
              <button
                onClick={() => updateFilters('origin', 'imported')}
                className={`px-3 py-1.5 rounded-full transition-all ${
                  selectedOrigin === 'imported' ? 'bg-caramel text-white shadow-sm' : 'text-ink'
                }`}
              >
                Imported
              </button>
            </div>

            {/* Sex Radios */}
            <div className="inline-flex rounded-full border-2 border-ink p-1 bg-cream-50 text-xs font-bold">
              <button
                onClick={() => updateFilters('sex', 'all')}
                className={`px-3 py-1.5 rounded-full transition-all ${
                  selectedSex === 'all' ? 'bg-caramel text-white shadow-sm' : 'text-ink'
                }`}
              >
                Both
              </button>
              <button
                onClick={() => updateFilters('sex', 'boy')}
                className={`px-3 py-1.5 rounded-full transition-all ${
                  selectedSex === 'boy' ? 'bg-caramel text-white shadow-sm' : 'text-ink'
                }`}
              >
                Boys ♂
              </button>
              <button
                onClick={() => updateFilters('sex', 'girl')}
                className={`px-3 py-1.5 rounded-full transition-all ${
                  selectedSex === 'girl' ? 'bg-caramel text-white shadow-sm' : 'text-ink'
                }`}
              >
                Girls ♀
              </button>
            </div>

            {/* Reset Button */}
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="h-10 px-3.5 rounded-full border border-caramel/30 text-caramel hover:bg-cream font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Breed Tabs */}
        <div className="pt-5 overflow-x-auto scrollbar-none flex items-center gap-2">
          {BREEDS.map((breed) => {
            const isActive = selectedBreed.toLowerCase() === breed.toLowerCase();

            return (
              <button
                key={breed}
                onClick={() => updateFilters('breed', breed)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-caramel text-white border-caramel shadow-sm'
                    : 'bg-cream-100 hover:bg-cream border-caramel/20 text-ink'
                }`}
              >
                {breed}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-8 px-2">
        <div className="text-sm font-bold text-ink">
          Showing <span className="text-caramel">{filteredPuppies.length}</span> companions
          {hasActiveFilters && <span className="text-ink-muted"> with active filters</span>}
        </div>
      </div>

      {/* Skeleton Loading State or Puppies Grid */}
      {isPending ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-[460px] rounded-3xl border-2 border-ink/20 bg-cream-100/50 animate-pulse p-6 flex flex-col justify-between"
            >
              <div className="w-full h-64 bg-black/10 rounded-2xl mb-4" />
              <div className="space-y-2">
                <div className="w-1/2 h-6 bg-black/10 rounded" />
                <div className="w-1/3 h-4 bg-black/10 rounded" />
              </div>
              <div className="w-full h-10 bg-black/10 rounded-full" />
            </div>
          ))}
        </div>
      ) : filteredPuppies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPuppies.map((puppy, idx) => (
            <PuppyCard key={puppy.id} puppy={puppy} priority={idx < 3} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-3xl border-2 border-dashed border-caramel/40 bg-white p-12 text-center max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-cream border-2 border-caramel flex items-center justify-center mx-auto mb-4">
            <Dog className="w-8 h-8 text-caramel" />
          </div>
          <h3 className="font-display font-bold text-2xl text-ink mb-2">No companions match</h3>
          <p className="text-sm text-ink-muted leading-relaxed mb-6">
            We could not find any puppies matching all selected filters. Try clearing some filters or
            contact our concierge for upcoming litters!
          </p>
          <button
            onClick={clearAllFilters}
            className="px-6 py-3 rounded-full bg-caramel text-white font-bold text-sm shadow-chunky-caramel"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
