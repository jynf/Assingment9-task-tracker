import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

function ProjectCard({ project, addTask, toggleTask }) {
  return (
    <div className="project-card">
      <h3>{project.name}</h3>

      <p>{project.idea}</p>

      <p>
        Tasks: {project.tasks.length}
      </p>

      <TaskForm
        projectId={project._id}
        addTask={addTask}
      />

      <TaskList
        tasks={project.tasks}
        projectId={project._id}
        toggleTask={toggleTask}
      />
    </div>
  );
}

export default ProjectCard;