// test-producer.js
const sendToKafka = require('./kafka/producer');

const testMessage = {
  type: "sms",
  to: "+917699283637", // ✅ Use a real phone number in international format
  body: "This is a test SMS notification."
};

sendToKafka('notifications', testMessage)
  .then(() => {
    console.log('✅ SMS message sent to Kafka!');
  })
  .catch(err => {
    console.error('❌ Failed to send SMS message:', err);
  });
