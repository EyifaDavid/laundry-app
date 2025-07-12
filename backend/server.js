import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from "./routes/adminRoutes.js";
import dbConnection from './utils/index.js';

dotenv.config();
dbConnection();
const app = express();

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT","PATCH", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use("/api/admin", adminRoutes);

app.get('/api/test', (req, res) => {
  res.send('API is working!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
