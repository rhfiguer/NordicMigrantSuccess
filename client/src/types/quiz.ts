export interface QuizQuestion {
  id: number;
  question: string;
  category: string;
  order: number;
}

export interface QuizResponse {
  q1?: number;
  q2?: number;
  q3?: number;
  q4?: number;
  q5?: number;
  q6?: number;
  q7?: number;
  q8?: number;
  q9?: number;
  q10?: number;
  q11?: number;
  leadId?: number;
}

export interface QuizResult {
  score: number;
  recommendation: string;
}
