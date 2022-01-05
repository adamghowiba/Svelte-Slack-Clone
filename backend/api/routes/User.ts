import { Router, Request, Response } from "express";
import { errorHandler, userHandler } from '@middlewear';
import { userController } from '@controllers';
import { isAuth } from "@middlewear/user-mw";
import ApiError from "@errors/ApiError";
import { verifyCache } from "@middlewear/cache-mw";
const router = Router({ mergeParams: true });

/* Assure they're authorized before going forward. */

/* User Sepecfic Routes */
router.get('/me', (req: Request, res: Response) => {
    if (!req.session.user) throw new ApiError('Unauthorized');

    return res.json(req.session.user);
})
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);

/* User Friends Routes */
router.route('/:id/friends')
    .get(userController.friends.getAllFriends)
    .post()
    .put()
    .delete();

/* All Friend Requsts For A User */
router.get('/:id/friends/requests', userController.friends.getAllRequests);

/* Friend Request Routes */
router.route('/:id/friends/requests/:toId')
    .get(userController.friends.getRequestById)
    .post(userController.friends.postRequest)
    .put(userController.friends.updateRequest)
    .delete(userController.friends.deleteRequest)

export default router;

