import React, { useState, useEffect } from 'react';
import { Star, ArrowRight, ShieldCheck, Truck, MessageSquare, Phone, Heart, Check, Sparkles, ChevronLeft, ChevronRight, Leaf } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { SITE_CONFIG } from '../data/config';

interface HomePageProps {
  onNavigate: (page: string, category?: string) => void;
  onOpenProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  wishlistIds?: string[];
  onToggleWishlist?: (id: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenProduct,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [localWishlist, setLocalWishlist] = useState<Record<string, boolean>>({});
  const [activeBestSellerIndex, setActiveBestSellerIndex] = useState(0);
  const [addedId, setAddedId] = useState<string | null>(null);
  const bestSellerScrollRef = React.useRef<HTMLDivElement>(null);

  const handleAddWithAnimation = (e: React.MouseEvent, p: Product) => {
    e.stopPropagation();
    onAddToCart(p);
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const isWishlisted = (id: string) => {
    if (wishlistIds) return wishlistIds.includes(id);
    return !!localWishlist[id];
  };

  const toggleWishlist = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(id);
    } else {
      setLocalWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
    }
  };

  const handleBestSellerScroll = () => {
    if (bestSellerScrollRef.current) {
      const { scrollLeft, clientWidth } = bestSellerScrollRef.current;
      const index = Math.round(scrollLeft / (clientWidth * 0.8));
      setActiveBestSellerIndex(Math.min(Math.max(index, 0), bestSellers.length - 1));
    }
  };

