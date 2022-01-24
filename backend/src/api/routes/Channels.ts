import { Router } from 'express';
import { channelController, userController } from '@controllers';

const router = Router({ mergeParams: true });

/* Get */
router.get('/', channelController.getAllChannels);
router.get('/:id', channelController.getChannelById);

/* Get Users Channels */
router.get('/user/:id', userController.getAllUserChannels);

/* Post */
router.post('/', channelController.postChannel);

/* Update */
router.put('/:id', channelController.putChannel);

/* Delete */
// router.delete('/:id', channelController.deleteChannel);

export default router;
