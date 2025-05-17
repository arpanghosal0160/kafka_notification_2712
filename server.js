require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const startConsumer = require('./kafka/consumer');

const app = express();
app.use(bodyParser.json());

// Connect DB
connectDB();

// Start Kafka consumer
startConsumer();

app.use('/notifications', require('./routes/notificationRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

async function handleNotification(message) {
  switch (message.type) {
    case 'email':
      return await sendEmail(message.to, message.subject, message.body);
    case 'sms':
      return await sendSMS(message.to, message.body); // ✅ FIX HERE
    default:
      throw new Error(`Unsupported notification type: ${message.type}`);
  }
}
