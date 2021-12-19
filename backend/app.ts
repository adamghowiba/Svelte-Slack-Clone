import express, { Request, Response, NextFunction } from 'express';
import expressInitialization from './loaders/express';
import { errorHandler } from '@middlewear';
import logger from '@logger';
import config from '@config';
const app = express();

process.on('unhandledRejection', (reason: string, promise: Promise<any>) => {
  logger.warn(`Unhandled promise ${promise}`)
  throw reason;
})

const expressLoader = new expressInitialization(app);
expressLoader.registerCors();
expressLoader.registerParsers();
expressLoader.registerSessions();
expressLoader.registerRoutes();

// /* Error Handleing */
app.use(errorHandler.notFoundError);
app.use(errorHandler.apiError);

app.listen(5000, () => {
  logger.info(`Loaded app sucessfully on port ${config.port}`)
})

export default app;