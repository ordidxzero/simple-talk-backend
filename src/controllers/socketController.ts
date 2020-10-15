import { Server, Socket } from 'socket.io';
import Message from '../models/message';
import Room from '../models/room';
import User from '../models/user';

type MessageData = {
  user: string;
  room: string;
  text: string;
  createdAt: number;
};

const socketController = (io: Server) => (socket: Socket): void => {
  socket.on('check', async () => {
    const user = await User.findById(socket.id).exec();
    if (!user) {
      return socket.emit('err', 'socket id is invalid');
    }
    const rooms = user.rooms.map(room => room.toString());
    rooms.forEach(room => socket.join(room));
  });

  socket.on('disconnect', (reason: string) => {
    console.log(reason);
    socket.emit('bye');
  });

  socket.on('joinRoom', ({ room, opponent }: { room: string; opponent: string }) => {
    socket.join(room);
    io.clients().sockets[opponent].join(room);
  });

  socket.on('leaveRoom', (room: string) => {
    socket.leave(room);
  });

  socket.on('sendMessage', async (data: MessageData) => {
    const { user, room, text, createdAt } = data;
    const message = await Message.create({ user, room, text, createdAt });
    const currentRoom = await Room.findById(room).exec();
    if (!currentRoom) {
      return socket.emit('err', 'room id is invalid');
    }
    currentRoom.messages.push(message._id);
    await currentRoom.save();
    socket.to(data.room).emit('receiveMessage', data);
  });
};

export default socketController;
