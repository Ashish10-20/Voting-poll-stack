import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import authRoutes from './routes/authRoutes.js';
import pollRoutes from './routes/pollRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();

// ✅ Middlewares
app.use(helmet());
app.use(express.json());

// ✅ CORS — make sure NO trailing slash in the Netlify URL
app.use(
  cors({
    origin: ["https://vote-poll-stack.netlify.app"], // ✅ FIXED
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(morgan('dev'));

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/polls', pollRoutes);

// ✅ Health check endpoint
app.get('/', (_req, res) =>
  res.json({ ok: true, service: 'poll-voting-backend' })
);

// ✅ Error handling middlewares
app.use(notFound);
app.use(errorHandler);

export default app;
