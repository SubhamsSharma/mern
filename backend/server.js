const express = require("express")
const colors = require("colors")
const dotenv = require("dotenv").config()
const goalRouter = require("./routes/goalRoutes")
const userRouter = require("./routes/userRoutes")
const errorHandler = require("./middlewares/errorhandler")
const connectDB = require("./config/db")
const port = process.env.PORT || 8000

//connection to db
connectDB()

const app = express()
// middlewares for handling json and url- encodede data
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/api/goals", goalRouter)
app.use("/api/users",userRouter)
app.use(errorHandler)

app.listen(port, () => console.log(`server listening at port ${port}`))