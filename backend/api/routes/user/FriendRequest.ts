import { Router, Request, Response, NextFunction } from 'express';
import { onError } from '../../../utils/ErrorUtil';
import prisma from "@controllers/db-controller";
import { requestBody as ValidateFriendRequest } from '../../../validation/UserValidation';
import { FriendshipStatus } from '@prisma/client';
import { sendFriendRequest } from '@controllers/user/friend-controller';
const router = Router({ mergeParams: true });

/* Validate User Id & Requesting User Id */
const validateUserIds = (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.userId) return res.status(400).json({ error: 'Must specify a user id' });
    if (!req.body.toUserId) return onError(res, 'Must specify the target user id you are requesting');

    const userId = parseInt(req.params.userId);
    const toUserId = parseInt(req.body.toUserId);

    if (!userId) return onError(res, 'User id must be a valid user id & number');
    if (!toUserId) return onError(res, 'Target user id must be a valid user id & number');

    next();
}

/* Get Requests For A User */
router.get('/', async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);

    if (!userId) return res.status(400).json({ error: 'User id must be a valid number or user id' });

    try {
        const friendRequest = await prisma.friendRequest.findMany({
            where: {
                to_uid: userId
            }
        });
        if (!friendRequest) return onError(res, "Friend request does not exsist");

        res.status(200).json(friendRequest);
    } catch (error) {
        return onError(res, error, 500);
    }
});

/* Update User Request */
router.put('/', validateUserIds, async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const toUserId = parseInt(req.body.toUserId);

    const { error } = ValidateFriendRequest.tailor('put').validate(req.body);

    if (error) return onError(res, error.message);

    try {
        const updateRequest = await prisma.friendRequest.update({
            where: {
                from_uid_to_uid: {
                    from_uid: userId,
                    to_uid: toUserId,
                },
            },
            data: {
                status: req.body.status.toString().toUpperCase() || undefined
            },
        })

        if (!updateRequest) return onError(res, 'No request between those users');

        if (updateRequest.status == 'ACCEPTED') {
            const createRelationship = await prisma.friendship.create({
                data: {
                    user_id: userId,
                    friend_id: toUserId,
                }
            })

            if (!createRelationship) return onError(res, 'Failed to create relationship between those users');

            const deleteRequest = await prisma.friendRequest.delete({
                where: {
                    from_uid_to_uid: {
                        from_uid: userId,
                        to_uid: toUserId,
                    }
                }
            });

            return res.status(200).json({ result: 'Friend request accepted, request deleted', deleteRequest, createRelationship });
        }
    } catch (error) {
        return onError(res, error, 500);
    }
})

/* Create New Request */
router.post('/', validateUserIds, async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const toUserId = parseInt(req.body.toUserId);

    try {
        const result = await sendFriendRequest(userId, toUserId);

        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return onError(res, error, 500);
    }
})

export default router;