import express from 'express';
import cors from 'cors';
import "dotenv/config";
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

import connectDB from './config/mongodb.js';
import authRoute from './route/authRoute.js';
import userRoute from './route/userRoute.js';
import eventRouter from './route/eventRouter.js';

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

const AllowedOrigins = [process.env.FRONTEND_URL || "http://localhost:5173"];

app.use(express.json());
app.use(cors({ credentials: true, origin: AllowedOrigins }));
app.use(cookieParser());
app.use('/api/auth', limiter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/events', eventRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
