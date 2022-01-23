import express from 'express';
import expressInitialization from './loaders/express';
import logger from '@logger';
import config from '@config';
import { errorHandler } from '@middlewear';
import http from 'http';
import { InitializeSocket } from './socket';
import { connectDb } from '@controllers/db-controller';
const app = express();
const server = http.createServer(app);

process.on('unhandledRejection', (reason: string, promise: Promise<any>) => {
  logger.warn(`Unhandled promise ${promise}`)
  throw reason;
})

/* Setup Database Connection */
connectDb();

/* Initlize Express Application */
new expressInitialization(app)
  .registerCors()
  .registerParsers()
  .registerSessions()
  .registerRoutes();

/* Setup Socket Handler */
const socket = InitializeSocket(server);

/* Error Handleing */
app.use(errorHandler.notFoundError);
app.use(errorHandler.apiError);

/* Lights, Camera, Action. */
server.listen(config.port, () => {
  logger.info(`Loaded app sucessfully on port ${config.port}`)
})

export default app;