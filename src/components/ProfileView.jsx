import React, { useState } from 'react';
import { 
  Grid, 
  Bookmark, 
  Tag, 
  Settings, 
  CheckCircle2, 
  Heart, 
  MessageCircle, 
  Link as LinkIcon, 
  Plus, 
  Share2 
} from 'lucide-react';

const highlights = [
  { id: 'h1', title: 'Code ⚡', cover: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=200&q=80' },
  { id: 'h2', title: 'Travel ✈️', cover: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=200&q=80' },
  { id: 'h3', title: 'Vibes ☕', cover: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=200&q=80' },
  { id: 'h4', title: 'Setups 🖥️', cover: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=200&q=80' },
];

export default function ProfileView({ 
  currentUser, 
  userPosts, 
  savedPosts, 
  onEditProfile, 
  onSelectPost 
}) {
  const [activeTab, setActiveTab] = useState('posts'); // 'posts' | 'saved' | 'tagged'
  const [toastMessage, setToastMessage] = useState('');

  const handleShareProfile = () => {
    navigator.clipboard?.writeText(window.location.href);
    setToastMessage('Profile link copied to clipboard!');
    setTimeout(() => setToastMessage(''), 2500);
  };

  const currentDisplayPosts = activeTab === 'saved' ? savedPosts : userPosts;

  return (
    <div className="w-full max-w-[935px] mx-auto py-6 px-4 text-white">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#262626] text-white px-4 py-2.5 rounded-xl shadow-xl border border-[#3e3e3e] text-sm animate-slide-up">
          {toastMessage}
        </div>
      )}

      {/* Profile Header */}
      <header className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10 pb-8 border-b border-[#262626]">
        {/* Avatar with Story gradient */}
        <div className="flex-shrink-0 cursor-pointer group">
          <div className="w-24 h-24 md:w-38 md:h-38 rounded-full ig-story-ring p-[3px]">
            <div className="w-full h-full rounded-full bg-black p-[3px]">
              <img 
                src={currentUser.avatar} 
                alt={currentUser.username} 
                className="w-full h-full rounded-full object-cover group-hover:opacity-95 transition-opacity" 
              />
            </div>
          </div>
        </div>

        {/* Profile Info Details */}
        <div className="flex-1 space-y-4 text-center md:text-left">
          {/* Username & Action Buttons */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <div className="flex items-center gap-1.5">
              <h2 className="text-xl font-normal text-white">{currentUser.username}</h2>
              {currentUser.isVerified && (
                <CheckCircle2 className="w-4 h-4 fill-[#0095f6] text-black" />
              )}
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={onEditProfile}
                className="px-4 py-1.5 bg-[#262626] hover:bg-[#333333] text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Edit profile
              </button>

              <button 
                onClick={handleShareProfile}
                className="px-4 py-1.5 bg-[#262626] hover:bg-[#333333] text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share profile</span>
              </button>

              <button className="p-1.5 text-neutral-300 hover:text-white">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex justify-center md:justify-start gap-8 text-sm">
            <div>
              <span className="font-bold text-white mr-1">{userPosts.length}</span>
              <span className="text-neutral-400">posts</span>
            </div>
            <div>
              <span className="font-bold text-white mr-1">{currentUser.followers.toLocaleString()}</span>
              <span className="text-neutral-400">followers</span>
            </div>
            <div>
              <span className="font-bold text-white mr-1">{currentUser.following.toLocaleString()}</span>
              <span className="text-neutral-400">following</span>
            </div>
          </div>

          {/* Bio & Link */}
          <div className="text-sm leading-relaxed text-neutral-200">
            <span className="font-bold block text-white">{currentUser.fullName}</span>
            <p className="whitespace-pre-line text-neutral-300">{currentUser.bio}</p>
            {currentUser.website && (
              <a 
                href={currentUser.website} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1 text-[#e0f1ff] font-semibold text-xs mt-1 hover:underline justify-center md:justify-start"
              >
                <LinkIcon className="w-3.5 h-3.5" />
                <span>{currentUser.website.replace('https://', '')}</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Story Highlights */}
      <div className="mb-10 flex items-center gap-6 overflow-x-auto no-scrollbar pb-2">
        {highlights.map((h) => (
          <div key={h.id} className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer group">
            <div className="w-16 h-16 rounded-full border border-[#333333] p-[2px] group-hover:border-neutral-400 transition-colors">
              <img 
                src={h.cover} 
                alt={h.title} 
                className="w-full h-full rounded-full object-cover" 
              />
            </div>
            <span className="text-xs text-neutral-300 font-medium">{h.title}</span>
          </div>
        ))}

        <div className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer group">
          <div className="w-16 h-16 rounded-full border border-[#333333] flex items-center justify-center bg-[#121212] group-hover:border-neutral-400 transition-colors">
            <Plus className="w-6 h-6 text-neutral-400" />
          </div>
          <span className="text-xs text-neutral-400 font-medium">New</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center border-t border-[#262626]">
        <button
          onClick={() => setActiveTab('posts')}
          className={`flex items-center gap-2 py-3 px-6 text-xs uppercase tracking-widest font-semibold border-t ${
            activeTab === 'posts' 
              ? 'border-white text-white' 
              : 'border-transparent text-neutral-500 hover:text-neutral-300'
          }`}
        >
          <Grid className="w-4 h-4" />
          <span>Posts</span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`flex items-center gap-2 py-3 px-6 text-xs uppercase tracking-widest font-semibold border-t ${
            activeTab === 'saved' 
              ? 'border-white text-white' 
              : 'border-transparent text-neutral-500 hover:text-neutral-300'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved</span>
        </button>

        <button
          onClick={() => setActiveTab('tagged')}
          className={`flex items-center gap-2 py-3 px-6 text-xs uppercase tracking-widest font-semibold border-t ${
            activeTab === 'tagged' 
              ? 'border-white text-white' 
              : 'border-transparent text-neutral-500 hover:text-neutral-300'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>Tagged</span>
        </button>
      </div>

      {/* Posts Grid */}
      {currentDisplayPosts.length > 0 ? (
        <div className="grid grid-cols-3 gap-1 md:gap-4 mt-4">
          {currentDisplayPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => onSelectPost(post)}
              className="group relative aspect-square bg-[#121212] overflow-hidden cursor-pointer rounded-[2px]"
            >
              <img 
                src={post.mediaUrl} 
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
              />

              {/* Hover Stats */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white font-bold text-sm">
                <div className="flex items-center gap-1.5">
                  <Heart className="w-5 h-5 fill-white" />
                  <span>{post.likesCount?.toLocaleString() || 0}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>{post.comments?.length || 0}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-neutral-500 text-sm">
          No posts yet in this tab
        </div>
      )}
    </div>
  );
}
