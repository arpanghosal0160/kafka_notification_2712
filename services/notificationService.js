const nodemailer = require('nodemailer');
const sendSMSViaTwilio = require('./sendSms'); // <-- import your real SMS sender

// Email service
const sendEmail = async (payload) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: payload.to, // <-- use dynamic recipient
    subject: payload.subject || 'Notification',
    text: payload.body,
  });
};

// SMS (real)
const sendSMS = async (payload) => {
  // payload: { to, body }
  return sendSMSViaTwilio(payload.to, payload.body);
};

// In-app (mock)
const sendInApp = async (payload) => {
  console.log("In-app notification:", payload);
};

module.exports = { sendEmail, sendSMS, sendInApp };