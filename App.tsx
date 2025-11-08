
import React, { useState, useEffect, useCallback } from 'react';
import { HomePage } from './pages/HomePage';
import { LoadingPage } from './pages/LoadingPage';
import { ResultsPage } from './pages/ResultsPage';
import type { AnalysisResult, ProgressData } from './types';
import { analyzeVideo, getInitialProgressData } from './services/mockApiService';

type View = 'home' | 'loading' | 'results';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [progressData, setProgressData] = useState<ProgressData[]>([]);

  useEffect(() => {
    setProgressData(getInitialProgressData());
  }, []);

  const handleVideoSelect = (file: File) => {
    setVideoFile(file);
    setVideoUrl(URL.createObjectURL(file));
    setView('loading');
  };

  const handleAnalysisComplete = useCallback((result: AnalysisResult) => {
    setAnalysisResult(result);
    // Simulate saving and updating progress
    const newProgress: ProgressData = {
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      total_score: result.totalScore,
      shoulder_score: result.jointScores.shoulder.score,
      elbow_score: result.jointScores.elbow.score,
      hip_score: result.jointScores.hip.score,
      spine_score: result.jointScores.spine.score,
    };
    setProgressData(prevData => [...prevData, newProgress]);
    setView('results');
  }, []);

  const handleStartOver = () => {
    setVideoFile(null);
    setVideoUrl(null);
    setAnalysisResult(null);
    setView('home');
  };

  const renderView = () => {
    switch (view) {
      case 'home':
        return <HomePage onVideoSelect={handleVideoSelect} />;
      case 'loading':
        return <LoadingPage onAnalysisComplete={handleAnalysisComplete} videoFile={videoFile} />;
      case 'results':
        if (analysisResult && videoUrl) {
          return (
            <ResultsPage
              result={analysisResult}
              progressData={progressData}
              userVideoUrl={videoUrl}
              onStartOver={handleStartOver}
            />
          );
        }
        // Fallback to home if results are not ready
        return <HomePage onVideoSelect={handleVideoSelect} />;
      default:
        return <HomePage onVideoSelect={handleVideoSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <main>{renderView()}</main>
    </div>
  );
};

export default App;
