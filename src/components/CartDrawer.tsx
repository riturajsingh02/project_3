import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { CartItem } from '../types';
import { SITE_CONFIG } from '../data/config';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const remainingForFreeShipping = Math.max(0, SITE_CONFIG.freeShippingThreshold - totalAmount);
  const freeShippingProgress = Math.min(
    100,
    (totalAmount / SITE_CONFIG.freeShippingThreshold) * 100
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 border-l border-gray-200 animate-slide-left">
        {/* Header (Food on Farm style) */}
        <div className="p-5 border-b border-gray-200 bg-[#fff5f5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#b91c1c]" />
            <h3 className="font-serif text-lg font-bold text-[#18181b]">
              Your Shopping Bag
            </h3>
            <span className="text-xs bg-[#b91c1c] text-white px-2 py-0.5 rounded-full font-bold">
              {items.reduce((c, i) => c + i.quantity, 0)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter (Red & White) */}
        <div className="px-5 py-3 bg-[#fef2f2] border-b border-[#fca5a5] text-xs">
          <div className="flex items-center justify-between mb-1.5 text-[#b91c1c] font-bold">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#b91c1c]" />
              {remainingForFreeShipping === 0 ? (
                <span>🎉 You unlocked FREE Shipping across India!</span>
              ) : (
                <span>
                  Add <strong className="underline">₹{remainingForFreeShipping}</strong> more for <strong>FREE Delivery</strong>
                </span>
              )}
            </span>
            <span>{Math.round(freeShippingProgress)}%</span>
          </div>
          <div className="w-full bg-[#fecaca] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#b91c1c] h-full transition-all duration-300 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#fafafa]">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-500">
              <div className="w-16 h-16 rounded-full bg-[#fff5f5] flex items-center justify-center mb-4 text-[#b91c1c]">
                <ShoppingBag className="w-8 h-8 opacity-70" />
              </div>
              <h4 className="font-serif text-lg font-bold text-[#18181b] mb-1">
                Your bag is empty
              </h4>
              <p className="text-xs text-gray-500 mb-6 max-w-xs">
                Explore our traditional sun-cured pickles, cold-pressed raw juices, and Himalayan black garlic.
              </p>
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 bg-[#b91c1c] hover:bg-[#991b1b] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow"
              >
                Start Shopping <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-3.5 bg-white rounded-xl border border-gray-200 shadow-sm"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#fff5f5] flex-shrink-0 border border-gray-200 p-1">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-serif text-sm font-bold text-[#18181b] truncate">
                      {item.title}
                    </h4>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors p-0.5"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-xs text-[#b91c1c] font-bold">
                    ₹{item.price}{' '}
                    <span className="text-[10px] text-gray-400 font-normal">per item</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-2 py-1 hover:bg-gray-100 text-gray-600 font-bold transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-bold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-2 py-1 hover:bg-gray-100 text-gray-600 font-bold transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-bold text-sm text-[#b91c1c]">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-gray-200 bg-white space-y-4">
            <div className="space-y-1.5 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">₹{totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-bold text-[#b91c1c]">
                  {remainingForFreeShipping === 0 ? 'FREE DELIVERY' : 'Calculated at checkout'}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-100">
                <span>Total Amount:</span>
                <span className="font-serif text-2xl text-[#b91c1c]">₹{totalAmount}</span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="w-full bg-[#b91c1c] hover:bg-[#991b1b] text-white py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all active:scale-[0.99]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-center text-gray-400">
              🔒 Instant UPI Payment · Verified Bank of Baroda QR
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
