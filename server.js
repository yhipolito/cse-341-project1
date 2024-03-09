const express = require("express");
const app = express();
const router = express.Router();

const port = process.env.PORT || 3000;

app.use('/', router);

app.listen(port, () => {console.log(`Running on port: ${port}`)});