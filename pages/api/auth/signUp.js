import userModel from '@/models/User'
import connectToDB from '@/configs/db.js'
import { generateToken, hashedPass } from '@/utils/auth'
import { serialize } from 'cookie'

export default async (req, res) => {
    if (req.method !== "POST") {
        return false
    }

    try {
        connectToDB()

        // validation

        const { firstName, lastName, userName, email, password } = req.body

        if (!firstName.trim() || !lastName.trim() || !userName.trim() || !email.trim() || !password.trim()) {
            return res.status(422).json({ message: "the data is not valid .. " })
        }

        // isExistUser

        const isUserExist = await userModel.findOne({ $or: [{ userName }, { email }] })

        if (isUserExist) {
            return res.status(422).json({ message: "this userName or email already exist .. " })
        }

        // hashPass
        const hashedPassword = await hashedPass(password)


        // token

        const token = generateToken({ email })

        const user = await userModel.find({})
        // create
        await userModel.create({
            firstName,
            lastName,
            userName,
            email,
            password: hashedPassword,
            role: user.length > 0 ? "USER" : "ADMIN"
        })
        return res.setHeader("Set-Cookie", serialize('token', token, { maxAge: 60 * 60 * 24, httpOnly: true })).json({ message: 'create successfully ..' })
    } catch (error) {
        console.log("signup api err ..", error);
    }
}