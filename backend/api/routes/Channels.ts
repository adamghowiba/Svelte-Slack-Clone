import { Response, Request, Router } from 'express';
import { channelController } from '@controllers';
import { catchAsync } from '@utils/ErrorUtil';
const router = Router({ mergeParams: true });


/* Get */
router.get('/', channelController.getAllChannels);
router.get('/:id', channelController.getChannelById);

/* Post */
router.post('/', channelController.postChannel);

/* Update */
router.put('/:id', channelController.putChannel);

/* Delete */
router.delete('/:id', channelController.deleteChannel);

export default router;
