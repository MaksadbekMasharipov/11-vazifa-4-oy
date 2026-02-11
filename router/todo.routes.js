const {Router} = require("express")
const { getAllItems, addItem, updateItem, deleteItem, get_one_item, toggleItem, deleteCompleted, taksDone } = require("../controller/todo.controller")
const middleware = require("../middleware/authoziration")

const todoRouter = Router()

todoRouter.get("/get_all_items", middleware, getAllItems),
todoRouter.get("/get_one_item/:id", get_one_item),
todoRouter.post("/add_item", middleware, addItem),
todoRouter.put("/update_item/:id", middleware, updateItem),
todoRouter.delete("/delete_item/:id", middleware, deleteItem)
todoRouter.patch("/toggle_item/:id", middleware, toggleItem)
todoRouter.delete("/delete_completed", middleware, deleteCompleted)
todoRouter.get("/task_done", middleware, taksDone)


module.exports = todoRouter