import { Response, Request, NextFunction } from "express"
export const onError = (res: Response, error: string, status: number = 400) => {
    return res.status(status).json({ error });
}

export const catchAsync = (callback: Function) => {
    return function (req: Request, res: Response, next: NextFunction) {
        callback(req, res, next)
            .catch(next)
    }
}