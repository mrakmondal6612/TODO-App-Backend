const { createTodo, updateTodo } = require("../db/types");

const usernIputMiddleware = (req, res, next) => {
    const data = req.body;
    console.log(data)
    const ans = createTodo.safeParse(data);
    console.log(ans)
    if (!ans.success) {
        return res.status(411).json({
            message: "You send the wrong inputs",
        });
    }
    next();
}

const input_idMiddleware = (req, res, next) => {
    const data = req.params;
    const ans = updateTodo.safeParse(data);
    if (!ans.success) {
        return res.status(411).json({
            message: "You send the wrong inputs",
        });
    }
    next();
}

module.exports = {
    input_idMiddleware,
    usernIputMiddleware
}