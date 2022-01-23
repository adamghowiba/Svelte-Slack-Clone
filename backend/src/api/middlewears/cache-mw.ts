import logger from '@logger';
import { Request, NextFunction, Response, Send } from 'express';
import cache from 'memory-cache';

/**
 * Cachce the request data to be sent back.
 * 
 * @param duration Duration in seconds
 */
export const verifyCache = (req: Request, res: Response, next: NextFunction) => {
        const key = `__express__${req.originalUrl || req.url}`
        const cachedContent = cache.get(key);

        if (cachedContent) {
            logger.info(cachedContent)
            return res.json(cachedContent);
        }

        next();
}