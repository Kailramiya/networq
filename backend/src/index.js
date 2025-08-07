import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {connectDB} from './lib/db.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import bodyParser from 'body-parser';
import profileRoutes from './routes/profile.route.js';

const app = express();
const PORT = process.env.PORTn  ;

dotenv.config();
app.use(cors({
  origin : "https://networq-black.vercel.app",
  credentials : true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
})); 


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/profile', profileRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something broke!" });
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});            