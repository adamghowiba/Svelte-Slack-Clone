import prisma from '@controllers/db-controller';
import ApiError from '@errors/ApiError';
import { DatabaseError, parseErrorMessages } from '@errors/DatabaseError';
import { User, FriendRequest, Friendship, Prisma } from '@prisma/client';
import { FriendRequestType } from '../types/user';
import logger from '@logger';

export const findAllRequests = async (userId: User['id'], requestType: FriendRequestType): Promise<FriendRequest[]> => {
	try {
		const friendRequests = await prisma.friendRequest.findMany({
			where: (() => {
				if (requestType == 'incoming')
					return {
						to_uid: userId
					};
				if (requestType == 'outgoing')
					return {
						from_uid: userId
					};
				if (requestType == 'all')
					return {
						OR: [{ to_uid: userId }, { from_uid: userId }]
					};
			})()
		});

		return friendRequests;
	} catch (error) {
		throw new DatabaseError(error);
	}
};

export const findRequestByIds = async (fromUid: User['id'], toUid: User['id']): Promise<FriendRequest> => {
	try {
		const friendRequests = await prisma.friendRequest.findUnique({
			where: {
				from_uid_to_uid: {
					from_uid: fromUid,
					to_uid: toUid
				}
			}
		});

		return friendRequests;
	} catch (error) {
		throw new DatabaseError(error);
	}
};

/**
 * Send a friendrequest to another user.
 * @param {User['id']} fromUid User sending the friend request
 * @param {User['id']} toUid User the request is being sent to
 * @returns {Promise<FriendRequest>} Promise containing the newly created friendrequest
 */
export const sendRequest = async (fromUid: User['id'], toUid: User['id']): Promise<FriendRequest> => {
	try {
		const friendRequest = await prisma.friendRequest.create({
			data: {
				to_uid: toUid,
				from_uid: fromUid
			}
		});

		return friendRequest;
	} catch (error) {
		/* TODO: Should this be handled by frontend & we just pass them an easy value to handle? */
		const errorType = parseErrorMessages(error?.code);
		if (errorType == 'notfound') throw new ApiError("User you're requesting does not exsist.");
		if (errorType == 'duplicate') throw new ApiError('A request to this user already exsists.');

		throw new DatabaseError(error);
	}
};

export const deleteRequest = async (fromUid: User['id'], toUid: User['id']): Promise<Friendship | FriendRequest> => {
	try {
		const friendRequest = await prisma.friendRequest.delete({
			where: {
				from_uid_to_uid: { from_uid: fromUid, to_uid: toUid }
			}
		});
		return friendRequest;
	} catch (error) {
		throw new DatabaseError(error);
	}
};

export const addFriend = async (fromUid: User['id'], toUid: User['id']): Promise<Prisma.BatchPayload> => {
	try {
		const friendship = await prisma.friendship.createMany({
			data: [
				{ user_id: fromUid, friend_id: toUid },
				{ user_id: toUid, friend_id: fromUid }
			]
		});

		return friendship;
	} catch (error) {
		const errorType = parseErrorMessages(error?.code);
		if (errorType == 'notfound') throw new ApiError("User you're trying to add does not exsist.");
		if (errorType == 'duplicate') throw new ApiError("You're already friends with that user");

		throw new DatabaseError(error);
	}
};

export const findFriendshipById = async (fromUid: User['id'], toUid: User['id']): Promise<Friendship> => {
	try {
		const friendRequests = await prisma.friendship.findUnique({
			where: {
				user_id_friend_id: {
					user_id: fromUid,
					friend_id: toUid
				}
			}
		});

		return friendRequests;
	} catch (error) {
		throw new DatabaseError(error);
	}
};

export const findAllFriends = async (userId: User['id']): Promise<Friendship[]> => {
	try {
		const friends = await prisma.friendship.findMany({
			where: {
				user_id: userId
			},
			include: {
				friend: true
			}
		});
		return friends;
	} catch (error) {
		throw new DatabaseError(error);
	}
};
