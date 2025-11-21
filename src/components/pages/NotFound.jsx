import React from "react";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full mb-6">
            <ApperIcon name="FileQuestion" className="w-12 h-12 text-slate-600" />
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
            404
          </h1>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Page Not Found
          </h2>
          <p className="text-slate-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Button onClick={handleGoHome} size="lg">
            <ApperIcon name="Home" className="w-5 h-5 mr-2" />
            Back to TaskFlow
          </Button>
          
          <div className="text-sm text-slate-500">
            Get back to managing your tasks efficiently
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;