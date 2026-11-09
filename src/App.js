import { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/Header";
import ProjectForm from "./components/ProjectForm";
import ProjectList from "./components/ProjectList";

const API_URL = "http://localhost:5000/api/items";

function App() {
  const [view, setView] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(true);
  const [projects, setProjects] = useState([]);

  // get projects from mongo databse
  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Unable to retrieve projects");
      }

      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error(error);
    }
  }

  // add a project to database
  async function addProject(name, idea) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, idea })
      });

      if (!response.ok) {
        throw new Error("Unable to add project");
      }

      const newProject = await response.json();

      setProjects((previous) => [...previous, newProject]);
    } catch (error) {
      console.error(error);
    }
  }

  // add a task to existing project
  async function addTask(projectId, title) {
    const project = projects.find(
      (item) => item._id == projectId
    );

    if (!project) return;

    const updatedTasks = [
      ...project.tasks,
      { title, completed: false }
    ];

    await updateProject(projectId, {
      tasks: updatedTasks
    });
  }

  // update a project
  async function updateProject(projectId, updates) {
    try {
      const response = await fetch(`${API_URL}/${projectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updates)
      });

      if (!response.ok) {
        throw new Error("Unable to update project");
      }

      const updatedProject = await response.json();

      setProjects((previous) =>
        previous.map((project) =>
          project._id == projectId ? updatedProject : project
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  // toggle task completion
  async function toggleTask(projectId, taskId) {
    const project = projects.find(
      (item) => item._id == projectId
    );

    if (!project) return;

    const updatedTasks = project.tasks.map((task) => {
      if (task._id == taskId) {
        return {
          ...task,
          completed: !task.completed
        };
      }

      return task;
    });

    await updateProject(projectId, {
      tasks: updatedTasks
    });
  }

  // dashboard stats
  const totalTasks = projects.reduce(
    (total, project) => total + project.tasks.length,
    0
  );

  const completedTasks = projects.reduce(
    (total, project) =>
      total + project.tasks.filter((task) => task.completed).length,
    0
  );

  return (
    <div className={darkMode ? "app dark-mode" : "app"}>
      <Header
        view={view}
        setView={setView}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {view == "dashboard" ? (
        <main>
          <h2>My Programming Projects</h2>

          <p>
            Keep track of what needs to be done in different projects
          </p>

          <div className="stats">
            <div className="stat">
              <h3>{projects.length}</h3>
              <p>Projects</p>
            </div>

            <div className="stat">
              <h3>{totalTasks}</h3>
              <p>Total Tasks</p>
            </div>

            <div className="stat">
              <h3>{completedTasks}</h3>
              <p>Completed Tasks</p>
            </div>
          </div>

          <ProjectForm addProject={addProject} />

          <ProjectList
            projects={projects}
            addTask={addTask}
            toggleTask={toggleTask}
          />
        </main>
      ) : (
        <main>
          <h2>About This Project</h2>

          <p>
            This application allows someone to create tasks
            for their projects so they can easily manage progress.
          </p>
        </main>
      )}
    </div>
  );
}

export default App;