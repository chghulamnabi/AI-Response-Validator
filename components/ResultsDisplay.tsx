import React from 'react';
import type { ValidationResult } from '../types';
import { ValidationCard } from './ValidationCard';
import { METRIC_CONFIG } from '../constants';

interface ResultsDisplayProps {
  result: ValidationResult;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  const metricsToShow = [
    {
      key: 'factuality',
      title: 'Factuality Score',
      metric: result.hallucination,
      config: METRIC_CONFIG.factuality,
    },
    {
      key: 'toxicity',
      title: 'Toxicity Score',
      metric: result.toxicity,
      config: METRIC_CONFIG.toxicity,
    },
  ];

  if (result.similarity) {
    metricsToShow.push({
      key: 'similarity',
      title: 'Similarity Score',
      metric: result.similarity,
      config: METRIC_CONFIG.similarity,
    });
  }

  if (result.validity) {
    metricsToShow.push({
      key: 'validity',
      title: 'Validity Score',
      metric: result.validity,
      config: METRIC_CONFIG.validity,
    });
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-cyan-400">Generated Response</h2>
        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{result.aiResponse}</p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-cyan-400">Validation Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricsToShow.map((item, index) => (
            <ValidationCard
              key={item.key}
              title={item.title}
              metric={item.metric}
              icon={item.config.icon}
              color={item.config.color}
              tooltip={item.config.tooltip}
              animationDelay={`${index * 150}ms`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};