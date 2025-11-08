import React, { useState, useEffect } from 'react';

interface VideoPlayerProps {
  title: string;
  videoUrls: string[]; // ✅ only multiple reference videos
  showSkeleton?: boolean;
}

const SkeletonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const SkeletonOverlay: React.FC = () => (
  <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
    {/* Head */}
    <circle cx="50" cy="15" r="5" fill="none" stroke="#4ade80" strokeWidth="1" />
    {/* Spine */}
    <line x1="50" y1="20" x2="50" y2="50" stroke="#4ade80" strokeWidth="1" />
    {/* Shoulders */}
    <line x1="35" y1="25" x2="65" y2="25" stroke="#4ade80" strokeWidth="1" />
    {/* Arms */}
    <line x1="35" y1="25" x2="25" y2="40" stroke="#4ade80" strokeWidth="1" />
    <line x1="25" y1="40" x2="20" y2="55" stroke="#4ade80" strokeWidth="1" />
    <line x1="65" y1="25" x2="75" y2="40" stroke="#4ade80" strokeWidth="1" />
    <line x1="75" y1="40" x2="80" y2="55" stroke="#4ade80" strokeWidth="1" />
    {/* Hips */}
    <line x1="40" y1="50" x2="60" y2="50" stroke="#4ade80" strokeWidth="1" />
    {/* Legs */}
    <line x1="40" y1="50" x2="40" y2="90" stroke="#4ade80" strokeWidth="1" />
    <line x1="60" y1="50" x2="60" y2="90" stroke="#4ade80" strokeWidth="1" />
  </svg>
);

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  title,
  videoUrls,
  showSkeleton = false,
}) => {
  const [isSkeletonVisible, setIsSkeletonVisible] = useState(showSkeleton);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentVideo = videoUrls[currentIndex];

  // Reset to first video when list changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [JSON.stringify(videoUrls)]);

  return (
    <div className="bg-gray-800/50 p-4 rounded-2xl border border-gray-700">
      {/* Title + Skeleton toggle */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-lg">{title}</h3>
        {showSkeleton && (
          <button
            onClick={() => setIsSkeletonVisible(!isSkeletonVisible)}
            className={`flex items-center space-x-2 text-xs px-3 py-1 rounded-full transition-colors ${
              isSkeletonVisible ? 'bg-teal-500 text-white' : 'bg-gray-700 text-gray-300'
            }`}
          >
            <SkeletonIcon />
            <span>Skeleton</span>
          </button>
        )}
      </div>

      {/* Video player */}
      <div className="aspect-video w-full rounded-lg overflow-hidden relative bg-black">
        <video
          key={currentVideo}
          className="w-full h-full object-cover"
          controls
          loop
          autoPlay
          muted
        >
          <source src={currentVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {isSkeletonVisible && <SkeletonOverlay />}
      </div>

      {/* Video selector buttons */}
      {videoUrls.length > 1 && (
        <div className="flex flex-wrap gap-2 mt-3 justify-center">
          {videoUrls.map((v, i) => (
            <button
              key={v}
              onClick={() => setCurrentIndex(i)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                i === currentIndex ? 'bg-teal-500 text-black' : 'bg-gray-700 text-white'
              }`}
            >
              {`Ref ${i + 1}`}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
