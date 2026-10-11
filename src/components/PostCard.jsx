import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  MoreHorizontal, 
  Smile, 
  CheckCircle2, 
  Link2, 
  Share2, 
  Volume2, 
  VolumeX 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PostCard({ post, onLikeToggle, onSaveToggle, onAddComment, onShare }) {
  const [commentText, setCommentText] = useState('');
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleDoubleTap = () => {
    setShowHeartBurst(true);
    setTimeout(() => setShowHeartBurst(false), 900);

    if (!post.isLiked) {
      onLikeToggle(post.id);
      confetti({
        particleCount: 20,
        spread: 50,
        origin: { y: 0.6 }
      });
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(post.id, commentText);
    setCommentText('');
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setToastMessage('Link copied to clipboard');
    setShowOptionsModal(false);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const displayedComments = showAllComments 
    ? post.comments 
    : post.comments.slice(-2);

  return (
    <article className="w-full max-w-[470px] mx-auto mb-6 bg-black border-b border-[#262626] pb-4 transition-all">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#262626] text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-sm animate-slide-up border border-[#3e3e3e]">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Post Header */}
      <div className="flex items-center justify-between py-2 px-1">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full ig-story-ring p-[2px] cursor-pointer">
            <div className="w-full h-full rounded-full bg-black p-[1.5px]">
              <img 
                src={post.user.avatar} 
                alt={post.user.username} 
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5 leading-tight">
              <span className="font-semibold text-[14px] hover:text-neutral-300 cursor-pointer text-white">
                {post.user.username}
              </span>
              {post.user.isVerified && (
                <CheckCircle2 className="w-3.5 h-3.5 fill-[#0095f6] text-black" />
              )}
              <span className="text-neutral-500 text-xs">• {post.timestamp.toLowerCase()}</span>
            </div>
            {post.user.location && (
              <span className="text-[11px] text-neutral-400 block leading-tight">
                {post.user.location}
              </span>
            )}
          </div>
        </div>

        <button 
          onClick={() => setShowOptionsModal(true)}
          className="text-neutral-400 hover:text-white p-1 rounded-full transition-colors"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Media Container with Double Tap Heart */}
      <div 
        onDoubleClick={handleDoubleTap}
        className="relative w-full aspect-square bg-[#121212] rounded-[4px] overflow-hidden select-none cursor-pointer border border-[#1e1e1e]"
      >
        <img 
          src={post.mediaUrl} 
          alt={post.caption}
          className="w-full h-full object-cover" 
          loading="lazy"
        />

        {/* Center Animated Heart Burst */}
        {showHeartBurst && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Heart className="w-24 h-24 fill-[#ff3040] text-[#ff3040] drop-shadow-2xl animate-like-heart" />
          </div>
        )}
      </div>

      {/* Post Action Icons */}
      <div className="flex items-center justify-between py-3 px-1 text-white">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onLikeToggle(post.id)}
            className="hover:opacity-60 transition-transform active:scale-125"
          >
            <Heart 
              className={`w-6 h-6 transition-colors ${
                post.isLiked 
                  ? 'fill-[#ff3040] text-[#ff3040]' 
                  : 'text-white stroke-[1.75]'
              }`} 
            />
          </button>

          <button 
            onClick={() => setShowAllComments(!showAllComments)}
            className="hover:opacity-60 transition-transform active:scale-110"
          >
            <MessageCircle className="w-6 h-6 stroke-[1.75]" />
          </button>

          <button 
            onClick={() => onShare && onShare(post)}
            className="hover:opacity-60 transition-transform active:scale-110"
          >
            <Send className="w-6 h-6 stroke-[1.75] -rotate-12" />
          </button>
        </div>

        <button 
          onClick={() => onSaveToggle(post.id)}
          className="hover:opacity-60 transition-transform active:scale-110"
        >
          <Bookmark 
            className={`w-6 h-6 transition-colors ${
              post.isSaved 
                ? 'fill-white text-white' 
                : 'text-white stroke-[1.75]'
            }`} 
          />
        </button>
      </div>

      {/* Likes Count */}
      <div className="px-1 text-sm font-semibold mb-1.5 text-white">
        {post.likesCount.toLocaleString()} likes
      </div>

      {/* Caption */}
      <div className="px-1 text-sm leading-relaxed mb-2 text-neutral-100">
        <span className="font-semibold mr-2 text-white">{post.user.username}</span>
        <span>{post.caption}</span>
        {post.tags && post.tags.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1 text-[#0095f6] text-[13px]">
            {post.tags.map((tag, idx) => (
              <span key={idx} className="cursor-pointer hover:underline">{tag}</span>
            ))}
          </div>
        )}
      </div>

      {/* Comments section */}
      {post.comments.length > 0 && (
        <div className="px-1 mb-2">
          {post.comments.length > 2 && (
            <button 
              onClick={() => setShowAllComments(!showAllComments)}
              className="text-neutral-500 text-sm mb-1 hover:text-neutral-400 block"
            >
              {showAllComments 
                ? 'Hide comments' 
                : `View all ${post.comments.length} comments`}
            </button>
          )}

          <div className="space-y-1">
            {displayedComments.map((comment) => (
              <div key={comment.id} className="text-sm flex items-start justify-between group">
                <div>
                  <span className="font-semibold mr-2 text-white">{comment.username}</span>
                  <span className="text-neutral-200">{comment.text}</span>
                </div>
                <button className="text-neutral-600 hover:text-[#ff3040] p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add comment input */}
      <form 
        onSubmit={handleCommentSubmit}
        className="flex items-center gap-2 border-t border-[#262626] pt-2 px-1 mt-2 text-sm"
      >
        <Smile className="w-5 h-5 text-neutral-500 cursor-pointer hover:text-neutral-300" />
        <input 
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          className="w-full bg-transparent text-white placeholder-neutral-500 text-sm focus:outline-none"
        />
        {commentText.trim() && (
          <button 
            type="submit" 
            className="text-[#0095f6] font-semibold hover:text-white transition-colors"
          >
            Post
          </button>
        )}
      </form>

      {/* Options Menu Modal */}
      {showOptionsModal && (
        <div 
          onClick={() => setShowOptionsModal(false)}
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[340px] bg-[#262626] rounded-2xl overflow-hidden divide-y divide-[#363636] text-center text-sm font-semibold animate-slide-up"
          >
            <button 
              onClick={() => {
                setShowOptionsModal(false);
                setToastMessage('Report submitted. Thank you.');
                setTimeout(() => setToastMessage(''), 2500);
              }}
              className="w-full py-3.5 text-red-500 hover:bg-[#333333] transition-colors"
            >
              Report
            </button>
            <button 
              onClick={() => {
                setShowOptionsModal(false);
                setToastMessage(`Unfollowed @${post.user.username}`);
                setTimeout(() => setToastMessage(''), 2500);
              }}
              className="w-full py-3.5 text-red-500 hover:bg-[#333333] transition-colors"
            >
              Unfollow
            </button>
            <button 
              onClick={handleCopyLink}
              className="w-full py-3.5 text-white hover:bg-[#333333] transition-colors"
            >
              Copy link
            </button>
            <button 
              onClick={() => setShowOptionsModal(false)}
              className="w-full py-3.5 text-neutral-400 font-normal hover:bg-[#333333] transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
