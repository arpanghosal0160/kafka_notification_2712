const sendToKafka = require('./kafka/producer');

const testMessage = {
  type: "email",
  to: "22052712@kiit.ac.in", 
  subject: "Test Email Notification",
  body: "Hello from Arpan Notifications. This is a test email notification.",
};

sendToKafka('notifications', testMessage)
  .then(() => {
    console.log('✅ Email message sent to Kafka!');
  })
  .catch(err => {
    console.error('❌ Failed to send email message:', err);
  });