import { hash } from "bcryptjs";

const hashedPass = async (password) => {
    const hashPassword = await hash(password, 12)
    return hashPassword
}

export { hashedPass }