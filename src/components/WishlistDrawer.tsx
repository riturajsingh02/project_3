import React from 'react';
import { X, Heart, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  onRemoveFromWishlist: (id: string) => void;
  onAddToCart: (product: Product) => void;
  onOpenProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  onRemoveFromWishlist,
  onAddToCart,
  onOpenProduct,
}) => {
  if (!isOpen) return null;

  const wishlistedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-rose-50 to-white">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-red-100 text-[#b91c1c] flex items-center justify-center">
                <Heart className="w-5 h-5 fill-red-600 text-red-600" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-gray-900">Your Wishlist</h2>
                <p className="text-xs text-gray-500">{wishlistedProducts.length} saved farm items</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistedProducts.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-[#b91c1c]">
                  <Heart className="w-8 h-8 text-rose-300" />
                </div>
                <h3 className="font-serif text-lg font-bold text-gray-800">Your wishlist is empty</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Tap the heart icon on any pickle, juice, or wellness product to save it here for later.
                </p>
              </div>
            ) : (
              wishlistedProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-[#fffcf9] hover:border-[#b91c1c]/40 transition-all shadow-xs"
                >
                  <div
                    onClick={() => {
                      onOpenProduct(p);
                      onClose();
                    }}
                    className="w-20 h-20 rounded-xl bg-white border border-gray-200 overflow-hidden p-2 flex-shrink-0 cursor-pointer"
                  >
                    <img src={p.img} alt={p.title} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#b91c1c] block">
                      {p.categoryLabel}
                    </span>
                    <h4
                      onClick={() => {
                        onOpenProduct(p);
                        onClose();
                      }}
                      className="font-serif font-bold text-sm text-gray-900 truncate cursor-pointer hover:text-[#b91c1c]"
                    >
                      {p.title}
                    </h4>
                    <span className="font-bold text-sm text-[#b91c1c] block mt-0.5">₹{p.price}</span>
                  </div>

                  <div className="flex flex-col gap-2 items-end">
                    <button
                      onClick={() => onRemoveFromWishlist(p.id)}
                      className="text-gray-400 hover:text-red-600 p-1 transition-colors"
                      title="Remove from Wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        onAddToCart(p);
                        onRemoveFromWishlist(p.id);
                      }}
                      className="bg-[#b91c1c] hover:bg-[#991b1b] text-white px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Move</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlistedProducts.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <button
                onClick={() => {
                  wishlistedProducts.forEach((p) => onAddToCart(p));
                  wishlistedProducts.forEach((p) => onRemoveFromWishlist(p.id));
                  onClose();
                }}
                className="w-full bg-[#b91c1c] hover:bg-[#991b1b] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Move All to Cart</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
