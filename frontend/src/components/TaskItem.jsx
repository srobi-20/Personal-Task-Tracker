function formatRelative(dateStr) {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  const diffMs = Date.now() - date.getTime();
  const overdue = diffMs > 0;
  const days = Math.floor(Math.abs(diffMs) / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(days / 7);

  let label;
  if (weeks > 0) label = `${weeks} week${weeks > 1 ? 's' : ''}`;
  else if (days > 0) label = `${days} day${days > 1 ? 's' : ''}`;
  else label = 'today';

  return { label: overdue ? `${label} ago` : `in ${label}`, overdue };
}

function TaskItem({ task, onToggle, onDelete }) {
  const rel = formatRelative(task.date);

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <button
        className="task-checkbox"
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {task.completed ? '✓' : ''}
      </button>

      <div className="task-content">
        <span className="task-title">{task.title}</span>
        {task.notes && <span className="task-notes">{task.notes}</span>}
        {rel && (
          <span className={`date-badge ${rel.overdue && !task.completed ? 'overdue' : ''}`}>
            🕐 {rel.label}
          </span>
        )}
      </div>

      <button className="task-delete" onClick={() => onDelete(task.id)} aria-label="Delete task">
        ✕
      </button>
    </div>
  );
}

export default TaskItem;