import React, { useState } from 'react';
import { X, Star, ShieldCheck, Check, AlertCircle, Sparkles, Plus, Minus, ArrowLeft } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [activeTab, setActiveTab] = useState<'desc' | 'benefits'>('desc');
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-start justify-center p-2 sm:p-4 md:p-6 animate-fade-in">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 my-auto">
        {/* Top action bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm px-6 py-3 border-b border-gray-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#b91c1c] hover:text-[#991b1b] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Pickles &amp; Products</span>
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Product Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-10 bg-white border-b border-gray-200">
          {/* Image */}
          <div className="relative bg-[#fff5f5] rounded-2xl p-6 flex items-center justify-center border border-[#fca5a5]/40 min-h-[340px] overflow-visible">
            {product.badge && (
              <span className="absolute top-3.5 left-3.5 bg-[#b91c1c] text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md z-10">
                {product.badge}
              </span>
            )}
            <img
              src={product.img}
              alt={product.title}
              className="max-h-[360px] w-auto max-w-full object-contain filter drop-shadow-md hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center space-y-4">
            <div className="text-xs tracking-[0.2em] uppercase font-bold text-[#b91c1c]">
              Home / {product.categoryLabel}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#18181b] leading-tight">
              {product.title}
            </h1>

            {product.size && (
              <div className="inline-flex items-center gap-2 bg-[#fef2f2] text-[#b91c1c] border border-[#fca5a5] px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider w-fit shadow-2xs">
                <span>Net Size / Volume:</span>
                <span className="text-[#b91c1c] font-extrabold text-sm">{product.size}</span>
              </div>
            )}

            {/* Price & Rating */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#b91c1c]">
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-gray-400 line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 bg-[#fef2f2] px-3 py-1 rounded-full text-xs text-[#b91c1c] font-bold border border-[#fca5a5]">
                <div className="flex text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating) ? 'fill-current' : 'opacity-40'
                      }`}
                    />
                  ))}
                </div>
                <span>({product.reviewsCount} reviews)</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed font-light">
              {product.shortDesc}
            </p>

            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#b91c1c] bg-[#fff5f5] px-3.5 py-1.5 rounded-lg border border-[#fca5a5] w-fit">
              <ShieldCheck className="w-4 h-4 text-[#b91c1c]" />
              <span>100% Traditional Generational Recipe · Sun-Cured</span>
            </div>

            {/* Qty & Add to Cart */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="flex items-center border-2 border-gray-300 rounded-xl bg-white w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2.5 hover:bg-gray-100 text-gray-600 rounded-l-xl transition-colors font-bold"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold text-[#18181b]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3 py-2.5 hover:bg-gray-100 text-gray-600 rounded-r-xl transition-colors font-bold"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="flex-1 bg-[#b91c1c] hover:bg-[#991b1b] text-white py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                {addedToast ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <span>Add to Bag · ₹{product.price * quantity}</span>
                )}
              </button>
            </div>

            {/* Stock pill */}
            <div className="text-xs text-gray-500 pt-1">
              Availability:{' '}
              {product.stock > 0 ? (
                <span className="text-green-700 font-bold">
                  In Stock ({product.stock} fresh jars in batch)
                </span>
              ) : (
                <span className="text-red-600 font-bold">Out of Stock</span>
              )}
            </div>
          </div>
        </div>

        {/* Tabbed Content */}
        <div className="p-6 sm:p-10 bg-[#fafafa]">
          <div className="flex gap-8 border-b border-gray-200 pb-4 mb-6">
            <button
              onClick={() => setActiveTab('desc')}
              className={`text-xs sm:text-sm uppercase tracking-wider font-bold pb-2 transition-all relative ${
                activeTab === 'desc'
                  ? 'text-[#b91c1c]'
                  : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              Description &amp; Tradition
              {activeTab === 'desc' && (
                <span className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-[#b91c1c]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('benefits')}
              className={`text-xs sm:text-sm uppercase tracking-wider font-bold pb-2 transition-all relative ${
                activeTab === 'benefits'
                  ? 'text-[#b91c1c]'
                  : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              Health &amp; Ingredients ({product.benefits.length})
              {activeTab === 'benefits' && (
                <span className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-[#b91c1c]" />
              )}
            </button>
          </div>

          {activeTab === 'desc' && (
            <div className="space-y-6 animate-fade-in text-gray-700 text-sm leading-relaxed">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#18181b] mb-2">
                  About {product.title}
                </h3>
                <p className="mb-3">{product.descPara1}</p>
                <p>{product.descPara2}</p>
              </div>

              {/* Pros & Cons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                <div className="p-5 rounded-xl bg-white border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#b91c1c] mb-3 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-green-600" /> Key Highlights
                  </h4>
                  <ul className="space-y-2 text-xs text-gray-700">
                    {product.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#b91c1c] mt-1.5" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-xl bg-white border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-amber-800 mb-3 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-600" /> Usage Considerations
                  </h4>
                  <ul className="space-y-2 text-xs text-gray-700">
                    {product.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Special features */}
              <div className="p-6 rounded-2xl bg-white border border-[#fca5a5] text-center space-y-2">
                <h4 className="font-serif text-lg font-bold text-[#18181b] flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#b91c1c]" /> What Makes It Special
                </h4>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  {product.specials.map((s, i) => (
                    <span
                      key={i}
                      className="px-3.5 py-1.5 rounded-full bg-[#fef2f2] border border-[#fca5a5] text-xs font-bold text-[#b91c1c]"
                    >
                      🌶️ {s}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 pt-2 italic">
                  Handcrafted with pride in Kotabagh, Uttarakhand.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'benefits' && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="font-serif text-xl font-bold text-[#18181b] mb-2">
                Documented Wellness &amp; Taste Benefits
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.benefits.map((b, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-white border border-gray-200 flex items-start gap-3 shadow-sm hover:border-[#b91c1c] transition-colors"
                  >
                    <span className="w-7 h-7 rounded-full bg-[#b91c1c] text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-sm text-gray-700 font-medium leading-relaxed pt-0.5">
                      {b}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
