import { Router, Request, Response, NextFunction } from "express";
import { onError } from "../../utils/ErrorUtil";
import prisma from "../../controller/DatabaseController";
const router = Router();

/* Verify Authorzation */
router.get('/me', (req: Request, res: Response) => {
    if (!req.session?.user) return res.status(400).send('User not authorized');
    res.status(200).json(req.session.user);
})

/* Get All Users */
router.get('/', async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error })
    }
})


/* Get Specfic user */
router.get('/:userId', async (req: Request, res: Response) => {
    if (!req.params.userId) return res.status(400).json({ error: 'Must specify a user id' });
    const userId = parseInt(req.params.userId);

    if (!userId) return onError(res, 'User id must be a valid user id & number');

    try {
        const users = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!users) return onError(res, `Unable to find user with id ${userId}`)

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error })
    }
});


export default router;
