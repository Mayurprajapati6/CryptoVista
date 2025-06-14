import React from 'react';

function CoinTableSkeleton() {
  return (
    <div className="animate-pulse space-y-6 p-4">
      {/* Profile Picture and Header */}
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full"></div> {/* Profile Picture */}
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-1/3"></div> {/* Name */}
          <div className="h-4 bg-gray-300 rounded w-1/4"></div> {/* Date/Details */}
        </div>
      </div>

      {/* Content Block */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </div>

      {/* Image/Media Placeholder */}
      <div className="h-48 bg-gray-300 rounded-md"></div>

      {/* Actions Bar */}
      <div className="flex items-center space-x-4 mt-4">
        <div className="w-16 h-8 bg-gray-300 rounded-md"></div>
        <div className="w-16 h-8 bg-gray-300 rounded-md"></div>
        <div className="w-16 h-8 bg-gray-300 rounded-md"></div>
      </div>
    </div>
  );
}

export default CoinTableSkeleton;
