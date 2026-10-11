import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  Smile, 
  MoreHorizontal, 
  CheckCircle2 
} from 'lucide-react';

export default function PostDetailModal({ post, onClose, onLikeToggle, onAddComment }) {
  const [commentText, setCommentText] = useState('');

  if (!post) return null;

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(post.id, commentText);
    setCommentText('');
  };

  const comments = post.comments || [
    { id: 'c1', username: 'alex_frontend', text: 'This looks stunning!', timestamp: '2h ago' },
    { id: 'c2', username: 'sarah_travels', text: 'Loved the composition and lighting ✨', timestamp: '1h ago' }
  ];

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
    >
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
      >
        <X className="w-7 h-7" />
      </button>

      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[900px] h-[85vh] max-h-[720px] bg-black border border-[#262626] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-slide-up"
      >
        {/* Media Container (Left) */}
        <div className="w-full md:w-3/5 bg-neutral-950 flex items-center justify-center overflow-hidden">
          <img 
            src={post.mediaUrl} 
            alt={post.caption || 'Post image'} 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Details & Comments (Right) */}
        <div className="w-full md:w-2/5 flex flex-col bg-black border-t md:border-t-0 md:border-l border-[#262626]">
          {/* Header */}
          <div className="p-3.5 border-b border-[#262626] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src={post.user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'} 
                alt={post.user?.username || 'user'} 
                className="w-8 h-8 rounded-full object-cover" 
              />
              <span className="font-semibold text-sm text-white">
                {post.user?.username || 'instagram_user'}
              </span>
            </div>
            <button className="text-neutral-400 hover:text-white">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Comments Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Caption */}
            {post.caption && (
              <div className="flex items-start gap-3 text-sm">
                <img 
                  src={post.user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'} 
                  alt="" 
                  className="w-7 h-7 rounded-full object-cover mt-0.5" 
                />
                <div className="flex-1">
                  <span className="font-semibold text-white mr-2">
                    {post.user?.username || 'instagram_user'}
                  </span>
                  <span className="text-neutral-200">{post.caption}</span>
                  <span className="block text-[11px] text-neutral-500 mt-1">
                    {post.timestamp || '2h ago'}
                  </span>
                </div>
              </div>
            )}

            {/* Comment List */}
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-3 text-sm">
                <div className="w-7 h-7 rounded-full bg-[#262626] flex items-center justify-center font-bold text-xs uppercase text-white mt-0.5">
                  {comment.username?.[0] || 'U'}
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-white mr-2">{comment.username}</span>
                  <span className="text-neutral-200">{comment.text}</span>
                  <span className="block text-[11px] text-neutral-500 mt-1">
                    {comment.timestamp || '1h ago'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="p-3 border-t border-[#262626] space-y-2">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-4">
                <button onClick={() => onLikeToggle && onLikeToggle(post.id)}>
                  <Heart className={`w-6 h-6 ${post.isLiked ? 'fill-[#ff3040] text-[#ff3040]' : ''}`} />
                </button>
                <button>
                  <MessageCircle className="w-6 h-6" />
                </button>
                <button>
                  <Send className="w-6 h-6 -rotate-12" />
                </button>
              </div>
              <button>
                <Bookmark className="w-6 h-6" />
              </button>
            </div>

            <span className="font-semibold text-sm text-white block">
              {(post.likesCount || post.likes || 120).toLocaleString()} likes
            </span>
          </div>

          {/* Add Comment Input */}
          <form 
            onSubmit={handleCommentSubmit}
            className="p-3 border-t border-[#262626] flex items-center gap-2"
          >
            <Smile className="w-5 h-5 text-neutral-400 cursor-pointer hover:text-white" />
            <input 
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="w-full bg-transparent text-white placeholder-neutral-500 text-sm focus:outline-none"
            />
            {commentText.trim() && (
              <button type="submit" className="text-[#0095f6] font-semibold text-sm hover:text-white">
                Post
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
