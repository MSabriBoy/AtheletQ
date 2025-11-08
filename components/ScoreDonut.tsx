import React from 'react';

interface ScoreDonutProps {
  score: number;
  maxScore: number;
  colorPreset?: 'default' | 'blue';
}

export const ScoreDonut: React.FC<ScoreDonutProps> = ({ score, maxScore, colorPreset = 'default' }) => {
  const percentage = (score / maxScore) * 100;
  const radius = 80;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getScoreColor = () => {
    if (colorPreset === 'blue') {
        if (percentage >= 80) return '#60a5fa'; // blue-400
        if (percentage >= 50) return '#3b82f6'; // blue-500
        return '#2563eb'; // blue-600
    }
    // Default preset
    if (percentage >= 80) return '#4ade80'; // green-400
    if (percentage >= 50) return '#facc15'; // yellow-400
    return '#f87171'; // red-400
  };
  const color = getScoreColor();

  return (
    <div className="relative flex items-center justify-center w-52 h-52 mx-auto">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="-rotate-90"
      >
        <circle
          stroke="#374151" // gray-700
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.8s ease-out' }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-5xl font-extrabold" style={{ color }}>
          {score}
        </span>
        <span className="text-sm text-gray-400">out of {maxScore}</span>
      </div>
    </div>
  );
};