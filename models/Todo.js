const mongoose = require("mongoose")
import userModel from "./User"

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
})



const modelTodo = mongoose.models.Todo || mongoose.model("Todo", todoSchema)

export { modelTodo, todoSchema }