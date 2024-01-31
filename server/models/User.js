const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["client", "employee", "manager"],
      default: "client",
    },
    firstName: String,
    lastName: String,
    birthday: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
