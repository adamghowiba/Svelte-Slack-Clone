const cookieParser = require('cookie-parser');
const morgan = require('morgan');
import path from 'path';
import userRouter from '@routes/User';
import indexRouter from '@routes/index';
import authRouter from '@routes/Auth';
import cors from 'cors';
import express, { Application, Request, Response, NextFunction } from 'express';
import session from './session';
import logger from '@logger';

export default class App {
    readonly app: Application

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
        logger.info('Sessions have been initialized')
        return this;
    }

    registerRoutes() {
        this.app.use('/', indexRouter);
        this.app.use('/auth', authRouter);
        this.app.use('/user', userRouter);
        logger.info('API Routes registered sucessfully')
        return this;
    }

    /***
     * @deprecated
     */
    setupErrorHandleing() {

    }
}