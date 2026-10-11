import React, { useState } from 'react';
import { Heart, MessageCircle, Search, Sparkles } from 'lucide-react';
import { explorePosts } from '../data/mockData';

const categories = ['For you', 'Architecture', 'Coding', 'Photography', 'Travel', 'Art', 'Nature', 'UI Design'];

export default function ExploreView({ onSelectPost }) {
  const [activeCategory, setActiveCategory] = useState('For you');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = explorePosts.filter(() => {
    return true;
  });

  return (
    <div className="w-full max-w-[940px] mx-auto py-4 px-2 md:px-4">
      {/* Search Header for Explore */}
      <div className="mb-6 flex flex-col gap-3">
        <div className="relative w-full max-w-md mx-auto">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search explore photos, reels, tags..."
            className="w-full bg-[#1e1e1e] border border-[#2e2e2e] rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat 
                  ? 'bg-white text-black shadow-md' 
                  : 'bg-[#1e1e1e] text-neutral-300 hover:bg-[#2c2c2c]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Explore Grid */}
      <div className="grid grid-cols-3 gap-1 md:gap-4">
        {filteredPosts.map((post, idx) => {
          const isLarge = post.isBig && (idx % 6 === 0 || idx % 6 === 4);

          return (
            <div
              key={post.id}
              onClick={() => onSelectPost(post)}
              className={`group relative overflow-hidden bg-neutral-900 cursor-pointer rounded-[2px] md:rounded-lg ${
                isLarge ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'
              }`}
            >
              <img 
                src={post.mediaUrl} 
                alt="Explore item"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />

              {/* Hover Stats Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-6 text-white font-bold text-sm">
                <div className="flex items-center gap-1.5">
                  <Heart className="w-5 h-5 fill-white" />
                  <span>{post.likes.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>{post.comments.toLocaleString()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
