const express = require('express');
const groq = require("./chatGroq");
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors({ origin: "*" }));

app.get('/', (req, res) => {
    res.send("hello world");
});

app.use("/chatbot", groq);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})