import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { PRICE_MAX, products, SORT_OPTIONS } from '../data/products.js';

const StoreContext = createContext(null);

function formatPrice(value) {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [category, setCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, PRICE_MAX]);
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0].id);
  const [filterOpen, setFilterOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState(null);
  const [detailSize, setDetailSize] = useState('M');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartPulse, setCartPulse] = useState(false);
  const [favPulse, setFavPulse] = useState(false);

  const triggerCartPulse = useCallback(() => {
    setCartPulse(true);
    setTimeout(() => setCartPulse(false), 400);
  }, []);

  const triggerFavPulse = useCallback(() => {
    setFavPulse(true);
    setTimeout(() => setFavPulse(false), 400);
  }, []);

  const addToCart = useCallback(
    (product, size, quantity = 1) => {
      const resolvedSize =
        size || (product.sizes.includes('One-Size') ? 'One-Size' : 'M');
      setCart((prev) => {
        const key = `${product.id}-${resolvedSize}`;
        const existing = prev.find((item) => item.key === key);
        if (existing) {
          return prev.map((item) =>
            item.key === key
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [
          ...prev,
          {
            key,
            product,
            size: resolvedSize,
            quantity,
          },
        ];
      });
      triggerCartPulse();
    },
    [triggerCartPulse]
  );

  const updateCartQuantity = useCallback((key, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.key === key
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeFromCart = useCallback((key) => {
    setCart((prev) => prev.filter((item) => item.key !== key));
  }, []);

  const toggleFavorite = useCallback(
    (productId) => {
      setFavorites((prev) => {
        const exists = prev.includes(productId);
        if (!exists) triggerFavPulse();
        return exists
          ? prev.filter((id) => id !== productId)
          : [...prev, productId];
      });
    },
    [triggerFavPulse]
  );

  const isFavorite = useCallback(
    (productId) => favorites.includes(productId),
    [favorites]
  );

  const openProductDetail = useCallback((product) => {
    const defaultSize = product.sizes.includes('One-Size')
      ? 'One-Size'
      : product.sizes[1] || product.sizes[0];
    setDetailSize(defaultSize);
    setDetailProduct(product);
  }, []);

  const closeProductDetail = useCallback(() => {
    setDetailProduct(null);
  }, []);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const subtotal = useMemo(
    () =>
      cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cart]
  );

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category !== 'all') {
      result = result.filter((p) => p.category === category);
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.replace(/-/g, ' ').includes(q)
      );
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'favorites':
        result.sort((a, b) => b.favoriteScore - a.favoriteScore);
        break;
      default:
        break;
    }

    return result;
  }, [category, priceRange, sortBy, searchQuery]);

  const value = {
    cart,
    favorites,
    category,
    setCategory,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    filterOpen,
    setFilterOpen,
    cartOpen,
    setCartOpen,
    detailProduct,
    detailSize,
    setDetailSize,
    searchOpen,
    setSearchOpen,
    searchQuery,
    setSearchQuery,
    cartPulse,
    favPulse,
    cartCount,
    subtotal,
    filteredProducts,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    toggleFavorite,
    isFavorite,
    openProductDetail,
    closeProductDetail,
    formatPrice,
    PRICE_MAX,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return ctx;
}
