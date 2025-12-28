'use client'

import React, { useState } from 'react'
import { Award, FileText, MapPin, Tag, DollarSign, ChevronDown, ChevronUp, ExternalLink, Lightbulb, Building2, TrendingUp } from "lucide-react";
import { useRouter } from 'next/navigation'

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

interface ResultComponentProps {
    resultData: ResultData[];
}

export default function ResultComponent({ resultData }: ResultComponentProps) {
    // Extract data from array
    const funders = resultData.find(d => d.recommended_funders);
    const suggestions = resultData.find(d => d.suggestions);
    const projectInfo = resultData.find(d => d.project_title);
    const score = resultData.find(d => d.green_score);

    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showFunders, setShowFunders] = useState(false);

    const router = useRouter()

    const formatFunding = (funding?: string) => {
        if (!funding) return "N/A";
        const [min, max] = funding.split(' - ').map(num => parseInt(num));
        const minFormatted = (min / 1000000).toFixed(1);
        const maxFormatted = (max / 1000000).toFixed(1);
        return `$${minFormatted}M - $${maxFormatted}M`;
    };

    return (
        <div className="w-full py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col items-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                        Analysis Results
                    </h1>
                    <p className="text-gray-600">Your project sustainability analysis is ready</p>
                </div>

                {/* Green Score Card - Highlighted */}
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl p-8 mb-6 text-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                <Award className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-sm text-green-100 mb-1">Green Score</p>
                                <p className="text-5xl font-bold">{score?.green_score || 0}</p>
                                <p className="text-sm text-green-100 mt-1">out of 100</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-semibold mb-1">Potential Funding Range</p>
                            <p className="text-2xl font-bold">{formatFunding(projectInfo?.potential_funding)}</p>
                        </div>
                    </div>
                </div>

                {/* Project Information Card */}
                <div className="bg-white border-2 border-green-800 rounded-lg p-8 mb-6 shadow-lg">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-green-600" />
                        </div>
                        Project Information
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Project Title</p>
                            <p className="text-lg font-semibold text-gray-800">{projectInfo?.project_title || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                Location
                            </p>
                            <p className="text-lg font-semibold text-gray-800">{projectInfo?.project_location || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                                <Tag className="w-4 h-4" />
                                Project Type
                            </p>
                            <p className="text-lg font-semibold text-gray-800">{projectInfo?.project_type || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Description</p>
                            <p className="text-base text-gray-700 leading-relaxed">{projectInfo?.project_description || "N/A"}</p>
                        </div>
                    </div>
                </div>

                {/* Suggestions Toggle Section */}
                <div className="bg-white border-2 border-green-800 rounded-lg mb-6 shadow-lg overflow-hidden">
                    <button
                        onClick={() => setShowSuggestions(!showSuggestions)}
                        className="w-full p-6 flex items-center justify-between hover:bg-green-50 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <Lightbulb className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="text-left">
                                <h2 className="text-2xl font-semibold text-gray-800">Suggestions & Score Impact</h2>
                                <p className="text-sm text-gray-500">Improve your green score with these recommendations</p>
                            </div>
                        </div>
                        {showSuggestions ? (
                            <ChevronUp className="w-6 h-6 text-green-600" />
                        ) : (
                            <ChevronDown className="w-6 h-6 text-green-600" />
                        )}
                    </button>
                    {showSuggestions && (
                        <div className="px-6 pb-6 space-y-4">
                            {suggestions?.suggestions?.map((suggestion, index) => (
                                <div key={index} className="bg-green-50 rounded-lg p-4 border border-green-200">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-gray-800 mb-2">{suggestion}</p>
                                            <div className="flex items-center gap-2 text-sm">
                                                <TrendingUp className="w-4 h-4 text-green-600" />
                                                <span className="font-semibold text-green-600">
                                                    Score Impact: +{suggestions?.score_impact?.[index] || 0} points
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Funders Toggle Section */}
                <div className="bg-white border-2 border-green-800 rounded-lg mb-6 shadow-lg overflow-hidden">
                    <button
                        onClick={() => setShowFunders(!showFunders)}
                        className="w-full p-6 flex items-center justify-between hover:bg-green-50 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <Building2 className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="text-left">
                                <h2 className="text-2xl font-semibold text-gray-800">Recommended Funders</h2>
                                <p className="text-sm text-gray-500">
                                    {funders?.recommended_funders?.length || 0} potential funding partners
                                </p>
                            </div>
                        </div>
                        {showFunders ? (
                            <ChevronUp className="w-6 h-6 text-green-600" />
                        ) : (
                            <ChevronDown className="w-6 h-6 text-green-600" />
                        )}
                    </button>
                    {showFunders && (
                        <div className="px-6 pb-6 space-y-4">
                            {funders?.recommended_funders?.map((funder, index) => (
                                <div key={index} className="bg-blue-50 rounded-lg p-5 border border-blue-200">
                                    <div className="flex items-start justify-between gap-4 mb-2">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{funder}</h3>
                                            <p className="text-sm text-gray-600 mb-3">
                                                {funders?.company_description?.[index]}
                                            </p>
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2">
                                                    <DollarSign className="w-4 h-4 text-green-600" />
                                                    <span className="text-sm font-semibold text-gray-700">
                                                        {funders?.estimated_investment?.[index]}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {funders?.company_website?.[index] && (
                                        <a
                                            href={funders.company_website[index]}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium mt-2"
                                        >
                                            Visit Website
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

