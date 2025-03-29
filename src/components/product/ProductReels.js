import { useState, useRef } from 'react';
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

export default function ProductReels({ reels }) {
  const [activeReel, setActiveReel] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const handleReelClick = (index) => {
    setActiveReel(index);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-sm font-medium text-gray-900 mb-4">Product Reels</h3>
      <div className="relative rounded-lg overflow-hidden aspect-video bg-gray-100">
        <video
          ref={videoRef}
          src={reels[activeReel].media}
          className="w-full h-full object-cover"
          loop
          muted={isMuted}
          onClick={togglePlay}
          onEnded={() => setIsPlaying(false)}
        />
        
        <div className="absolute inset-0 flex items-center justify-center">
          {!isPlaying && (
            <button 
              onClick={togglePlay}
              className="bg-black bg-opacity-50 rounded-full p-3 text-white hover:bg-opacity-70 transition-all"
            >
              <FaPlay />
            </button>
          )}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent text-white">
          <p className="text-sm font-medium">{reels[activeReel].caption}</p>
          
          <div className="flex justify-between items-center mt-2">
            <div className="flex space-x-2">
              <button 
                onClick={togglePlay}
                className="p-1 hover:text-gray-300 transition-colors"
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              
              <button 
                onClick={toggleMute}
                className="p-1 hover:text-gray-300 transition-colors"
              >
                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>
            </div>
            
            <a 
              href={reels[activeReel].link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs underline hover:text-gray-300 transition-colors"
            >
              View on Instagram
            </a>
          </div>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-4 gap-2">
        {reels.map((reel, index) => (
          <button
            key={reel.id}
            onClick={() => handleReelClick(index)}
            className={`aspect-square rounded-md overflow-hidden ${
              index === activeReel ? 'ring-2 ring-black' : ''
            }`}
          >
            <video
              src={reel.media}
              className="w-full h-full object-cover"
              muted
            />
          </button>
        ))}
      </div>
    </div>
  );
}