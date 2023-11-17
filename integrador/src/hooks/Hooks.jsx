import { useState, useEffect } from 'react';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Carga las variables de entorno desde .env

const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_MONGODB_URI}/tasks`);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks: ', error);
      }
    };

    fetchTasks();
  }, []);

  const handleToggle = async (taskId, completed) => {
    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, completed } : task
    );
    setTasks(updatedTasks);

    try {
      await axios.put(`${process.env.REACT_APP_MONGODB_URI}/tasks/${taskId}`, { completed });
    } catch (error) {
      console.error('Error updating task: ', error);
    }
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return { tasks, handleToggle, totalTasks, completedTasks, pendingTasks };
};

export default useTasks;