  const heroSlides = [
    {
      image: '/km1.jpeg',
      tag: 'Farm Harvest',
      title: 'From the Himalayas, to your family.',
      subtitle: 'Pure. Potent. Always. — Handcrafted in Kotabagh',
      objectPosition: 'object-center',
    },
    {
      image: '/km2.jpeg',
      tag: '100% Pure Elixirs',
      title: 'Natural Himalayan Mountain Juices',
      subtitle: 'From the hills of Uttarakhand, directly to your glass.',
      objectPosition: 'object-center',
    },
    {
      image: '/km3.jpeg',
      tag: 'Women Empowerment',
      title: 'Handcrafted With Mountain Care',
      subtitle: 'By the hands that know the hills best — Kotabagh Facility',
      objectPosition: 'object-[center_18%]',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const featuredPickles = PRODUCTS.filter((p) => p.category === 'pickle');
  const bestSellers = PRODUCTS.filter((p) => p.badge === 'Bestseller' || p.badge === 'Popular').slice(0, 4);



  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.includes('@')) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 1. PROFESSIONAL FULL-WIDTH HERO SLIDER (Uncropped 1600:892 Native Aspect Ratio) */}
      <section className="relative w-full overflow-hidden border-b-4 border-[#b91c1c] group bg-black select-none">
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '1600 / 892' }}>
          {/* Stacked Full-Width Slides with smooth crossfade */}
          {heroSlides.map((slide, idx) => (
            <div
              key={idx}
              onClick={() => onNavigate('products')}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out cursor-pointer ${
                currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className={`w-full h-full object-cover ${slide.objectPosition}`}
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}

          {/* Left Navigation Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-[#b91c1c] text-gray-800 hover:text-white flex items-center justify-center backdrop-blur-md transition-all shadow-xl active:scale-95 z-20 border border-white/60 opacity-80 hover:opacity-100"
            aria-label="Previous Slide"
            title="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </button>

          {/* Right Navigation Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-[#b91c1c] text-gray-800 hover:text-white flex items-center justify-center backdrop-blur-md transition-all shadow-xl active:scale-95 z-20 border border-white/60 opacity-80 hover:opacity-100"
            aria-label="Next Slide"
            title="Next Slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </button>
        </div>
      </section>

      {/* 2. WHY CHOOSE KUMAON HERBAL (Mountain Artwork, 5 items in ONE LINE across all screens including mobile) */}
      <section className="bg-[#fbf8f3] py-6 sm:py-10 border-b border-[#ebdcca] relative z-20">
        <div className="max-w-6xl mx-auto px-1.5 sm:px-4 lg:px-6">
          {/* Top Mountain Artwork from uploaded image */}
          <div className="flex items-center justify-center mb-1.5 sm:mb-2.5">
            <img
              src="/assets/himalayan/image_dc36f572.png"
              alt="Himalayan Mountains"
              className="h-6 sm:h-7 md:h-8 w-auto object-contain mx-auto"
            />
          </div>

          {/* Section Heading with Decorative Divider Lines */}
          <div className="flex items-center justify-center gap-2 sm:gap-6 mb-5 sm:mb-8">
            <div className="h-[1px] w-6 sm:w-16 bg-[#2d5e3f]/30 hidden sm:block" />
            <h2 className="font-serif text-lg sm:text-2xl md:text-3xl font-bold text-[#143823] tracking-tight text-center">
              Why Choose Kumaon Herbal?
            </h2>
            <div className="h-[1px] w-6 sm:w-16 bg-[#2d5e3f]/30 hidden sm:block" />
          </div>

          {/* All 5 Distinct Feature Cards in ONE SINGLE LINE on mobile and desktop */}
          <div className="grid grid-cols-5 gap-1 sm:gap-3 lg:gap-5 w-full">
            {/* Card 1: Traditional Recipes */}
            <div className="bg-[#fdfbf6] rounded-xl sm:rounded-2xl lg:rounded-3xl border border-[#ebdcca] p-1.5 py-2.5 sm:p-4 lg:p-5 flex flex-col items-center justify-center text-center shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all group min-w-0">
              <div className="w-9 h-9 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center mb-1 sm:mb-2 flex-shrink-0">
                <svg
                  className="w-6 h-6 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-[#991b1b] group-hover:scale-105 transition-transform"
                  viewBox="0 0 48 48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Jar Lid */}
                  <rect x="14" y="8" width="20" height="5" rx="1.5" fill="#991b1b" fillOpacity="0.08" />
                  <path d="M12 13H36" />
                  {/* Jar Body */}
                  <path d="M15 13L13 18C12 21 11 25 11 29C11 36 14 40 24 40C34 40 37 36 37 29C37 25 36 21 35 18L33 13" />
                  {/* Inner Pickle Level Line */}
                  <path d="M16 26C18 24 30 24 32 26" strokeDasharray="1 0" opacity="0.6" />
                  {/* Seal Detail */}
                  <ellipse cx="24" cy="30" rx="3.5" ry="2.5" fill="#991b1b" fillOpacity="0.18" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-[9.5px] xs:text-[10px] sm:text-xs lg:text-[15px] leading-tight text-center">
                Traditional<br />Recipes
              </h3>
            </div>

            {/* Card 2: 100% Natural - Enlarged for Maximum Readability */}
            <div className="bg-[#fdfbf6] rounded-xl sm:rounded-2xl lg:rounded-3xl border border-[#ebdcca] p-1.5 py-2.5 sm:p-4 lg:p-5 flex flex-col items-center justify-center text-center shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all group min-w-0">
              <div className="w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20 flex items-center justify-center mb-1 sm:mb-2 flex-shrink-0">
                <img
                  src="/assets/himalayan/image_15c43149.png"
                  alt="100% Natural"
                  className="w-full h-full max-h-10 sm:max-h-16 lg:max-h-20 object-contain group-hover:scale-110 transition-transform drop-shadow-2xs"
                />
              </div>
              <h3 className="font-bold text-gray-900 text-[9.5px] xs:text-[10px] sm:text-xs lg:text-[15px] leading-tight text-center">
                100%<br />Natural
              </h3>
            </div>

            {/* Card 3: FSSAI Certified */}
            <div className="bg-[#fdfbf6] rounded-xl sm:rounded-2xl lg:rounded-3xl border border-[#ebdcca] p-1.5 py-2.5 sm:p-4 lg:p-5 flex flex-col items-center justify-center text-center shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all group min-w-0">
              <div className="w-9 h-9 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center mb-1 sm:mb-2 flex-shrink-0">
                <img
                  src="/assets/himalayan/image_90388e6b.png"
                  alt="FSSAI Certified"
                  className="max-h-7 sm:max-h-11 lg:max-h-13 w-auto object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="font-bold text-gray-900 text-[9.5px] xs:text-[10px] sm:text-xs lg:text-[15px] leading-tight text-center">
                FSSAI<br />Certified
              </h3>
            </div>

            {/* Card 4: Pan-India Delivery */}
            <div className="bg-[#fdfbf6] rounded-xl sm:rounded-2xl lg:rounded-3xl border border-[#ebdcca] p-1.5 py-2.5 sm:p-4 lg:p-5 flex flex-col items-center justify-center text-center shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all group min-w-0">
              <div className="w-9 h-9 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center mb-1 sm:mb-2 flex-shrink-0">
                <svg
                  className="w-6 h-6 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-[#991b1b] group-hover:scale-105 transition-transform"
                  viewBox="0 0 48 48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Truck cargo body */}
                  <rect x="6" y="14" width="22" height="18" rx="2" fill="#991b1b" fillOpacity="0.08" />
                  {/* Truck cab */}
                  <path d="M28 20H36L41 25V32H28V20Z" fill="#991b1b" fillOpacity="0.08" />
                  {/* Wheels */}
                  <circle cx="15" cy="34" r="4" fill="white" strokeWidth="2.4" />
                  <circle cx="34" cy="34" r="4" fill="white" strokeWidth="2.4" />
                  <path d="M19 34H30" />
                  <path d="M6 32V34H11" />
                  <path d="M38 34H42V32" />
                  {/* Cab window */}
                  <path d="M30 23H35L38 27H30V23Z" fill="currentColor" fillOpacity="0.2" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-[9.5px] xs:text-[10px] sm:text-xs lg:text-[15px] leading-tight text-center">
                Pan-India<br />Delivery
              </h3>
            </div>

            {/* Card 5: WhatsApp Support */}
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hello%20Kumaon%20Herbal%20team,%20I%20have%20an%20inquiry!`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#fdfbf6] rounded-xl sm:rounded-2xl lg:rounded-3xl border border-[#ebdcca] p-1.5 py-2.5 sm:p-4 lg:p-5 flex flex-col items-center justify-center text-center shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all group min-w-0"
            >
              <div className="w-9 h-9 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center mb-1 sm:mb-2 flex-shrink-0">
                <svg
                  className="w-6 h-6 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-[#15803d] group-hover:scale-105 transition-transform"
                  viewBox="0 0 48 48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Headset Arc */}
                  <path d="M10 24C10 16.268 16.268 10 24 10C31.732 10 38 16.268 38 24" />
                  {/* Left Earphone */}
                  <rect x="7" y="24" width="6" height="11" rx="3" fill="#15803d" fillOpacity="0.15" />
                  {/* Right Earphone */}
                  <rect x="35" y="24" width="6" height="11" rx="3" fill="#15803d" fillOpacity="0.15" />
                  {/* Mic Boom */}
                  <path d="M38 31V35C38 37 36 38 34 38H28" />
                  <circle cx="26" cy="38" r="2" fill="currentColor" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-[9.5px] xs:text-[10px] sm:text-xs lg:text-[15px] leading-tight text-center">
                WhatsApp<br />Support
              </h3>
            </a>
          </div>
        </div>
      </section>

      {/* 3. EXPLORE OUR COLLECTIONS (Rich, premium background and card design) */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-[#fefbf6] via-[#f5ede2] to-[#fefbf6] border-y border-[#ebdcca] relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#b91c1c_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header with Flanking Botanical Leaves */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-3 mx-auto w-fit max-w-full px-2">
            <img
              src="/assets/himalayan/header_leaf_left_clean.png"
              alt=""
              className="h-4 sm:h-7 w-auto object-contain select-none shrink-0"
            />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#b91c1c] text-center">
              Handcrafted in Uttarakhand
            </span>
            <img
              src="/assets/himalayan/header_leaf_right_clean.png"
              alt=""
              className="h-4 sm:h-7 w-auto object-contain select-none shrink-0"
            />
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#18181b] text-center tracking-tight mb-3">
            Explore Our <span className="text-[#b91c1c] italic">Collections</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 text-center max-w-lg mx-auto mb-10 font-light">
            Discover time-honored Himalayan culinary elixirs, sun-cured pickles, and pure herbal wellness treasures.
          </p>

          {/* 3 Collection Cards in 1 Row on Mobile and Desktop */}
          <div className="grid grid-cols-3 gap-2 xs:gap-3 sm:gap-6 lg:gap-8">
            {/* Card 1: Pickles */}
            <div
              onClick={() => onNavigate('products', 'pickle')}
              className="group cursor-pointer rounded-3xl overflow-hidden border-2 border-[#ebdcca] bg-white shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col min-w-0"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#faf4ec]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-70 group-hover:opacity-50 transition-opacity" />
                <span className="absolute top-3 left-3 bg-[#b91c1c] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow z-20 hidden sm:inline-block">
                  Sun-Cured
                </span>
                <img
                  src="/assets/s/pickle.jpeg"
                  alt="Pickles"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute bottom-3 left-4 right-4 z-20 text-white hidden sm:block">
                  <span className="text-[10px] uppercase tracking-widest text-[#fef08a] font-bold block">Traditional</span>
                  <h3 className="font-serif text-lg font-bold">Pickles &amp; Achar</h3>
                </div>
              </div>
              <div className="bg-[#fffcf9] py-3 px-5 flex items-center justify-between text-xs font-bold text-gray-800 group-hover:text-[#b91c1c] transition-colors border-t border-[#ebdcca]/50">
                <span>Browse All Pickles</span>
                <span className="w-7 h-7 rounded-full bg-[#fef2f2] text-[#b91c1c] flex items-center justify-center group-hover:bg-[#b91c1c] group-hover:text-white transition-all shadow-xs">
                  &gt;
                </span>
              </div>
            </div>

            {/* Card 2: Herbal Juices */}
            <div
              onClick={() => onNavigate('products', 'juice')}
              className="group cursor-pointer rounded-3xl overflow-hidden border-2 border-[#ebdcca] bg-white shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col min-w-0"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#faf4ec]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-70 group-hover:opacity-50 transition-opacity" />
                <span className="absolute top-3 left-3 bg-[#b91c1c] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow z-20 hidden sm:inline-block">
                  100% Pure
                </span>
                <img
                  src="/assets/s/juices.jpeg"
                  alt="Herbal Juices"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute bottom-3 left-4 right-4 z-20 text-white hidden sm:block">
                  <span className="text-[10px] uppercase tracking-widest text-[#fef08a] font-bold block">Mountain Nectars</span>
                  <h3 className="font-serif text-lg font-bold">Herbal Juices</h3>
                </div>
              </div>
              <div className="bg-[#fffcf9] py-3 px-5 flex items-center justify-between text-xs font-bold text-gray-800 group-hover:text-[#b91c1c] transition-colors border-t border-[#ebdcca]/50">
                <span>Browse All Juices</span>
                <span className="w-7 h-7 rounded-full bg-[#fef2f2] text-[#b91c1c] flex items-center justify-center group-hover:bg-[#b91c1c] group-hover:text-white transition-all shadow-xs">
                  &gt;
                </span>
              </div>
            </div>

            {/* Card 3: Herbal Products */}
            <div
              onClick={() => onNavigate('products', 'herbal')}
              className="group cursor-pointer rounded-3xl overflow-hidden border-2 border-[#ebdcca] bg-white shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col min-w-0"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#faf4ec]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-70 group-hover:opacity-50 transition-opacity" />
                <span className="absolute top-3 left-3 bg-[#b91c1c] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow z-20 hidden sm:inline-block">
                  Aged &amp; Rare
                </span>
                <img
                  src="/assets/s/herbal.jpeg"
                  alt="Herbal Products"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute bottom-3 left-4 right-4 z-20 text-white hidden sm:block">
                  <span className="text-[10px] uppercase tracking-widest text-[#fef08a] font-bold block">Wellness</span>
                  <h3 className="font-serif text-lg font-bold">Herbal Products</h3>
                </div>
              </div>
              <div className="bg-[#fffcf9] py-3 px-5 flex items-center justify-between text-xs font-bold text-gray-800 group-hover:text-[#b91c1c] transition-colors border-t border-[#ebdcca]/50">
                <span>Browse Herbal Store</span>
                <span className="w-7 h-7 rounded-full bg-[#fef2f2] text-[#b91c1c] flex items-center justify-center group-hover:bg-[#b91c1c] group-hover:text-white transition-all shadow-xs">
                  &gt;
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BEST SELLERS GRID / HORIZONTAL SCROLL ON MOBILE */}
      <section className="py-16 bg-[#fafafa] border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#b91c1c] block mb-1">
                Most Loved
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#18181b]">
                Best Selling <span className="text-[#b91c1c]">Jars &amp; Bottles</span>
              </h2>
            </div>
            <button
              onClick={() => onNavigate('products')}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold text-[#b91c1c] hover:underline"
            >
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Horizontal scrollable row on mobile/tablet, 4-column grid on lg+ */}
          <div
            ref={bestSellerScrollRef}
            onScroll={handleBestSellerScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 px-1 scrollbar-none sm:grid sm:grid-cols-2 lg:grid-cols-4 lg:overflow-visible lg:pb-0 lg:gap-6"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {bestSellers.map((p) => (
              <div
                key={p.id}
                onClick={() => onOpenProduct(p)}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#b91c1c] shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between w-[85%] xs:w-[78%] sm:w-auto flex-shrink-0 snap-center"
              >
                <div>
                  <div className="relative h-60 bg-[#fff5f5] overflow-visible p-4 flex items-center justify-center border-b border-gray-100">
                    <span className="absolute top-3.5 left-3.5 bg-[#b91c1c] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded shadow z-10">
                      {p.badge || 'Bestseller'}
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
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#b91c1c] block">
                      {p.categoryLabel}
                    </span>
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
                    } text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow active:scale-95 flex items-center justify-center gap-1 min-w-[72px]`}
                  >
                    {addedId === p.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <span>Add</span>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots for Mobile/Small Screens */}
          <div className="flex lg:hidden justify-center items-center gap-2 mt-6">
            {bestSellers.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (bestSellerScrollRef.current) {
                    const cardWidth = bestSellerScrollRef.current.clientWidth * 0.85;
                    bestSellerScrollRef.current.scrollTo({
                      left: idx * cardWidth,
                      behavior: 'smooth'
                    });
                  }
                }}
                className={`h-2 rounded-full transition-all ${
                  activeBestSellerIndex === idx
                    ? 'w-6 bg-[#b91c1c]'
                    : 'w-2 bg-gray-300'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. FARM ROOTS STORY (Food on Farm Style Village Origin) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#b91c1c] block">
              Farm Roots &amp; Heritage
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#18181b] leading-tight">
              Made in Kotabagh, <br />
              <span className="text-[#b91c1c] italic font-normal">Like Our Grandmothers Made</span>
            </h2>
            <div className="w-16 h-1 bg-[#b91c1c] rounded-full" />
            <p className="text-sm text-gray-700 leading-relaxed font-light">
              Growing up in Uttarakhand, pickles were never just a condiment—they were an annual ritual. Every summer, raw mangoes were hand-sliced, salted, sun-dried on terrace roofs, and immersed in cold-pressed mustard oil with roasted fenugreek, fennel, and mountain chilies.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed font-light">
              At our facility in Kotabagh (Nainital), <strong>M/S Phoenix Food Processing</strong> employs <strong>16+ local residents</strong>, including <strong>11 village women</strong> who hand-inspect and prepare every batch without chemical vinegar or synthetic preservatives.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#fff5f5] border border-[#fca5a5]/60 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#b91c1c] text-white flex items-center justify-center font-bold text-base flex-shrink-0 shadow-sm">
                  🌿
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#b91c1c]">Wild Foraged</h4>
                  <p className="text-xs text-gray-700 font-medium">Almora &amp; Nainital Forests</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#fff5f5] border border-[#fca5a5]/60 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#b91c1c] text-white flex items-center justify-center font-bold text-base flex-shrink-0 shadow-sm">
                  🛡️
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#b91c1c]">Zero Chemicals</h4>
                  <p className="text-xs text-gray-700 font-medium">No Synthetic Vinegar</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#fff5f5] border border-[#fca5a5]/60 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#b91c1c] text-white flex items-center justify-center font-bold text-base flex-shrink-0 shadow-sm">
                  👩‍🌾
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#b91c1c]">Village Women</h4>
                  <p className="text-xs text-gray-700 font-medium">Handcrafted with Pride</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-2 bg-[#b91c1c] hover:bg-[#991b1b] text-white px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Authentic Team Photos from Kotabagh */}
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-[#b91c1c]/20 h-72 sm:h-80 bg-[#faf4ec]">
              <img
                src="/assets/himalayan/WhatsApp_Image_2026-03-16_at_8.49.40_PM_ec8d2f9f.jpeg"
                alt="Kotabagh processing unit team"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden shadow border border-gray-200 h-32 sm:h-36">
                <img
                  src="/assets/himalayan/WhatsApp_Image_2026-03-16_at_8.49.42_PM__1__061d284e.jpeg"
                  alt="Inside factory facility"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow border border-gray-200 h-32 sm:h-36">
                <img
                  src="/assets/himalayan/WhatsApp_Image_2026-03-16_at_8.49.52_PM_84564277.jpeg"
                  alt="Enjoying mountain juices"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHATSAPP FAST ORDER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-gradient-to-r from-[#881337] to-[#b91c1c] text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#fef08a] block">
              Quick &amp; Easy Ordering
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold">
              Prefer Ordering on WhatsApp?
            </h3>
            <p className="text-xs sm:text-sm text-white/90 max-w-lg font-light">
              Send us your delivery address and favorite pickle or juice list directly on WhatsApp. We share total details and dispatch same day.
            </p>
          </div>
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi%20Kumaon%20Herbal,%20I'd%20like%20to%20place%20an%20order.`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1faa53] text-white px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95 flex-shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp: {SITE_CONFIG.displayPhone}</span>
          </a>
        </div>
      </section>

      {/* 7. CUSTOMER REVIEWS (Google Verified Reviews exact images) */}
      <section className="py-16 bg-[#fff5f5] border-t border-[#fca5a5]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#b91c1c] block mb-1">
              Customer Feedback
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#18181b]">
              Why Families Love Our <span className="text-[#b91c1c]">Homemade Taste</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200 hover:shadow-xl transition-shadow p-2">
              <img
                src="/assets/himalayan/image_3c9cb01e.png"
                alt="Google Review by Himanshu Pandey"
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200 hover:shadow-xl transition-shadow p-2">
              <img
                src="/assets/himalayan/image_164fc8a6.png"
                alt="Google Review by Bhaskar Badhani"
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200 hover:shadow-xl transition-shadow p-2">
              <img
                src="/assets/himalayan/image_0b439e91.png"
                alt="Google Review by Nikhil Sebastian"
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8. NEWSLETTER (Food on Farm Red & White) */}
      <section className="bg-white py-16 px-4 border-t border-gray-200">
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#b91c1c] block">
            Fresh Harvest Alerts
          </span>
          <h2 className="font-serif text-3xl font-extrabold text-[#18181b]">
            Get Fresh Batch &amp; Pickle Season Updates
          </h2>
          <p className="text-xs text-gray-600 max-w-md mx-auto font-light">
            Be the first to know when new batches of sun-cured Aam Achar, Buransh juice, or Aged Black Garlic are released.
          </p>

          <form onSubmit={handleSubscribe} className="pt-3 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-full text-xs text-gray-800 bg-[#fafafa] border border-gray-300 focus:outline-none focus:border-[#b91c1c] focus:bg-white"
              required
            />
            <button
              type="submit"
              className="bg-[#b91c1c] hover:bg-[#991b1b] text-white px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow"
            >
              {subscribed ? '✓ Subscribed!' : 'Subscribe'}
            </button>
          </form>
          {subscribed && (
            <p className="text-xs text-green-700 font-bold">
              Thank you for joining Kumaon Herbal!
            </p>
          )}
        </div>
      </section>
    </div>
  );
};
