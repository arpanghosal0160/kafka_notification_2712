const sendToKafka = require('./kafka/producer');

const testMessage = {
  type: "inapp",
  to: "arpanghosal0160@gmail.com",
  subject: "Test In-App Notification",
  body: "This is a test in-app notification."
};

sendToKafka('notifications', testMessage)
  .then(() => console.log('✅ In-app message sent to Kafka!'))
  .catch(err => console.error('❌ Failed to send in-app message:', err));