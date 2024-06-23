const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const userRoutes = require("./Routes/user.routes.js")
require('dotenv').config()


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use("/uploads", express.static(__dirname+"/uploads"))
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))


app.use("/", userRoutes)


mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected To Backend")
    app.listen(3001, () => {
        console.log("server is running on port 3001")
    })
})
    .catch((err) => {
        console.log(err)
    })


