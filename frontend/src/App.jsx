import { useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css'

function App() {
  const [tasks, setTasks] = useLocalStorage('tasks', []);

  // Each task now has: id, title, notes, date, completed
  const addTask = ({ title, notes, date }) => {
    setTasks([
      ...tasks,
      {
        id: crypto.randomUUID(),
        title,
        notes: notes || '',
        date: date || null,
        completed: false,
      },
    ]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div className="page">
      <div className="card">
        <div className="card-header">
          <h1>My Tasks</h1>
        </div>

        <TaskForm onAdd={addTask} />

        <TaskList
          tasks={activeTasks}
          completedTasks={completedTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      </div>
    </div>
  );
}

export default App;