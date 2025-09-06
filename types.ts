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

export type Plan = 'free' | 'pro' | 'business';

export interface User {
  email: string;
  plan: Plan;
  usesRemaining: number;
}
