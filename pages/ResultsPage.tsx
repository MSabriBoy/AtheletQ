import React from 'react';
import type { AnalysisResult, ProgressData } from '../types';
import { ScoreDonut } from '../components/ScoreDonut';
import { ScoreBreakdown } from '../components/ScoreBreakdown';
import { FeedbackPanel } from '../components/FeedbackPanel';
import { ProgressChart } from '../components/ProgressChart';
import { VideoPlayer } from '../components/VideoPlayer';
import { InjuryRiskPanel } from '../components/InjuryRiskPanel';
import { TrainingPlanPanel } from '../components/TrainingPlanPanel';

// Declare jsPDF and html2canvas from global scope
declare const jspdf: any;
declare const html2canvas: any;

interface ResultsPageProps {
  result: AnalysisResult;
  progressData: ProgressData[];
  userVideoUrl: string;
  onStartOver: () => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({
  result,
  progressData,
  userVideoUrl,
  onStartOver,
}) => {
  const [userName, setUserName] = React.useState('');
  const [isGeneratingReport, setIsGeneratingReport] = React.useState(false);

  const handleDownloadReport = async () => {
    setIsGeneratingReport(true);
    const reportElement = document.getElementById('printable-content');
    if (!reportElement) {
      setIsGeneratingReport(false);
      return;
    }

    // Temporarily show the print-only header for capture
    const printHeader = document.getElementById('print-only-header') as HTMLElement;
    if (printHeader) printHeader.style.display = 'block';

   const canvas = await html2canvas(reportElement, {
  scale: 2,
  backgroundColor: '#111827', // bg-gray-900
  onclone: (clonedDoc: Document) => {
    // ✅ Fix 1: Explicitly cast NodeList to HTMLVideoElement[]
    const videoElements = Array.from(
      clonedDoc.querySelectorAll('video')
    ) as HTMLVideoElement[];

    // ✅ Fix 2: Now TypeScript knows these are HTMLVideoElements
    videoElements.forEach((video) => {
      const canvasEl = document.createElement('canvas');
      canvasEl.width = video.clientWidth;
      canvasEl.height = video.clientHeight;
      const context = canvasEl.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvasEl.width, canvasEl.height);
      }
      video.parentNode?.replaceChild(canvasEl, video);
    });
  },
});


    // Hide the print-only header again
    if (printHeader) printHeader.style.display = 'none';

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jspdf.jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const ratio = canvasWidth / canvasHeight;
    const imgWidth = pdfWidth;
    const imgHeight = imgWidth / ratio;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    const fileName = userName
      ? `SkillLens_Report_${userName.replace(/\s/g, '_')}.pdf`
      : 'SkillLens_Report.pdf';
    pdf.save(fileName);

    setIsGeneratingReport(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6 lg:p-8">
      {/* ---------- Header ---------- */}
      <header className="flex flex-col sm:flex-row justify-between items-center mb-6 no-print">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-500 mb-4 sm:mb-0">
          Analysis Report
        </h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter Name for Report"
            aria-label="Enter your name for the report"
            className="px-4 py-2.5 text-sm w-48 text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 focus:outline-none transition-all"
          />
          <button
            onClick={handleDownloadReport}
            disabled={isGeneratingReport}
            className="px-5 py-2.5 text-sm font-medium text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400 disabled:bg-gray-800 disabled:cursor-not-allowed"
          >
            {isGeneratingReport ? 'Generating...' : 'Download Report'}
          </button>
          <button
            onClick={onStartOver}
            className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Analyze Another
          </button>
        </div>
      </header>

      <p className="text-center text-sm text-gray-400 mb-6 no-print">
        <strong>Tip:</strong> For the report, pause your video on a key frame to include it as a
        'screenshot'.
      </p>

      {/* ---------- Main Content ---------- */}
      <div id="printable-content" className="max-w-7xl mx-auto printable-content">
        {/* Print header (for PDF only) */}
        <div id="print-only-header" className="hidden mb-8">
          <h1 className="text-4xl font-bold mb-2 text-white">SkillLens+ Analysis Report</h1>
          <p className="text-lg text-white">
            <strong>Athlete:</strong> {userName || 'N/A'}
          </p>
          <p className="text-lg text-white">
            <strong>Date:</strong>{' '}
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <hr className="my-4 border-gray-600" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 print-grid">
          {/* ---------- Left Column (Videos + Feedback + Progress) ---------- */}
          <div className="lg:col-span-2 space-y-8 print-col-span-2">
            {/* Your video + reference videos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User video wrapped in array for consistency */}
              <VideoPlayer title="Your Performance" videoUrls={[userVideoUrl]} showSkeleton={true} />

              {/* Multiple local reference videos */}
              <VideoPlayer title="Reference Pose" videoUrls={result.referenceVideoUrls} />
            </div>

            {/* Feedback */}
            <FeedbackPanel feedback={result.feedback} />

            {/* Injury risk + Progress */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print-page-break">
              <InjuryRiskPanel injuryRisk={result.injuryRisk} />
              <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 no-print">
                <h2 className="text-xl font-bold mb-4">Your Progress</h2>
                <ProgressChart data={progressData} />
              </div>
            </div>

            {/* Training plan */}
            <TrainingPlanPanel trainingPlan={result.trainingPlan} />
          </div>

          {/* ---------- Right Column (Scores) ---------- */}
          <div className="space-y-8">
            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
              <h2 className="text-xl font-bold mb-4 text-center">Technique Score</h2>
              <ScoreDonut score={result.totalScore} maxScore={100} />
            </div>

            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
              <h2 className="text-xl font-bold mb-4 text-center">Fitness Potential</h2>
              <ScoreDonut
                score={result.fitnessPotential}
                maxScore={100}
                colorPreset="blue"
              />
            </div>

            <ScoreBreakdown jointScores={result.jointScores} />
          </div>
        </div>
      </div>
    </div>
  );
};
