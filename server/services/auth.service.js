const { sendTextEmail } = require("../utils/email");
const { generateRandomNumber } = require("../utils/random");

function sendingSignupCode(email) {
  const code = generateRandomNumber(6);

  sendTextEmail({
    senderName: "[NO REPLY] Informa'Tiako",
    to: email,
    subject: "Sign up code",
    text: `This is the code ${code}.`,
  });

  return code;
}

module.exports = {
  sendingSignupCode,
};
