/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { AboutPage } from './pages/AboutPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { CartItem, Product } from './types';
import { PRODUCTS } from './data/products';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [blogArticleSlug, setBlogArticleSlug] = useState<string | null>(null);
  const [globalSearch, setGlobalSearch] = useState<string>('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');

  // Cart state persisted in localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('kumaon_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted in localStorage
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('kumaon_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('kumaon_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('kumaon_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.warn('Failed to save wishlist to localStorage', e);
    }
  }, [wishlistIds]);

  // Handle URL hash and path changes for deep linking (e.g. /product.html, #product-black-garlic, etc.)
  useEffect(() => {
    const handleLocation = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();

      if (hash.includes('product-black-garlic') || path.includes('black-garlic')) {
        setCurrentPage('products');
        setSelectedCategoryFilter('herbal');
        const bg = PRODUCTS.find((p) => p.id === 'black-garlic');
        if (bg) setSelectedProduct(bg);
      } else if (hash.includes('product-amla') || path.includes('amla')) {
        setCurrentPage('products');
        setSelectedCategoryFilter('juice');
        const amla = PRODUCTS.find((p) => p.id === 'amla');
        if (amla) setSelectedProduct(amla);
      } else if (hash.includes('product') || path.includes('product')) {
        setCurrentPage('products');
      } else if (hash.includes('about') || path.includes('about')) {
        setCurrentPage('about');
      } else if (hash.includes('blog') || path.includes('blog')) {
        setCurrentPage('blog');
      } else if (hash.includes('contact') || path.includes('contact')) {
        setCurrentPage('contact');
      }
    };

    handleLocation();
    window.addEventListener('hashchange', handleLocation);
    window.addEventListener('popstate', handleLocation);
    return () => {
      window.removeEventListener('hashchange', handleLocation);
      window.removeEventListener('popstate', handleLocation);
    };
  }, []);

  const totalCartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            img: product.img,
            quantity,
          },
        ];
      }
    });
  };

  const handleToggleWishlist = (id: string) => {
    setWishlistIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOrderSuccess = () => {
    setCart([]);
  };

  const handleNavigate = (page: string, category = 'all') => {
    setCurrentPage(page);
    if (category) {
      setSelectedCategoryFilter(category);
    }
    setBlogArticleSlug(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (term: string) => {
    setGlobalSearch(term);
    setCurrentPage('products');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#18181b] selection:bg-[#b91c1c] selection:text-white overflow-x-hidden w-full max-w-full">
      {/* Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onSearchChange={handleSearchChange}
        wishlistCount={wishlistIds.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* Main Pages */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenProduct={(prod) => setSelectedProduct(prod)}
            onAddToCart={(prod) => handleAddToCart(prod, 1)}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {currentPage === 'products' && (
          <ProductsPage
            onOpenProduct={(prod) => setSelectedProduct(prod)}
            onAddToCart={(prod) => handleAddToCart(prod, 1)}
            initialSearch={globalSearch}
            initialCategory={selectedCategoryFilter}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'blog' && (
          <BlogPage initialSlug={blogArticleSlug} />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlistIds}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={(prod) => handleAddToCart(prod, 1)}
        onOpenProduct={(prod) => setSelectedProduct(prod)}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onOrderSuccess={handleOrderSuccess}
      />
    </div>
  );
}
