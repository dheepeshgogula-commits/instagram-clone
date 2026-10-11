import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, Send, Pause, Play } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function StoryModal({ stories, initialStoryIndex, onClose, onSendReply }) {
  const [currentStoryIdx, setCurrentStoryIdx] = useState(initialStoryIndex || 0);
  const [currentItemIdx, setCurrentItemIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [liked, setLiked] = useState(false);

  const currentStory = stories[currentStoryIdx];
  const items = currentStory?.items || [];
  const currentItem = items[currentItemIdx] || items[0];

  // Story auto-progress timer (5 seconds = 5000ms, tick every 50ms)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNextItem();
          return 0;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [currentStoryIdx, currentItemIdx, isPaused]);

  // Reset progress when item changes
  useEffect(() => {
    setProgress(0);
    setLiked(false);
  }, [currentStoryIdx, currentItemIdx]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNextItem();
      if (e.key === 'ArrowLeft') handlePrevItem();
      if (e.key === ' ') setIsPaused((p) => !p);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStoryIdx, currentItemIdx]);

  const handleNextItem = () => {
    if (currentItemIdx < items.length - 1) {
      setCurrentItemIdx((prev) => prev + 1);
      setProgress(0);
    } else {
      // Go to next story user
      if (currentStoryIdx < stories.length - 1) {
        setCurrentStoryIdx((prev) => prev + 1);
        setCurrentItemIdx(0);
        setProgress(0);
      } else {
        onClose();
      }
    }
  };

  const handlePrevItem = () => {
    if (currentItemIdx > 0) {
      setCurrentItemIdx((prev) => prev - 1);
      setProgress(0);
    } else {
      if (currentStoryIdx > 0) {
        setCurrentStoryIdx((prev) => prev - 1);
        const prevStoryItems = stories[currentStoryIdx - 1]?.items || [];
        setCurrentItemIdx(Math.max(0, prevStoryItems.length - 1));
        setProgress(0);
      }
    }
  };

  const handleLikeStory = () => {
    setLiked(!liked);
    if (!liked) {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.85, x: 0.7 }
      });
    }
  };

  const handleSubmitReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    onSendReply && onSendReply(currentStory.username, replyText);
    setReplyText('');
  };

  if (!currentStory) return null;

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-md flex items-center justify-center select-none animate-fade-in">
      {/* Top Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 z-50 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
      >
        <X className="w-7 h-7" />
      </button>

      {/* Main Story Container (9:16 aspect ratio) */}
      <div 
        className="relative w-full max-w-[420px] h-[85vh] max-h-[780px] bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Story Background Image */}
        <img 
          src={currentItem?.mediaUrl} 
          alt="Story content" 
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient Top & Bottom Overlays for readability */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 via-black/30 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

        {/* Header Elements */}
        <div className="relative z-20 px-4 pt-3 flex flex-col gap-2.5">
          {/* Progress Bars */}
          <div className="flex items-center gap-1.5 w-full">
            {items.map((_, i) => {
              let fillPercent = 0;
              if (i < currentItemIdx) fillPercent = 100;
              else if (i === currentItemIdx) fillPercent = progress;

              return (
                <div key={i} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white transition-all duration-75"
                    style={{ width: `${fillPercent}%` }}
                  />
                </div>
              );
            })}
          </div>

          {/* User Info & Time */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2.5">
              <img 
                src={currentStory.avatar} 
                alt={currentStory.username} 
                className="w-8 h-8 rounded-full object-cover ring-2 ring-white/60"
              />
              <span className="font-semibold text-sm drop-shadow">
                {currentStory.username}
              </span>
              <span className="text-xs text-white/70">
                {currentItem?.timestamp || '2h'}
              </span>
            </div>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsPaused(!isPaused);
              }}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              {isPaused ? <Play className="w-4 h-4 fill-white" /> : <Pause className="w-4 h-4 fill-white" />}
            </button>
          </div>
        </div>

        {/* Story Middle Click Navigation Zones */}
        <div className="flex-1 flex relative z-10">
          <div 
            onClick={(e) => {
              e.stopPropagation();
              handlePrevItem();
            }} 
            className="w-1/3 h-full cursor-pointer" 
          />
          <div 
            onClick={(e) => {
              e.stopPropagation();
              handleNextItem();
            }} 
            className="w-2/3 h-full cursor-pointer" 
          />
        </div>

        {/* Caption (if available) */}
        {currentItem?.caption && (
          <div className="relative z-20 px-4 pb-2 text-white text-sm font-medium drop-shadow-md">
            <p className="bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-lg inline-block">
              {currentItem.caption}
            </p>
          </div>
        )}

        {/* Story Footer / Reply Bar */}
        <div className="relative z-20 p-3 pt-1 flex items-center gap-2">
          <form 
            onSubmit={handleSubmitReply}
            className="flex-1 flex items-center bg-transparent border border-white/50 focus-within:border-white rounded-full px-4 py-2 transition-colors"
          >
            <input 
              type="text" 
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={`Reply to ${currentStory.username}...`}
              className="w-full bg-transparent text-white placeholder-white/70 text-sm focus:outline-none"
            />
            {replyText.trim() && (
              <button type="submit" className="text-white hover:text-blue-400 ml-1">
                <Send className="w-4 h-4" />
              </button>
            )}
          </form>

          <button 
            onClick={handleLikeStory}
            className="p-2 text-white hover:scale-110 active:scale-95 transition-transform"
          >
            <Heart 
              className={`w-7 h-7 transition-colors ${liked ? 'fill-[#ff3040] text-[#ff3040]' : 'text-white'}`} 
            />
          </button>
        </div>
      </div>

      {/* Desktop Prev / Next Nav Buttons */}
      {currentStoryIdx > 0 && (
        <button 
          onClick={handlePrevItem}
          className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md items-center justify-center transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {currentStoryIdx < stories.length - 1 && (
        <button 
          onClick={handleNextItem}
          className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md items-center justify-center transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
