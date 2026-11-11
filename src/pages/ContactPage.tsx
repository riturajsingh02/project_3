import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { SITE_CONFIG } from '../data/config';

export const ContactPage: React.FC = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'Pickle Order Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName.trim() || !form.email.trim() || !form.message.trim()) {
      setFormError('Please fill all the required fields (First Name, Email, and Message).');
      return;
    }
    setFormError(null);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: 'Pickle Order Inquiry',
        message: '',
      });
    }, 5000);
  };

  return (
    <div className="pt-6 sm:pt-8 pb-20 bg-white text-[#18181b]">
      {/* HERO BANNER */}
      <section className="relative py-14 bg-gradient-to-r from-[#881337] via-[#991b1b] to-[#b91c1c] text-white text-center px-4 overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-2.5 relative z-10">
          <span className="text-xs uppercase tracking-[0.25em] text-[#fef08a] font-bold block">
            Direct Farm Connect
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white">
            Get in <span className="text-[#fef08a] italic font-normal">Touch</span> with Us
          </h1>
          <p className="text-xs sm:text-sm text-white/90 max-w-xl mx-auto font-light leading-relaxed">
            Need pickle recommendations, dispatch tracking, or wholesale pricing for retail? We're always here to assist.
          </p>
        </div>
      </section>

      {/* INFO CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-7 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border-2 border-[#fca5a5] shadow-md text-center space-y-2 hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-full bg-[#fef2f2] text-[#b91c1c] flex items-center justify-center mx-auto text-xl border border-[#fca5a5]">
              📍
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#b91c1c] block">
              Farm &amp; Unit Location
            </span>
            <h3 className="font-serif text-lg font-bold text-[#18181b]">
              Kotabagh, Nainital
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed font-light">
              Village Awala Khot, Near SBI Kotabagh
              <br />
              Dist. Nainital, Uttarakhand — 263159
            </p>
            <a
              href="https://maps.google.com/?q=Kotabagh,Uttarakhand"
              target="_blank"
              rel="noreferrer"
              className="inline-block text-xs font-bold text-[#b91c1c] hover:underline pt-1"
            >
              Open on Google Maps →
            </a>
          </div>

          <div className="bg-white p-6 rounded-2xl border-2 border-[#fca5a5] shadow-md text-center space-y-2 hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-full bg-[#fef2f2] text-[#b91c1c] flex items-center justify-center mx-auto text-xl border border-[#fca5a5]">
              📞
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#b91c1c] block">
              Call &amp; WhatsApp Orders
            </span>
            <h3 className="font-serif text-lg font-bold text-[#18181b]">
              {SITE_CONFIG.displayPhone}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed font-light">
              Monday to Saturday
              <br />
              9:00 AM – 6:00 PM IST
            </p>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="inline-block text-xs font-bold text-[#b91c1c] hover:underline pt-1"
            >
              Chat on WhatsApp →
            </a>
          </div>

          <div className="bg-white p-6 rounded-2xl border-2 border-[#fca5a5] shadow-md text-center space-y-2 hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-full bg-[#fef2f2] text-[#b91c1c] flex items-center justify-center mx-auto text-xl border border-[#fca5a5]">
              ✉️
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#b91c1c] block">
              Official Email
            </span>
            <h3 className="font-serif text-lg font-bold text-[#18181b]">
              {SITE_CONFIG.email}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed font-light">
              For online orders, wholesale inquiries,
              <br />
              and corporate gift hampers
            </p>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="inline-block text-xs font-bold text-[#b91c1c] hover:underline pt-1"
            >
              Send an Email →
            </a>
          </div>
        </div>
      </section>

      {/* FORM & DETAILS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#b91c1c] block mb-1">
                Direct Inquiry
              </span>
              <h2 className="font-serif text-3xl font-extrabold text-[#18181b]">
                Write to <span className="text-[#b91c1c]">Our Kitchen</span>
              </h2>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-[#fff5f5] border border-[#fca5a5] text-center space-y-2 animate-fade-in">
                <CheckCircle2 className="w-10 h-10 text-[#b91c1c] mx-auto" />
                <h4 className="font-serif text-lg font-bold text-[#18181b]">
                  Thank you! Message Received
                </h4>
                <p className="text-xs text-gray-600 max-w-sm mx-auto">
                  Our team in Kotabagh has received your message and will respond within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-gray-700 block mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul"
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#b91c1c]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-gray-700 block mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sharma"
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#b91c1c]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-gray-700 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#b91c1c]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-gray-700 block mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#b91c1c]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-700 block mb-1">
                    Subject / Topic *
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#b91c1c]"
                  >
                    <option>Pickle Order Inquiry</option>
                    <option>Wholesale &amp; Bulk Order (25+ Jars)</option>
                    <option>Order Tracking</option>
                    <option>Retail Store Distribution</option>
                    <option>General Question</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-700 block mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us how we can help you…"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#b91c1c]"
                  />
                </div>

                {formError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                    <span>⚠️ {formError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#b91c1c] hover:bg-[#991b1b] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message 🌶️</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Side Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#881337] text-white p-7 rounded-3xl space-y-4 shadow-sm border border-[#b91c1c]">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#fef08a]" />
                <h4 className="font-serif text-lg font-bold">Kitchen &amp; Facility Timings</h4>
              </div>
              <div className="space-y-2 text-xs divide-y divide-white/10">
                <div className="flex justify-between pt-2">
                  <span className="text-white/70">Monday – Friday</span>
                  <span className="font-bold text-[#fef08a]">9:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-white/70">Saturday</span>
                  <span className="font-bold text-[#fef08a]">9:00 AM – 4:00 PM</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-white/70">Sunday</span>
                  <span className="text-white/50">Farm Harvesting</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-white/70">WhatsApp Support</span>
                  <span className="font-bold text-[#86efac]">8:00 AM – 8:00 PM</span>
                </div>
              </div>
            </div>

            {/* Instant WhatsApp Card */}
            <div className="bg-[#fff5f5] p-7 rounded-3xl border border-[#fca5a5] shadow-sm space-y-3">
              <h4 className="font-serif text-lg font-bold text-[#18181b]">
                Instant WhatsApp Ordering
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed font-light">
                Need quick advice on pickle flavor profiles or bulk order dispatch? You can message our support directly.
              </p>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi%20Kumaon%20Herbal,%20I%20have%20a%20question.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1faa53] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open WhatsApp Chat</span>
              </a>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-200 text-xs text-gray-600 space-y-1.5 shadow-sm">
              <span className="font-bold uppercase tracking-wider text-[#b91c1c] block">
                🏔️ Authentic Himalayan Origin
              </span>
              <p className="font-light">
                Every batch is crafted and dispatched directly from our certified unit in Kotabagh, Nainital district, Uttarakhand (PIN: 263159).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GOOGLE MAP EMBED SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-md overflow-hidden p-4 sm:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#b91c1c] block mb-1">
                Our Location on Google Maps
              </span>
              <h3 className="font-serif text-2xl font-extrabold text-[#18181b]">
                Kumaon Herbal · Main Market, Awala Khot
              </h3>
              <p className="text-xs text-gray-500 font-light mt-0.5">
                Kotabagh, Dist. Nainital, Uttarakhand — 263159
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Kotabagh,Nainital,Uttarakhand+263159"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow"
            >
              <span>Open in Google Maps ↗</span>
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden border border-gray-200 h-[380px] sm:h-[450px] w-full relative">
            <iframe
              title="Kumaon Herbal Location Map"
              src="https://maps.google.com/maps?q=Kotabagh,+Nainital,+Uttarakhand+263159&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
