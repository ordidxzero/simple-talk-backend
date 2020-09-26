import { CtxType } from '../@types';
import User from '../models/user';

export const loadFriends = async (ctx: CtxType): Promise<void> => {
  const isAuthenticated = ctx.state.user;
  if (!isAuthenticated) {
    ctx.status = 401;
    return;
  }
  const { _id } = isAuthenticated;
  const user = await User.findById(_id).populate('friends');
  if (user) {
    console.log(user.friends);
  }
};

export const find = (ctx: CtxType): void => {
  ctx.body = 'find';
};

export const addFriend = (ctx: CtxType): void => {
  ctx.body = 'addFriend';
};

export const removeFriend = (ctx: CtxType): void => {
  ctx.body = 'removeFriend';
};
