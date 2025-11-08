
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { ProgressData } from '../types';

interface ProgressChartProps {
  data: ProgressData[];
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: -10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
          <XAxis dataKey="date" stroke="#a0aec0" fontSize={12} />
          <YAxis stroke="#a0aec0" domain={[0, 100]} fontSize={12}/>
          <Tooltip 
             contentStyle={{ 
                backgroundColor: 'rgba(31, 41, 55, 0.8)', // bg-gray-800 with opacity
                borderColor: '#4a5568', // border-gray-600
                borderRadius: '0.5rem' // rounded-lg
            }}
            labelStyle={{ color: '#cbd5e0' }} // text-gray-300
          />
          <Legend wrapperStyle={{fontSize: "12px"}}/>
          <Line type="monotone" dataKey="total_score" name="Total Score" stroke="#4ade80" strokeWidth={2} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
