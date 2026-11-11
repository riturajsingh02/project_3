import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Menu, X, Search, Sparkles, Truck, ChevronLeft, ChevronRight, Heart, ShieldCheck, Leaf, MessageSquare } from 'lucide-react';
import { SITE_CONFIG } from '../data/config';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onSearchChange?: (term: string) => void;
  wishlistCount?: number;
  onOpenWishlist?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  cartCount,
  onOpenCart,
  onSearchChange,
  wishlistCount = 0,
  onOpenWishlist,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [announcementIdx, setAnnouncementIdx] = useState(0);

  const announcements = [
    {
      id: 1,
      badge: 'FREE DELIVERY',
      badgeClass: 'bg-amber-400/20 text-amber-200 border-amber-300/40',
      icon: Truck,
      highlight: 'FREE Pan-India Delivery',
      message: 'on all orders above ₹2000 across India!',
      extra: 'Packed fresh at our Kotabagh farm',
    },
    {
      id: 2,
      badge: 'MOUNTAIN HARVEST',
      badgeClass: 'bg-amber-300/20 text-[#fef08a] border-amber-300/40',
      icon: Leaf,
      highlight: 'Wild Black Garlic & Mountain Juices',
      message: '100% pure Himalayan elixirs sourced from pristine altitudes',
      extra: 'Rich in natural antioxidants',
    },
    {
      id: 3,
      badge: 'HERITAGE PURITY',
      badgeClass: 'bg-emerald-400/20 text-emerald-200 border-emerald-300/40',
      icon: ShieldCheck,
      highlight: 'Zero Preservatives',
      message: 'Sun-cured Pahadi pickles in cold-pressed mustard oil',
      extra: 'Generational recipes from Uttarakhand',
    },
    {
      id: 4,
      badge: 'COMMUNITY IMPACT',
      badgeClass: 'bg-rose-400/20 text-rose-200 border-rose-300/40',
      icon: Heart,
      highlight: 'Empowering Village Women',
      message: 'Handcrafted with mountain care by Uttarakhand women artisans',
      extra: 'Kotabagh, Nainital Facility',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIdx((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      const previousScrollY = lastScrollYRef.current;

      if (currentScrollY <= 60) {
        setIsVisible(true);
      } else if (currentScrollY > previousScrollY && currentScrollY > 60) {
        // Scrolling down past 60px -> hide navbar (-translate-y-full)
        setIsVisible(false);
      } else if (currentScrollY < previousScrollY) {
        // Scrolling up -> show navbar (translate-y-0)
        setIsVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Pickles & Products' },
    { id: 'about', label: 'Farm Story' },
    { id: 'blog', label: 'Journal' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileOpen(false);
    setShowSearch(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchChange) onSearchChange(searchTerm);
    onNavigate('products');
    setShowSearch(false);
  };

  return (
    <header className={`sticky top-0 z-50 w-full max-w-full overflow-x-hidden bg-white select-none transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      {/* 1. TOP ANNOUNCEMENT BAR WITH WOW FACTOR (Interactive Carousel & Shimmer Glow) */}
      <div className="relative bg-gradient-to-r from-[#6b0f0f] via-[#b91c1c] via-[#991b1b] to-[#6b0f0f] text-white py-2 px-2.5 sm:px-6 overflow-hidden border-b border-[#7f1d1d] shadow-xs">
        {/* Subtle Golden Shimmer Highlight along top edge */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#fef08a]/60 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto flex items-center justify-between gap-1.5 sm:gap-4">
          {/* Previous Announcement Arrow */}
          <button
            onClick={() => setAnnouncementIdx((prev) => (prev - 1 + announcements.length) % announcements.length)}
            className="p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0 focus:outline-none"
            aria-label="Previous announcement"
          >
            <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Active Announcement Content */}
          <div className="flex-1 flex items-center justify-center text-center overflow-hidden min-h-[24px]">
            <div
              key={announcementIdx}
              className="inline-flex items-center flex-wrap justify-center gap-1.5 sm:gap-2.5 text-xs sm:text-[13px] font-medium transition-all animate-fade-in"
            >
              {/* Badge Pill */}
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider uppercase border shadow-2xs ${announcements[announcementIdx].badgeClass}`}
              >
                {React.createElement(announcements[announcementIdx].icon, { className: 'w-3 h-3' })}
                <span>{announcements[announcementIdx].badge}</span>
              </span>

              {/* Message with Golden Accent */}
              <span className="text-white">
                <strong className="text-[#fef08a] font-bold mr-1">
                  {announcements[announcementIdx].highlight}
                </strong>
                <span className="text-white/95">{announcements[announcementIdx].message}</span>
              </span>

              {announcements[announcementIdx].extra && (
                <span className="hidden xl:inline text-white/75 text-[11px] border-l border-white/25 pl-2.5 font-normal">
                  {announcements[announcementIdx].extra}
                </span>
              )}
            </div>
          </div>

          {/* Next Announcement Arrow */}
          <button
            onClick={() => setAnnouncementIdx((prev) => (prev + 1) % announcements.length)}
            className="p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0 focus:outline-none"
            aria-label="Next announcement"
          >
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* 2. MAIN HEADER (100% Fluid & Responsive for Mobile, iPhone, Tablet & Desktop) */}
      <div
        className={`bg-white transition-all duration-200 border-b border-gray-100 ${
          scrolled ? 'shadow-sm py-2 sm:py-2.5' : 'py-2.5 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 flex items-center justify-between gap-2 lg:gap-4 xl:gap-6">
          {/* Left Side: Mobile Hamburger Menu (left on mobile/iPhone) + Brand Logo & Title */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3.5 flex-shrink-0">
            {/* Hamburger Menu Icon on the LEFT (for small phones/mobiles/iPhones) */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 p-1.5 text-gray-800 hover:text-[#b91c1c] hover:bg-gray-100 active:bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b91c1c]/20 transition-colors flex items-center justify-center flex-shrink-0"
              aria-label="Toggle navigation menu"
              title="Open Navigation Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Brand Logo & Title - Perfectly vertically aligned, no truncation */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 sm:gap-3 md:gap-3.5 text-left group focus:outline-none flex-shrink-0"
            >
              {/* Logo: crisp, responsive, visually centered */}
              <div className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 rounded-full overflow-hidden shadow-xs border border-emerald-900/15 flex-shrink-0 bg-white group-hover:scale-105 transition-transform p-0.5 flex items-center justify-center">
                <img
                  src={SITE_CONFIG.logoImage}
                  alt="Kumaon Herbal"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Brand Typography: Clean baseline alignment */}
              <div className="flex flex-col justify-center min-w-0">
                <span className="text-[14px] xs:text-[15px] sm:text-xl lg:text-2xl xl:text-[26px] font-extrabold tracking-tight text-gray-900 leading-tight group-hover:text-[#b91c1c] transition-colors whitespace-nowrap">
                  Kumaon <span className="text-[#b91c1c]">Herbal</span>
                </span>
                <span className="text-[8.5px] xs:text-[9.5px] sm:text-xs lg:text-[11.5px] xl:text-[12.5px] text-gray-500 font-medium tracking-normal leading-tight truncate max-w-[120px] xs:max-w-[160px] sm:max-w-none mt-0.5">
                  Himalayan Farm Pickles &amp; Juices
                </span>
              </div>
            </button>
          </div>

          {/* Desktop & Computer Nav Links: Horizontally & Vertically Centered with Big, Bold & Attractive Font */}
          <nav className="hidden lg:flex items-center justify-center gap-1 xl:gap-3.5 2xl:gap-5 flex-shrink-0 mx-auto">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`group relative px-2.5 xl:px-3.5 py-2 rounded-xl transition-all duration-200 focus:outline-none whitespace-nowrap flex items-center justify-center ${
                    isActive
                      ? 'text-[#b91c1c] font-black'
                      : 'text-gray-800 hover:text-[#b91c1c] font-bold hover:bg-rose-50/70'
                  }`}
                >
                  <span className="text-[15px] xl:text-[17px] 2xl:text-[18px] tracking-tight block leading-none">
                    {item.label}
                  </span>
                  {/* Attractive Active & Hover Indicator */}
                  {isActive ? (
                    <span className="absolute bottom-0 left-2 right-2 h-[3px] bg-gradient-to-r from-[#b91c1c] via-[#dc2626] to-[#b91c1c] rounded-full shadow-xs" />
                  ) : (
                    <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-[#b91c1c] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center opacity-80" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Search & Cart - Perfectly Aligned at equal height */}
          <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
            {/* Desktop & Tablet Search Bar */}
            <div className="relative hidden md:block">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search pickles, amla, garlic..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    if (onSearchChange) onSearchChange(e.target.value);
                  }}
                  className="h-10 w-36 lg:w-44 xl:w-56 pl-9 pr-4 rounded-full text-xs xl:text-sm bg-gray-50 border border-gray-200 hover:border-gray-300 focus:bg-white focus:border-[#b91c1c] focus:ring-2 focus:ring-[#b91c1c]/15 text-gray-800 transition-all placeholder:text-gray-400 font-normal shadow-xs"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </form>
            </div>

            {/* Mobile Search Icon Toggle */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="md:hidden w-9 h-9 flex items-center justify-center text-gray-700 hover:text-[#b91c1c] hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            {onOpenWishlist && (
              <button
                onClick={onOpenWishlist}
                className="relative h-9 sm:h-10 w-9 sm:w-10 rounded-full bg-rose-50 hover:bg-rose-100 text-[#b91c1c] flex items-center justify-center transition-all shadow-xs border border-[#fca5a5]/40 flex-shrink-0"
                aria-label={`Wishlist with ${wishlistCount} items`}
                title="View Wishlist"
              >
                <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'fill-red-600 text-red-600' : ''}`} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#b91c1c] text-white rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10.5px] font-black shadow-xs leading-none">
                    {wishlistCount}
                  </span>
                )}
              </button>
            )}

            <button
              onClick={onOpenCart}
              className="h-9 sm:h-10 px-3 sm:px-4 rounded-full bg-[#b91c1c] hover:bg-[#991b1b] text-white flex items-center justify-center gap-1.5 transition-all shadow-sm hover:shadow-md active:scale-95 flex-shrink-0"
              aria-label={`Shopping Cart with ${cartCount} items`}
              title="View Cart"
            >
              <ShoppingBag className="w-4 h-4 flex-shrink-0" />
              <span className="bg-white text-[#b91c1c] rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10.5px] sm:text-xs font-black shadow-xs leading-none">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Tablet Nav Links Bar: Visible on Tablet View (md: to lg:) with Big, Bold & Centered Navigation */}
        <div className="hidden md:flex lg:hidden items-center justify-center border-t border-gray-100 bg-gradient-to-r from-amber-50/20 via-white to-amber-50/20 px-4 py-2.5 shadow-2xs">
          <nav className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`group relative px-3 py-1.5 rounded-xl transition-all duration-200 focus:outline-none whitespace-nowrap flex items-center justify-center ${
                    isActive
                      ? 'text-[#b91c1c] font-black'
                      : 'text-gray-800 hover:text-[#b91c1c] font-bold hover:bg-rose-50/70'
                  }`}
                >
                  <span className="text-[16px] md:text-[17px] tracking-tight block leading-none">
                    {item.label}
                  </span>
                  {/* Attractive Active & Hover Indicator */}
                  {isActive ? (
                    <span className="absolute bottom-0 left-2 right-2 h-[3px] bg-gradient-to-r from-[#b91c1c] via-[#dc2626] to-[#b91c1c] rounded-full shadow-xs" />
                  ) : (
                    <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-[#b91c1c] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center opacity-80" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mobile Search Input Drawer (Dropdown) */}
        {showSearch && (
          <div className="md:hidden px-4 py-2.5 bg-gray-50 border-t border-gray-200 animate-fade-in">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search mango pickle, garlic, amla juice..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (onSearchChange) onSearchChange(e.target.value);
                }}
                className="w-full pl-9 pr-4 py-2 rounded-xl text-sm bg-white border border-gray-200 focus:outline-none focus:border-[#b91c1c] text-gray-800 shadow-xs"
                autoFocus
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </form>
          </div>
        )}
      </div>

      {/* 3. MOBILE HAMBURGER SIDEBAR DRAWER (Clean Layout for Mobile & iPhones) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden animate-fade-in">
          {/* Backdrop click to close */}
          <div
            className="fixed inset-0"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel (slides from left side matching hamburger position) */}
          <div className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-white p-6 shadow-2xl flex flex-col justify-between pt-16 sm:pt-20 border-r border-gray-200 z-10 overflow-y-auto">
            {/* Close button at top right */}
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-5 p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>

            <div>
              {/* Brand Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white border border-emerald-900/15 p-0.5 shadow-xs flex-shrink-0">
                  <img
                    src={SITE_CONFIG.logoImage}
                    alt="Kumaon Herbal"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-gray-900 leading-tight">
                    Kumaon <span className="text-[#b91c1c]">Herbal</span>
                  </h3>
                  <p className="text-xs text-gray-500">Himalayan Farm Pickles &amp; Juices</p>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1">
                {navItems.map((item) => {
                  const isActive = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left py-3 px-3 rounded-lg text-xs uppercase tracking-wider font-bold transition-colors ${
                        isActive
                          ? 'bg-[#fef2f2] text-[#b91c1c] border-l-4 border-[#b91c1c]'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}

                {/* View Cart in Mobile Menu */}
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenCart();
                  }}
                  className="w-full flex items-center justify-between py-3 px-3 rounded-lg text-xs uppercase tracking-wider font-bold text-gray-700 hover:bg-gray-50 hover:text-[#b91c1c] transition-colors border-t border-gray-100 mt-2"
                >
                  <span className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-[#b91c1c]" />
                    <span>Shopping Cart</span>
                  </span>
                  <span className="bg-[#b91c1c] text-white rounded-full px-2 py-0.5 text-[11px] font-bold">
                    {cartCount} {cartCount === 1 ? 'item' : 'items'}
                  </span>
                </button>
              </div>
            </div>

            {/* Drawer Bottom with WhatsApp direct order button and contact info */}
            <div className="pt-6 border-t border-gray-100 space-y-3">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hello%20Kumaon%20Herbal%20team,%20I%20would%20like%20to%20order%20from%20your%20farm!`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Order via WhatsApp</span>
              </a>

              <div className="text-xs text-gray-500 space-y-1 text-center">
                <p>📍 Kotabagh, Nainital, Uttarakhand</p>
                <p className="font-semibold text-gray-700">📞 {SITE_CONFIG.displayPhone}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
