
import React from 'react';

const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const Hero: React.FC = () => {
  return (
    <div className="text-center mb-8">
        <div className="flex justify-center items-center mb-4">
            <CheckCircleIcon />
        </div>
      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
        AI Response Validator
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
        Enter a prompt to generate an AI response, and we'll analyze it for key metrics like factuality, toxicity, and more. Optionally provide a 'Ground Truth' for deeper validation.
      </p>
    </div>
  );
};
