const express = require("express");

const mongodb = require("./data/database");
const app = express();
// const router = express.Router();

const port = process.env.PORT || 3000;

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
