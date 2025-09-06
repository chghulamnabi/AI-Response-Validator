import React from 'react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (value: string) => void;
  groundTruth: string;
  setGroundTruth: (value: string) => void;
  model: string;
  setModel: (value: string) => void;
  onValidate: () => void;
  onClear: () => void;
  isLoading: boolean;
  showClearButton: boolean;
  isOutOfUses: boolean;
}

const modelOptions = [
    { value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash' },
];

export const PromptInput: React.FC<PromptInputProps> = ({
  prompt,
  setPrompt,
  groundTruth,
  setGroundTruth,
  model,
  setModel,
  onValidate,
  onClear,
  isLoading,
  showClearButton,
  isOutOfUses,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="model" className="block text-sm font-medium text-gray-300 mb-2">
          Model
        </label>
        <div className="relative">
            <select
              id="model"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200 appearance-none pr-10"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              disabled={isLoading}
            >
                {modelOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
            Prompt
          </label>
          <textarea
            id="prompt"
            rows={4}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200 resize-none placeholder-gray-500"
            placeholder="e.g., What are the main benefits of learning React?"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="groundTruth" className="block text-sm font-medium text-gray-300 mb-2">
            Ground Truth (Optional)
          </label>
          <textarea
            id="groundTruth"
            rows={4}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200 resize-none placeholder-gray-500"
            placeholder="Provide an ideal or expected answer here to enable Similarity and Validity checks."
            value={groundTruth}
            onChange={(e) => setGroundTruth(e.target.value)}
            disabled={isLoading}
          />
        </div>
      </div>
        {isOutOfUses && (
            <div className="text-center text-yellow-400 bg-yellow-900/30 border border-yellow-800 p-3 rounded-lg">
                You have no uses remaining. Please upgrade your plan to continue.
            </div>
        )}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 pt-2">
        <button
          onClick={onValidate}
          disabled={isLoading || !prompt || !model || isOutOfUses}
          className="w-full md:w-auto px-12 py-3 font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg shadow-lg hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          {isLoading ? 'Analyzing...' : 'Generate & Validate'}
        </button>
        {showClearButton && !isLoading && (
            <button
            onClick={onClear}
            className="w-full md:w-auto px-12 py-3 font-semibold text-gray-300 bg-gray-700/50 border border-gray-600 rounded-lg shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-500 transition-all duration-300 ease-in-out"
            >
                Clear
            </button>
        )}
      </div>
    </div>
  );
};
