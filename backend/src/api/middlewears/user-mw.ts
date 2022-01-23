import ApiError from "@errors/ApiError";
import { Request, Response, NextFunction } from "express";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.user) return next(new ApiError('Unauthorized acess. Login'));

    next();
}