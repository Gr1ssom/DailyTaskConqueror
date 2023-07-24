import React, { useState } from 'react';
import './Home.css';  // Importing the styles

function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const handleRemoveTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div className="home-container">
      <h1>Welcome to Your Dashboard</h1>
      
      <div className="content">
        {/* Task List */}
        <div className="task-list-section">
          <h2>Completed Tasks</h2>
          <ul className="task-list">
            {tasks.map((task, index) => (
              <li className="task-item" key={index}>
                {task} 
                <button className="remove-task-button" onClick={() => handleRemoveTask(index)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Task Creation Center */}
        <div className="task-creation-center">
          <h2>Create New Task</h2>
          <input 
            className="new-task-input"
            value={newTask} 
            onChange={(e) => setNewTask(e.target.value)} 
            placeholder="Enter new task" 
          />
          <button className="add-task-button" onClick={handleAddTask}>Add Task</button>
        </div>
      </div>
      
    </div>
  );
}

export default Home;
