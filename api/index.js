import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();

mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to mongodb!')
  })
  .catch((err) => {
    console.log(err)
});

const app = express();

app.listen(3000, (req, res) => {
  console.log('Listening to port 3000!')
});

app.use(express.json());
app.use('/api/user', userRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  })
});