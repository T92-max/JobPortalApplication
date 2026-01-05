import React from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Search, TrendingUp, List, Plus } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Find Your Dream Job Today
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover thousands of job opportunities with all the information you need. 
            It's your future. Come find it. Manage all your job applications from start to finish.
          </p>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate("/allposts")}
              className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl text-lg"
            >
              <List size={24} />
              View All Jobs
            </button>
            <button
              onClick={() => navigate("/create")}
              className="flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-all text-lg"
            >
              <Plus size={24} />
              Post a Job
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all">
            <div className="bg-indigo-100 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
              <Search className="text-indigo-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Easy Job Search
            </h3>
            <p className="text-gray-600">
              Search and filter through thousands of job listings to find the perfect match for your skills.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all">
            <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
              <Briefcase className="text-purple-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Top Companies
            </h3>
            <p className="text-gray-600">
              Connect with leading companies and startups looking for talented individuals like you.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all">
            <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Career Growth
            </h3>
            <p className="text-gray-600">
              Find opportunities that match your career goals and help you grow professionally.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">1000+</div>
              <div className="text-gray-600">Active Jobs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">500+</div>
              <div className="text-gray-600">Companies</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">5000+</div>
              <div className="text-gray-600">Happy Users</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;