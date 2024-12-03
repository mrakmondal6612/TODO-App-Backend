const {Router} = require("express");
const { Todo } = require("../db/db");
const { usernIputMiddleware, input_idMiddleware } = require("../middlewares/inputsValidation");
const router = Router();

router.get("/", (req, res) => {
    res.send("This is Home Page");
});

// Show all todos
router.get("/show", async (rea, res) => {
    try {
        const todos = await Todo.find({});
        if (!todos) {
            res.json({
                message: "todos is empty"
            })
        }
        res.status(200).json(
            todos
        );
    } catch (er) {
        console.log(er);
        res.status(411).json({
            message: "Request failed",
        })
    }

});

// Add todo
router.post("/add", usernIputMiddleware, async (req, res) => {
    try {
        const response = await Todo.create({
            title: req.body.title,
            description: req.body.description,
            completed: false
        })

        res.status(200).json({
            message: "Todo create successsfully",
            todo: response
        });
    } catch (er) {
        res.status(411).json({
            message: "Todo creation failed",
        })
    }


});

// Mark as done todo
router.put("/mark/:id", input_idMiddleware, async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate({
            _id: req.params.id
        }, {
            completed: true
        })
        if (!todo) {
            return res.status(404).json({
                message: "Todo not found!"
            })
        }
        res.status(200).json({
            message: "Todo mark as done"
        })
    } catch (er) {
        console.log(er)
        res.status(411).json({
            message: "Request failed",
        })
    }

});

// Delete todo
router.delete("/delete/:id", input_idMiddleware, async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete({
            _id: req.params.id
        })
        if (!todo) {
            return res.status(404).json({
                message: "Todo not found!"
            })
        }
        res.status(200).json({
            message: "Todo Deleted successfully"
        })
    } catch (er) {
        console.log(er)
        res.status(411).json({
            message: "Request failed",
        })
    }
})

module.exports = router;