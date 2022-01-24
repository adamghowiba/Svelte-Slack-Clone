import express from 'express';
import { connectDb } from '@controllers/db-controller';
import logger from '@logger';
import config from '@config';
import { errorHandler } from '@middlewear';
import http from 'http';
import { InitializeSocket } from './socket';
import ExpressInitialization from './loaders/express';

const app = express();
const server = http.createServer(app);

process.on('unhandledRejection', (reason: string) => {
	logger.warn(`Unhandled promise ${reason}`);
	throw reason;
});

/* Setup Database Connection */
connectDb().then(logger.info).catch(logger.error);

/* Initlize Express Application */
new ExpressInitialization(app).registerCors().registerParsers().registerSessions().registerRoutes();

/* Setup Socket Handler */
InitializeSocket(server);

/* Error Handleing */
app.use(errorHandler.notFoundError);
app.use(errorHandler.apiError);

/* Lights, Camera, Action. */
server.listen(config.port, () => {
	logger.info(`Loaded app sucessfully on port ${config.port}`);
});

export default app;
