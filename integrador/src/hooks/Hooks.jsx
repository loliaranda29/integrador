import { useState, useEffect } from 'react';
import axios from 'axios';
import connectDB from '../services/mongo';

const useTaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', completed: false });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tasks'); // Cambia la URL a tu endpoint real
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    const updateTasks = async () => {
      try {
        await axios.put('http://localhost:5000/tasks', { tasks });
      } catch (error) {
        console.error('Error updating tasks:', error);
      }
    };

    updateTasks();
  }, [tasks]);

  const addTask = async () => {
    try {
      const response = await axios.post('http://localhost:5000/tasks', newTask);
      setTasks([...tasks, response.data]);
      setNewTask({ name: '', completed: false });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const editTask = async (taskId, newName, newCompleted) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${taskId}`, { name: newName, completed: newCompleted });
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, name: newName, completed: newCompleted } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`);
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return { tasks, newTask, setNewTask, addTask, editTask, deleteTask };
};

export default useTaskManager;
