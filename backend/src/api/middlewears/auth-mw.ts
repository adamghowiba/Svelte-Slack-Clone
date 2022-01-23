import { onError } from "@utils/ErrorUtil";
import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.user) return onError(res, 'Unauthorized, you must be logged in.');

    next();
}