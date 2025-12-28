'use client'

import { Sparkles } from "lucide-react";
import { useState } from 'react'
import ResultComponent from '../components/ResultComponent';
import UploadFile from '../components/UploadFile';

interface ResultData {
  recommended_funders?: string[];
  company_website?: string[];
  company_description?: string[];
  estimated_investment?: string[];
  suggestions?: string[];
  score_impact?: number[];
  project_title?: string;
  project_description?: string;
  project_location?: string;
  project_type?: string;
  potential_funding?: string;
  green_score?: number;
}

export default function Home() {
  const [result, setResult] = useState<ResultData[] | null>(null)

  const handleBack = () => {
    // Clear the result state to show the upload form again
    setResult(null);
    // Scroll back to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleResult = (resultData: ResultData[]) => {
    setResult(resultData);
  };

  const handleFileChange = () => {
    // Clear previous results when new file is selected
    setResult(null);
  };
  return (
    <div className="min-h-screen bg-white-100">
      {/*Header Section*/}
      <div className="flex flex-col items-center pt-16 pb-8 px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              TreeLoan
            </h1>
          </div>
          <p className="text-xl text-gray-600 text-center max-w-2xl mb-2">
            Analyze your project and get an instant green sustainability score
          </p>
          <p className="text-sm text-gray-500 text-center max-w-xl">
            Powered by AI to evaluate environmental impact and potential funding opportunities
          </p>
      </div>

      {/* Upload File Component */}
      

      {/* Result Component Section */}
      {!result && (
        <UploadFile onResult={handleResult} onFileChange={handleFileChange} />
        )}

      {result && (
        <div id="results-section" className="mt-12 w-full">
          <ResultComponent resultData={result!} />
          <div className="flex justify-center mt-8 mb-8">
            <button 
              className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors" 
              onClick={handleBack}
            >
              ← Back to Upload
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
