'use client'

import { Upload, FileText, CheckCircle2, Info, X } from "lucide-react";
import { useState } from 'react'

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

interface UploadFileProps {
  onResult: (result: ResultData[]) => void;
  onFileChange?: () => void;
}

export default function UploadFile({ onResult, onFileChange }: UploadFileProps) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadProgress(0);
      if (onFileChange) {
        onFileChange();
      }
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleAnalyze = async () => {
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (!fileInput?.files?.[0]) {
      alert('Please select a file first');
      return;
    }

    setIsLoading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('proposal_file', fileInput.files[0]);

      // Use XMLHttpRequest for upload progress tracking
      const resultData = await new Promise<ResultData[]>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const percentComplete = (e.loaded / e.total) * 100;
            setUploadProgress(percentComplete);
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const response = JSON.parse(xhr.responseText);
              resolve(response);
            } catch (error) {
              reject(new Error('Failed to parse response'));
            }
          } else {
            reject(new Error(`Request failed with status ${xhr.status}`));
          }
        });

        xhr.addEventListener('error', () => {
          reject(new Error('Network error occurred'));
        });

        xhr.open('POST', `${API_URL}/api/v1/green-analysis`);
        xhr.send(formData);
      });

      onResult(resultData);
      setIsLoading(false);
      setUploadProgress(100);
      
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error('Error analyzing project:', error);
      setIsLoading(false);
      setUploadProgress(0);
      alert('Failed to analyze project. Please try again.');
    }
  };

  return (
    <>
      {/* Main container*/}
      <div className="flex flex-col items-center bg-white-100 border-2 border-green-800 rounded-lg p-12 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6 self-start w-full">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Upload className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">Upload Your Project</h2>
        </div>
        <div className="flex flex-col gap-4 mt-8 w-full">
          <label className="relative w-full">
            <input
              className="hidden"
              type="file"
              accept=".pdf"
              id="file-upload"
              onChange={handleFileChange}
            />
            <div className="border-2 border-dashed border-green-500 rounded-lg p-12 cursor-pointer hover:bg-green-100 transition-colors flex flex-col items-center justify-center min-h-[300px]">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                  <Upload className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-center">
                  <span className="text-green-600 font-medium">Click here</span>
                  <span className="text-gray-700"> to upload your file or drag</span>
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Supported Format: PDF 10mb max
                </p>
              </div>
            </div>
          </label>

          {/* Selected File Display */}
          {selectedFile && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <FileText className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleRemoveFile}
                  className="ml-2 p-1 hover:bg-green-200 rounded-full transition-colors flex-shrink-0"
                  type="button"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          )}

          {/* Upload Progress Bar */}
          {isLoading && (
            <div className="w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {uploadProgress < 100 ? 'Uploading & Analyzing...' : 'Analysis Complete!'}
                </span>
                <span className="text-sm text-gray-600">{Math.round(uploadProgress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-500 h-2.5 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
        {/*Informative side section*/}
        <div className="mt-6 bg-blue-50 border min-w-full border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-900">
              <p className="font-semibold mb-1">What should be in your PDF?</p>
              <ul className="space-y-1 text-blue-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Project description and objectives
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Location and environmental context
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Sustainability measures and green initiatives
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {/* Analyze button*/}
        <button 
          className="bg-green-500 text-white px-6 py-3 self-end rounded-md hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
          onClick={handleAnalyze}
          disabled={isLoading}
        >
          {isLoading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>
    </>
  );
}
