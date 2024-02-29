require("dotenv").config();

function getPort() {
  return process.env.PORT;
}

module.exports = {
  getPort,
};
