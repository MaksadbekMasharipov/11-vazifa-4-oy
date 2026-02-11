const express = require("express")
const cors = require("cors")
require("dotenv").config()
const bodyparser = require("body-parser")
const todoRouter = require("./router/todo.routes")
const registerRouter = require("./router/register.routes")


const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyparser.urlencoded({extended: true}))
const PORT = process.env.PORT || 3000

// Router
app.use(todoRouter)
app.use(registerRouter)

app.listen(PORT, () => {
    console.log(PORT);
})