import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Target, Loader2 } from "lucide-react";

const CandidateMatch = () => {
  const { jobId } = useParams(); // Get jobId from URL
  const [candidateSkills, setCandidateSkills] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleMatchCandidate = async () => {
    if (!candidateSkills.trim()) {
      setError("Please enter candidate skills");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `http://localhost:8080/ai/match-candidate/${jobId}`,
        { skills: candidateSkills }
      );

      setAnalysis(response.data.analysis);
    } catch (err) {
      console.error("Error:", err);
      setError(err.response?.data?.error || "Failed to analyze match");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <Target className="text-indigo-600" size={32} />
          <h2 className="text-2xl font-bold text-gray-900">Match Candidate to Job</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Candidate Skills
            </label>
            <textarea
              value={candidateSkills}
              onChange={(e) => setCandidateSkills(e.target.value)}
              placeholder="E.g., React, TypeScript, Node.js, MongoDB, REST APIs, 3 years experience..."
              rows={4}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleMatchCandidate}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Analyzing Match...
              </>
            ) : (
              <>
                <Target size={20} />
                Analyze Match
              </>
            )}
          </button>

          {analysis && (
            <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Match Analysis:</h3>
              <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
                {analysis}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateMatch;