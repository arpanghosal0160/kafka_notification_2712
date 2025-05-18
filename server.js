require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const startConsumer = require('./kafka/consumer');
const Notification = require('./models/notification');

const app = express();
app.use(bodyParser.json());

// Connect DB
connectDB();

// Start Kafka consumer
startConsumer();

app.use('/notifications', require('./routes/notificationRoutes'));

// Fetch in-app notifications for a user
app.get('/notifications/inapp/:user', async (req, res) => {
  try {
    const user = req.params.user;
    const notifications = await Notification.find({ to: user, type: 'inapp' }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch in-app notifications' });
  }
});

// Fetch email notifications for a user
app.get('/notifications/email/:user', async (req, res) => {
  try {
    const user = req.params.user;
    const notifications = await Notification.find({ to: user, type: 'email' }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch email notifications' });
  }
});

// Fetch SMS notifications for a user
app.get('/notifications/sms/:user', async (req, res) => {
  try {
    const user = req.params.user;
    const notifications = await Notification.find({ to: user, type: 'sms' }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch SMS notifications' });
  }
});

// Fetch all notifications for a user
app.get('/notifications/:user', async (req, res) => {
  try {
    const user = req.params.user;
    const notifications = await Notification.find({ to: user }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

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


// Send notification via API
app.post('/notifications/send', async (req, res) => {
  const { type, to, subject, body } = req.body;

  try {
    // Save to DB
    const notification = new Notification({ type, to, subject, body });
    await notification.save();

    // Handle notification logic
    await handleNotification({ type, to, subject, body });

    res.status(200).json({ message: 'Notification sent and saved successfully.' });
  } catch (err) {
    console.error('Notification send error:', err.message);
    res.status(500).json({ error: 'Failed to send notification.' });
  }
});
