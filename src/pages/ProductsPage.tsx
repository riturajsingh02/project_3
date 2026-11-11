import React, { useState, useEffect } from 'react';
import { Star, Heart, Check, Plus, ChevronDown, ChevronUp, MessageSquare, Search } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { SITE_CONFIG } from '../data/config';

interface ProductsPageProps {
  onOpenProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  initialSearch?: string;
  initialCategory?: string;
  wishlistIds?: string[];
  onToggleWishlist?: (id: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  onOpenProduct,
  onAddToCart,
  initialSearch = '',
  initialCategory = 'all',
  wishlistIds,
  onToggleWishlist,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [localWishlist, setLocalWishlist] = useState<Record<string, boolean>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchFilter, setSearchFilter] = useState(initialSearch);
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAddWithAnimation = (e: React.MouseEvent, p: Product) => {
    e.stopPropagation();
    onAddToCart(p);
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  useEffect(() => {
    setSearchFilter(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const isWishlisted = (id: string) => {
    if (wishlistIds) return wishlistIds.includes(id);
    return !!localWishlist[id];
  };

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'pickle', label: '🌶️ Traditional Pickles' },
    { id: 'juice', label: '🧃 Mountain Juices' },
    { id: 'herbal', label: '🌿 Black Garlic & Herbal' },
  ];

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCategory =
      selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      !searchFilter.trim() ||
      p.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleWishlist = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(id);
    } else {
      setLocalWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
    }
  };

  const faqs = [
    {
      q: 'Are Kumaon Herbal products 100% natural?',
      a: 'Yes. Every Kumaon Herbal juice, pickle and wellness product is made with 100% natural ingredients — wild Himalayan herbs and fruit, traditional recipes, and zero artificial colours, flavours or preservatives.',
    },
    {
      q: 'Where are your products sourced from?',
      a: 'Our ingredients are wild-sourced and handcrafted in the Kumaon region of Uttarakhand, in the Indian Himalayas. From buransh flowers to mountain garlic, everything is gathered and prepared locally for maximum freshness and purity.',
    },
    {
      q: 'Do you offer free shipping?',
      a: 'Yes — we offer free shipping on all orders above ₹2000 across India. Orders are dispatched fresh and shipped in eco-friendly packaging.',
    },
    {
      q: 'What is Buransh juice and what are its benefits?',
      a: 'Buransh juice is made from the rare rhododendron flower that blooms in the Himalayas. It is floral and tangy, naturally rich in antioxidants, and traditionally enjoyed as a refreshing, heart-friendly summer drink.',
    },
    {
      q: 'Can I place a bulk or wholesale order?',
      a: "Absolutely. We offer discounted wholesale pricing, custom and gift packaging, and pan-India shipping for retailers, cafés, corporate gifting and events. Contact us with your product list and quantities and we'll send a custom quote within 24 hours.",
    },
    {
      q: 'How are your pickles made and do they contain preservatives?',
      a: 'Our pickles are handmade in small batches using sun-dried produce, cold-pressed mustard oil and traditional Kumaoni spices. They are naturally preserved with no artificial preservatives.',
    },
    {
      q: 'What is black garlic and what are its benefits?',
      a: "Black garlic is regular garlic that has been naturally fermented and aged over several weeks until the cloves turn soft, jet-black and sweet. Compared to raw garlic, it's easier to digest, has a milder non-pungent flavour, and is valued for its higher antioxidant content. It's ready to eat straight from the jar — no cooking needed.",
    },
    {
      q: 'What are the benefits of amla juice and how should I take it?',
      a: "Amla (Indian gooseberry) juice is one of nature's richest natural sources of Vitamin C and is packed with antioxidants. It's traditionally taken in the morning, diluted with water, as part of a daily wellness routine to support immunity and digestion. Our Amla juice is cold-pressed with no added sugar or preservatives.",
    },
  ];

