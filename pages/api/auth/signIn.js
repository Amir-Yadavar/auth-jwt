import userModel from '@/models/User'
import connectToDB from '@/configs/db.js'
import { generateToken, hashedPass, verifyPassword } from '@/utils/auth'
import { serialize } from 'cookie'

export default async (req, res) => {
    if (req.method !== "POST") {
        return false
    }

    try {
        connectToDB()
        const { identifier, password } = req.body
        const user = await userModel.findOne({ $or: [{ userName: identifier }, { email: identifier }] })

        if (!identifier.trim() || !password.trim()) {
            return res.status(422).json({ message: "the input required .." })
        }

        if (!user) {
            return res.status(404).json({ message: "the user not found .. " })
        }

        // verify pass hashed

        const isVerifyPass = await verifyPassword(password, user.password)
        if (!isVerifyPass) {
            return res.status(422).json({ message: "username or password not valid .." })
        }

        // token

        const token = await generateToken({ email: user.email })

        return res
            .setHeader("Set-Cookie", serialize("token", token, {
                httpOnly: true,
                maxAge: 60 * 60 * 24,
            }))
            .status(200)
            .json({ message: "sign in successfully .. " })

    } catch (error) {
        console.log("api signIn err", error);
    }
}