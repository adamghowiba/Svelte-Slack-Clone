import { Router } from "express";
import isAuth from '@middlewear/auth-mw';
import { userController } from '@controllers';
const router = Router();

router.get('/me', isAuth);
router.get('/', userController.getAllUsers);
router.post('/');

// router.route('/:id')
//     .get()
//     .delete()
//     .put();

export default router;