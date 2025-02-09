const express = require('express');
const groq = require("./chatGroq");
const cors = require('cors');
const app = express();
const UserRoute = require('./Routers/UserRoute');
const AuthRoute = require('./Routers/AuthRoute');
const mongoose = require('mongoose');

app.use(express.json());
app.use(cors({ origin: "*" }));
require('dotenv').config();

app.get('/', (req, res) => {
    res.send("hello world");
});

app.use("/chatbot", groq);
app.use('/auth', AuthRoute);
app.use('/user', UserRoute);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});