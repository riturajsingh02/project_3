import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/blogs';
import { BlogPost } from '../types';
import { Calendar, User, Clock, ArrowLeft, ArrowRight } from 'lucide-react';

interface BlogPageProps {
  initialSlug?: string | null;
}

export const BlogPage: React.FC<BlogPageProps> = ({ initialSlug }) => {
  const [selectedFilter, setSelectedFilter] = useState('All Posts');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(
    initialSlug ? BLOG_POSTS.find((b) => b.slug === initialSlug) || null : null
  );

  const filters = [
    'All Posts',
    '🌶️ Pickles & Tradition',
    '🍹 Mountain Juices',
    '💚 Wellness & Amla',
    '🏔️ Kumaon Stories',
  ];

  const filteredPosts =
    selectedFilter === 'All Posts'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) =>
          post.category.toLowerCase().includes(
            selectedFilter.replace(/[^a-zA-Z\s]/g, '').trim().toLowerCase()
          )
        );

  const featuredPost = BLOG_POSTS[0];

  // If viewing a full article
  if (activeArticle) {
    return (
      <div className="pt-6 sm:pt-8 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in bg-white text-[#18181b]">
        <button
          onClick={() => setActiveArticle(null)}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#b91c1c] hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </button>

        <div className="space-y-6">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-[#b91c1c] bg-[#fff5f5] px-3 py-1 rounded-full border border-[#fca5a5] w-fit">
              {activeArticle.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#18181b] leading-tight">
              {activeArticle.title}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 font-light">
              {activeArticle.fullContent?.subheading || activeArticle.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-3 pb-6 border-b border-gray-200">
              <span className="flex items-center gap-1.5 font-bold text-gray-900">
                <User className="w-3.5 h-3.5 text-[#b91c1c]" />
                {activeArticle.author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                {activeArticle.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                {activeArticle.readTime}
              </span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-md w-full bg-[#faf4ec] border border-gray-200 flex items-center justify-center p-2">
            <img
              src={activeArticle.image}
              alt={activeArticle.title}
              className="w-full max-h-[500px] object-contain"
            />
          </div>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none text-gray-800 space-y-6 pt-4 text-sm sm:text-base leading-relaxed">
            {activeArticle.fullContent?.lead && (
              <p className="text-base sm:text-lg font-light text-gray-900 border-l-4 border-[#b91c1c] pl-4 py-1 italic bg-[#fff5f5]">
                {activeArticle.fullContent.lead}
              </p>
            )}

            {activeArticle.fullContent?.sections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                {section.heading && (
                  <h2 className="font-serif text-2xl font-bold text-[#18181b] pt-3">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className="text-gray-700 leading-relaxed font-light">
                    {para}
                  </p>
                ))}
                {section.quote && (
                  <blockquote className="my-6 p-6 rounded-xl bg-[#fff5f5] border-l-4 border-[#b91c1c] text-[#881337] font-serif text-base sm:text-lg italic">
                    "{section.quote}"
                  </blockquote>
                )}
              </div>
            ))}
          </div>

          <div className="pt-10 border-t border-gray-200 flex items-center justify-between">
            <button
              onClick={() => setActiveArticle(null)}
              className="inline-flex items-center gap-2 bg-[#b91c1c] hover:bg-[#991b1b] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Journal</span>
            </button>
            <div className="text-xs text-gray-400">
              🌶️ Kumaon Herbal · Food On Farm Stories
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-0 pb-20 bg-white text-[#18181b]">
      {/* HERO BANNER WITH JOURNAL_BG */}
      <section className="relative w-full bg-[#3d2719] border-b border-[#4d3221] overflow-hidden">
        {/* Hidden accessible headings for SEO / screen readers */}
        <div className="sr-only">
          <h1>Tradition, Recipes &amp; Stories - The Kumaon Herbal Journal</h1>
          <p>
            Generational pickle techniques, cold-pressed recipe guides, herb folklore, and stories from our Kotabagh kitchen.
          </p>
        </div>

        {/* Full-width edge-to-edge banner graphic */}
        <div className="w-full">
          <img
            src="/journal_bg01.jpeg"
            alt="Tradition, Recipes & Stories - The Kumaon Herbal Journal. Generational pickle techniques, cold-pressed recipe guides, herb folklore, and stories from our Kotabagh kitchen."
            className="w-full h-auto block select-none pointer-events-none"
            loading="eager"
            decoding="async"
          />
        </div>
      </section>

      {/* FILTER BAR */}
      <div className="py-6 px-4 max-w-7xl mx-auto flex items-center justify-center flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setSelectedFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
              selectedFilter === f
                ? 'bg-[#b91c1c] text-white shadow'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-[#b91c1c]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* FEATURED POST */}
        {selectedFilter === 'All Posts' && (
          <div
            onClick={() => setActiveArticle(featuredPost)}
            className="group grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden bg-white border border-gray-200 hover:border-[#b91c1c] shadow-sm hover:shadow-xl transition-all cursor-pointer"
          >
            <div className="lg:col-span-7 relative h-72 sm:h-88 overflow-hidden bg-gray-50">
              <span className="absolute top-4 left-4 z-10 bg-[#b91c1c] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded shadow">
                Featured Story
              </span>
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="lg:col-span-5 p-7 sm:p-9 flex flex-col justify-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#b91c1c]">
                {featuredPost.category}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#18181b] group-hover:text-[#b91c1c] transition-colors leading-tight">
                {featuredPost.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed font-light">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center gap-3 text-xs text-gray-400 pt-2 border-t border-gray-100">
                <span>🗓 {featuredPost.date}</span>
                <span>•</span>
                <span>✍️ {featuredPost.author}</span>
                <span>•</span>
                <span>📖 {featuredPost.readTime}</span>
              </div>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#b91c1c] group-hover:translate-x-1 transition-transform">
                  Read Full Story <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ARTICLES GRID */}
        <div>
          <h3 className="font-serif text-2xl font-extrabold text-[#18181b] mb-6">
            Latest Farm Articles &amp; Guides
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => setActiveArticle(post)}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#b91c1c] shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 overflow-hidden bg-gray-50">
                    <span className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm text-[#b91c1c] text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded shadow">
                      {post.category}
                    </span>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  <div className="p-5 space-y-1.5">
                    <div className="text-[11px] text-gray-400 flex items-center gap-2">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h4 className="font-serif text-lg font-bold text-[#18181b] group-hover:text-[#b91c1c] transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed font-light">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 mt-2">
                  <span className="font-bold text-gray-800">✍️ {post.author}</span>
                  <span className="font-bold text-[#b91c1c] group-hover:translate-x-1 transition-transform">
                    Read Article →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
