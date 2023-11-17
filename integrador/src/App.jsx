import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Header from './components/Header';
import TaskList from './components/TaskList';
import useTasks from './hooks/Hooks';


const App = () => {
  const { tasks, handleToggle, totalTasks, completedTasks, pendingTasks } = useTasks();

  return (
    <>
    <ChakraProvider>
      <Header />
      <form>
        <TaskList tasks={tasks} onToggle={handleToggle} />
        <p>Total tasks: {totalTasks}</p>
        <p>Completed tasks: {completedTasks}</p>
        <p>Pending tasks: {pendingTasks}</p>
      </form>
    </ChakraProvider>
    </>
  );
};

export default App;
