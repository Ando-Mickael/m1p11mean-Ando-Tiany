require("dotenv").config();

function getPort() {
  return process.env.PORT || 3000;
}

module.exports = {
  getPort,
};
