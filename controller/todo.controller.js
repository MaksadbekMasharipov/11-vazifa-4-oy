const { read_file, write_file } = require("../api/file-system")
const { v4 } = require("uuid")

const getAllItems = async (req, res) => {
    try {
        const data = read_file("todo.json")

        const result = data.filter(item => item.addedBy === req.user.id)

        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const get_one_item = async (req, res) => {
    try {
        const data = read_file("todo.json")
        const { id } = req.params

        const founded = data.find((item) => item.id === id)

        if (!founded) {
            return res.status(404).json({
                message: "Id not found, check the id"
            })
        }

        res.status(200).json(founded)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


const addItem = async (req, res) => {
    try {
        const data = read_file("todo.json")
        const { title } = req.body

        data.push({
            id: v4(),
            title,
            addedBy: req.user.id,
            completed: false
        })

        write_file("todo.json", data)
        res.status(200).json({
            message: "Success!"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const updateItem = async (req, res) => {
    try {
        const { id } = req.params
        const data = read_file("todo.json")
        const { title } = req.body

        const founded = data.find((item) => item.id === id)

        if (!founded) {
            return res.status(500).json({
                message: "Todo not found, check the id"
            })
        }

        if (founded.addedBy !== req.user.id) {
            return res.status(403).json({
                message: "Forbidden"
            })
        }

        data.forEach((item, idx) => {
            if (item.id === id) {
                item.title = title ? title : item.title
            }
        })

        write_file("todo.json", data)
        res.status(200).json({
            message: "sucess!"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteItem = async (req, res) => {
    try {
        // ma'lumotlarni olish
        const data = read_file("todo.json")
        const { id } = req.params

        // ID ni tekshirish
        const founded = data.find((item) => item.id === id)
        if (!founded) {
            return res.status(404).json({
                message: "To do not found, check the id"
            })
        }

        // Roleni tekshirish
        if (founded.addedBy !== req.user.id) {
            return res.status(403).json({
                message: "Forbidden"
            })
        }

        // filter
        data.forEach((item, idx) => {
            if (item.id === id) {
                data.splice(idx, 1)
            }
        })


        // yozib qo'yish
        write_file("todo.json", data)
        res.status(200).json({
            message: "Sucess!"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const toggleItem = async (req, res) => {
    try {
        // Ma'lumotlarni olish
        const { id } = req.params
        const data = read_file("todo.json")

        // IDni tekshirish
        const foundedUser = data.find((item) => item.id === id)
        if (!foundedUser) {
            return res.status(401).json({
                message: "Item not found, check the ID"
            })
        }

        // Authentication
        if (foundedUser.addedBy !== req.user.id) {
            return res.status(403).json({
                message: "Forbidden"
            })
        }

        // Teskari holatga o'girish, muhim qismi
        data.forEach((item) => {
            if (item.id === id) {
                item.completed = !item.completed
            }
        })

        // Yozib qo'yish
        write_file("todo.json", data)
        res.status(200).json({
            message: "Success✅"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteCompleted = (req, res) => {
    try {
        // ma'lumotlarni olish
        const data = read_file("todo.json")

        // Filter qilish
        const newData = data.filter(item => item.addedBy === req.user.id && item.completed === false)

        // yozib qo'yish
        write_file("todo.json", newData)
        res.status(200).json({
            message: "Success✅"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const taksDone = (req, res) => {
    try {
        // ma'lumotlarni olish
        const data = read_file("todo.json")

        // filter qilish
        const allFiles = data.filter(item => item.addedBy === req.user.id).length
        const counter = data.filter(item => item.completed === true && item.addedBy === req.user.id).length

        // yozib qo'yish
        res.status(200).json({
            message: `${counter} of ${allFiles} tasks done`
        })
        
    }catch(error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    getAllItems,
    get_one_item,
    addItem,
    updateItem,
    deleteItem,
    toggleItem,
    deleteCompleted,
    taksDone
}