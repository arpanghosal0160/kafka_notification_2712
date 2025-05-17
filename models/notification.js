const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: String,
  type: String, // email, sms, in-app
  message: String,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notification', notificationSchema);
// This code defines a Mongoose schema and model for a notification system in a Node.js application. The schema includes fields for user ID, notification type (email, SMS, in-app), message content, status (defaulting to 'pending'), and the creation date. The model is then exported for use in other parts of the application, allowing for easy interaction with the MongoDB database to create, read, update, and delete notifications.