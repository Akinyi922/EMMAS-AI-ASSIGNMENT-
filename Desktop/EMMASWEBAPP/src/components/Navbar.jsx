import { Heart, Search, ShoppingBag, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useStore } from '../context/StoreContext.jsx';
import StyleAssistant from './StyleAssistant.jsx';

const NAV_LINKS = [
  { label: 'Collections', href: '#catalog' },
  { label: 'Apparel', href: '#catalog' },
  { label: 'Accessories', href: '#catalog' },
  { label: 'Editorial', href: '#hero' },
];

export default function Navbar() {
  const {
    cartCount,
    favorites,
    cartOpen,
    setCartOpen,
    searchOpen,
    setSearchOpen,
    searchQuery,
    setSearchQuery,
    cartPulse,
    favPulse,
    setFilterOpen,
  } = useStore();

  const [assistantOpen, setAssistantOpen] = useState(false);

  const searchRef = useRef(null);

  useEffect(() => {
    if (!searchOpen) return;
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [searchOpen, setSearchOpen]);

  return (
    <header className="glass-nav sticky top-0 z-30">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-[4.5rem] sm:px-6 lg:px-8">
        <a
          href="#hero"
          className="font-serif text-2xl font-bold tracking-[0.2em] text-ebony sm:text-3xl"
        >
          AURA
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-medium uppercase tracking-[0.15em] text-muted transition-colors duration-300 hover:text-ebony"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setAssistantOpen(true)}
            className="hidden h-10 items-center rounded-sm px-3 text-xs font-medium uppercase tracking-wider text-muted transition-colors duration-300 hover:text-ebony md:flex"
          >
            Assistant
          </button>

          <StyleAssistant open={assistantOpen} onClose={() => setAssistantOpen(false)} />
          <div ref={searchRef} className="relative flex items-center">
            <button
              type="button"
              onClick={() => setSearchOpen((o) => !o)}
              className="flex h-10 w-10 items-center justify-center rounded-sm text-ebony transition-all duration-300 hover:bg-warm-gray/60"
              aria-label="Search"
            >
              <Search className="h-[18px] w-[18px] stroke-[1.5]" />
            </button>
            <div
              className={`absolute right-0 top-full mt-2 overflow-hidden transition-all duration-300 ${
                searchOpen
                  ? 'pointer-events-auto w-56 opacity-100 sm:w-72'
                  : 'pointer-events-none w-0 opacity-0'
              }`}
            >
              <div className="flex items-center gap-2 border border-black/10 bg-ivory px-3 py-2 shadow-lg">
                <Search className="h-4 w-4 shrink-0 text-muted" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search the collection..."
                  className="w-full bg-transparent text-sm text-ebony outline-none placeholder:text-muted"
                  autoFocus={searchOpen}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-muted hover:text-ebony"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setFilterOpen(true)}
            className="flex h-10 items-center rounded-sm px-2 text-xs font-medium uppercase tracking-wider text-muted transition-colors duration-300 hover:text-ebony md:hidden"
          >
            Filter
          </button>

          <button
            type="button"
            onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
            className={`relative flex h-10 w-10 items-center justify-center rounded-sm transition-all duration-300 hover:bg-warm-gray/60 ${
              favPulse ? 'scale-110' : 'scale-100'
            }`}
            aria-label={`Favorites, ${favorites.length} items`}
          >
            <Heart
              className={`h-[18px] w-[18px] stroke-[1.5] transition-colors duration-300 ${
                favorites.length > 0 ? 'fill-ebony text-ebony' : 'text-ebony'
              }`}
            />
            {favorites.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-ebony px-1 text-[10px] font-medium text-ivory">
                {favorites.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setCartOpen(!cartOpen)}
            className={`relative flex h-10 w-10 items-center justify-center rounded-sm transition-all duration-300 hover:bg-warm-gray/60 ${
              cartPulse ? 'scale-110' : 'scale-100'
            }`}
            aria-label={`Shopping bag, ${cartCount} items`}
          >
            <ShoppingBag className="h-[18px] w-[18px] stroke-[1.5] text-ebony" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 animate-pulse items-center justify-center rounded-full bg-ebony px-1 text-[10px] font-medium text-ivory">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
