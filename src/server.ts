import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { logger, errorLogger } from './shared/logger';
import { Server } from 'http';

let server: Server;

process.on('uncaughtException', err => {
  errorLogger.error(err);
  process.exit(1);
});

const run = async () => {
  try {
    await mongoose.connect(config.database_uri as string);
    logger.info('Database connected 🛢 🛢 🛢');

    server = app.listen(config.port, () => {
      logger.info(
        `The server is listening on port http://localhost:${config.port}`
      );
    });
  } catch (error) {
    errorLogger.error('Failed to connect Database', error);
  }

  process.on('unhandledRejection', err => {
    console.log(
      'Unhandled Rejection is detected, we are closing our server. Plz wait.....'
    );
    if (server) {
      server.close(() => {
        errorLogger.error(err);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
};

run();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received. Signal Termination');
  if (server) server.close();
});
