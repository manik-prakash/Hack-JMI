const express = require('express');
const app = express();

const chatBot = require('./chatBot');
const UserRoute = require('./Routers/UserRoute');

app.get('/', (req, res) => {
    res.send("hello world");
});

app.use("/chatbot", chatBot);
app.use('/user',UserRoute);


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});