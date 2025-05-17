const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');
const sendToKafka = require('../kafka/producer');

// POST /notifications
router.post('/', async (req, res) => {
  const { userId, type, message } = req.body;

  const notification = await Notification.create({ userId, type, message });

  await sendToKafka('notifications', notification);

  res.status(200).json({ message: 'Notification queued' });
});

// GET /users/:id/notifications
router.get('/users/:id/notifications', async (req, res) => {
  const { id } = req.params;
  const notifications = await Notification.find({ userId: id });
  res.json(notifications);
});

module.exports = router;
