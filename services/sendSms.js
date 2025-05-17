// services/sendSMS.js
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromPhone = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

async function sendSMS(to, body) {
  try {
    console.log(`Sending SMS to ${to} with body: ${body}`);
    const message = await client.messages.create({
      body,
      from: fromPhone,
      to
    });
    console.log('✅ SMS sent with SID:', message.sid);
    return message;
  } catch (err) {
    console.error('❌ Error sending SMS:', err.message);
    throw err;
  }
}

module.exports = sendSMS;
