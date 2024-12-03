const express = require("express");
const dotenv = require("dotenv");
const router = require("./router/todo");
const cors = require("cors");
dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://todo-app-frontend-xi-one.vercel.app/",
  })
);
app.use("/todo", router);

app.listen(PORT, (req, res) => {
    console.log(`Server is running  on PORT ${PORT}`);
});