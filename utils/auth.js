import { compare, hash } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

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

const verifyToken = (token) => {
    try {
        const validationToken = verify(token, process.env.privateKey)
        return validationToken
    } catch (error) {
        console.log("validation token err : ", error);
    }
}

export { hashedPass, generateToken, verifyPassword, verifyToken }