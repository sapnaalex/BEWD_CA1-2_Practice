const express = require("express");
const app = express();
app.use(express.json());

let todos = [];
let nextID = 1;

app.get("/", (req, res)=>{
    console.log(`The Todo List Server is live...`);
    res.send("Welcome to the Todo List API")
})

app.post("/todo", (req, res)=>{
    const { task } = req.body;

    if(!task || typeof task !='string'){
        return res.status(400).json({ error: "Task is required and should be a String."});


    }

    const duplicate = todos.find(todo => todo.task.toLowerCase()=== task.toLowerCase());
    if(duplicate){
        return res.status(409).json({ error: "Task already exits."});
    }
    const newTodo = {
        id: nextID++,
        task,
        completed: false
    }

    todos.push(newTodo);
    res.status(201).json({ message: "Todo created successfully", todo: newTodo});
});

app.get("/todo", (req, res)=>{
    if(todos.length ===0){
        return res.status(200).json({message: "No todo found.", todo: []})
    }
    res.json(todos);
});

app.get("/todo/:id",(req, res)=>{
    const id = parseInt(req.params.id);

    if(isNaN(id)){
        return res.status(400).json({error: "Invalid ID"});

    }
    const todo = todos.find(todo => todo.id == id);

    if(!todo){
        return res.status(404).json({error: "todo not found."})
    }

    res.json(todo);
})


PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
});