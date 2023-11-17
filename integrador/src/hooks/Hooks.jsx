import { useState, useEffect } from 'react';

const UseTaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState ({ name: '', completed: false });

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (storedTasks.length > 0) {
      setTasks(storedTasks);
    }
  }, []); 

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.name.trim() !== '') {
      setTasks([
        ...tasks,
        { id: tasks.length + 1, name: newTask.name, completed: false },
      ]);
      setNewTask({ name: '', completed: false });
    }
  };

  const editTask = (taskId, newName, newCompleted) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, name: newName, completed: newCompleted } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return { tasks, newTask, setNewTask, addTask, editTask, deleteTask };
};

export default UseTaskManager;
