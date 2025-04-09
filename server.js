const express = require('express');
const app = express();

app.use(express.json());

let user = null;

app.post('/signup', (req, res) => {
    const { username, email, password, dob } = req.body;

    if (!username || !email || !password || !dob) {
        return res.status(400).send("All fields are required.");
    }

    if (password.length < 8 || password.length > 16) {
        return res.status(400).send("Password must be 8-16 characters.");
    }

    user = { username, email, password, dob };
    res.status(201).json({message: "User created.", user: user});
});

app.get('/user', (req, res) => {
    if (!user) return res.status(404).send("User not found.");
    res.json(user);
});

app.put('/user', (req, res) => {
    const { username, email, password, dob } = req.body;
    if (!username || !email || !password || !dob) {
        return res.status(400).send("All fields required.");
    }

    if (password.length < 8 || password.length > 16) {
        return res.status(400).send("Password must be 8-16 characters.");
    }

    if (!user) return res.status(404).send("User not found.");
    user = { username, email, password, dob };
    res.send("User updated.");
});

app.patch('/user', (req, res) => {
    if (!user) return res.status(404).send("User not found.");

    const { username, email, password, dob } = req.body;

    if (password && (password.length < 8 || password.length > 16)) {
        return res.status(400).send("Password must be 8-16 characters.");
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = password;
    if (dob) user.dob = dob;

    res.send("User partially updated.");
});

app.delete('/user', (req, res) => {
    if (!user) return res.status(404).send("User not found.");
    user = null;
    res.send("User deleted.");
});

app.listen(3000, () => console.log("Server running on port 3000"));
