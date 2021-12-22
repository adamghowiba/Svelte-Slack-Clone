import { Server, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import logger from '@logger';

interface MessagePayload {
    username: string
    message: string
}

export default (io: Server, socket: Socket) => {

    const onSendMessage = ({ username, message }: MessagePayload) => {
        
    }

    const onReadMessage = (payload: any) => {

    }

    socket.on("message:send", onSendMessage);
    socket.on("message:read", onReadMessage);
}