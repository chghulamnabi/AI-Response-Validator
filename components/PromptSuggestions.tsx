
import React from 'react';

const LightbulbIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);

interface PromptSuggestionsProps {
    isLoading: boolean;
    suggestions: string[] | null;
    onSuggestionClick: (suggestion: string) => void;
}

export const PromptSuggestions: React.FC<PromptSuggestionsProps> = ({ isLoading, suggestions, onSuggestionClick }) => {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center gap-3 bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <div className="w-6 h-6 border-2 border-dashed rounded-full animate-spin border-cyan-400"></div>
                <span className="text-gray-400">Generating prompt suggestions...</span>
            </div>
        );
    }
    
    if (!suggestions || suggestions.length === 0) {
        return null;
    }

    return (
        <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-lg animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400 flex items-center gap-2">
                <LightbulbIcon />
                Prompt Improvement Suggestions
            </h2>
            <p className="text-gray-400 mb-6">Scores were low. Try one of these improved prompts for a better result. Click a suggestion to use it.</p>
            <div className="space-y-3">
                {suggestions.map((suggestion, index) => (
                    <button
                        key={index}
                        onClick={() => onSuggestionClick(suggestion)}
                        className="w-full text-left p-4 bg-gray-900/70 border border-gray-600 rounded-lg hover:bg-cyan-900/50 hover:border-cyan-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                        <p className="text-gray-300">{suggestion}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};
