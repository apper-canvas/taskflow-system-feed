import React from "react";
import ApperIcon from "@/components/ApperIcon";

const ErrorView = ({ 
  message = "Something went wrong while loading your tasks.",
  onRetry,
  showRetry = true 
}) => {
  return (
    <div className="text-center py-12 px-4">
      <div className="mx-auto w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name="AlertCircle" className="w-10 h-10 text-error" />
      </div>
      
      <h3 className="text-xl font-semibold text-slate-800 mb-2">
        Oops! Something went wrong
      </h3>
      
      <p className="text-slate-600 mb-6 max-w-md mx-auto leading-relaxed">
        {message}
      </p>
      
      {showRetry && onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:from-primary/90 hover:to-secondary/90 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <ApperIcon name="RefreshCw" className="w-5 h-5 mr-2" />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorView;