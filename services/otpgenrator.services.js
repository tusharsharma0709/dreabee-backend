let otpGenerator = require('otp-generator');
//const otpModel = require(".");
//const OtpModel = require('../models/otpModel.models');
const generateOtp = (length) => {
  return otpGenerator.generate(length, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false
  });
}


module.exports={
  generateOtp,
}