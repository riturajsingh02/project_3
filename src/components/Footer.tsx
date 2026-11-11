import React, { useState } from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Truck, Sparkles, Heart, X, HelpCircle, FileText, RotateCcw } from 'lucide-react';
import { SITE_CONFIG } from '../data/config';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [activePolicyModal, setActivePolicyModal] = useState<'shipping' | 'returns' | 'faq' | null>(null);

  return (
    <footer className="bg-[#881337] text-white pt-16 pb-8 border-t-4 border-[#b91c1c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
          {/* Brand & Farm Roots */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white bg-white p-0.5">
                <img
                  src={SITE_CONFIG.logoImage}
                  alt="Kumaon Herbal"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white block">
                  Kumaon <span className="text-[#fca5a5]">Herbal</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase text-[#fef08a] font-bold block">
                  Farm to Table Pickles &amp; Juices
                </span>
              </div>
            </div>
            <p className="text-xs text-white/80 leading-relaxed font-light">
              Pure, natural products from the heart of the Himalayas. Crafted with love, delivered with care.
            </p>
            <div className="pt-2 text-xs text-white/90 space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#fef08a] block">
                Manufactured &amp; Marketed by:
              </span>
              <p className="font-semibold">M/S PHOENIX FOOD PROCESSING</p>
              <p className="text-white/70">Kotabagh, Nainital, Uttarakhand - 263159</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#fef08a] mb-4">
              Explore Store
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-white transition-colors"
                >
                  All Pickles &amp; Farm Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  Our Farm Story &amp; Facility
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blog')}
                  className="hover:text-white transition-colors"
                >
                  Pickle &amp; Wellness Journal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors"
                >
                  Wholesale &amp; Bulk Orders
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#fef08a] mb-4">
              Support
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Contact Us</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicyModal('shipping')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Shipping Policy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicyModal('returns')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Returns</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicyModal('faq')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>FAQ</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & WhatsApp */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#fef08a] mb-4">
              Farm Contact
            </h4>
            <ul className="space-y-3 text-xs text-white/85">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#fef08a] flex-shrink-0 mt-0.5" />
                <span>Village Awala Khot, Near SBI Kotabagh, Nainital (Uttarakhand)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#fef08a] flex-shrink-0" />
                <a href={`tel:${SITE_CONFIG.whatsappNumber}`} className="hover:text-white font-semibold">
                  {SITE_CONFIG.displayPhone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#fef08a] flex-shrink-0" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-white">
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li className="pt-2">
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi%20Kumaon%20Herbal,%20I'd%20like%20to%20order.`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-[#881337] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors shadow"
                >
                  <span>💬 Message on WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-center text-xs text-white/70 gap-4">
          <p>© {new Date().getFullYear()} Kumaon Herbal. All rights reserved. Handcrafted by Phoenix Food Processing.</p>
        </div>
      </div>

      {/* Policy / FAQ Modal */}
      {activePolicyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white text-gray-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setActivePolicyModal(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {activePolicyModal === 'shipping' && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-red-100 text-[#b91c1c] flex items-center justify-center">
                    <Truck className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#881337]">Shipping Policy</h3>
                </div>
                <div className="space-y-3 text-sm text-gray-600 leading-relaxed font-light">
                  <p>All orders are freshly packed and dispatched directly from our certified processing facility in Kotabagh, Nainital, Uttarakhand.</p>
                  <p><strong>Delivery Time:</strong> Standard delivery takes 3 to 7 business days depending on your location across India.</p>
                  <p><strong>Shipping Charges:</strong> Free shipping is available on all prepaid orders above ₹2,000.</p>
                  <p><strong>Tracking:</strong> Once dispatched, tracking details are sent via WhatsApp and email.</p>
                </div>
              </div>
            )}

            {activePolicyModal === 'returns' && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-red-100 text-[#b91c1c] flex items-center justify-center">
                    <RotateCcw className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#881337]">Returns &amp; Refund Policy</h3>
                </div>
                <div className="space-y-3 text-sm text-gray-600 leading-relaxed font-light">
                  <p>Due to the consumable, organic nature of our handmade pickles, juices, and traditional foods, returns are accepted only if the product arrives damaged, leaked, or tampered with.</p>
                  <p><strong>Reporting Window:</strong> Please report any issues within 48 hours of delivery along with unboxing photos or video.</p>
                  <p><strong>Refunds:</strong> Approved refunds or replacements are processed within 3-5 business days to your original payment method or bank account.</p>
                </div>
              </div>
            )}

            {activePolicyModal === 'faq' && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-red-100 text-[#b91c1c] flex items-center justify-center">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#881337]">Frequently Asked Questions</h3>
                </div>
                <div className="space-y-4 text-sm text-gray-600 leading-relaxed font-light">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Are your pickles made with vinegar?</h4>
                    <p>No! Our traditional Himalayan pickles are 100% sun-cured in cold-pressed mustard oil with authentic mountain spices and zero chemical preservatives or synthetic vinegar.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">What is the shelf life of the products?</h4>
                    <p>Most pickles and nectars have a shelf life of 12 to 18 months when stored in a cool, dry place. Always use a clean, dry spoon.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">How is Himalayan Black Garlic made?</h4>
                    <p>Fresh mountain garlic bulbs are slow-aged under controlled warm humidity for 60 to 90 days, transforming into sweet, balsamic-like cloves packed with antioxidants.</p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setActivePolicyModal(null)}
                className="bg-[#881337] hover:bg-[#b91c1c] text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
