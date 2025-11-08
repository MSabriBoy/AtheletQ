
import React from 'react';
import type { AnalysisResult } from '../types';

interface ScoreBreakdownProps {
  jointScores: AnalysisResult['jointScores'];
}

const ProgressBar: React.FC<{ label: string; score: number; max: number; color: string }> = ({ label, score, max, color }) => {
    const percentage = (score / max) * 100;
    return (
        <div>
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-300">{label}</span>
                <span className="text-sm font-bold" style={{ color }}>{score}/{max}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                    className="h-2.5 rounded-full"
                    style={{ width: `${percentage}%`, backgroundColor: color, transition: 'width 0.5s ease-in-out' }}
                ></div>
            </div>
        </div>
    );
};

export const ScoreBreakdown: React.FC<ScoreBreakdownProps> = ({ jointScores }) => {
  return (
    <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
      <h2 className="text-xl font-bold mb-6">Score Breakdown</h2>
      <div className="space-y-5">
        <ProgressBar label="Shoulder" score={jointScores.shoulder.score} max={jointScores.shoulder.max} color="#60a5fa" />
        <ProgressBar label="Elbow" score={jointScores.elbow.score} max={jointScores.elbow.max} color="#4ade80" />
        <ProgressBar label="Hip" score={jointScores.hip.score} max={jointScores.hip.max} color="#facc15" />
        <ProgressBar label="Spine" score={jointScores.spine.score} max={jointScores.spine.max} color="#f87171" />
      </div>
    </div>
  );
};
