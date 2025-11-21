import React from "react";

const Loading = ({ message = "Loading tasks..." }) => {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="text-center py-8">
        <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-600 font-medium">{message}</p>
      </div>
      
      {/* Skeleton task cards */}
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="h-6 bg-slate-200 rounded-lg w-3/4 mb-2"></div>
              <div className="h-4 bg-slate-100 rounded w-full mb-1"></div>
              <div className="h-4 bg-slate-100 rounded w-2/3"></div>
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <div className="w-20 h-6 bg-slate-200 rounded-full"></div>
              <div className="w-6 h-6 bg-slate-200 rounded"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="h-4 bg-slate-100 rounded w-24"></div>
            <div className="w-24 h-8 bg-slate-200 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;