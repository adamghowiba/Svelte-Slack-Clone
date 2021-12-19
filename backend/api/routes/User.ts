import { Router, Request, Response } from "express";
import { errorHandler, userHandler } from '@middlewear';
import { userController } from '@controllers';
const router = Router({ mergeParams: true });

/* Assure they're authorized before going forward. */
router.use(userHandler.isAuth);

/* User Sepecfic Routes */
router.get('/me');
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

