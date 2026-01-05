import React, { useEffect, useState } from "react";
import { Trash2, Edit, Briefcase, Clock, Code, Target } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllPosts = () => {
  const [post, setPost] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [deleting, setDeleting] = useState(null); // Track which post is being deleted
  const navigate = useNavigate();

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/jobPosts");
      console.log("Fetched posts:", response.data);
      setPost(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      alert("Failed to load job posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Search posts by keyword
  const handleSearch = async () => {
    if (keyword.trim() === "") {
      fetchPosts();
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:8080/jobPosts/keyword/${keyword}`
      );
      setPost(response.data);
    } catch (error) {
      console.error("Error searching:", error);
      alert("Search failed");
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Delete post with confirmation
  const handleDelete = async (id) => {
    // Show confirmation dialog
    const confirmed = window.confirm(
      "Are you sure you want to delete this job post? This action cannot be undone."
    );
    
    if (!confirmed) {
      return;
    }

    setDeleting(id); // Set loading state for this specific post
    
    try {
      console.log("Deleting post with ID:", id);
      const response = await axios.delete(`http://localhost:8080/jobPost/${id}`);
      console.log("Delete response:", response.data);
      
      // Remove the deleted post from state immediately
      setPost(prevPosts => prevPosts.filter(p => p.postId !== id));
      
      alert("Job post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
      console.error("Error details:", error.response?.data);
      alert("Failed to delete job post. Please try again.");
    } finally {
      setDeleting(null); // Clear loading state
    }
  };

  // Edit post
  const handleEdit = (id) => {
    navigate("/edit", { state: { id } });
  };

  // Navigate to candidate matching
  const handleMatch = (id) => {
    navigate(`/match/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            All Job Posts
          </h1>
          <p className="text-gray-600">
            Browse and search through all available job opportunities
          </p>
        </div>

        {/* Search Box */}
        <div className="mb-8 flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search by job title, description, or skills..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-6 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
          />
          <button
            onClick={handleSearch}
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            Search
          </button>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            Found{" "}
            <span className="font-semibold text-indigo-600">
              {post.length}
            </span>{" "}
            job{post.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {post.map((p) => (
            <div
              key={p.postId}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200 group"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase className="text-white" size={24} />
                    <h3 className="text-xl font-bold text-white">
                      {p.postProfile}
                    </h3>
                  </div>
                  <span className="text-xs text-white bg-white bg-opacity-20 px-2 py-1 rounded">
                    ID: {p.postId}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <p className="text-gray-600 mb-4 line-clamp-3">{p.postDesc}</p>

                {/* Experience */}
                <div className="flex items-center gap-2 mb-4 text-gray-700">
                  <Clock size={18} className="text-indigo-500" />
                  <span className="font-medium">
                    {p.reqExperience} years experience
                  </span>
                </div>

                {/* Tech Stack */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Code size={18} className="text-indigo-500" />
                    <span className="font-semibold text-gray-700">Skills:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {p.postTechStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* AI Match Button - NEW */}
                <div className="mb-3">
                  <button
                    onClick={() => handleMatch(p.postId)}
                    disabled={deleting === p.postId}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-medium hover:from-purple-600 hover:to-indigo-700 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Target size={18} />
                    Match Candidate with AI
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleEdit(p.postId)}
                    disabled={deleting === p.postId}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Edit size={18} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.postId)}
                    disabled={deleting === p.postId}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 size={18} />
                    {deleting === p.postId ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {post.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Briefcase size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No jobs found
            </h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPosts;