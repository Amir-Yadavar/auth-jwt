import { serialize } from "cookie"

export default (req, res) => {
    if (req.method !== "GET") {
        return false
    }

    return res
        .setHeader("Set-Cookie", serialize('token', "", {
            path: "/",
            maxAge: 0
        }))
        .status(200)
        .json({ message: "logOut successfully .." })
}