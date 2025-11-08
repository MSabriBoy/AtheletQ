
import React from 'react';

interface FeedbackPanelProps {
  feedback: string[];
}

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


export const FeedbackPanel: React.FC<FeedbackPanelProps> = ({ feedback }) => {
  return (
    <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        AI Coaching Feedback
      </h2>
      <ul className="space-y-3">
        {feedback.map((tip, index) => (
          <li key={index} className="flex items-start">
            <CheckIcon />
            <span className="ml-3 text-gray-300">{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
