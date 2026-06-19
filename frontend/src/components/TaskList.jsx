import { useState } from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, completedTasks, onToggle, onDelete }) {
  const [showCompleted, setShowCompleted] = useState(false);

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}

      {completedTasks.length > 0 && (
        <div className="completed-section">
          <button
            className="completed-toggle"
            onClick={() => setShowCompleted(!showCompleted)}
          >
            <span className={`chevron ${showCompleted ? 'open' : ''}`}>▸</span>
            Completed ({completedTasks.length})
          </button>

          {showCompleted && completedTasks.map(task => (
            <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;