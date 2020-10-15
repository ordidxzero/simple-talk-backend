import User from '../models/user';
import Room from '../models/room';
import { CtxType } from '../@types';
import checkObjectId from '../lib/checkObjectId';

export const startChat = async (ctx: CtxType): Promise<void> => {
  const isAuthenticated = ctx.state.user;
  if (!isAuthenticated) {
    ctx.status = 401;
    return;
  }
  const { _id } = isAuthenticated;
  const opponentId = ctx.params.id;
  const user = await User.findById(_id);
  if (!user) {
    ctx.status = 401;
    return;
  }
  const isObjectIdValid = checkObjectId(opponentId);
  if (!isObjectIdValid) {
    ctx.status = 404;
    return;
  }
  const opponent = await User.findById(opponentId);
  if (!opponent) {
    ctx.status = 400;
    return;
  }
  const isExistOneToOneChat = await Room.checkIsExistOneToOne(_id, opponentId);
  if (isExistOneToOneChat) {
    ctx.status = 409;
    ctx.message = isExistOneToOneChat;
    return;
  }
  const room = await Room.create({ participants: [_id, opponentId], messages: [] });
  const participants = [user, opponent].map(({ _id, username, avatarUrl }) => ({ _id, username, avatarUrl }));
  user.rooms.push(room._id);
  opponent.rooms.push(room._id);
  await user.save();
  await opponent.save();
  ctx.body = { _id: room._id, participants, messages: room.messages };
};

export const leaveChat = async (ctx: CtxType): Promise<void> => {
  const isAuthenticated = ctx.state.user;
  if (!isAuthenticated) {
    ctx.status = 401;
    return;
  }
  const roomId = ctx.params.room;
  const isObjectIdValid = checkObjectId(roomId);
  if (!isObjectIdValid) {
    ctx.status = 404;
    return;
  }
  const { _id } = isAuthenticated;
  const user = await User.findById(_id);
  if (!user) {
    ctx.status = 401;
    return;
  }
  user.leaveChatroom(roomId);
  await user.save();
  console.log('Leave Chat');
};
