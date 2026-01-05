import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Save, Briefcase } from "lucide-react";

const initial = {
  postId: "",
  postProfile: "",
  reqExperience: 0,
  postTechStack: [],
  postDesc: "",
};

const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(true);
  const currId = location.state.id;

  useEffect(() => {
    axios
      .get(`http://localhost:8080/jobPost/${currId}`)
      .then((resp) => {
        setForm(resp.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [currId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/jobPost/${currId}`, form);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSkillChange = (e) => {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      postTechStack: prev.postTechStack.includes(value)
        ? prev.postTechStack.filter((s) => s !== value)
        : [...prev.postTechStack, value],
    }));
  };

  const skillSet = ["Javascript", "Java", "Python", "Django", "Rust"];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-700">Loading...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Briefcase className="text-indigo-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-900">Edit Job Post</h1>
          </div>
          <p className="text-gray-600">Update the job posting details</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Post ID (Disabled) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Post ID
              </label>
              <input
                type="number"
                value={form.postId}
                disabled
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </div>

            {/* Job Profile */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Job Profile *
              </label>
              <input
                type="text"
                value={form.postProfile}
                onChange={(e) =>
                  setForm({ ...form, postProfile: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Experience (Years) *
              </label>
              <input
                type="number"
                value={form.reqExperience}
                onChange={(e) =>
                  setForm({ ...form, reqExperience: e.target.value })
                }
                min="0"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              />
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Job Description *
              </label>
              <textarea
                value={form.postDesc}
                onChange={(e) => setForm({ ...form, postDesc: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none"
              />
            </div>

            {/* Required Skills */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Required Skills
              </label>
              <div className="grid grid-cols-2 gap-3">
                {skillSet.map((skill, idx) => (
                  <label
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 hover:border-indigo-300 cursor-pointer transition-all"
                  >
                    <input
                      type="checkbox"
                      value={skill}
                      checked={form.postTechStack.includes(skill)}
                      onChange={handleSkillChange}
                      id={`skill-${idx}`}
                      className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                    />
                    <span className="text-gray-700 font-medium">{skill}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              <Save size={20} />
              Update Job Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;