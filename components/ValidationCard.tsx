
import React from 'react';
import type { Metric } from '../types';

interface ValidationCardProps {
  title: string;
  metric: Metric;
  icon: JSX.Element;
  color: string;
  tooltip: string;
}

const ScoreCircle: React.FC<{ score: number, color: string }> = ({ score, color }) => {
    const circumference = 2 * Math.PI * 40; // 2 * pi * radius
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="relative w-24 h-24">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                    className="text-gray-700"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                />
                <circle
                    className={color}
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                    style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
                />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
                {score}
            </span>
        </div>
    );
};


export const ValidationCard: React.FC<ValidationCardProps> = ({ title, metric, icon, color, tooltip }) => {
  return (
    <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-lg flex flex-col items-center text-center group relative transition-all duration-300 hover:border-cyan-500/50 hover:bg-gray-800">
        <div className="absolute top-3 right-3 text-gray-500 group-hover:text-cyan-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-gray-900 text-gray-300 text-sm rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                {tooltip}
            </div>
        </div>
      <div className="mb-4">
        <div className="p-3 rounded-full bg-gray-700/50">
            {icon}
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-200 mb-4">{title}</h3>
      <ScoreCircle score={metric.score} color={color} />
      <p className="text-sm text-gray-400 mt-4 h-20 overflow-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        {metric.justification}
      </p>
    </div>
  );
};
