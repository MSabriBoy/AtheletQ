import React, { useRef, useState, useCallback } from 'react';

interface HomePageProps {
  onVideoSelect: (file: File) => void;
}

const CameraIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.55a1 1 0 011.45.89v6.22a1 1 0 01-1.45.89L15 14M5 9h10a2 2 0 012 2v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4a2 2 0 012-2z" />
    </svg>
);

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);


export const HomePage: React.FC<HomePageProps> = ({ onVideoSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isRecording, setIsRecording] = useState(false);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onVideoSelect(file);
    }
  };

  const handleRecordClick = useCallback(() => {
    setIsRecording(true);
    // Simulate a 5-second recording
    setTimeout(() => {
      // Create a dummy video file to proceed
      const blob = new Blob([''], { type: 'video/mp4' });
      const dummyFile = new File([blob], 'recording.mp4', { type: 'video/mp4' });
      onVideoSelect(dummyFile);
      setIsRecording(false);
    }, 5000);
  }, [onVideoSelect]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="text-center max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-500 mb-4">
                SkillLens+
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
                Get your AI-powered technique score, a personalized training plan, and an injury risk assessment. Just upload a video or use your webcam to start.
            </p>
        </div>

        <div className="w-full max-w-md p-8 bg-gray-800/50 rounded-2xl shadow-2xl backdrop-blur-sm border border-gray-700">
            <h2 className="text-2xl font-bold text-center text-white mb-6">Get Started</h2>
            <div className="flex flex-col space-y-4">
                <button
                    onClick={handleUploadClick}
                    className="flex items-center justify-center w-full px-6 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    <UploadIcon />
                    Upload Video
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="video/*"
                    className="hidden"
                />
                <button
                    onClick={handleRecordClick}
                    disabled={isRecording}
                    className="flex items-center justify-center w-full px-6 py-4 text-lg font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-500 focus:ring-opacity-50 disabled:bg-teal-800 disabled:cursor-not-allowed"
                >
                    <CameraIcon />
                    {isRecording ? 'Recording...' : 'Record with Webcam'}
                </button>
                {isRecording && <p className="text-center text-sm text-teal-300 animate-pulse">Recording for 5 seconds...</p>}
            </div>
        </div>
        <footer className="absolute bottom-4 text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} AtheletQ. All rights reserved.
        </footer>
    </div>
  );
};