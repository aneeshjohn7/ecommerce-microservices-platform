import express from 'express';
import authRoutes from './routes/auth.routes';
import { errorHandler } from './middleware/error.middleware';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/health', (req, res) => {
  res.json({ status: 'identity-service oks' });
});

app.use('/api/v1/auth', authRoutes);

app.use(errorHandler);

export default app;
