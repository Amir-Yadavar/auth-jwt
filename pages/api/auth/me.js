import { verifyToken } from "@/utils/auth"
import connectToDB from "@/configs/db"
import userModel from "@/models/User"

export default async (req, res) => {
    if (req.method !== "GET") {
        return false
    }


    try {
        connectToDB()
        const { token } = req.cookies

        if (!token) {
            return res.status(401).json({ message: "you are not login .." })
        }

        const isValidToken = verifyToken(token)

        if (!isValidToken) {
            return res.status(401).json({ message: "you are not login .." })
        }
        const user = await userModel.findOne({ email: isValidToken.email }, "-password -__v")

        return res.status(200).json(user)

    } catch (error) {

    }
}