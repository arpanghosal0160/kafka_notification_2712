# Notification Service

A Node.js microservice for sending notifications via **Email**, **SMS**, and **In-App** using Kafka, MongoDB, Nodemailer, and Twilio.

---

## Features

- **Kafka** for event-driven messaging
- **MongoDB** for notification persistence
- **Email** notifications via Gmail (Nodemailer)
- **SMS** notifications via Twilio
- **In-App** notification mock
- Dockerized for easy local setup

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Docker](https://www.docker.com/get-started) & [Docker Compose](https://docs.docker.com/compose/)
- Twilio account (for SMS)
- Gmail account with [App Password](https://support.google.com/mail/?p=InvalidSecondFactor) (for Email)

---

## Setup Instructions

### 1. **Clone the Repository**

```sh
git clone https://github.com/yourusername/notification-service.git
cd notification-service
```

---

### 2. **Configure Environment Variables**

Copy `.env.example` to `.env` and fill in your secrets:

```sh
cp .env.example .env
```

Edit `.env` and set:

- `MONGO_URI` (default works for local)
- `KAFKA_BROKER` (default works for local)
- `EMAIL_USER` and `EMAIL_PASS` (Gmail + App Password)
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER` (from Twilio Console)

---

### 3. **Start Kafka and MongoDB with Docker Compose**

```sh
docker-compose up -d
```

- This will start Kafka and MongoDB containers.
- Wait a few seconds for services to be ready.

---

### 4. **Install Node.js Dependencies**

```sh
npm install
```

---

### 5. **Start the Notification Service**

```sh
node server.js
```

- You should see logs for server, MongoDB, and Kafka connections.

---

### 6. **Test the Service**

#### **Send a Test Email Notification**

Edit `test-producer.js`:

```js
const sendToKafka = require('./kafka/producer');

const testMessage = {
  type: "email",
  to: "your_email@example.com",
  subject: "Test Email Notification",
  body: "This is a test email notification."
};

sendToKafka('notifications', testMessage)
  .then(() => console.log('✅ Email message sent to Kafka!'))
  .catch(err => console.error('❌ Failed to send email message:', err));
```

Run:

```sh
node test-producer.js
```

#### **Send a Test SMS Notification**

Edit `test-producer.js`:

```js
const sendToKafka = require('./kafka/producer');

const testMessage = {
  type: "sms",
  to: "+1234567890", // Your phone number in E.164 format
  body: "This is a test SMS notification."
};

sendToKafka('notifications', testMessage)
  .then(() => console.log('✅ SMS message sent to Kafka!'))
  .catch(err => console.error('❌ Failed to send SMS message:', err));
```

Run:

```sh
node test-producer.js
```

---

## Folder Structure

```
.
├── config/             # Kafka config
├── kafka/              # Producer & consumer logic
├── models/             # Mongoose models
├── services/           # Email, SMS, In-App logic
├── test-producer.js    # Test script for notifications
├── server.js           # Main server entry
├── docker-compose.yml  # Docker Compose for Kafka & MongoDB
├── .env                # Environment variables (not committed)
└── README.md
```

---

## Troubleshooting

- **Kafka connection errors:** Make sure Docker containers are running and Kafka is ready.
- **Email not sent:** Use a Gmail App Password, check spam folder.
- **SMS not sent:** Use a Twilio-verified phone number as the sender, check Twilio logs.

---

## License

MIT

---

**Questions?**  
Open an issue or contact the maintainer.