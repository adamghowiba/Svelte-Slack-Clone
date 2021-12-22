import { Server, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import logger from '@logger';

export default (io: Server, socket: Socket) => {

    const joinRoom = ({ user, room }: any, callback: any) => {
        if (!user?.username) return callback('Username required');

        socket.join(room);
        io.in(room).emit('room:join', `${user.username} has joined the room ${room}`)

        logger.info(`${user.username} has joined room ${room}`)
    }

    const leaveRoom = (payload: any) => {

    }

    socket.on("room:join", joinRoom);
    socket.on("room:leave", leaveRoom);
}