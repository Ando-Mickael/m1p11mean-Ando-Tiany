function generateRandomNumber(size) {
  return Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(size, "0");
}

module.exports = {
  generateRandomNumber,
};
