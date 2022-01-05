import { getGroupMessages } from '@controllers/chat-controller';
import { Router } from 'express';
const router = Router();

router.get('/group/:name', getGroupMessages);

export default router;