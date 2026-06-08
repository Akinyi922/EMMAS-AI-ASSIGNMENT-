import { Heart, Plus } from 'lucide-react';
import { useStore } from '../context/StoreContext.jsx';

const categoryLabels = {
  'ready-to-wear': 'Ready-to-Wear',
  handbags: 'Handbags',
  'fine-jewelry': 'Fine Jewelry',
  sunglasses: 'Sunglasses',
};

export default function ProductCard({ product }) {
  const {
    addToCart,
    toggleFavorite,
    isFavorite,
    openProductDetail,
    formatPrice,
    setCartOpen,
  } = useStore();

  const favorited = isFavorite(product.id);
  const defaultSize = product.sizes.includes('One-Size')
    ? 'One-Size'
    : product.sizes[1] || product.sizes[0];

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product, defaultSize);
    setCartOpen(true);
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => openProductDetail(product)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openProductDetail(product);
        }
      }}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-warm-gray">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-90"
          loading="lazy"
          onError={(e) => {
            if (e.currentTarget.src !== '/product-placeholder.svg') {
              e.currentTarget.src = '/product-placeholder.svg';
            }
          }}
        />
        <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-ebony/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="mb-6 flex translate-y-4 items-center gap-2 bg-ivory px-5 py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-ebony opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <Plus className="h-3.5 w-3.5" />
            Quick Add to Cart
          </button>
        </div>
        <button
          type="button"
          onClick={handleFavorite}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ivory/90 backdrop-blur-sm transition-all duration-300 hover:scale-110"
          aria-label={favorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`h-4 w-4 transition-colors duration-300 ${
              favorited ? 'fill-ebony text-ebony' : 'text-ebony'
            }`}
          />
        </button>
        <span className="absolute left-3 top-3 rounded-sm bg-ivory/90 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-muted backdrop-blur-sm">
          {categoryLabels[product.category] || product.category}
        </span>
      </div>
      <div className="mt-4 space-y-1">
        <h3 className="text-sm font-medium text-ebony transition-colors duration-300 group-hover:text-muted">
          {product.name}
        </h3>
        <p className="text-sm tracking-wide text-ebony">
          {formatPrice(product.price)}
        </p>
      </div>
    </article>
  );
}
