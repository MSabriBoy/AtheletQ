import React from 'react';
import type { InjuryRisk } from '../types';

interface InjuryRiskPanelProps {
  injuryRisk: InjuryRisk;
}

const WarningIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
);

export const InjuryRiskPanel: React.FC<InjuryRiskPanelProps> = ({ injuryRisk }) => {
    const riskStyles = {
        Low: {
            bg: 'bg-green-500/10',
            border: 'border-green-500',
            text: 'text-green-400',
        },
        Medium: {
            bg: 'bg-yellow-500/10',
            border: 'border-yellow-500',
            text: 'text-yellow-400',
        },
        High: {
            bg: 'bg-red-500/10',
            border: 'border-red-500',
            text: 'text-red-400',
        }
    };

    const currentStyle = riskStyles[injuryRisk.level];

  return (
    <div className={`p-6 rounded-2xl border ${currentStyle.bg} ${currentStyle.border}`}>
        <h2 className="text-xl font-bold mb-4 flex items-center">
            <WarningIcon />
            Injury Risk Assessment
        </h2>
        <div className="flex items-center mb-4">
            <span className={`text-lg font-bold ${currentStyle.text}`}>{injuryRisk.level} Risk</span>
        </div>
      <p className="text-gray-300">
        {injuryRisk.details}
      </p>
    </div>
  );
};
