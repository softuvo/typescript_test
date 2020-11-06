import todoRoutes from "./routes"

const express = require("express")
const {Express} = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require('dotenv');
var bodyParser = require('body-parser')

const app = express();

const PORT: string | number = process.env.PORT || 4000

app.use(cors("*"))
app.use(todoRoutes)

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
console.log("uri",`${process.env.URI}`)
// const DB_URL = `${process.env.URI}`
// const uri: string = DB_URL
const uri: string = "mongodb://localhost:27017/nodetsdb"

// const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@clustertodo.raz9g.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.set("useFindAndModify", false)

mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch(error => {
    throw error
  })