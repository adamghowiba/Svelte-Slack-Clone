import { FriendRequest } from "@prisma/client";
import prisma from "../db-controller";

const error = (error: string, status: number = 500) => {
    return { error, status };
}

export const sendFriendRequest = async (fromUserId: number, toUserId: number): Promise<FriendRequest> => {
    try {
        const findUsers = await prisma.user.findMany({
            where: {
                id: {
                    in: [fromUserId, toUserId]
                },
            },

        });

        if (findUsers.length < 2) throw new Error("Can't find user you're attempting to request.");

        const createRequest = await prisma.friendRequest.create({
            data: {
                from_uid: fromUserId,
                to_uid: toUserId,
                status: "PENDING"
            }
        });

        return createRequest;
    } catch (err) {
        error(err);
    }
}