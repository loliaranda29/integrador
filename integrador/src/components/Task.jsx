import React from 'react';

const Task = ({ task, onToggle }) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task._id, !task.completed)}
      />
      <span>{task.name}</span>
    </div>
  );
};

export default Task;
