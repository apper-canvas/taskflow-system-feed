import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import { cn } from "@/utils/cn";

const FilterBar = ({ 
  statusFilter, 
  onStatusFilterChange, 
  priorityFilters, 
  onPriorityFilterChange,
  taskCounts 
}) => {
  const statusOptions = [
    { value: "all", label: "All Tasks", count: taskCounts.total },
    { value: "active", label: "Active", count: taskCounts.active },
    { value: "completed", label: "Completed", count: taskCounts.completed }
  ];

  const priorityOptions = [
    { value: "high", label: "High", color: "high" },
    { value: "medium", label: "Medium", color: "medium" },
    { value: "low", label: "Low", color: "low" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 mb-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        {/* Status Filter */}
        <div className="flex items-center space-x-1">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onStatusFilterChange(option.value)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2",
                statusFilter === option.value
                  ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
                  : "text-slate-600 hover:text-slate-800 hover:bg-slate-100"
              )}
            >
              <span>{option.label}</span>
              <Badge 
                variant={statusFilter === option.value ? "default" : "default"}
                size="sm"
                className={statusFilter === option.value ? "bg-white/20 text-white" : ""}
              >
                {option.count}
              </Badge>
            </button>
          ))}
        </div>

        {/* Priority Filters */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-slate-600 mr-2">Priority:</span>
          {priorityOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onPriorityFilterChange(option.value)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1",
                priorityFilters.includes(option.value)
                  ? "bg-gradient-to-r from-slate-800 to-slate-600 text-white shadow-md"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50 border border-slate-200"
              )}
            >
              <div className={cn(
                "w-2 h-2 rounded-full",
                option.color === "high" && "bg-error",
                option.color === "medium" && "bg-warning", 
                option.color === "low" && "bg-info"
              )} />
              <span>{option.label}</span>
              {priorityFilters.includes(option.value) && (
                <ApperIcon name="Check" className="w-3 h-3" />
              )}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FilterBar;