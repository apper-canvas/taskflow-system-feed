import tasksData from "@/services/mockData/tasks.json";
import { toast } from "react-toastify";

class TaskService {
  constructor() {
    this.storageKey = "taskflow_tasks";
    this.initializeData();
  }

  initializeData() {
    const existingData = localStorage.getItem(this.storageKey);
    if (!existingData) {
      localStorage.setItem(this.storageKey, JSON.stringify(tasksData));
    }
  }

  getData() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  saveData(tasks) {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200));
  }

  async getAll() {
    await this.delay();
    const tasks = this.getData();
    return [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  async getById(id) {
    await this.delay();
    const tasks = this.getData();
    const task = tasks.find(task => task.Id === parseInt(id));
    return task ? { ...task } : null;
  }

  async create(taskData) {
    await this.delay();
    const tasks = this.getData();
    const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.Id)) : 0;
    
    const newTask = {
      Id: maxId + 1,
      title: taskData.title,
      description: taskData.description || "",
      priority: taskData.priority || "medium",
      dueDate: taskData.dueDate || "",
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };

    const updatedTasks = [newTask, ...tasks];
    this.saveData(updatedTasks);
    toast.success("Task created successfully!");
    return { ...newTask };
  }

  async update(id, updateData) {
    await this.delay();
    const tasks = this.getData();
    const taskIndex = tasks.findIndex(task => task.Id === parseInt(id));
    
    if (taskIndex === -1) {
      toast.error("Task not found!");
      return null;
    }

    const updatedTask = {
      ...tasks[taskIndex],
      ...updateData
    };

    // If completing a task, set completedAt
    if (updateData.completed && !tasks[taskIndex].completed) {
      updatedTask.completedAt = new Date().toISOString();
    }
    
    // If uncompleting a task, clear completedAt
    if (updateData.completed === false && tasks[taskIndex].completed) {
      updatedTask.completedAt = null;
    }

    tasks[taskIndex] = updatedTask;
    this.saveData(tasks);
    
    if (updateData.completed) {
      toast.success("Task completed! 🎉");
    } else {
      toast.success("Task updated successfully!");
    }
    
    return { ...updatedTask };
  }

  async delete(id) {
    await this.delay();
    const tasks = this.getData();
    const filteredTasks = tasks.filter(task => task.Id !== parseInt(id));
    
    if (filteredTasks.length === tasks.length) {
      toast.error("Task not found!");
      return false;
    }

    this.saveData(filteredTasks);
    toast.success("Task deleted successfully!");
    return true;
  }

  async getByStatus(status) {
    await this.delay();
    const tasks = this.getData();
    let filteredTasks = [...tasks];
    
    if (status === "active") {
      filteredTasks = tasks.filter(task => !task.completed);
    } else if (status === "completed") {
      filteredTasks = tasks.filter(task => task.completed);
    }
    
    return filteredTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  async getByPriority(priority) {
    await this.delay();
    const tasks = this.getData();
    const filteredTasks = tasks.filter(task => task.priority === priority);
    return filteredTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  getTaskCounts() {
    const tasks = this.getData();
    const activeTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);
    
    return {
      total: tasks.length,
      active: activeTasks.length,
      completed: completedTasks.length
    };
  }
}

export default new TaskService();