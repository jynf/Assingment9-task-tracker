function TaskList({ tasks, projectId, toggleTask }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task._id}>
          <label>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(projectId, task._id)}
            />

            <span className={task.completed ? "completed" : ""}>
              {task.title}
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;