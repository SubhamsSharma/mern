const express = require("express")
const dotenv = require("dotenv").config()

const port = process.env.PORT || 8000
const app = express()

app.get("/api/goals", (req,res) => {
    res.status(200).json({message:"all the goals"})
})

app.listen(port, () => console.log(`server listening at port ${port}`))