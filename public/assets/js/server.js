const express = require("express")
const http = require("http")
const path = require("path")
const fs = require("fs")

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../index.html"))
})

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "../notes.html"))
})

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT)
})
