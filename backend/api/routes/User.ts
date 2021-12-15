import { Router, Request, Response, NextFunction } from "express";
import prisma from "@controller/DatabaseController";
const router = Router();

/* Verify Authorzation */
router.get('/me', (req: Request, res: Response) => {
  if (!req.session?.user) return res.status(400).send('User not authorized');
  res.status(200).json(req.session.user);
})

/* Get Specfic user */
router.get('/:id', function (req: Request, res: Response, next: NextFunction) {
  res.send('respond with a resource');
});

/* Get All Users */
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error })
  }
})


export default router;
