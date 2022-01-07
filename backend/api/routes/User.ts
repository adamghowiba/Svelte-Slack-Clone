import { Router, Request, Response } from "express";
import { userController } from '@controllers';
import ApiError from "@errors/ApiError";
const router = Router({ mergeParams: true });

/* Assure they're authorized before going forward. */

/* Check Autoentication */
router.get('/me', (req: Request, res: Response) => {
    if (!req.session.user) throw new ApiError('Unauthorized');

    return res.json(req.session.user);
})
/* Get All Users */
router.get('/', userController.getAllUsers);

/* Get User By Id */
router.get('/:id', userController.getUserById);

/* Get Users Channels */
router.get('/:id/channels', userController.getAllUserChannels)

export default router;

