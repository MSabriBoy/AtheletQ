import React from 'react';
import type { TrainingPlan } from '../types';

interface TrainingPlanPanelProps {
  trainingPlan: TrainingPlan;
}

const ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-start">
        <svg className="h-5 w-5 mr-3 text-teal-400 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-300">{children}</span>
    </li>
);

export const TrainingPlanPanel: React.FC<TrainingPlanPanelProps> = ({ trainingPlan }) => {
  return (
    <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
      <h2 className="text-xl font-bold mb-6">Personalized Training Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-3 text-teal-300">Weekly Schedule</h3>
          <ul className="space-y-2">
            {trainingPlan.schedule.map((item, index) => (
              <ListItem key={index}>{item}</ListItem>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3 text-yellow-300">Dietary Advice</h3>
          <ul className="space-y-2">
             {trainingPlan.diet.map((item, index) => (
              <ListItem key={index}>{item}</ListItem>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
