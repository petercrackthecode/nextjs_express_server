const express = require("express")
require("dotenv").config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/api/hello", (_, res) => {
  res.status(200).json({ msg: "Heyo" })
})

module.exports = app
