import type { AnalysisResult, ProgressData, InjuryRisk, TrainingPlan } from '../types';

// This is a placeholder for a real Gemini API call.
const generateAIFeedback = async (deviations: Record<string, number>): Promise<string[]> => {
  // This function simulates a call to a generative AI model.
  // A real prompt would be structured like this:
  /*
    `Analyze the following joint angle deviations from a perfect athletic form and provide concise, actionable coaching feedback.
    Deviations: ${JSON.stringify(deviations)}
    Provide 3-4 bullet points of feedback.`
  */
  console.log("Generating AI feedback for deviations:", deviations);
  const feedback: string[] = [];
  if (deviations.shoulder > 10) feedback.push("Your shoulder is over-rotating. Focus on keeping it stable and aligned with your torso.");
  if (deviations.elbow < -5) feedback.push("Excellent elbow extension, giving you more power. Maintain this form.");
  if (deviations.hip > 8) feedback.push("Engage your core more actively. This will prevent excessive hip rotation and improve stability.");
  if (deviations.spine > 12) feedback.push("Your spine is slightly too curved. Aim for a more neutral, straight spine to protect your back and transfer energy efficiently.");
  
  if (Object.values(deviations).every(d => Math.abs(d) < 5)) {
    feedback.push("Exceptional form! Your movements are controlled, stable, and precise.");
    feedback.push("Your kinetic chain is well-aligned, leading to efficient power transfer.");
  }
  
  return new Promise(resolve => setTimeout(() => resolve(feedback.slice(0, 3)), 500));
};

const generateInjuryRisk = async (scores: AnalysisResult['jointScores']): Promise<InjuryRisk> => {
    const scorePercentages = {
        shoulder: scores.shoulder.score / scores.shoulder.max,
        elbow: scores.elbow.score / scores.elbow.max,
        hip: scores.hip.score / scores.hip.max,
        spine: scores.spine.score / scores.spine.max,
    };
    const minScore = Math.min(...Object.values(scorePercentages));
    const maxScore = Math.max(...Object.values(scorePercentages));

    if (maxScore - minScore > 0.4) {
        return { level: 'High', details: 'Significant imbalance detected between upper and lower body scores. This could lead to overcompensation injuries. Focus on strengthening weaker areas to create a more balanced form.' };
    }
    if (scorePercentages.spine < 0.6) {
        return { level: 'Medium', details: 'Your spine score is relatively low, indicating potential core instability. This increases the risk of back strain. Prioritize core-strengthening exercises.' };
    }
    if (minScore < 0.7) {
        return { level: 'Medium', details: 'Some minor imbalances noted. While not critical, targeted exercises for lower-scoring joints can improve overall stability and reduce long-term strain.' };
    }
    return { level: 'Low', details: 'Your form is well-balanced and stable. Continue with consistent training and proper warm-ups to maintain a low risk of injury.' };
}

const generateTrainingPlan = async (): Promise<TrainingPlan> => {
    // This would also be a generative AI call, potentially with user goals as input.
    return {
        schedule: [
            'Monday: High-Intensity Interval Training (HIIT) & Core',
            'Tuesday: Active Recovery (Stretching, Foam Rolling)',
            'Wednesday: Strength Training (Full Body)',
            'Thursday: Skill-specific Drills & Light Cardio',
            'Friday: Strength Training (Targeting weaknesses)',
            'Saturday: Endurance Training (Long-duration, low-intensity)',
            'Sunday: Rest'
        ],
        diet: [
            'Prioritize lean protein (chicken, fish, tofu) for muscle repair.',
            'Incorporate complex carbohydrates (oats, brown rice) for sustained energy.',
            'Stay hydrated. Aim for at least 3 liters of water per day.',
            'Include healthy fats (avocado, nuts) for joint health.',
        ]
    }
}


export const analyzeVideo = async (videoFile: File | null): Promise<AnalysisResult> => {
  if (!videoFile) {
    throw new Error("No video file provided for analysis.");
  }

  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Mocked analysis data
  const deviations = {
    shoulder: Math.random() * 20,
    elbow: Math.random() * 20 - 10,
    hip: Math.random() * 15,
    spine: Math.random() * 25,
  };

  const calculateScore = (deviation: number, maxDeviation: number, maxScore: number) => {
    return Math.max(0, Math.round(maxScore - (Math.abs(deviation) / maxDeviation) * maxScore));
  }

  const shoulderScore = { score: calculateScore(deviations.shoulder, 25, 30), max: 30 };
  const elbowScore = { score: calculateScore(deviations.elbow, 25, 25), max: 25 };
  const hipScore = { score: calculateScore(deviations.hip, 25, 25), max: 25 };
  const spineScore = { score: calculateScore(deviations.spine, 25, 20), max: 20 };

  const jointScores = { shoulder: shoulderScore, elbow: elbowScore, hip: hipScore, spine: spineScore };
  const totalScore = Object.values(jointScores).reduce((sum, s) => sum + s.score, 0);
  
  // --- Generate AI-powered insights in parallel ---
  const [feedback, injuryRisk, trainingPlan] = await Promise.all([
      generateAIFeedback(deviations),
      generateInjuryRisk(jointScores),
      generateTrainingPlan()
  ]);

  return {
    totalScore,
    fitnessPotential: Math.round(totalScore * 0.6 + Math.random() * 40), // Mocked potential score
    jointScores,
    feedback,
    injuryRisk,
    trainingPlan,
    referenceVideoUrls:[
  '/videos/ref1.mp4',
  '/videos/ref2.mp4',
  '/videos/ref3.mp4',
  '/videos/ref4.mp4',
  '/videos/ref5.mp4',
  '/videos/ref6.mp4',
  '/videos/ref7.mp4',
  '/videos/ref8.mp4',
  
],
  };
};

export const getInitialProgressData = (): ProgressData[] => {
  return [
    { date: 'Jul 1', total_score: 65, shoulder_score: 18, elbow_score: 15, hip_score: 17, spine_score: 15 },
    { date: 'Jul 8', total_score: 72, shoulder_score: 22, elbow_score: 18, hip_score: 18, spine_score: 14 },
    { date: 'Jul 15', total_score: 78, shoulder_score: 24, elbow_score: 20, hip_score: 20, spine_score: 14 },
    { date: 'Jul 22', total_score: 85, shoulder_score: 26, elbow_score: 22, hip_score: 22, spine_score: 15 },
  ];
};