import React from 'react';

function KnowledgeBanner() {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-2xl p-6 flex items-center shadow-sm mt-4 py-10 ">
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-gray-900">Knowledge for curious minds</h2>
        <p className="text-gray-500 text-sm mt-1">
          Explore concise insights, deep dives, and practical wisdom from the community.
        </p>
      </div>
      <div className="hidden md:block bg-blue-50 rounded-r-2xl w-1/3 h-full"></div>
    </div>
  );
}

export default KnowledgeBanner;
