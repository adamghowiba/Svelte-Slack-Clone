import userRouter from '@routes/User';
import indexRouter from '@routes/index';
import messageRouter from '@routes/Messages';
import channelRouter from '@routes/Channels';
import logger from '@logger';
import authRouter from '@routes/Auth';
import cors from 'cors';
import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import session from './session';

export default class App {
	readonly app: Application;

	/**
	 * @param app Express Application
	 * Provides functions related to the setup process of express.
	 */
	constructor(app: Application) {
		this.app = app;
	}

	registerCors() {
		this.app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
		return this;
	}

	registerParsers() {
		this.app.use(morgan('dev'));
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(cookieParser());
		return this;
	}

	registerSessions() {
		this.app.use(session);
		logger.info('Sessions have been initialized');
		return this;
	}

	registerRoutes() {
		this.app.use('/', indexRouter);
		this.app.use('/auth', authRouter);
		this.app.use('/user', userRouter);
		this.app.use('/messages', messageRouter);
		this.app.use('/channel', channelRouter);
		logger.info('API Routes registered sucessfully');
		return this;
	}
}
