const nodemailer = require('nodemailer');
const sendSMSViaTwilio = require('./sendSms'); 
const Notification = require('../models/notification');

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


const sendInApp = async (payload) => {
  const notification = new Notification({
    type: payload.type,
    to: payload.to,
    subject: payload.subject || '',
    body: payload.body,
    status: 'unread',
    createdAt: new Date()
  });
  await notification.save();
  console.log("In-app notification saved:", notification);
};

module.exports = { sendEmail, sendSMS, sendInApp };