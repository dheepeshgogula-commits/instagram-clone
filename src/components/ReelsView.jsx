import React, { useState, useRef, useEffect } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Music2, 
  ChevronUp, 
  ChevronDown,
  CheckCircle2,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ReelsView({ reels, onShare }) {
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [reelsState, setReelsState] = useState(reels);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [reelComments, setReelComments] = useState({});
  const videoRef = useRef(null);

  const activeReel = reelsState[currentReelIndex] || reelsState[0];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => setIsPlaying(false));
      setIsPlaying(true);
    }
  }, [currentReelIndex]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleLike = (reelId) => {
    setReelsState((prev) =>
      prev.map((r) => {
        if (r.id === reelId) {
          const nextLiked = !r.isLiked;
          if (nextLiked) {
            confetti({
              particleCount: 20,
              spread: 60,
              origin: { y: 0.7, x: 0.6 }
            });
          }
          return {
            ...r,
            isLiked: nextLiked,
            likesCount: nextLiked ? r.likesCount + 1 : r.likesCount - 1
          };
        }
        return r;
      })
    );
  };

  const handleNextReel = () => {
    if (currentReelIndex < reelsState.length - 1) {
      setCurrentReelIndex((prev) => prev + 1);
    }
  };

  const handlePrevReel = () => {
    if (currentReelIndex > 0) {
      setCurrentReelIndex((prev) => prev - 1);
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setReelComments((prev) => ({
      ...prev,
      [activeReel.id]: [
        ...(prev[activeReel.id] || []),
        { id: Date.now(), username: 'dheeraj_dev', text: commentText, timestamp: 'Just now' }
      ]
    }));
    setCommentText('');
  };

  const currentComments = reelComments[activeReel.id] || [
    { id: '1', username: 'sarah_travels', text: 'This looks beyond incredible! 🔥', timestamp: '2h ago' },
    { id: '2', username: 'alex_frontend', text: 'The audio sync is so satisfying 🙌', timestamp: '1h ago' }
  ];

  return (
    <div className="w-full flex justify-center py-4 px-2 min-h-[calc(100vh-60px)]">
      <div className="relative flex items-center justify-center gap-4">
        {/* Main Reel Card (9:16 vertical) */}
        <div className="relative w-[340px] md:w-[380px] h-[75vh] max-h-[720px] bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl border border-[#262626] group">
          {/* Video Player */}
          <video
            ref={videoRef}
            src={activeReel.videoUrl}
            poster={activeReel.posterUrl}
            loop
            playsInline
            muted={isMuted}
            onClick={togglePlay}
            className="w-full h-full object-cover cursor-pointer"
          />

          {/* Play/Pause state indicator overlay */}
          {!isPlaying && (
            <div 
              onClick={togglePlay}
              className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer z-10"
            >
              <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white">
                <Play className="w-8 h-8 fill-white ml-1" />
              </div>
            </div>
          )}

          {/* Sound Toggle Button (Top Right) */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Gradient Overlay for bottom text readability */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10" />

          {/* Creator & Caption Details (Bottom Left) */}
          <div className="absolute bottom-4 left-4 right-16 z-20 text-white space-y-2 pointer-events-auto">
            {/* Creator Row */}
            <div className="flex items-center gap-2.5">
              <img 
                src={activeReel.creator.avatar} 
                alt={activeReel.creator.username} 
                className="w-9 h-9 rounded-full object-cover ring-2 ring-white/60"
              />
              <span className="font-semibold text-sm drop-shadow">{activeReel.creator.username}</span>
              {activeReel.creator.isVerified && (
                <CheckCircle2 className="w-3.5 h-3.5 fill-[#0095f6] text-black" />
              )}
              <button className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-white/40 hover:border-white transition-colors">
                Follow
              </button>
            </div>

            {/* Caption */}
            <p className="text-sm font-normal text-neutral-100 line-clamp-2 leading-snug drop-shadow-sm">
              {activeReel.caption}
            </p>

            {/* Audio Ticker */}
            <div className="flex items-center gap-2 text-xs text-white/90">
              <Music2 className="w-3.5 h-3.5" />
              <span className="truncate max-w-[200px]">{activeReel.audioTitle}</span>
            </div>
          </div>
        </div>

        {/* Right-Side Action Icons */}
        <div className="flex flex-col items-center gap-5 text-white">
          {/* Like */}
          <button 
            onClick={() => toggleLike(activeReel.id)}
            className="flex flex-col items-center gap-1 group active:scale-125 transition-transform"
          >
            <div className={`w-11 h-11 rounded-full flex items-center justify-center bg-[#1e1e1e] group-hover:bg-[#2c2c2c] transition-colors ${activeReel.isLiked ? 'text-[#ff3040]' : 'text-white'}`}>
              <Heart className={`w-6 h-6 ${activeReel.isLiked ? 'fill-[#ff3040]' : ''}`} />
            </div>
            <span className="text-xs font-medium text-neutral-300">
              {activeReel.likesCount.toLocaleString()}
            </span>
          </button>

          {/* Comments */}
          <button 
            onClick={() => setShowCommentsModal(true)}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="w-11 h-11 rounded-full flex items-center justify-center bg-[#1e1e1e] group-hover:bg-[#2c2c2c] transition-colors">
              <MessageCircle className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium text-neutral-300">
              {activeReel.commentsCount.toLocaleString()}
            </span>
          </button>

          {/* Share */}
          <button 
            onClick={() => onShare && onShare(activeReel)}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="w-11 h-11 rounded-full flex items-center justify-center bg-[#1e1e1e] group-hover:bg-[#2c2c2c] transition-colors">
              <Send className="w-6 h-6 -rotate-12" />
            </div>
            <span className="text-xs font-medium text-neutral-300">Share</span>
          </button>

          {/* Bookmark */}
          <button className="flex flex-col items-center gap-1 group">
            <div className="w-11 h-11 rounded-full flex items-center justify-center bg-[#1e1e1e] group-hover:bg-[#2c2c2c] transition-colors">
              <Bookmark className="w-6 h-6" />
            </div>
          </button>

          {/* Rotating Audio Disc */}
          <div className="w-9 h-9 rounded-full border-2 border-white/60 overflow-hidden animate-spin shadow-lg mt-2">
            <img 
              src={activeReel.creator.avatar} 
              alt="Song cover" 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Up & Down Reel navigation buttons */}
          <div className="flex flex-col gap-2 mt-4">
            <button 
              disabled={currentReelIndex === 0}
              onClick={handlePrevReel}
              className="w-9 h-9 rounded-full bg-[#1e1e1e] hover:bg-[#333333] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-colors"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
            <button 
              disabled={currentReelIndex === reelsState.length - 1}
              onClick={handleNextReel}
              className="w-9 h-9 rounded-full bg-[#1e1e1e] hover:bg-[#333333] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-colors"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Reel Comments Drawer Modal */}
      {showCommentsModal && (
        <div 
          onClick={() => setShowCommentsModal(false)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-4 animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full md:max-w-md bg-[#262626] rounded-t-3xl md:rounded-2xl border border-[#363636] p-4 max-h-[70vh] flex flex-col animate-slide-up"
          >
            <div className="flex items-center justify-between border-b border-[#363636] pb-3 mb-3 text-white">
              <h4 className="font-semibold text-sm">Comments</h4>
              <button onClick={() => setShowCommentsModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1 min-h-[200px]">
              {currentComments.map((c) => (
                <div key={c.id} className="flex items-start gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-[#363636] flex items-center justify-center font-bold text-xs uppercase text-white">
                    {c.username[0]}
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-white mr-2">{c.username}</span>
                    <span className="text-neutral-300">{c.text}</span>
                    <span className="block text-[11px] text-neutral-500 mt-1">{c.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddComment} className="border-t border-[#363636] pt-3 flex gap-2 mt-2">
              <input 
                type="text" 
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment on this reel..."
                className="flex-1 bg-[#1a1a1a] border border-[#363636] rounded-xl px-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none"
              />
              <button type="submit" className="px-4 py-2 bg-[#0095f6] text-white text-sm font-semibold rounded-xl">
                Post
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
