const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { getURL } = require("./utils/db");
const { getPort } = require("./utils/server");

const app = express();
const port = getPort();

// connect to DB
mongoose.connect(getURL());

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/", require("./routes"));
app.use("/auth", require("./routes/auth.route"));
app.use("/employees", require("./routes/employee.route"));

// start server
app.listen(port);

module.exports = app;
