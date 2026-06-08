import { Heart, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext.jsx';

export default function ProductDetailDrawer() {
  const {
    detailProduct,
    detailSize,
    setDetailSize,
    closeProductDetail,
    addToCart,
    toggleFavorite,
    isFavorite,
    formatPrice,
    setCartOpen,
  } = useStore();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!detailProduct) return;
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => {
      cancelAnimationFrame(frame);
      setVisible(false);
    };
  }, [detailProduct]);

  if (!detailProduct) return null;

  const favorited = isFavorite(detailProduct.id);

  const handleAddToBag = () => {
    addToCart(detailProduct, detailSize);
    setCartOpen(true);
  };

  const handleWishlist = () => {
    toggleFavorite(detailProduct.id);
  };

  const handleClose = () => {
    setVisible(false);
    setTimeout(closeProductDetail, 300);
  };

  return (
    <>
      <button
        type="button"
        className={`drawer-overlay ${visible ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
        aria-label="Close product details"
      />
      <aside
        className={`drawer-panel-right ${
          visible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            Product Overview
          </p>
          <button
            type="button"
            onClick={handleClose}
            className="flex h-9 w-9 items-center justify-center rounded-sm text-muted transition-all duration-300 hover:bg-warm-gray hover:text-ebony"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="scrollbar-thin flex-1 overflow-y-auto">
          <div className="space-y-3 p-5">
            {detailProduct.images.map((src, i) => (
              <div
                key={src}
                className={`overflow-hidden rounded-sm bg-warm-gray ${
                  i === 0 ? 'aspect-[4/5]' : 'aspect-square'
                }`}
              >
                <img
                  src={src}
                  alt={`${detailProduct.name} view ${i + 1}`}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    if (e.currentTarget.src !== '/product-placeholder.svg') {
                      e.currentTarget.src = '/product-placeholder.svg';
                    }
                  }}
                />
              </div>
            ))}
          </div>

          <div className="space-y-6 px-5 pb-8">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-ebony">
                {detailProduct.name}
              </h2>
              <p className="mt-2 text-lg tracking-wide text-ebony">
                {formatPrice(detailProduct.price)}
              </p>
            </div>

            <p className="text-sm leading-relaxed text-muted">
              {detailProduct.description}
            </p>

            <div className="rounded-sm border border-black/5 bg-cream/50 p-4">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
                Material & Craft
              </p>
              <p className="mt-2 text-sm text-ebony">{detailProduct.material}</p>
            </div>

            <div>
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
                Select Size
              </p>
              <div className="flex flex-wrap gap-2">
                {detailProduct.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setDetailSize(size)}
                    className={`min-w-[3rem] rounded-sm border px-4 py-2.5 text-sm transition-all duration-300 ${
                      detailSize === size
                        ? 'border-ebony bg-ebony text-ivory'
                        : 'border-black/10 text-ebony hover:border-ebony'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 border-t border-black/5 bg-ivory p-5">
          <button
            type="button"
            onClick={handleAddToBag}
            className="w-full bg-ebony py-4 text-xs font-medium uppercase tracking-[0.2em] text-ivory transition-all duration-300 hover:bg-ebony/90"
          >
            Add to Bag
          </button>
          <button
            type="button"
            onClick={handleWishlist}
            className="flex w-full items-center justify-center gap-2 border border-ebony py-4 text-xs font-medium uppercase tracking-[0.2em] text-ebony transition-all duration-300 hover:bg-warm-gray/50"
          >
            <Heart
              className={`h-4 w-4 ${favorited ? 'fill-ebony' : ''}`}
            />
            {favorited ? 'In Wishlist' : 'Add to Wishlist'}
          </button>
        </div>
      </aside>
    </>
  );
}
