import { Server, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import logger from '@logger';
import prisma from '@controllers/db-controller';

interface MessagePayload {
    room: string
    message: string
}

export default (io: Server, socket: Socket) => {

    const onSendMessage = async ({ message, room }: MessagePayload) => {
        if (!socket.rooms.has(room)) return;
        
        io.in(room).emit('message:read', {message, username: socket.user.username, room});
        
        await prisma.message.create({
            data: {
                message,
                room,
                userId: socket.user.id,
                date: new Date()
            }
        })
    }

    const onReadMessage = (payload: any) => {

    }

    socket.on("message:send", onSendMessage);
    socket.on("message:read", onReadMessage);
}