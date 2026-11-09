import { useState } from "react";

function ProjectForm({ addProject }) {
  const [name, setName] = useState("");
  const [idea, setIdea] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (name.trim() == "" || idea.trim() == "") {
      return;
    }

    addProject(name, idea);

    setName("");
    setIdea("");
  }

  return (
    <section className="form-section">
      <h2>Add a New Project</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="project-name">Project Name</label>

        <input
          id="project-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter project name"
          required
        />

        <label htmlFor="project-idea">Project Idea</label>

        <textarea
          id="project-idea"
          value={idea}
          onChange={(event) => setIdea(event.target.value)}
          placeholder="Describe your programming idea"
          required
        />

        <button type="submit">Add Project</button>
      </form>
    </section>
  );
}

export default ProjectForm;