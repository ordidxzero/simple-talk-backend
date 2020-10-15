import { CtxType } from '../@types';
import checkObjectId from '../lib/checkObjectId';
import Room, { IRoom_populated } from '../models/room';
import User, { IUser_populated } from '../models/user';

export const loadFriends = async (ctx: CtxType): Promise<void> => {
  const isAuthenticated = ctx.state.user;
  if (!isAuthenticated) {
    ctx.status = 401;
    return;
  }
  const { _id } = isAuthenticated;
  const user = (await User.findById(_id).populate(['friends', 'recommanded'])) as IUser_populated;
  if (!user) {
    ctx.status = 403;
    return;
  }
  const friends = user.friends.map(({ _id, username, avatarUrl }) => ({ _id, username, avatarUrl }));
  const recommanded = user.recommanded.map(({ _id, username, avatarUrl }) => ({ _id, username, avatarUrl }));
  ctx.body = { friends, recommanded };
};

export const loadRooms = async (ctx: CtxType): Promise<void> => {
  const isAuthenticated = ctx.state.user;
  if (!isAuthenticated) {
    ctx.status = 401;
    return;
  }
  const { _id } = isAuthenticated;
  const user = (await User.findById(_id).populate('rooms')) as IUser_populated;
  if (!user) {
    ctx.status = 403;
    return;
  }
  const promiseRooms = user.rooms.map(async ({ _id }) => {
    const room = (await Room.findById(_id).populate(['participants', 'messages'])) as IRoom_populated;
    const participants = room.participants.map(({ _id, username, avatarUrl }) => ({ _id, username, avatarUrl }));
    const messages = room.messages.map(({ user, text, createdAt }) => ({ user, text, createdAt }));
    return { _id, participants, messages };
  });
  const rooms = await Promise.all(promiseRooms);
  ctx.body = rooms;
};

export const find = async (ctx: CtxType): Promise<void> => {
  const query = ctx.query.query;
  if (!query) {
    ctx.status = 400;
    return;
  }
  const regex = new RegExp(query, 'i');
  const opponents = await User.find({ username: regex });
  const data = opponents.map(({ _id, username, avatarUrl }) => ({ _id, username, avatarUrl }));
  ctx.body = data;
};

export const addFriend = async (ctx: CtxType): Promise<void> => {
  const isAuthenticated = ctx.state.user;
  const opponentId = ctx.params.id;
  if (!isAuthenticated) {
    ctx.status = 401;
    return;
  }
  const { _id } = isAuthenticated;
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
  if (user.friends.includes(opponentId)) {
    ctx.status = 403;
    return;
  }
  if (!opponent.friends.includes(_id) && !opponent.recommanded.includes(_id)) {
    opponent.recommanded.push(_id);
  }
  user.friends.push(opponentId);
  await user.save();
  await opponent.save();
  ctx.body = opponent.serialize();
};

export const acceptFriend = async (ctx: CtxType): Promise<void> => {
  const isAuthenticated = ctx.state.user;
  const opponentId = ctx.params.id;
  if (!isAuthenticated) {
    ctx.status = 401;
    return;
  }
  const { _id } = isAuthenticated;
  const user = await User.findById(_id);
  if (!user) {
    ctx.status = 401;
    return;
  }
  const opponent = await User.findById(opponentId);
  if (!opponent) {
    ctx.status = 400;
    return;
  }
  user.acceptFriendRequest(opponentId);
  await user.save();
  ctx.body = opponent.serialize();
};

export const removeFriend = async (ctx: CtxType): Promise<void> => {
  const isAuthenticated = ctx.state.user;
  const opponentId = ctx.params.id;
  if (!isAuthenticated) {
    ctx.status = 401;
    return;
  }
  const { _id } = isAuthenticated;
  const user = await User.findById(_id);
  if (!user) {
    ctx.status = 401;
    return;
  }
  const opponent = await User.findById(opponentId);
  if (!opponent) {
    ctx.status = 400;
    return;
  }
  user.removeFriend(opponentId);
  await user.save();
  ctx.body = opponent.serialize();
};
