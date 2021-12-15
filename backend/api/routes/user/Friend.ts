import { Router, Request, Response } from 'express';
const router = Router({ mergeParams: true });

router.get('/', (req: Request, res: Response) => {
    res.send('Reached friends route');
});

export default router;