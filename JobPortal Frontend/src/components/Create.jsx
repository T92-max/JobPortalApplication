import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Save, Briefcase, Sparkles, Loader2 } from "lucide-react";

const initial = {
  postId: 0,
  postProfile: "",
  reqExperience: 0,
  postDesc: "",
  postTechStack: [],
};

const Create = () => {
  const skillSet = [
    { name: "Javascript" },
    { name: "Java" },
    { name: "Python" },
    { name: "Django" },
    { name: "Rust" },
    {name: "React"},
    {name : "Nodejs"},
    { name: "Spring Boot" },
    { name: "HTML" },
    {name: "CSS"},
    {name : "Spring"}
  ];

  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState("");

  // Generate job description using AI
  const handleGenerateDescription = async () => {
    // Validation
    if (!form.postProfile) {
      setAiError("Please enter a job profile first");
      return;
    }
    if (form.postTechStack.length === 0) {
      setAiError("Please select at least one skill");
      return;
    }

    setIsGenerating(true);
    setAiError("");

    try {
      const response = await axios.post("http://localhost:8080/ai/generate-description", {
        jobTitle: form.postProfile,
        skills: form.postTechStack.join(", ")
      });

      setForm({ ...form, postDesc: response.data.description });
    } catch (error) {
      console.error("AI Error:", error);
      setAiError(error.response?.data?.error || "Failed to generate description. Make sure Ollama is running.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const payload = {
      ...form,
      reqExperience: parseInt(form.reqExperience) || 0
    };
    
    console.log("Sending payload:", payload);
    
    axios
      .post("http://localhost:8080/jobPost", payload)
      .then((resp) => {
        console.log("Created:", resp.data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error details:", error.response?.data || error.message);
      });
  };

  // Handle checkbox change
  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setForm({ ...form, postTechStack: [...form.postTechStack, value] });
    } else {
      setForm({
        ...form,
        postTechStack: form.postTechStack.filter((skill) => skill !== value),
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Briefcase className="text-indigo-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-900">Create New Job Post</h1>
          </div>
          <p className="text-gray-600">Fill in the details to post a new job opening</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Post ID */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Post ID *
              </label>
              <input
                type="number"
                required
                value={form.postId}
                onChange={(e) =>
                  setForm({ ...form, postId: parseInt(e.target.value) || 0 })
                }
                placeholder="e.g., 3"
                min="0"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              />
            </div>

            {/* Job Profile */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Job Profile *
              </label>
              <input
                type="text"
                required
                value={form.postProfile}
                onChange={(e) =>
                  setForm({ ...form, postProfile: e.target.value })
                }
                placeholder="e.g., Senior React Developer"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              />
            </div>

            {/* Years of Experience */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Years of Experience *
              </label>
              <input
                type="number"
                required
                value={form.reqExperience}
                onChange={(e) =>
                  setForm({ ...form, reqExperience: parseInt(e.target.value) || 0 })
                }
                placeholder="e.g., 3"
                min="0"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              />
            </div>

            {/* Required Skills */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Required Skills *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {skillSet.map(({ name }, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 hover:border-indigo-300 cursor-pointer transition-all"
                  >
                    <input
                      type="checkbox"
                      id={`custom-checkbox-${index}`}
                      name={name}
                      value={name}
                      onChange={handleSkillChange}
                      checked={form.postTechStack.includes(name)}
                      className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                    />
                    <span className="text-gray-700 font-medium">{name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Job Description with AI */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Job Description *
                </label>
                <button
                  type="button"
                  onClick={handleGenerateDescription}
                  disabled={isGenerating}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      Generate with AI
                    </>
                  )}
                </button>
              </div>
              
              {aiError && (
                <div className="mb-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {aiError}
                </div>
              )}
              
              <textarea
                required
                value={form.postDesc}
                onChange={(e) => setForm({ ...form, postDesc: e.target.value })}
                placeholder="Describe the role, responsibilities, and requirements... or click 'Generate with AI' to create one automatically!"
                rows={6}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none"
              />
              <p className="mt-1 text-xs text-gray-500">
                💡 Tip: Fill in the job profile and skills first, then click "Generate with AI"
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              <Save size={20} />
              Create Job Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;