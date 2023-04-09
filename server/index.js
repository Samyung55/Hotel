const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose")
//const cors = require("cors")
const cookieParser = require("cookie-parser")
const authRoutes = require("./routes/auth")
const usersRoutes = require("./routes/users")
const hotelsRoutes = require("./routes/hotels")
const roomsRoutes = require("./routes/rooms")

const app = express()
dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.URL)
        console.log("connected to mongodb")
    }
    catch (error) {
        console.error(error)
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("mongodb disconnected")
})


app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/users", usersRoutes)
app.use("/api/hotels", hotelsRoutes)
app.use("/api/rooms", roomsRoutes)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})

app.listen(4000, () => {
    connect()
    console.log("connected to backend")
})