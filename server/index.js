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

// Serve static files from the "uploads" directory
app.use("/uploads", express.static("uploads"));

// routes
app.use("/", require("./routes"));
app.use("/auth", require("./routes/auth.route"));
app.use("/managers", require("./routes/manager.route"));
app.use("/employees", require("./routes/employee.route"));
app.use("/users", require("./routes/user.route"));
app.use("/upload", require("./routes/upload.route"));
app.use("/special-offers", require("./routes/specialOffers.route"));
app.use("/services", require("./routes/service.route"));
app.use("/spendings", require("./routes/spending.route"));
app.use("/appointments", require("./routes/appointment.route"));
app.use("/sales", require("./routes/sales.route"));

// start server
if (port) {
  app.listen(port);
}

module.exports = app;
