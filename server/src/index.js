const express = require("express");
const cors = require("cors");
const {conenction} = require("./db/db");
const {userController} = require("./routes/user.routes");
const {taskController} = require("./routes/task.routes");
const { authentication } = require("./middlewares/authentication");

const app = express();

require('dotenv').config();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
    res.send("Home page");
})

app.use("/user", userController);
app.use(authentication);
app.use("/task", taskController);

app.listen(process.env.PORT, async () => {
    try {
        await conenction;
        console.log("Connection to DB established successfully!");
    } catch (error) {
        console.log("Error occured while connecting to DB. Error", error);
    }
    console.log(`Listening on PORT ${process.env.PORT}`);
})