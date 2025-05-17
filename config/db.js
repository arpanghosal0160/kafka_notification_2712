const mongoose = require('mongoose');

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};
// This code connects to a MongoDB database using Mongoose. It exports an asynchronous function that attempts to connect to the database using the URI stored in the environment variable MONGO_URI. If the connection is successful, it logs a success message; if it fails, it logs the error and exits the process with a failure code.
// The code is designed to be used in a Node.js application, typically in a configuration file that sets up the database connection when the application starts.