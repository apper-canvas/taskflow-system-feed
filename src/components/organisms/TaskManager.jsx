import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import TaskForm from "@/components/molecules/TaskForm";
import FilterBar from "@/components/molecules/FilterBar";
import TaskList from "@/components/organisms/TaskList";
import taskService from "@/services/api/taskService";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilters, setPriorityFilters] = useState(["high", "medium", "low"]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
      console.error("Error loading tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddTask = async (taskData) => {
    try {
      setIsSubmitting(true);
      const newTask = await taskService.create(taskData);
      setTasks(prevTasks => [newTask, ...prevTasks]);
    } catch (err) {
      console.error("Error creating task:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      const task = tasks.find(t => t.Id === taskId);
      const updatedTask = await taskService.update(taskId, { 
        completed: !task.completed 
      });
      setTasks(prevTasks => 
        prevTasks.map(t => t.Id === taskId ? updatedTask : t)
      );
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.delete(taskId);
      setTasks(prevTasks => prevTasks.filter(t => t.Id !== taskId));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };

  const handlePriorityFilterChange = (priority) => {
    setPriorityFilters(prev => {
      if (prev.includes(priority)) {
        return prev.filter(p => p !== priority);
      } else {
        return [...prev, priority];
      }
    });
  };

  // Filter tasks based on current filters
  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];

    // Filter by status
    if (statusFilter === "active") {
      filtered = filtered.filter(task => !task.completed);
    } else if (statusFilter === "completed") {
      filtered = filtered.filter(task => task.completed);
    }

    // Filter by priority
    filtered = filtered.filter(task => 
      priorityFilters.includes(task.priority)
    );

    return filtered;
  }, [tasks, statusFilter, priorityFilters]);

  // Task counts for badges
  const taskCounts = useMemo(() => {
    const activeTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);
    
    return {
      total: tasks.length,
      active: activeTasks.length,
      completed: completedTasks.length
    };
  }, [tasks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl mb-4">
            <ApperIcon name="CheckSquare" className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
            TaskFlow
          </h1>
          <p className="text-lg text-slate-600 max-w-md mx-auto">
            Stay organized and productive with your personal task manager
          </p>
        </motion.div>

        {/* Task Form */}
        <TaskForm 
          onSubmit={handleAddTask}
          isSubmitting={isSubmitting}
        />

        {/* Filter Bar */}
        <FilterBar
          statusFilter={statusFilter}
          onStatusFilterChange={handleStatusFilterChange}
          priorityFilters={priorityFilters}
          onPriorityFilterChange={handlePriorityFilterChange}
          taskCounts={taskCounts}
        />

        {/* Task List */}
        <TaskList
          tasks={filteredTasks}
          loading={loading}
          error={error}
          onComplete={handleCompleteTask}
          onDelete={handleDeleteTask}
          onRetry={loadTasks}
        />
      </div>
    </div>
  );
};

export default TaskManager;