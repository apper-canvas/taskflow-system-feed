import React, { useState } from "react";
import { motion } from "framer-motion";
import { format, isToday, isTomorrow, isPast } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const TaskCard = ({ task, onComplete, onDelete, onEdit, className }) => {
  const [isCompleting, setIsCompleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleComplete = async () => {
    setIsCompleting(true);
    await onComplete(task.Id);
    setIsCompleting(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(task.Id);
    setIsDeleting(false);
    setShowDeleteConfirm(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "high";
      case "medium": return "medium";
      case "low": return "low";
      default: return "default";
    }
  };

  const formatDueDate = (dueDate) => {
    if (!dueDate) return null;
    
    const date = new Date(dueDate);
    const today = new Date();
    
    if (isToday(date)) {
      return { text: "Today", urgent: true };
    } else if (isTomorrow(date)) {
      return { text: "Tomorrow", urgent: true };
    } else if (isPast(date)) {
      return { text: `Overdue (${format(date, "MMM d")})`, urgent: true, overdue: true };
    } else {
      return { text: format(date, "MMM d, yyyy"), urgent: false };
    }
  };

  const dueDateInfo = formatDueDate(task.dueDate);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      whileHover={{ y: -2 }}
      className={cn(
        "bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-200",
        task.completed && "opacity-75",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3 flex-1 min-w-0">
          <button
            onClick={handleComplete}
            disabled={isCompleting}
            className="mt-1 flex-shrink-0"
          >
            <div className={cn(
              "task-checkbox",
              task.completed && "opacity-75",
              isCompleting && "animate-pulse"
            )}>
              {isCompleting && (
                <ApperIcon name="Loader2" className="w-4 h-4 animate-spin text-primary absolute top-0.5 left-0.5" />
              )}
            </div>
          </button>
          
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              "text-lg font-semibold text-slate-800 leading-tight mb-2",
              task.completed && "line-through text-slate-500"
            )}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className={cn(
                "text-slate-600 text-sm leading-relaxed",
                task.completed && "text-slate-400"
              )}>
                {task.description}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-start space-x-2 ml-4 flex-shrink-0">
          <Badge variant={getPriorityColor(task.priority)} size="sm">
            {task.priority}
          </Badge>
          
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2 text-slate-400 hover:text-error hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <ApperIcon name="Trash2" className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center space-x-1">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-2 py-1 text-xs font-medium text-white bg-error hover:bg-red-600 rounded transition-colors duration-200"
              >
                {isDeleting ? (
                  <ApperIcon name="Loader2" className="w-3 h-3 animate-spin" />
                ) : (
                  "Yes"
                )}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-2 py-1 text-xs font-medium text-slate-600 hover:text-slate-800 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        {dueDateInfo ? (
          <div className={cn(
            "flex items-center space-x-1 text-sm",
            dueDateInfo.overdue ? "text-error font-medium" : 
            dueDateInfo.urgent ? "text-warning font-medium" : "text-slate-500"
          )}>
            <ApperIcon 
              name={dueDateInfo.overdue ? "AlertTriangle" : "Calendar"} 
              className="w-4 h-4" 
            />
            <span>{dueDateInfo.text}</span>
          </div>
        ) : (
          <div className="flex items-center space-x-1 text-sm text-slate-400">
            <ApperIcon name="Calendar" className="w-4 h-4" />
            <span>No due date</span>
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400">
            {task.completed ? (
              `Completed ${format(new Date(task.completedAt), "MMM d")}`
            ) : (
              `Created ${format(new Date(task.createdAt), "MMM d")}`
            )}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;