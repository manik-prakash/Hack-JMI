const express = require('express');
const chatBot = require('./chatBot');
const app = express();

app.get('/', (req, res) => {
    res.send("hello world");
});

app.use("/chatbot", chatBot)

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})