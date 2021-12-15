const cookieParser = require('cookie-parser');
const logger = require('morgan');
import path from 'path';
import createError from 'http-errors';
import cors from 'cors';
import express, { Application, Request, Response, NextFunction } from 'express';
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

    /* Setup Sessions */
    app.use(session);

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

    app.listen(5000, () => {
        console.log('Listenting on port 5000');
    })

}