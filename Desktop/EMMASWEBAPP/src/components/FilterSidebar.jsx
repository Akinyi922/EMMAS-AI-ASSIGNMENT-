import { SlidersHorizontal, X } from 'lucide-react';
import { CATEGORIES, SORT_OPTIONS } from '../data/products.js';
import { useStore } from '../context/StoreContext.jsx';

function FilterContent({ onClose }) {
  const {
    category,
    setCategory,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    formatPrice,
    PRICE_MAX,
    filteredProducts,
  } = useStore();

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-muted" />
          <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-ebony">
            Refine
          </h2>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-sm text-muted transition-colors duration-300 hover:bg-warm-gray hover:text-ebony md:hidden"
            aria-label="Close filters"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="scrollbar-thin flex-1 space-y-8 overflow-y-auto px-5 py-6">
        <div>
          <h3 className="mb-4 text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
            Category
          </h3>
          <ul className="space-y-2">
            {CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <button
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`w-full rounded-sm px-3 py-2 text-left text-sm transition-all duration-300 ${
                    category === cat.id
                      ? 'bg-ebony text-ivory'
                      : 'text-ebony hover:bg-warm-gray/80'
                  }`}
                >
                  {cat.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
              Price Range
            </h3>
            <span className="text-xs text-muted">
              {formatPrice(priceRange[0])} – {formatPrice(priceRange[1])}
            </span>
          </div>
          <div className="space-y-4">
            <input
              type="range"
              min={0}
              max={PRICE_MAX}
              step={50}
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([
                  Math.min(Number(e.target.value), priceRange[1] - 50),
                  priceRange[1],
                ])
              }
              className="h-1 w-full cursor-pointer appearance-none rounded-full bg-warm-gray accent-ebony"
            />
            <input
              type="range"
              min={0}
              max={PRICE_MAX}
              step={50}
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([
                  priceRange[0],
                  Math.max(Number(e.target.value), priceRange[0] + 50),
                ])
              }
              className="h-1 w-full cursor-pointer appearance-none rounded-full bg-warm-gray accent-ebony"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              [0, 500],
              [500, 1200],
              [1200, PRICE_MAX],
            ].map(([min, max]) => (
              <button
                key={`${min}-${max}`}
                type="button"
                onClick={() => setPriceRange([min, max])}
                className={`rounded-sm border px-3 py-1.5 text-xs transition-all duration-300 ${
                  priceRange[0] === min && priceRange[1] === max
                    ? 'border-ebony bg-ebony text-ivory'
                    : 'border-black/10 text-muted hover:border-ebony hover:text-ebony'
                }`}
              >
                {formatPrice(min)} – {formatPrice(max)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
            Sort By
          </h3>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full cursor-pointer rounded-sm border border-black/10 bg-ivory px-3 py-2.5 text-sm text-ebony outline-none transition-all duration-300 focus:border-ebony"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="border-t border-black/5 px-5 py-4">
        <p className="text-center text-xs text-muted">
          {filteredProducts.length}{' '}
          {filteredProducts.length === 1 ? 'piece' : 'pieces'} found
        </p>
      </div>
    </div>
  );
}

export default function FilterSidebar() {
  const { filterOpen, setFilterOpen } = useStore();

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-black/5 bg-ivory lg:block xl:w-72">
        <div className="sticky top-[4.5rem] h-[calc(100vh-4.5rem)]">
          <FilterContent />
        </div>
      </aside>

      {filterOpen && (
        <button
          type="button"
          className="drawer-overlay lg:hidden"
          onClick={() => setFilterOpen(false)}
          aria-label="Close filter overlay"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-[min(100%,20rem)] flex-col bg-ivory shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          filterOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <FilterContent onClose={() => setFilterOpen(false)} />
      </aside>
    </>
  );
}
