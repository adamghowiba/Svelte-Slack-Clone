import { Response } from "express"
export const onError = (res: Response, error: string, status: number = 400) => {
    return res.status(status).json({ error });
}