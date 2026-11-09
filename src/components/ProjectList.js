import ProjectCard from "./ProjectCard";

function ProjectList({ projects, addTask, toggleTask }) {
  return (
    <section>
      <h2>My Projects</h2>

      {projects.length == 0 ? (
        <p>No projects yet. Add your first programming idea above!</p>
      ) : (
        <div className="project-list">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              addTask={addTask}
              toggleTask={toggleTask}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProjectList;