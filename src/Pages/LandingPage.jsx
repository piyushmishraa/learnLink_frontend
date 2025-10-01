import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 overflow-x-hidden relative">
      {/* Background blobs - fixed to viewport */}
      <div className="fixed -top-24 -right-24 w-96 h-96 bg-gradient-to-tr from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
      <div className="fixed -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-pink-200 to-yellow-200 rounded-full blur-3xl opacity-40 pointer-events-none"></div>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center flex-1 px-6 py-16 relative">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 text-center relative z-10">
          Welcome to Learn-Link
        </h1>
        <p className="text-gray-600 text-lg md:text-xl mb-12 text-center max-w-xl relative z-10">
          Empowering your learning journey. Share resources, explore insights, and grow with the community.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 relative z-10">
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 bg-black text-white rounded-lg shadow-lg hover:bg-black/90 transition-colors font-medium"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="px-6 py-3 bg-white text-black rounded-lg shadow-lg border border-gray-300 hover:bg-gray-50 transition-colors font-medium"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 py-16 max-w-5xl mx-auto relative z-10">
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">📚 Share Knowledge</h3>
          <p className="text-gray-600 text-sm">Post resources and insights that help others learn faster.</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">🔍 Discover Resources</h3>
          <p className="text-gray-600 text-sm">Find curated learning material from the community.</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">🤝 Grow Together</h3>
          <p className="text-gray-600 text-sm">Engage with peers and expand your learning journey.</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm border-t relative z-10">
        © {new Date().getFullYear()} KnowledgeHub. All rights reserved.
      </footer>
    </div>
  );
}

export default LandingPage;
