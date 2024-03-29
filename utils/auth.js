import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

const hashedPass = async (password) => {
    const hashPassword = await hash(password, 12)
    return hashPassword
}

const generateToken = (data) => {
    const token = sign({ ...data }, process.env.privateKey, {
        algorithm: "HS256",
        expiresIn: '24h'
    })

    return token
}

export { hashedPass, generateToken }