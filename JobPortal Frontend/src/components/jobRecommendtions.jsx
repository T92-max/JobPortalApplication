import React, { useState } from "react";
import axios from "axios";
import { Sparkles, Loader2, User } from "lucide-react";

const jobRecommendations = () => {
  const [userProfile, setUserProfile] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGetRecommendations = async () => {
    if (!userProfile.trim()) {
      setError("Please enter your profile");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/ai/recommend-jobs", {
        profile: userProfile
      });

      setRecommendations(response.data.recommendations);
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to get recommendations. Make sure Ollama is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <User className="text-indigo-600" size={32} />
          <h2 className="text-2xl font-bold text-gray-900">Get AI Job Recommendations</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your Profile
            </label>
            <textarea
              value={userProfile}
              onChange={(e) => setUserProfile(e.target.value)}
              placeholder="E.g., I'm a frontend developer with 3 years experience in React, TypeScript, and Node.js. I'm looking for remote opportunities..."
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
            onClick={handleGetRecommendations}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Getting Recommendations...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Get Recommendations
              </>
            )}
          </button>

          {recommendations && (
            <div className="mt-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-indigo-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Your Recommendations:</h3>
              <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
                {recommendations}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default jobRecommendations;