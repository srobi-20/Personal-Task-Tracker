import { useState } from 'react';

function TaskForm({ onAdd }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  const reset = () => {
    setTitle('');
    setDate('');
    setNotes('');
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title: title.trim(), date, notes: notes.trim() });
    reset();
  };

  if (!isOpen) {
    return (
      <button className="add-task-trigger" onClick={() => setIsOpen(true)}>
        <span className="add-task-icon">⊕</span>
        Add a task
      </button>
    );
  }

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        className="title-input"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
      />
      <textarea
        className="notes-input"
        placeholder="Add notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={2}
      />
      <input
        className="date-input"
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <div className="form-actions">
        <button type="button" className="btn-text" onClick={reset}>Cancel</button>
        <button type="submit" className="btn-primary">Save</button>
      </div>
    </form>
  );
}

export default TaskForm;