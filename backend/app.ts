const path = require('path');
import express from 'express';
import userRouter from './routes/user/UserEntry';
import indexRouter from './routes/index';
import authRouter from './routes/Auth';
import setupError from './loaders/setupError';
import setupParsers from './loaders/setupParsers';
import setupSession from './loaders/session';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

/* Setup View Engine & Parsers */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(setupParsers);

/* Setup Sessions */
app.use(setupSession);

/* Routes */
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);

/* Establish Websocket */
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('User has connected to the socket');
  socket.send('Websocket has been established');

  socket.on('chat_message', (message) => {
    io.emit('new_message', {
      ...message
    })
    console.log(`${message.username} says ${message.message}`)
  })

  socket.on('disconnect', () => {
    console.log('User has disconnected from socket');
  })
});

/* Setup Error Handleing */
app.use(setupError);

server.listen(5000, () => {
  console.log('Listenting on port 5000');
})

export default app;