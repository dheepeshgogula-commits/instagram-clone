import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

export default function StoriesTray({ stories, onSelectStory, onAddStory }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full max-w-[630px] mx-auto mb-6 bg-black">
      {/* Scroll Left Button */}
      <button
        onClick={() => scroll('left')}
        className="hidden md:flex absolute -left-3 top-9 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white text-black shadow-lg items-center justify-center hover:bg-neutral-200 transition-opacity"
        aria-label="Previous stories"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Stories Scroll Container */}
      <div 
        ref={scrollRef}
        className="flex items-center gap-4 overflow-x-auto no-scrollbar py-3 px-1 scroll-smooth"
      >
        {stories.map((story, index) => {
          return (
            <button
              key={story.id}
              onClick={() => onSelectStory(index)}
              className="flex flex-col items-center gap-1.5 flex-shrink-0 group focus:outline-none"
            >
              <div className="relative">
                {/* Gradient ring */}
                <div 
                  className={`w-[68px] h-[68px] rounded-full p-[2px] transition-transform duration-200 group-hover:scale-105 flex items-center justify-center ${
                    story.hasUnseen 
                      ? 'ig-story-ring' 
                      : 'border-2 border-[#363636]'
                  }`}
                >
                  <div className="w-full h-full rounded-full p-[2px] bg-black">
                    <img 
                      src={story.avatar} 
                      alt={story.username} 
                      className="w-full h-full rounded-full object-cover" 
                    />
                  </div>
                </div>

                {/* Add story plus badge for current user */}
                {story.isUser && (
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddStory();
                    }}
                    className="absolute bottom-0 right-0 w-5 h-5 bg-[#0095f6] text-white rounded-full ring-2 ring-black flex items-center justify-center hover:bg-[#1877f2] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </div>

              <span className="text-[12px] font-normal text-neutral-300 w-[72px] truncate text-center">
                {story.isUser ? 'Your story' : story.username}
              </span>
            </button>
          );
        })}
      </div>

      {/* Scroll Right Button */}
      <button
        onClick={() => scroll('right')}
        className="hidden md:flex absolute -right-3 top-9 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white text-black shadow-lg items-center justify-center hover:bg-neutral-200 transition-opacity"
        aria-label="Next stories"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
