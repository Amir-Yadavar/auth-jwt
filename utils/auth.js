import { compare, hash } from "bcryptjs";
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

const verifyPassword = async (password, hashedPassword) => {
    const isValid = await compare(password, hashedPassword)
    return isValid
}

export { hashedPass, generateToken, verifyPassword }