const express = require("express")
const path = require("path")
const fs = require("fs")
const db = require("./db/db")

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"))
})

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"))
})

app.get("/api/notes", function (req, res) {
  res.json(db)
})

app.post("/api/notes", function (req, res) {
  var newNote = req.body

  if (db === "") {
    newNote.id = 0
  } else {
    newNote.id = db.length
  }

  db.push(newNote)

  fs.writeFileSync("db/db.json", JSON.stringify(db, null, 2))

  res.json(newNote)

  console.log(newNote)
})

app.delete("/api/notes/:id", function (req, res) {
  var chosen = req.params.id
  console.log(chosen)

    db.splice(chosen, 1)

    fs.writeFileSync("/db/db.json", JSON.stringify(db, null, 2))
    res.json(db)

    if (!db === undefined || !db.length === 0) {
      for (var i = 0; i < db.length; i++) {
        db[i].id = i
      }
    }
  
})

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT)
})
