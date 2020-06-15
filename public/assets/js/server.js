const express = require("express")
const http = require("http")
const path = require("path")
const fs = require("fs")
const { response } = require("express")

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../../index.html"))
})

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "../../notes.html"))
})

app.get("/api/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "../../../db/db.json"))
})

app.post("/api/notes", function (req, res) {
  var newNote = req.body

  fs.writeFileSync("../../../db/db.json", JSON.stringify(newNote, null, 2))

  res.json(newNote)

  console.log(newNote)
})

app.delete("/api/notes/:id", function (req, res) {
  var chosen = parseInt(req.params.id)
  console.log(chosen)

  // if (typeof chosen === NaN) {
  //   console.log("please choose a valid id number")
  //   return
  // }

  // fs.readFile("../../../db/db.json", "utf-8", function (err, data) {
  //   if (err) throw err

  //   var result = JSON.parse(data)
  //   result.splice(chosen, 1)

  //   fs.writeFileSync("../../../db/db.json", JSON.stringify(result, null, 2))
  //   res.json(result)
  // })
})

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT)
})
