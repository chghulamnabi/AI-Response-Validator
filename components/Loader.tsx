
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-500"></div>
      <p className="mt-4 text-lg text-gray-400">Analyzing response...</p>
    </div>
  );
};
