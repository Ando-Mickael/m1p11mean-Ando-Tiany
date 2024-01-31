require("dotenv").config();

function getURL() {
  return process.env.MONGODB_URL;
}

module.exports = {
  getURL,
};
