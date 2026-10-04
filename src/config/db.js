const mongoose = require('mongoose');
const env = require('./env');

mongoose.set('strictQuery', true);

const isDbReady = () => mongoose.connection.readyState === 1;

async function connectDB() {
  try {
    await mongoose.connect(env.mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log('[db] MongoDB connected');
    return true;
  } catch (err) {
    console.error('[db] MongoDB connection failed:', err.message);
    return false;
  }
}

module.exports = { connectDB, isDbReady };
