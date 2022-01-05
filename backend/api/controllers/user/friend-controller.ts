import ApiError from "@errors/ApiError";
import { userService } from "@services";
import { catchAsync } from "@utils/ErrorUtil";
import { Request, Response, NextFunction } from 'express';
import { QueryParams } from "@validation/FriendRequestValidation";
import { FriendRequestType } from "../../../types/user";
import logger from "@logger";
import { isObject } from "util";
import { webSocket } from "../../../socket";

// TODO Move function
const validateFriendParams = (req: Request, multipleUsers: boolean) => {
    const userId = parseInt(req.params.id);
    const toId = parseInt(req.params.toId);

    if (!userId) throw new ApiError(`User ${userId} is required`);
    if (!toId && multipleUsers) throw new ApiError('To user id is required');

    if (multipleUsers) return { userId, toId };

    return { userId }
}

/* Friend Requests */
export const getAllRequests = catchAsync(async (req: Request<any, any, any, { type: FriendRequestType }>, res: Response) => {
    const friendParams = validateFriendParams(req, false);
    const { error } = QueryParams.validate(req.query);

    if (error) throw new ApiError(error.message);

    const friendRequests = await userService.friends.findAllRequests(friendParams.userId, req.query.type);

    res.status(200).json(friendRequests);
});

export const getRequestById = catchAsync(async (req: Request, res: Response) => {
    const friendParams = validateFriendParams(req, true);

    const friendRequests = await userService.friends.findRequestByIds(friendParams.userId, friendParams.toId);

    res.status(200).json(friendRequests);
});

export const postRequest = catchAsync(async (req: Request, res: Response) => {
    const friendParams = validateFriendParams(req, true);

    const friendship = await userService.friends.findFriendshipById(friendParams.userId, friendParams.toId);

    if (friendship) throw new ApiError("You're already friends with that user.")

    const friendRequest = await userService.friends.sendRequest(friendParams.userId, friendParams.toId);

    res.status(200).json(friendRequest);
});

export const updateRequest = catchAsync(async (req: Request, res: Response) => {
    const friendParams = validateFriendParams(req, true);
    webSocket.emit('friend:added', 'new friend added');
    return res.status(200).json('Added friend');

    const status = req.body.status;

    if (status == 'accepted') {
        const friendRequest = await userService.friends.findRequestByIds(friendParams.toId, friendParams.userId);
        if (!friendRequest) throw new ApiError('User has not sent you a friend request');

        const freindship = await userService.friends.addFriend(friendParams.userId, friendParams.toId);
        await userService.friends.deleteRequest(friendParams.toId, friendParams.userId);

        return res.status(200).json(freindship);
    }

});

export const deleteRequest = catchAsync(async (req: Request, res: Response) => {
    const friendParams = validateFriendParams(req, true);

    const friendRequest = await userService.friends.deleteRequest(friendParams.userId, friendParams.toId);

    res.status(200).json(friendRequest);
});

/* Friends */
export const getAllFriends = catchAsync(async (req: Request, res: Response) => {
    const friendParams = validateFriendParams(req, false);

    const friendRequests = await userService.friends.findAllFriends(friendParams.userId);
    res.status(200).json(friendRequests);
});
