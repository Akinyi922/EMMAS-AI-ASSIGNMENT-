import { useMemo, useState } from 'react';
import ProductCard from './ProductCard.jsx';
import { products } from '../data/products.js';
import { useStore } from '../context/StoreContext.jsx';

function analyzeStyleTags(product) {
  const txt = (product.name + ' ' + (product.description || '')).toLowerCase();
  const tags = new Set();
  if (/(evening|gown|silk|crepe|velvet|pearls|diamond|pavé|formal|tailor|tailored|blazer|trench)/.test(txt)) tags.add('formal');
  if (/(linen|resort|casual|relaxed|tote|tee|denim|summer|beach|relaxed)/.test(txt)) tags.add('casual');
  if (/(sport|athletic|performance|sneak|sporty)/.test(txt)) tags.add('sporty');
  return tags;
}

function getDefaultSize(product) {
  return product.sizes.includes('One-Size') ? 'One-Size' : product.sizes[1] || product.sizes[0];
}

export default function StyleAssistant({ open, onClose }) {
  const { addToCart, setCartOpen, formatPrice } = useStore();
  const [budget, setBudget] = useState(1500);
  const [style, setStyle] = useState('all');
  const [accessoryCount, setAccessoryCount] = useState(2);

  const apparels = useMemo(() => products.filter((p) => p.type === 'apparel'), []);
  const accessories = useMemo(() => products.filter((p) => p.type === 'accessory'), []);

  const recommendations = useMemo(() => {
    const combos = [];

    const apparelStyles = new Map();
    const accessoryStyles = new Map();
    for (const a of apparels) apparelStyles.set(a.id, analyzeStyleTags(a));
    for (const a of accessories) accessoryStyles.set(a.id, analyzeStyleTags(a));

    const accessoryList = accessories;

    for (const app of apparels) {
      // generate accessory combinations up to accessoryCount
      const maxAcc = Math.min(accessoryCount, accessoryList.length);
      // include 0..maxAcc accessories
      const accIndices = accessoryList.map((_, i) => i);

      // simple combinatorics: pick up to 2 accessories by nested loops to avoid heavy recursion
      const accCombos = [[]];
      if (maxAcc >= 1) {
        for (let i = 0; i < accessoryList.length; i++) accCombos.push([accessoryList[i]]);
      }
      if (maxAcc >= 2) {
        for (let i = 0; i < accessoryList.length; i++) {
          for (let j = i + 1; j < accessoryList.length; j++) {
            accCombos.push([accessoryList[i], accessoryList[j]]);
          }
        }
      }

      for (const accs of accCombos) {
        if (accs.length > maxAcc) continue;
        const items = [app, ...accs];
        const total = items.reduce((s, it) => s + it.price, 0);
        if (total > budget) continue;

        const styleMatches = items.reduce((s, it) => {
          const tags = it.type === 'apparel' ? apparelStyles.get(it.id) : accessoryStyles.get(it.id);
          return s + (style === 'all' || tags.has(style) ? 1 : 0);
        }, 0);

        const styleScore = style === 'all' ? 0.5 : styleMatches / items.length; // default neutral for 'all'
        const priceScore = total / Math.max(budget, 1);
        const score = 0.6 * styleScore + 0.4 * priceScore;

        combos.push({ items, total, score });
      }
    }

    combos.sort((a, b) => b.score - a.score);
    return combos.slice(0, 6);
  }, [apparels, accessories, budget, style, accessoryCount]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center overflow-auto bg-black/40 p-6">
      <div className="max-w-4xl rounded-sm bg-ivory p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-ebony">Style Assistant</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="text-sm text-muted hover:text-ebony"
            >
              Close
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <label className="space-y-1">
            <div className="text-xs font-medium text-muted">Budget</div>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value || 0))}
              className="w-full rounded-sm border px-2 py-1 text-sm"
              min={0}
            />
          </label>

          <label className="space-y-1">
            <div className="text-xs font-medium text-muted">Style</div>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full rounded-sm border px-2 py-1 text-sm"
            >
              <option value="all">Any</option>
              <option value="formal">Formal</option>
              <option value="casual">Casual</option>
              <option value="sporty">Sporty</option>
            </select>
          </label>

          <label className="space-y-1">
            <div className="text-xs font-medium text-muted">Accessories</div>
            <input
              type="range"
              min={0}
              max={2}
              value={accessoryCount}
              onChange={(e) => setAccessoryCount(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-sm text-muted">Max: {accessoryCount}</div>
          </label>
        </div>

        <div className="mt-6 space-y-4">
          {recommendations.length === 0 && (
            <div className="text-sm text-muted">No looks found — try increasing your budget or allowing more accessories.</div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="rounded-sm border bg-white p-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-ebony">Look {idx + 1}</div>
                  <div className="text-sm text-ebony">{formatPrice(rec.total)}</div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {rec.items.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      rec.items.forEach((p) => addToCart(p, getDefaultSize(p)));
                      setCartOpen(true);
                      onClose();
                    }}
                    className="rounded-sm bg-ebony px-3 py-2 text-xs font-medium text-ivory"
                  >
                    Add Look to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
