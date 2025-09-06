
import React, { useState, useCallback } from 'react';
import { PromptInput } from './components/PromptInput';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Hero } from './components/Hero';
import { Loader } from './components/Loader';
import { generateAndValidate } from './services/geminiService';
import type { ValidationResult } from './types';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [groundTruth, setGroundTruth] = useState<string>('');
  const [model, setModel] = useState<string>('gemini-2.5-flash');
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleValidation = useCallback(async () => {
    if (!prompt) {
      setError('Please enter a prompt to validate.');
      return;
    }
    if (!model) {
      setError('Please enter a model name.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setValidationResult(null);
    setShowResults(true);

    try {
      const result = await generateAndValidate(prompt, groundTruth, model);
      setValidationResult(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, groundTruth, model]);

  const handleClear = () => {
    setPrompt('');
    setGroundTruth('');
    setValidationResult(null);
    setError(null);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <main className="container mx-auto px-4 py-8">
        <Hero />
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-700">
          <PromptInput
            prompt={prompt}
            setPrompt={setPrompt}
            groundTruth={groundTruth}
            setGroundTruth={setGroundTruth}
            model={model}
            setModel={setModel}
            onValidate={handleValidation}
            onClear={handleClear}
            isLoading={isLoading}
            showClearButton={showResults}
          />
        </div>

        {showResults && (
          <div className="mt-8">
            {isLoading && <Loader />}
            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg text-center">
                <p className="font-bold">Error</p>
                <p>{error}</p>
              </div>
            )}
            {validationResult && !isLoading && (
              <ResultsDisplay result={validationResult} />
            )}
          </div>
        )}
      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Powered by Google Gemini</p>
      </footer>
    </div>
  );
};

export default App;
