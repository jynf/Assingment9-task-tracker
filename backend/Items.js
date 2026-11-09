const express = require("express");
const router = express.Router();

const Project = require("./Project");

//get

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving projects",
      error: error.message
    });
  }
});

//get with id
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    res.status(200).json(project);
  } catch (error) {
    const status = error.name == "CastError" ? 400 : 500;

    res.status(status).json({
      message: "Error retrieving project",
      error: error.message
    });
  }
});

// post
router.post("/", async (req, res) => {
  try {
    const { name, idea, tasks } = req.body;

    if (typeof name !== "string" || !name.trim() || typeof idea !== "string" || !idea.trim()) {
      return res.status(400).json({message: "need a project name and idea"});
    }

    const newProject = new Project({
      name: name.trim(),
      idea: idea.trim(),
      tasks: tasks || []
    });

    const savedProject = await newProject.save();

    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({
      message: "Error creating project",
      error: error.message
    });
  }
});

// put
router.put("/:id", async (req, res) => {
  try {
    const updates = {};

    if (req.body.name !== undefined) {
      updates.name = req.body.name;
    }

    if (req.body.idea !== undefined) {
      updates.idea = req.body.idea;
    }

    if (req.body.tasks !== undefined) {
      updates.tasks = req.body.tasks;
    }

    if (Object.keys(updates).length == 0) {
      return res.status(400).json({
        message: "No valid fields provided"
      });
    }

    if (("name" in updates &&(typeof updates.name !== "string" || !updates.name.trim())) ||("idea" in updates && (typeof updates.idea !== "string" || !updates.idea.trim()))) {
      return res.status(400).json({
        message: "Name and idea must be non-empty strings"
      });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedProject) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    const status = error.name == "CastError" ? 400 : 400;

    res.status(status).json({
      message: "Error updating project",
      error: error.message
    });
  }
});

// delete
router.delete("/:id", async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(
      req.params.id
    );

    if (!deletedProject) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    res.status(200).json({
      message: "Project deleted successfully",
      project: deletedProject
    });
  } catch (error) {
    const status = error.name == "CastError" ? 400 : 500;

    res.status(status).json({
      message: "Error deleting project",
      error: error.message
    });
  }
});

module.exports = router;