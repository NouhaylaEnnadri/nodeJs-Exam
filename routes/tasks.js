const express = require("express");
const router = express.Router();
const Task = require("../database/TaskDb");
const db = new Task();


//get
router.get("/", (req, res) => {
  const limit = req.query.limit || db.data.length;
  const tasks = db.data.slice(0, limit);
  res.json(tasks);
});

//get with the id 
router.get("/:id", (req, res) => {
  let TaskId = parseInt(req.params.id); // convert to integer

  const task = db.readById(TaskId);
  if (!task) {
    res.status(404).json({ message: "task not found" });
  } else {
    res.json(task);
  }
});

//post 
router.post("/", (req, res) => {
  let { task } = req.body;
  if (!task) {
    res.status(400).json({ message: "All fields are required." });
    return;
  }

  try {
    const newTask = db.create({ Id : Date.now() , id: db.data.length + 1, task });
    res.json(newTask);
  } catch (err) {
    res.status(500).json({ message: "Error writing to database." });
    console.log("error in database");
    return;
  }
});

//delete 
router.delete("/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = db.readById(taskId);
  if (!task) {
    res.status(404).json({ message: "Task not found." });
    return;
  }
  try {
    db.deleteById(taskId);
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Error writing to database." });
    console.log("error in database");
    return;
  }
});

//put 
router.put("/:id", (req, res) => {
  const taskId = req.params.id;
  const { task } = req.body;

  if (!task) {
    res.status(400).json({ message: "Task is required." });
    return;
  }

  const updatedTask = db.updateById(taskId, { task });

  if (!updatedTask) {
    res.status(404).json({ message: `Task with id ${taskId} not found.` });
    return;
  }

  res.json(updatedTask);
});

module.exports = router;
