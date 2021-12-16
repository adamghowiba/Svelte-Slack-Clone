import { Router, Request, Response } from "express";
import prisma from "@controllers/db-controller";
const router = Router();

/* Register User */
router.post('/register', async (req: Request, res: Response) => {
    const { username } = req.body;

    if (!username) return res.status(400).send({ error: 'Username required for regestration' })

    try {
        const createdUser = await prisma.user.create({
            data: {
                username
            },
            select: {
                username: true,
                id: true
            }
        })

        req.session.user = createdUser;

        res.status(200).json(createdUser);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.post('/login', async (req: Request, res: Response) => {
    if (req.session?.user) return res.status(200).json(req.session.user);

    const { username } = req.body;
    if (!username) return res.status(400).send({ error: 'Username required to login' });

    try {
        const userResult = await prisma.user.findUnique({
            where: {
                username
            },
            select: {
                username: true,
                id: true
            }
        })

        if (!userResult) return res.status(400).json({ error: 'User does not exsist.' })

        req.session.user = userResult;
        res.status(200).json(userResult);
    } catch (error) {
        res.status(500).json(error);
    }
})

export default router;