import { Router, Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
const router = Router();

/* 404 Handler */
router.use(function (req: Request, res: Response, next: NextFunction) {
    next(createError(404));
});

/* General Error Handler */
router.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

export default router;