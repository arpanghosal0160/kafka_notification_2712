const kafka = require('../config/kafka');
const Notification = require('../models/notification');
const { sendEmail, sendSMS, sendInApp } = require('../services/notificationService');

const consumer = kafka.consumer({ groupId: 'notification-group' });

const startConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'notifications', fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const payload = JSON.parse(message.value.toString());
      console.log("Consuming:", payload);

      try {
        if (payload.type === 'email') await sendEmail(payload);
        else if (payload.type === 'sms') await sendSMS(payload);
        else await sendInApp(payload);

        await Notification.findByIdAndUpdate(payload._id, { status: 'sent' });
      } catch (error) {
        console.error("Failed to send notification:", error);
        await Notification.findByIdAndUpdate(payload._id, { status: 'failed' });
      }
    },
  });
};

module.exports = startConsumer;
