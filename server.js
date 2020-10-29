const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const router = require("./src/routes/router");
const port = process.env.PORT || 5000;

require("dotenv").config();

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api/v1/", router);
app.listen(port, () => console.log(`Listen on port ${port}`));