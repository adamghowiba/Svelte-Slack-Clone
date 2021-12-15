const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
import cors from 'cors';
import express, { Application } from 'express';
import session from './session';

export default (app: Application) => {
    app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

    /* Setup View Engine */
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    /* Setup Parsers */
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use(session);


}