
export interface Metric {
  score: number;
  justification: string;
}

export interface ValidationResult {
  aiResponse: string;
  hallucination: Metric;
  similarity: Metric | null; // Null if no ground truth is provided
  validity: Metric | null; // Null if no ground truth is provided
  toxicity: Metric;
}
