const express = require("express");

const mongodb = require("./data/database");
const bodyParser = require("body-parser");
const app = express();
// const router = express.Router();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "origin, X-Requested-With, Content-Type, Accept, Z-key"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  next();
});
app.use("/", require("./routes"));

// app.listen(port, () => {console.log(`Running on port: ${port}`)});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and node running on port ${port}`);
    });
  }
});
