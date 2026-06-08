import { useStore } from '../context/StoreContext.jsx';
import ProductCard from './ProductCard.jsx';

export default function ProductGrid() {
  const { filteredProducts } = useStore();

  if (filteredProducts.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center py-24 text-center">
        <p className="font-serif text-2xl text-ebony">No pieces match your criteria</p>
        <p className="mt-2 text-sm text-muted">
          Adjust filters or search to explore the full collection.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
