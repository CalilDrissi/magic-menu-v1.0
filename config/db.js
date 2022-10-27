const mongoose = require('mongoose');

const connectDB =  async() => {
  const conn =  await mongoose.connect(process.env.MONGO_URI2);

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;
