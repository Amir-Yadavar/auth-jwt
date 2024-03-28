const mongoose = require("mongoose")

const connectToDB = async () => {
    try {
        if (mongoose.connections[0].readyState) {
            return false
        } else {
            await mongoose.connect('mongodb://localhost:27017/auth-jwt')
            console.log("connect to db successfully ..");
        }
    } catch (error) {
        console.log("connect to db has err", error);
    }
}

export default connectToDB