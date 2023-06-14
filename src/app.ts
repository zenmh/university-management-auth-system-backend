import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrHandler from './app/middlewares/globalErrHandler';
import { routes } from './app/routes';
import { NOT_FOUND } from 'http-status';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/', async (req: Request, res: Response) => {
  res.json('The server is running 🔥💧🔥');
});

app.use('/api/v1', routes);

// Global Error Handler
app.use('/', globalErrHandler);

// Handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(NOT_FOUND).json({
    success: false,
    message: 'The route not found !',
    errorMessages: [
      { path: req.originalUrl, message: 'The route is not exist here !' },
    ],
  });

  next();
});

export default app;
