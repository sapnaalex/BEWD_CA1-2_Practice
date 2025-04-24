const express = require("express");
const app = express();
app.use(express.json());

let todos = [];
let nextID = 1;

// Health check
app.get("/", (req, res) => {
    console.log(`The Todo List Server is live...`);
    res.send("Welcome to the Todo List API");
});

// CREATE a new todo
app.post("/todo", (req, res) => {
    const { task } = req.body;

    if (!task || typeof task !== 'string') {
        return res.status(400).json({ error: "Task is required and should be a String." });
    }

    const duplicate = todos.find(todo => todo.task.toLowerCase() === task.toLowerCase());
    if (duplicate) {
        return res.status(409).json({ error: "Task already exists." });
    }

    const newTodo = {
        id: nextID++,
        task,
        completed: false
    };

    todos.push(newTodo);
    res.status(201).json({ message: "Todo created successfully", todo: newTodo });
});

// READ all todos
app.get("/todo", (req, res) => {
    if (todos.length === 0) {
        return res.status(200).json({ message: "No todo found.", todo: [] });
    }
    res.json(todos);
});

// READ a single todo by ID
app.get("/todo/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
    }

    const todo = todos.find(todo => todo.id === id);

    if (!todo) {
        return res.status(404).json({ error: "Todo not found." });
    }

    res.json(todo);
});

// UPDATE a todo by ID
app.put("/todo/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { task, completed } = req.body;

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
    }

    const todo = todos.find(todo => todo.id === id);

    if (!todo) {
        return res.status(404).json({ error: "Todo not found." });
    }

    if (task && typeof task === "string") {
        todo.task = task;
    }

    if (typeof completed === "boolean") {
        todo.completed = completed;
    }

    res.json({ message: "Todo updated successfully", todo });
});

// DELETE a todo by ID
app.delete("/todo/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
    }

    const index = todos.findIndex(todo => todo.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Todo not found." });
    }

    const deleted = todos.splice(index, 1);
    res.json({ message: "Todo deleted successfully", deletedTodo: deleted[0] });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});