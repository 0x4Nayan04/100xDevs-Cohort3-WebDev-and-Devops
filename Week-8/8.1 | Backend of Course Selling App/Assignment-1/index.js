require('dotenv').config();
const express = require('express');
app.use(express.json());

const mongoose = require('mongoose');
const { userRouter } = require('../Assignment-1/Routes/user');
const { courseRouter } = require('../Assignment-1/Routes/course');
const { adminRouter } = require('../Assignment-1/Routes/user');

app.use('/api/v1/user', userRouter);
app.use('/api/v1/course', courseRouter);
app.use('/api/v1/admin', adminRouter);

const app = express();

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  } catch (error) {
    console.error(error);
  }
}
main();
