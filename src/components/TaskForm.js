import { useState } from "react";

function TaskForm({ projectId, addTask }) {
  const [title, setTitle] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (title.trim() == "") {
      return;
    }

    addTask(projectId, title);
    setTitle("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Enter a task"
        aria-label="New task"
        required
      />

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;