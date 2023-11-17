import React, { useState } from 'react';

function Task({ task, editTask, deleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(task.name);

  const handleSave = () => {
    editTask(task.id, newName, task.completed);
    setIsEditing(false);
  };

  return (
    <div>
    <input
  type="checkbox"
  checked={task.completed}
  onChange={() => editTask(task.id, newName, !task.completed)}
/>
    {isEditing ? (
        <>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.name}
          </span>
        </>
      )}
      <button onClick={() => setIsEditing(!isEditing)}>
          <span role="img" aria-label="Cancelar edición">
           ✏️
          </span>
        </button>
        
        <button onClick={() => deleteTask(task.id)}>
          <span role="img" aria-label="Eliminar tarea">
            🗑️
          </span>
        </button>
      </div>
    );
  }


export default Task;

