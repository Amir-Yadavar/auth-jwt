import connectToDB from "@/configs/db"
import userModel from "@/models/User"
const { modelTodo } = require("@/models/Todo")
import { verifyToken } from "@/utils/auth"

export default async (req, res) => {
    connectToDB()

    const { token } = req.cookies

    if (!token) {
        return res.status(401).json({ message: "you are not login .." })
    }

    const isValidToken = verifyToken(token)

    if (!isValidToken) {
        return res.status(401).json({ message: "you are not login .." })
    }

    const userInfo = await userModel.findOne({ email: isValidToken.email })

    if (req.method === "POST") {
        const { title } = req.body
        if (!title.trim()) {
            return res.status(422).json({ message: "the all item required .." })
        }


        const newTodo = {
            title,
            user: userInfo._id
        }
        await modelTodo.create(newTodo)
        return res.json({ mess: "Todo create successfully .. " })


    }

    if (req.method === "GET") {

        const allTodo = await modelTodo.find({ user: userInfo._id })

        return res.status(200).json(allTodo)
    }

    res.json({ message: "wlc to todo .." })
}