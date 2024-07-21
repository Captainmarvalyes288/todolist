import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEditing = (task) => {
    setEditingTask(task);
    setNewTask(task.text);
  };

  const updateTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks(tasks.map(task =>
        task.id === editingTask.id ? { ...task, text: newTask } : task
      ));
      setNewTask('');
      setEditingTask(null);
    }
  };

  return (
    <div className="App">
      <h1>Task Tracker</h1>
      <form onSubmit={editingTask ? updateTask : addTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder={editingTask ? "Update task" : "Enter a new task"}
        />
        <button type="submit">{editingTask ? "Update Task" : "Add Task"}</button>
        {editingTask && (
          <button type="button" onClick={() => setEditingTask(null)}>Cancel</button>
        )}
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span 
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
              onClick={() => toggleComplete(task.id)}
            >
              {task.text}
            </span>
            <button onClick={() => startEditing(task)}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;