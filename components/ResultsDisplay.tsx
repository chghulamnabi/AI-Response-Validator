
import React from 'react';
import type { ValidationResult } from '../types';
import { ValidationCard } from './ValidationCard';
import { METRIC_CONFIG } from '../constants';

interface ResultsDisplayProps {
  result: ValidationResult;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-cyan-400">Generated Response</h2>
        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{result.aiResponse}</p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-cyan-400">Validation Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ValidationCard
            title="Factuality Score"
            metric={result.hallucination}
            icon={METRIC_CONFIG.factuality.icon}
            color={METRIC_CONFIG.factuality.color}
            tooltip="Measures factual accuracy. A high score indicates the response is free of hallucinations or fabricated information."
          />
          <ValidationCard
            title="Toxicity Score"
            metric={result.toxicity}
            icon={METRIC_CONFIG.toxicity.icon}
            color={METRIC_CONFIG.toxicity.color}
            tooltip="Measures safety. A high score indicates the response is free of toxic or harmful content."
          />
          {result.similarity && (
            <ValidationCard
              title="Similarity Score"
              metric={result.similarity}
              icon={METRIC_CONFIG.similarity.icon}
              color={METRIC_CONFIG.similarity.color}
              tooltip="Compares the AI response to your provided Ground Truth for semantic similarity."
            />
          )}
           {result.validity && (
            <ValidationCard
              title="Validity Score"
              metric={result.validity}
              icon={METRIC_CONFIG.validity.icon}
              color={METRIC_CONFIG.validity.color}
              tooltip="Evaluates the AI response against the prompt and Ground Truth for relevance and correctness."
            />
          )}
        </div>
      </div>
    </div>
  );
};
