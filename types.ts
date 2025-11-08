export interface JointScore {
  score: number;
  max: number;
}

export interface InjuryRisk {
    level: 'Low' | 'Medium' | 'High';
    details: string;
}

export interface TrainingPlan {
    schedule: string[];
    diet: string[];
}

export interface AnalysisResult {
  totalScore: number;
  fitnessPotential: number;
  jointScores: {
    shoulder: JointScore;
    elbow: JointScore;
    hip: JointScore;
    spine: JointScore;
  };
  feedback: string[];
  injuryRisk: InjuryRisk,
  trainingPlan: TrainingPlan,
  referenceVideoUrls: string[];
}

export interface ProgressData {
  date: string;
  total_score: number;
  shoulder_score: number;
  elbow_score: number;
  hip_score: number;
  spine_score: number;
}