import express, { Request, Response, NextFunction } from 'express';
import expressInitialization from './loaders/express';
import createError from 'http-errors';
import logger from '@logger';
import config from '@config';
const app = express();

const expressLoader = new expressInitialization(app);

expressLoader.registerCors();
expressLoader.setupViewEngine();
expressLoader.registerParsers();
expressLoader.registerSessions();
expressLoader.registerRoutes();

/* 404 Error Handler */
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

/* General Error Handler */
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

process.on('unhandledRejection', (reason: string, promise: Promise<any>) => {
  logger.warn(`Unhandled promise ${promise}`)
  throw reason;
})

app.listen(5000, () => {
  logger.info(`Loaded app sucessfully on port ${config.port}`)
})

export default app;