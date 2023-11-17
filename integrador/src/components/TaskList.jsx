import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, onToggle }) => {
  return (
    <div>
      {tasks.map((task) => (
        <Task key={task._id} task={task} onToggle={onToggle} />
      ))}
    </div>
  );
};

export default TaskList;
