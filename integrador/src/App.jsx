import { ChakraProvider } from '@chakra-ui/react';
import theme from './components/Theme';
import React, { useState, useEffect } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import Header from './components/Header';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', completed: false });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/tasks'); // Ruta en tu backend
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    try {
      const response = await fetch('/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });
      const data = await response.json();
      setTasks([...tasks, data]);
      setNewTask({ name: '', completed: false });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const editTask = async (taskId, newName, newCompleted) => {
    try {
      const response = await fetch(`/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName, completed: newCompleted }),
      });
  
      if (response.ok) {
        const updatedTasks = tasks.map((task) =>
          task.id === taskId ? { ...task, name: newName, completed: newCompleted } : task
        );
        setTasks(updatedTasks);
      } else {
        console.error('Failed to edit task');
      }
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };
  
  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`/tasks/${taskId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
      } else {
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  
  const handleTaskSubmission = (event) => {
    event.preventDefault();
    addTask();
  };
  
  const handleInputChange = (e) => {
    setNewTask({ ...newTask, name: e.target.value });
  };
  
  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <Header />
        <form onSubmit={handleTaskSubmission}>
          <div className="task-container">
            <div className="task-add">
              <input
                type="text"
                placeholder="Nueva tarea"
                value={newTask.name}
                onChange={handleInputChange}
              />
              <button type="submit">
                <span role="img" aria-label="Agregar tarea">
                  ➕
                </span>
              </button>
            </div>
          </div>
        </form>
        <TaskList tasks={tasks} editTask={editTask} deleteTask={deleteTask} />
      </div>
    </ChakraProvider>
  );
  };

export default App;