import ApiError from "@errors/ApiError";
import { Request, Response, NextFunction } from "express";

export const validUserId = (req: Request, res: Response, next: NextFunction) => {
    const userId = parseInt(req.params.id);

    if (!userId) return next(new ApiError('Invalid or missing query paramter id. Must be a number'));
    
    next();
}

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.user) return next(new ApiError('Invalid or missing query paramter id. Must be a number'));

    next();
}