  return (
    <div className="pt-0 pb-20 bg-white text-[#18181b]">
      {/* HERO BANNER WITH PRODUCT_BG */}
      <section className="relative w-full bg-[#fff5eb] border-b border-[#ebdccd] overflow-hidden">
        {/* Hidden accessible headings for SEO / screen readers */}
        <div className="sr-only">
          <h1>Our Pickles &amp; Farm Collection - Kumaon Herbal</h1>
          <p>
            Farm to Table · Kotabagh, Nainital. Handcrafted with sun-dried fruits, cold-pressed oils, and traditional Himalayan recipes with zero chemical preservatives.
          </p>
        </div>

        {/* Full-width edge-to-edge banner graphic */}
        <div className="w-full">
          <img
            src="/product_bg.jpg"
            alt="Our Pickles & Farm Collection - Farm to Table Kotabagh, Nainital. Handcrafted with sun-dried fruits, cold-pressed oils, and traditional Himalayan recipes with zero chemical preservatives."
            className="w-full h-auto block select-none pointer-events-none"
            loading="eager"
            decoding="async"
          />
        </div>
      </section>

      {/* FILTER & SEARCH BAR */}
      <div className="relative bg-white border-b border-gray-200 py-4 px-4 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap w-full md:w-auto py-1 px-1 justify-start md:justify-center scrollbar-none">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all shadow-2xs flex-shrink-0 ${
                  selectedCategory === c.id
                    ? 'bg-[#b91c1c] text-white shadow-md'
                    : 'bg-gray-50 text-gray-800 border border-gray-200 hover:border-[#b91c1c] hover:text-[#b91c1c] hover:bg-rose-50/50'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Search in page */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search product name..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-8 pr-3 py-2 rounded-full text-xs bg-[#fafafa] border border-gray-300 focus:outline-none focus:border-[#b91c1c] focus:bg-white"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-3" />
          </div>
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex justify-between items-center mb-6 text-xs text-gray-500 font-medium">
          <span>
            Showing <strong className="text-gray-900">{filteredProducts.length}</strong> farm products
          </span>
          <span className="text-[#b91c1c] font-bold flex items-center gap-1">
            <Check className="w-3.5 h-3.5" /> 100% Homemade Recipe Guarantee
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#fafafa] rounded-2xl border border-gray-200">
            <span className="text-4xl block mb-2">🔍</span>
            <h4 className="font-serif text-lg font-bold text-gray-800">No products found</h4>
            <p className="text-xs text-gray-500 mt-1 mb-4">Try clearing your search or choosing another collection.</p>
            <button
              onClick={() => {
                setSearchFilter('');
                setSelectedCategory('all');
              }}
              className="bg-[#b91c1c] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => onOpenProduct(p)}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#b91c1c] shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-60 bg-[#fff5f5] overflow-visible p-4 flex items-center justify-center border-b border-gray-100">
                    <span className="absolute top-3.5 left-3.5 bg-[#b91c1c] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded shadow z-10">
                      {p.badge || 'Natural'}
                    </span>
                    <button
                      onClick={(e) => toggleWishlist(e, p.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white hover:bg-red-50 flex items-center justify-center shadow-sm text-gray-400 hover:text-red-600 transition-colors z-10 border border-gray-200"
                      title="Add to Wishlist"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isWishlisted(p.id) ? 'fill-red-600 text-red-600' : ''
                        }`}
                      />
                    </button>

                    <img
                      src={p.img}
                      alt={p.title}
                      className="max-h-52 w-auto object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-xs text-[#b91c1c] text-[10px] font-bold px-3 py-1 rounded-full shadow-sm border border-rose-200 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all flex items-center gap-1 whitespace-nowrap z-10">
                      <span>👆</span>
                      <span>Tap here for quick view</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#b91c1c]">
                        {p.categoryLabel}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          p.stock <= 5
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-green-100 text-green-900'
                        }`}
                      >
                        {p.stock <= 5 ? `Only ${p.stock} left` : 'In stock'}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-[#18181b] group-hover:text-[#b91c1c] transition-colors leading-snug line-clamp-1">
                      {p.title}
                    </h3>

                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed font-light">
                      {p.shortDesc}
                    </p>

                    <div className="flex items-center text-amber-500 text-xs gap-1 pt-1 font-bold">
                      {'★★★★★'}{' '}
                      <span className="text-gray-400 font-normal text-[10px]">
                        ({p.reviewsCount})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-gray-100 mt-2">
                  <div>
                    <span className="font-serif text-2xl font-bold text-[#b91c1c]">
                      ₹{p.price}
                    </span>
                    {p.originalPrice && (
                      <span className="text-xs text-gray-400 line-through ml-1.5">
                        ₹{p.originalPrice}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => handleAddWithAnimation(e, p)}
                    className={`${
                      addedId === p.id ? 'bg-green-600 scale-105' : 'bg-[#b91c1c] hover:bg-[#991b1b]'
                    } text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow active:scale-95 flex items-center justify-center gap-1 min-w-[78px]`}
                  >
                    {addedId === p.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* WHOLESALE & BULK ORDERS BANNER (Red & White) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-gradient-to-r from-[#881337] via-[#991b1b] to-[#b91c1c] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#fef08a] block">
              Wholesale &amp; Custom Gifting
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold leading-tight">
              Buying Pickles in Bulk? <br />
              <span className="text-[#fef08a] italic font-normal">Let's Discuss Special Farm Rates.</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/90 font-light leading-relaxed">
              Stocking a restaurant, organic retail counter, or planning wedding gift hampers? We offer 10% to 25% wholesale savings with customized gift packing and direct pan-India shipping.
            </p>
            <div className="pt-3 flex flex-wrap gap-4">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi%20Kumaon%20Herbal,%20I'd%20like%20a%20bulk%20order%20quote.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1faa53] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Bulk Inquiry</span>
              </a>
              <a
                href={`tel:${SITE_CONFIG.whatsappNumber}`}
                className="inline-flex items-center gap-2 bg-white text-[#b91c1c] hover:bg-gray-100 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow"
              >
                <span>Call Us Directly</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#b91c1c] block mb-1">
            Questions &amp; Answers
          </span>
          <h2 className="font-serif text-3xl font-extrabold text-[#18181b]">
            Frequently Asked Questions
          </h2>
          <div className="w-14 h-1 bg-[#b91c1c] mx-auto mt-2 rounded-full" />
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:border-[#b91c1c] transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-serif font-bold text-base text-[#18181b] hover:text-[#b91c1c] transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#b91c1c] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 font-light">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
