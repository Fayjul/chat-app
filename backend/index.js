import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routers/authRouters.js';
import cors from 'cors';

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.send('Allhu Akbar');
});
app.use('/api/auth', authRouter);
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
