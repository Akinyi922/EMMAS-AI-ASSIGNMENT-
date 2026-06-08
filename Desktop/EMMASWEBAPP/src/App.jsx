import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import FilterSidebar from './components/FilterSidebar.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import ProductDetailDrawer from './components/ProductDetailDrawer.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import { useStore } from './context/StoreContext.jsx';

export default function App() {
  const { detailProduct } = useStore();

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <Hero />

      <section id="catalog" className="border-t border-black/5">
        <div className="mx-auto flex max-w-7xl">
          <FilterSidebar />
          <div className="flex-1 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <header className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted">
                  The Collection
                </p>
                <h2 className="mt-2 font-serif text-3xl font-semibold text-ebony sm:text-4xl">
                  Curated Essentials
                </h2>
              </div>
              <p className="text-sm text-muted">
                Crafted for the discerning wardrobe
              </p>
            </header>
            <ProductGrid />
          </div>
        </div>
      </section>

      <footer className="border-t border-black/5 bg-ivory px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="font-serif text-2xl font-bold tracking-[0.2em] text-ebony">
            AURA
          </p>
          <p className="text-xs text-muted">
            © 2026 AURA Elegance. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs uppercase tracking-[0.15em] text-muted">
            <a href="#catalog" className="transition-colors duration-300 hover:text-ebony">
              Privacy
            </a>
            <a href="#catalog" className="transition-colors duration-300 hover:text-ebony">
              Terms
            </a>
            <a href="#catalog" className="transition-colors duration-300 hover:text-ebony">
              Contact
            </a>
          </div>
        </div>
      </footer>

      {detailProduct && <ProductDetailDrawer />}
      <CartDrawer />
    </div>
  );
}
