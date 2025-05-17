const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'notification-service',
  brokers: ['localhost:9092'],
});

module.exports = kafka;
// This code sets up a Kafka client using the kafkajs library. It creates a new Kafka instance with a specified client ID and broker address, which is retrieved from an environment variable. The Kafka instance is then exported for use in other parts of the application.