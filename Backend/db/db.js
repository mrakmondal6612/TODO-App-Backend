const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const DBUrl = process.env.DbUrl;

mongoose.connect(`${DBUrl}Todo-App`)
    .then(() => {
        console.log("Todo app connected to MongoDB");
    })
    .catch((err) => {
        console.error("Mongoose connection error", err);
    })

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = {
    Todo
}