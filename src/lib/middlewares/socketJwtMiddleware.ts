import { Socket } from 'socket.io';
import cookieFormatter from '../cookieFormatter';
import * as tokenManager from '../tokenManager';

const socketJwtMiddleware = (socket: Socket, next: (err?: any) => void): void => {
  if (!socket.request.headers.cookie) return next();
  const formattedCookies = cookieFormatter(socket.request.headers.cookie);
  const cookie = formattedCookies.find(c => c.name === 'simple_talk_access_token');
  if (!cookie) return;
  try {
    const decoded = tokenManager.decodeToken(cookie.value);
    socket.id = decoded._id;
  } catch (e) {
    return;
  }
  return next();
};

export default socketJwtMiddleware;
