const express = require('express');
const groq = require("./chatGroq");
const cors = require('cors');
const app = express();
const UserRoute = require('./Routers/UserRoute');
const AuthRoute = require('./Routers/AuthRoute');
const mongoose = require('mongoose');
async function main (){
    await mongoose.connect('mongodb://localhost:27017/DeCentraLand')
    .then(() => {
        console.log("Connected to Database");
    });
}
main();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
require('dotenv').config();

app.get('/', (req, res) => {
    res.send("hello world");
});

app.use("/chatbot", groq);
app.use('/auth', AuthRoute);
app.use('/user', UserRoute);

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});