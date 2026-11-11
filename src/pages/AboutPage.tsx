import React from 'react';
import { ArrowRight, Leaf, Users, Award, Shield, Heart } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-0 pb-20 bg-white text-[#18181b]">
      {/* HERO BANNER WITH STORY_BG */}
      <section className="relative w-full bg-[#faefe1] border-b border-[#ebdccd] overflow-hidden">
        {/* Hidden accessible headings for SEO / screen readers */}
        <div className="sr-only">
          <h1>Our Farm Roots &amp; Heritage - The Story Behind Every Pickle Jar</h1>
          <p>
            Preserving traditional Himalayan culinary traditions, empowering mountain women, and delivering chemical-free taste to homes across India.
          </p>
        </div>

        {/* Full-width edge-to-edge banner graphic */}
        <div className="w-full">
          <img
            src="/story_bg.jpeg"
            alt="Our Farm Roots & Heritage - The Story Behind Every Pickle Jar. Preserving traditional Himalayan culinary traditions, empowering mountain women, and delivering chemical-free taste to homes across India."
            className="w-full h-auto block select-none pointer-events-none"
            loading="eager"
            decoding="async"
          />
        </div>
      </section>

      {/* STORY & HERITAGE */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-sm font-bold uppercase tracking-[0.25em] text-[#b91c1c] block">
              Generational Food Tradition
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#18181b] leading-tight">
              Preserving Tradition, <span className="text-[#b91c1c] italic font-normal">One Jar at a Time</span>
            </h2>
            <div className="w-20 h-1.5 bg-[#b91c1c] rounded-full" />
            <p className="text-base sm:text-lg text-gray-800 leading-relaxed font-light">
              We started as a family venture in the hills of Nainital, collecting herbs and fruits the way our grandmothers did — by hand, in season, with immense care. Today, under <strong>M/S Phoenix Food Processing</strong> in Kotabagh, we collaborate with over 200 local farmers and forest foragers.
            </p>
            <p className="text-base sm:text-lg text-gray-800 leading-relaxed font-light">
              Inside our modern processing facility in Kotabagh, fresh produce is sorted, sun-cured, and slowly fermented without synthetic vinegar. Most proudly, we employ <strong>16+ local residents</strong>, including <strong>11 village women</strong> from nearby mountain communities, offering them dignified, sustainable financial independence.
            </p>
            <p className="text-base sm:text-lg text-gray-800 leading-relaxed font-light">
              Kumaon Herbal isn’t merely a food brand; it is a bridge connecting the ancient culinary wisdom of the hills with families seeking clean, chemical-free homemade taste.
            </p>
          </div>

          {/* Photo stack (Swapped left image with right bottom image per user request) */}
          <div className="space-y-4">
            <div className="rounded-3xl overflow-hidden shadow-xl border-2 border-[#b91c1c]/20 h-[420px] sm:h-[500px] bg-[#faf4ec]">
              <img
                src="/assets/himalayan/WhatsApp_Image_2026-03-16_at_8.49.40_PM_ec8d2f9f.jpeg"
                alt="Kotabagh manufacturing unit"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden shadow border border-gray-200 h-36">
                <img
                  src="/assets/himalayan/WhatsApp_Image_2026-03-16_at_8.49.42_PM__1__061d284e.jpeg"
                  alt="Inside processing factory unit"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow border border-gray-200 h-36">
                <img
                  src="/assets/himalayan/WhatsApp_Image_2026-03-16_at_8.49.52_PM_84564277.jpeg"
                  alt="Founders enjoying mountain juice"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAND (Food on Farm Deep Red Strip) */}
      <section className="bg-[#881337] py-12 text-white border-y border-[#b91c1c]">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="font-serif text-3xl sm:text-4xl font-extrabold text-[#fef08a]">200+</div>
            <div className="text-xs uppercase tracking-wider text-white/80 mt-1 font-bold">
              Local Hill Farmers
            </div>
          </div>
          <div>
            <div className="font-serif text-3xl sm:text-4xl font-extrabold text-[#fef08a]">16+</div>
            <div className="text-xs uppercase tracking-wider text-white/80 mt-1 font-bold">
              Local Women Artisans
            </div>
          </div>
          <div>
            <div className="font-serif text-3xl sm:text-4xl font-extrabold text-[#fef08a]">25k+</div>
            <div className="text-xs uppercase tracking-wider text-white/80 mt-1 font-bold">
              Happy Indian Families
            </div>
          </div>
          <div>
            <div className="font-serif text-3xl sm:text-4xl font-extrabold text-[#fef08a]">100%</div>
            <div className="text-xs uppercase tracking-wider text-white/80 mt-1 font-bold">
              Zero Chemical Additives
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES & FACILITY (Luxury Editorial Design) */}
      <section className="py-20 bg-gradient-to-b from-white via-[#fffaf5] to-white border-y border-amber-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.25em] text-[#b91c1c] bg-rose-50 border border-rose-200/60 shadow-2xs">
              Why Choose Us
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#18181b] tracking-tight">
              The Values Behind <span className="text-[#b91c1c] italic font-normal">Our Kitchen</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#b91c1c] to-transparent mx-auto rounded-full" />
            <p className="text-sm sm:text-base text-gray-600 font-light max-w-lg mx-auto">
              Rooted in the pristine valleys of Nainital, every jar embodies our unwavering commitment to heritage, purity, and community empowerment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: 3 Core Value Cards */}
            <div className="lg:col-span-7 space-y-5">
              <div className="bg-white p-7 rounded-3xl border border-gray-200/80 shadow-sm hover:shadow-md hover:border-[#b91c1c]/30 transition-all flex items-start gap-5 group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-50 to-amber-50 border border-rose-100 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                  ⛰️
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-serif text-xl font-bold text-[#18181b]">Direct Farm Sourcing</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                    We work directly with small-scale terrace farmers in Kotabagh and Almora. No middlemen means fair, guaranteed prices for farming families and genuine mountain freshness for your table.
                  </p>
                </div>
              </div>

              <div className="bg-white p-7 rounded-3xl border border-gray-200/80 shadow-sm hover:shadow-md hover:border-[#b91c1c]/30 transition-all flex items-start gap-5 group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-50 to-amber-50 border border-rose-100 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                  ☀️
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-serif text-xl font-bold text-[#18181b]">Naturally Sun Cured</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                    Zero artificial colors, synthetic flavors, or chemical preservatives. We preserve the harvest using time-tested Himalayan techniques like sun-drying, stone-crushing, and natural cold fermentation.
                  </p>
                </div>
              </div>

              <div className="bg-white p-7 rounded-3xl border border-gray-200/80 shadow-sm hover:shadow-md hover:border-[#b91c1c]/30 transition-all flex items-start gap-5 group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-50 to-amber-50 border border-rose-100 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                  🛡️
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-serif text-xl font-bold text-[#18181b]">FSSAI Certified Quality</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                    All batches are rigorously tested and packed with strict food-grade compliance at our Kotabagh facility by Phoenix Food Processing. Ensuring absolute safety, hygiene, and purity.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Uncropped km.jpeg Facility Showcase */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full bg-white p-4 sm:p-5 rounded-[2rem] border border-amber-200/80 shadow-2xl shadow-rose-950/10 space-y-4 group">
                {/* Floating Badge */}
                <div className="absolute -top-3.5 right-6 bg-[#881337] text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md border border-rose-700">
                  Kotabagh Unit
                </div>

                <div className="w-full rounded-2xl overflow-hidden bg-[#faf4ec] flex items-center justify-center p-2 border border-amber-100">
                  <img
                    src="/km.jpeg"
                    alt="Kumaon Herbal Processing Unit - Kotabagh, Nainital"
                    className="w-full h-auto object-contain max-h-[500px] rounded-xl select-none group-hover:scale-[1.01] transition-transform duration-500"
                  />
                </div>

                <div className="text-center pb-2 px-2 space-y-1">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#b91c1c] font-extrabold block">
                    Our Processing Facility · Kotabagh
                  </span>
                  <p className="text-xs text-gray-500 font-light">
                    M/S Phoenix Food Processing · Nainital, Uttarakhand
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 text-center px-4 max-w-3xl mx-auto space-y-3">
        <h2 className="font-serif text-3xl font-extrabold text-[#18181b]">
          Taste the Authentic <span className="text-[#b91c1c] italic">Himalayan Difference</span>
        </h2>
        <p className="text-xs text-gray-600 font-light">
          Experience wild-harvested mountain pickles &amp; juices delivered straight from our facility in Kotabagh.
        </p>
        <div className="pt-2">
          <button
            onClick={() => onNavigate('products')}
            className="bg-[#b91c1c] hover:bg-[#991b1b] text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow"
          >
            Explore Our Pickles →
          </button>
        </div>
      </section>
    </div>
  );
};
