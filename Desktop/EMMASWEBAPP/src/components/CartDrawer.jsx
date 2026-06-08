import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext.jsx';

export default function CartDrawer() {
  const {
    cartOpen,
    setCartOpen,
    cart,
    cartCount,
    subtotal,
    formatPrice,
    updateCartQuantity,
    removeFromCart,
  } = useStore();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!cartOpen) return;
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => {
      cancelAnimationFrame(frame);
      setVisible(false);
    };
  }, [cartOpen]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => setCartOpen(false), 300);
  };

  if (!cartOpen) return null;

  return (
    <>
      <button
        type="button"
        className={`drawer-overlay ${visible ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
        aria-label="Close cart"
      />
      <aside
        className={`drawer-panel-right ${
          visible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4 text-ebony" />
            <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-ebony">
              Your Bag ({cartCount})
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="flex h-9 w-9 items-center justify-center rounded-sm text-muted transition-all duration-300 hover:bg-warm-gray hover:text-ebony"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="scrollbar-thin flex-1 overflow-y-auto px-5 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <ShoppingBag className="mb-4 h-12 w-12 text-warm-gray" strokeWidth={1} />
              <p className="font-serif text-xl text-ebony">Your bag is empty</p>
              <p className="mt-2 text-sm text-muted">
                Explore the collection and add your favorites.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="mt-8 border border-ebony px-6 py-3 text-xs font-medium uppercase tracking-[0.15em] text-ebony transition-all duration-300 hover:bg-ebony hover:text-ivory"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-6">
              {cart.map((item) => (
                <li
                  key={item.key}
                  className="flex gap-4 border-b border-black/5 pb-6 last:border-0"
                >
                  <div className="h-28 w-24 shrink-0 overflow-hidden rounded-sm bg-warm-gray">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        if (e.currentTarget.src !== '/product-placeholder.svg') {
                          e.currentTarget.src = '/product-placeholder.svg';
                        }
                      }}
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-medium text-ebony line-clamp-2">
                          {item.product.name}
                        </h3>
                        <p className="mt-1 text-xs text-muted">Size: {item.size}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.key)}
                        className="shrink-0 text-muted transition-colors duration-300 hover:text-ebony"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-2 text-sm text-ebony">
                      {formatPrice(item.product.price)}
                    </p>
                    <div className="mt-auto flex items-center gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.key, -1)}
                        className="flex h-8 w-8 items-center justify-center border border-black/10 transition-all duration-300 hover:border-ebony"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-[1.5rem] text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.key, 1)}
                        className="flex h-8 w-8 items-center justify-center border border-black/10 transition-all duration-300 hover:border-ebony"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-black/5 bg-cream/30 p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.15em] text-muted">
                Subtotal
              </span>
              <span className="font-medium text-ebony">{formatPrice(subtotal)}</span>
            </div>
            <p className="mb-4 text-center text-[10px] text-muted">
              Shipping & taxes calculated at checkout
            </p>
            <button
              type="button"
              className="group relative w-full overflow-hidden bg-ebony py-4 text-xs font-medium uppercase tracking-[0.2em] text-ivory transition-all duration-300 hover:shadow-xl"
            >
              <span className="relative z-10">Proceed to Secure Checkout</span>
              <span className="absolute inset-0 -translate-x-full bg-ebony/80 transition-transform duration-500 group-hover:translate-x-0" />
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
