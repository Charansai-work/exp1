import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import sanitizeHtml from 'sanitize-html';
import { env } from './config/env.js';
import { swaggerSpec } from './utils/swagger.js';
import authRoutes from './routes/authRoutes.js';
import internshipRoutes from './routes/internshipRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import submissionRoutes from './routes/submissionRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import userRoutes from './routes/userRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
app.use(helmet());
app.use(cors({ origin: env.clientUrl, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));
app.use((req, _res, next) => {
  if (req.body && typeof req.body === 'object') {
    Object.keys(req.body).forEach((k) => {
      if (typeof req.body[k] === 'string') req.body[k] = sanitizeHtml(req.body[k]);
    });
  }
  next();
});

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/auth', authRoutes);
app.use('/internships', internshipRoutes);
app.use('/applications', applicationRoutes);
app.use('/tasks', taskRoutes);
app.use('/submissions', submissionRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/notifications', notificationRoutes);
app.use('/users', userRoutes);
app.use('/analytics', analyticsRoutes);

app.use(errorHandler);

export default app;
