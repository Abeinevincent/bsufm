const OTP = require("../models/OTP");
const VerifyOTP = require("../models/VerifyOTP");
const router = require("express").Router();
const nodemailer = require("nodemailer");
const Farmer = require("../models/Farmer");
const crypto = require("crypto");
const { google } = require("googleapis");

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const accessToken = oauth2Client.getAccessToken();

// Create a Nodemailer transporter object
const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      auth: {
        type: process.env.TYPE,
        user: process.env.USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });

    console.log("email sent sucessfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};

router.post("/sendotp", async (req, res) => {
  try {
    const user = await Farmer.find({ email: req.body.email });
    if (!user) {
      return res.status(400).send("Farmer with given email doesn't exist");
    } else {
      const recoveryDetails = new OTP(req.body);
      await sendEmail(
        "abeinevincent@gmail.com",
        "Password Reset",
        req.body.otp
      );

      await recoveryDetails.save();
      return res
        .status(200)
        .json("Password reset link sent to your email account");
    }
  } catch (error) {
    console.log(error);
    res.send("An error occured");
  }
});

router.post("/confirmotp", async (req, res) => {
  try {
    const otp = await OTP.find({ otp: req.body.otp, email: req.body.email });

    if (!otp) {
      return res.status(400).send("Farmer with given email doesn't exist");
    } else {
      const otpDetails = new VerifyOTP(req.body);
      await otpDetails.save();
      return res
        .status(200)
        .json({ message: "All good, you can now reset your password" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
