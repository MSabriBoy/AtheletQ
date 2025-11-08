
import React, { useEffect, useState } from 'react';
import type { AnalysisResult } from '../types';
import { analyzeVideo } from '../services/mockApiService';

interface LoadingPageProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
  videoFile: File | null;
}

const loadingMessages = [
  'Initializing analysis engine...',
  'Processing video frames...',
  'Detecting body landmarks with MediaPipe...',
  'Calculating joint angles...',
  'Comparing with reference pose...',
  'Generating AI coaching feedback...',
  'Finalizing your score...',
];

export const LoadingPage: React.FC<LoadingPageProps> = ({ onAnalysisComplete, videoFile }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex(prevIndex => {
        if (prevIndex < loadingMessages.length - 1) {
          return prevIndex + 1;
        }
        clearInterval(interval);
        return prevIndex;
      });
    }, 1000);

    const performAnalysis = async () => {
      try {
        const result = await analyzeVideo(videoFile);
        clearInterval(interval);
        onAnalysisComplete(result);
      } catch (error) {
        console.error("Analysis failed:", error);
        // Handle error, maybe show an error message and a button to go back
      }
    };
    
    performAnalysis();

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoFile, onAnalysisComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="w-16 h-16 border-4 border-teal-400 border-t-transparent rounded-full animate-spin mb-8"></div>
      <h2 className="text-3xl font-bold text-white mb-4">Analyzing Your Technique</h2>
      <p className="text-lg text-gray-300 transition-opacity duration-500">
        {loadingMessages[currentMessageIndex]}
      </p>
    </div>
  );
};
