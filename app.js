const express = require("express")
const app = express()
const cors = require("cors")
const models = require("./models")

app.use(cors())
app.use(express.json())

app.get("/oil-wells", (req, res) => {
  models.Eagleford.findAll({
    where: {
      api14: 42051340170000
    }
  }).then(wellsinfo => {
    res.json(wellsinfo)
  })
})

app.listen(3001, () => {
  console.log("Server is running...")
})
