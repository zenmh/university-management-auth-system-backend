import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrHandler from './app/middlewares/globalErrHandler';
import { routes } from './app/routes';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.json('The server is running 🔥💧🔥');

  next();
});

// Global Error Handler
app.use('/', globalErrHandler);

export default app;

/*
import ApiErr from './errs/ApiErr'
console.log(app.get('env'))


app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.json('The server is running 🔥💧🔥')
  throw new ApiErr(500, 'The error for logger test')
  next('The error from next function')
  Promise.reject(new Error('Unhandled Promise Rejection'))
  next()
})
 */
