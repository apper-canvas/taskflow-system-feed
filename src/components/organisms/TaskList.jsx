import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskCard from "@/components/molecules/TaskCard";
import Loading from "@/components/ui/Loading";
import ErrorView from "@/components/ui/ErrorView";
import Empty from "@/components/ui/Empty";

const TaskList = ({ 
  tasks = [], 
  loading = false, 
  error = null, 
  onComplete, 
  onDelete, 
  onEdit,
  onRetry 
}) => {
  if (loading) {
    return <Loading message="Loading your tasks..." />;
  }

  if (error) {
    return (
      <ErrorView
        message={error}
        onRetry={onRetry}
      />
    );
  }

  if (tasks.length === 0) {
    return (
      <Empty
        title="No tasks found"
        message="Add your first task above to get started and stay organized."
        icon="CheckSquare"
      />
    );
  }

  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="space-y-6">
      {/* Active Tasks */}
      {activeTasks.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
            <div className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full mr-3"></div>
            Active Tasks ({activeTasks.length})
          </h3>
          <motion.div className="space-y-3" layout>
            <AnimatePresence>
              {activeTasks.map((task) => (
                <TaskCard
                  key={task.Id}
                  task={task}
                  onComplete={onComplete}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-slate-600 mb-4 flex items-center">
            <div className="w-2 h-2 bg-gradient-to-r from-success to-emerald-600 rounded-full mr-3"></div>
            Completed ({completedTasks.length})
          </h3>
          <motion.div className="space-y-3" layout>
            <AnimatePresence>
              {completedTasks.map((task) => (
                <TaskCard
                  key={task.Id}
                  task={task}
                  onComplete={onComplete}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TaskList;