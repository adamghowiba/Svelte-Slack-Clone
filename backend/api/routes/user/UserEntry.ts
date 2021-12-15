import { Router } from 'express';
import friendsRoute from './Friend';
import requestsRoute from './FriendRequest';
import userRoute from './User';
const router = Router();

router.use('/:userId/friend', friendsRoute);
router.use('/:userId/request', requestsRoute);
router.use('/', userRoute);

export default router;