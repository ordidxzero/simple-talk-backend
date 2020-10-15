import User from '../models/user';
import { CtxType, AuthRequestBody } from '../@types';

export const register = async (ctx: CtxType): Promise<void> => {
  const { username, password } = <AuthRequestBody>ctx.request.body;
  const user = await User.findOne({ username }).exec();
  if (!user) {
    const newUser = new User({ username });
    await newUser.setPassword(password);
    await newUser.save();
    ctx.body = newUser.serialize();
    const token = newUser.generateToken();
    ctx.cookies.set('simple_talk_access_token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return;
  }
  ctx.status = 409;
};

export const login = async (ctx: CtxType): Promise<void> => {
  const { username, password } = <AuthRequestBody>ctx.request.body;
  const user = await User.findOne({ username }).exec();
  if (!user) {
    ctx.status = 401;
    return;
  }
  const isMatch = await user.checkPassword(password);
  if (!isMatch) {
    ctx.status = 400;
    return;
  }
  ctx.body = user.serialize();
  const token = user.generateToken();
  ctx.cookies.set('simple_talk_access_token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
};

export const logout = (ctx: CtxType): void => {
  ctx.cookies.set('simple_talk_access_token');
  ctx.status = 204;
};

export const check = (ctx: CtxType): void => {
  const isAuthenticated = ctx.state.user;
  if (!isAuthenticated) {
    ctx.status = 401;
    return;
  }
  ctx.body = { _id: isAuthenticated._id, username: isAuthenticated.username, avatarUrl: isAuthenticated.avatarUrl };
};
